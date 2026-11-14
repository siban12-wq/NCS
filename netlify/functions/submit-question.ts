import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import crypto from 'node:crypto';

// In-memory rate limiting map: hash(IP + salt) -> timestamp[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions per 10 mins
const IP_SALT = crypto.randomBytes(16).toString('hex'); // Ephemeral process salt

// Allow-listed categories
export const ALLOWED_CATEGORIES = ['academic', 'hostel', 'peer', 'general', 'other'] as const;
export type AllowedCategory = (typeof ALLOWED_CATEGORIES)[number];

function getClientIp(event: HandlerEvent): string {
  const headers = event.headers;
  const ip =
    headers['client-ip'] ||
    headers['x-forwarded-for']?.split(',')[0].trim() ||
    headers['x-nf-client-connection-ip'] ||
    '127.0.0.1';
  return ip;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  // Hash the IP with ephemeral salt so no IP is stored in memory in plaintext
  const key = crypto.createHash('sha256').update(ip + IP_SALT).digest('hex');

  const history = rateLimitMap.get(key) || [];
  const recent = history.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  recent.push(now);
  rateLimitMap.set(key, recent);

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 2000) {
    for (const [k, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(k);
      }
    }
  }

  return true;
}

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // 1. Accept POST only
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        Allow: 'POST',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // 2. Same-origin validation
  const secFetchSite = event.headers['sec-fetch-site'];
  const origin = event.headers['origin'];
  const host = event.headers['host'];

  if (secFetchSite && secFetchSite !== 'same-origin' && secFetchSite !== 'none') {
    return {
      statusCode: 403,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Cross-origin request rejected' }),
    };
  }

  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host && !originHost.endsWith('.netlify.app') && !originHost.includes('localhost')) {
        return {
          statusCode: 403,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Origin mismatch' }),
        };
      }
    } catch {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid origin header' }),
      };
    }
  }

  // 3. Body size limit: 2 KB (2048 bytes)
  const rawBody = event.body || '';
  if (Buffer.byteLength(rawBody, 'utf8') > 2048) {
    return {
      statusCode: 413,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Payload exceeds size limit' }),
    };
  }

  // Parse JSON
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Malformed JSON payload' }),
    };
  }

  // 4. Honeypot check (reject filled honeypot field)
  const honeypot = (data.website_url ?? data.honeypot) as string | undefined;
  if (honeypot && honeypot.trim().length > 0) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid submission' }),
    };
  }

  // 5. Message validation (1 to 600 chars)
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (message.length < 1 || message.length > 600) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Message must be between 1 and 600 characters' }),
    };
  }

  // 6. Optional category validation from allow-list
  const categoryRaw = typeof data.category === 'string' ? data.category.toLowerCase().trim() : 'general';
  if (categoryRaw && !ALLOWED_CATEGORIES.includes(categoryRaw as AllowedCategory)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid category selection' }),
    };
  }
  const category = categoryRaw || 'general';

  // 7. Rate limiting per IP
  const clientIp = getClientIp(event);
  if (!checkRateLimit(clientIp)) {
    return {
      statusCode: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '600',
      },
      body: JSON.stringify({ error: 'Too many submissions. Please try again later.' }),
    };
  }

  // 8. Cloudflare Turnstile Verification
  const turnstileSecret = process.env.TURNSTILE_SECRET;
  const turnstileToken = (data.turnstileToken ?? data['cf-turnstile-response']) as string | undefined;

  if (turnstileSecret) {
    if (!turnstileToken) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing verification token' }),
      };
    }

    try {
      const verifyFormData = new URLSearchParams();
      verifyFormData.append('secret', turnstileSecret);
      verifyFormData.append('response', turnstileToken);
      verifyFormData.append('remoteip', clientIp);

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: verifyFormData.toString(),
      });

      const outcome = (await verifyRes.json()) as { success: boolean };
      if (!outcome.success) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Anti-bot verification failed' }),
        };
      }
    } catch {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Verification service unreachable' }),
      };
    }
  }

  // 9. Forward message to club inbox via Email API
  const emailApiKey = process.env.EMAIL_API_KEY;
  const inboxTo = process.env.INBOX_TO || 'counselling@nist.edu';

  if (emailApiKey) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${emailApiKey}`,
        },
        body: JSON.stringify({
          from: 'NCS Student Support <onboarding@resend.dev>',
          to: inboxTo,
          subject: `[TEAM NCS Question] Category: ${category.toUpperCase()}`,
          text: `A new student question was submitted via the TEAM NCS website contact form.

Category: ${category}
Timestamp (UTC): ${new Date().toISOString()}

Message:
${message}

---
Human Safety Notice:
Messages sent via this form are not monitored 24/7.
If this message reflects acute distress, please connect with institutional counsellors immediately.
`,
        }),
      });

      if (!emailRes.ok) {
        // Operational log without user content or IP
        console.error('Email forwarding service responded with error status:', emailRes.status);
        return {
          statusCode: 502,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Unable to forward message. Please use direct email.' }),
        };
      }
    } catch {
      console.error('Network failure while forwarding to email provider');
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email service connection error' }),
      };
    }
  } else {
    // Development or test mode warning (no secrets configured)
    console.warn('EMAIL_API_KEY not configured. Submission acknowledged in test mode.');
  }

  // Success response
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      success: true,
      message: 'Your question has been forwarded securely to the TEAM NCS inbox.',
    }),
  };
};

