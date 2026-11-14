import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from '../netlify/functions/submit-question';
import type { HandlerEvent, HandlerContext } from '@netlify/functions';

function createMockEvent(overrides: Partial<HandlerEvent> = {}): HandlerEvent {
  return {
    rawUrl: 'https://team-ncs.netlify.app/.netlify/functions/submit-question',
    rawQuery: '',
    path: '/.netlify/functions/submit-question',
    httpMethod: 'POST',
    headers: {
      'content-type': 'application/json',
      'sec-fetch-site': 'same-origin',
      host: 'team-ncs.netlify.app',
      'client-ip': '192.168.1.100',
    },
    multiValueHeaders: {},
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    body: JSON.stringify({
      message: 'Can I drop by the counselling desk between lectures tomorrow?',
      category: 'general',
      website_url: '',
    }),
    isBase64Encoded: false,
    ...overrides,
  };
}

const mockContext: HandlerContext = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: 'submit-question',
  functionVersion: '1',
  invokedFunctionArn: '',
  memoryLimitInMB: '1024',
  awsRequestId: 'test-req',
  logGroupName: '',
  logStreamName: '',
  identity: undefined,
  clientContext: undefined,
  getRemainingTimeInMillis: () => 5000,
  done: () => {},
  fail: () => {},
  succeed: () => {},
};

describe('Serverless Function: submit-question.ts Hardening Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('1. Rejects non-POST HTTP methods with status 405', async () => {
    const event = createMockEvent({ httpMethod: 'GET' });
    const res = await handler(event, mockContext);
    expect(res?.statusCode).toBe(405);
    const body = JSON.parse(res?.body || '{}');
    expect(body.error).toBe('Method not allowed');
  });

  it('2. Rejects cross-origin requests with status 403', async () => {
    const event = createMockEvent({
      headers: {
        'content-type': 'application/json',
        'sec-fetch-site': 'cross-site',
      },
    });
    const res = await handler(event, mockContext);
    expect(res?.statusCode).toBe(403);
    const body = JSON.parse(res?.body || '{}');
    expect(body.error).toContain('Cross-origin');
  });

  it('3. Rejects payloads larger than 2 KB with status 413', async () => {
    const hugeMessage = 'A'.repeat(2500);
    const event = createMockEvent({
      body: JSON.stringify({ message: hugeMessage }),
    });
    const res = await handler(event, mockContext);
    expect(res?.statusCode).toBe(413);
    const body = JSON.parse(res?.body || '{}');
    expect(body.error).toBe('Payload exceeds size limit');
  });

  it('4. Rejects a filled bot honeypot field with status 400', async () => {
    const event = createMockEvent({
      body: JSON.stringify({
        message: 'Valid question',
        website_url: 'http://spam-link-from-bot.com',
      }),
    });
    const res = await handler(event, mockContext);
    expect(res?.statusCode).toBe(400);
    const body = JSON.parse(res?.body || '{}');
    expect(body.error).toBe('Invalid submission');
  });

  it('5. Rejects empty messages (< 1 char) with status 400', async () => {
    const event = createMockEvent({
      body: JSON.stringify({
        message: '   ',
        category: 'general',
      }),
    });
    const res = await handler(event, mockContext);
    expect(res?.statusCode).toBe(400);
    const body = JSON.parse(res?.body || '{}');
    expect(body.error).toContain('between 1 and 600 characters');
  });

  it('6. Rejects messages exceeding 600 characters with status 400', async () => {
    const event = createMockEvent({
      body: JSON.stringify({
        message: 'X'.repeat(601),
        category: 'general',
      }),
    });
    const res = await handler(event, mockContext);
    expect(res?.statusCode).toBe(400);
    const body = JSON.parse(res?.body || '{}');
    expect(body.error).toContain('between 1 and 600 characters');
  });

  it('7. Rejects invalid categories not on the allow-list with status 400', async () => {
    const event = createMockEvent({
      body: JSON.stringify({
        message: 'Hello team',
        category: 'malicious_category_injection',
      }),
    });
    const res = await handler(event, mockContext);
    expect(res?.statusCode).toBe(400);
    const body = JSON.parse(res?.body || '{}');
    expect(body.error).toBe('Invalid category selection');
  });

  it('8. Accepts valid submission with status 200', async () => {
    const event = createMockEvent({
      headers: {
        'content-type': 'application/json',
        'sec-fetch-site': 'same-origin',
        'client-ip': '10.0.0.5',
      },
      body: JSON.stringify({
        message: 'Where is the counselling room located on campus?',
        category: 'academic',
        website_url: '',
      }),
    });
    const res = await handler(event, mockContext);
    expect(res?.statusCode).toBe(200);
    const body = JSON.parse(res?.body || '{}');
    expect(body.success).toBe(true);
  });

  it('9. Enforces rate limiting on rapid repeated requests from same IP (status 429)', async () => {
    const testIp = '172.16.0.42';
    const makeReq = () =>
      handler(
        createMockEvent({
          headers: {
            'content-type': 'application/json',
            'sec-fetch-site': 'same-origin',
            'client-ip': testIp,
          },
          body: JSON.stringify({
            message: 'Testing rate limit',
            category: 'other',
          }),
        }),
        mockContext
      );

    // Make 3 allowed requests
    const res1 = await makeReq();
    const res2 = await makeReq();
    const res3 = await makeReq();
    expect(res1?.statusCode).toBe(200);
    expect(res2?.statusCode).toBe(200);
    expect(res3?.statusCode).toBe(200);

    // 4th request must be rate-limited (status 429)
    const res4 = await makeReq();
    expect(res4?.statusCode).toBe(429);
    const body = JSON.parse(res4?.body || '{}');
    expect(body.error).toContain('Too many submissions');
  });

  it('10. Privacy check: Never logs message content or IP address to console', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const secretSecret = 'MY_SUPER_CONFIDENTIAL_MESSAGE_12345';
    const clientIp = '198.51.100.77';

    const event = createMockEvent({
      headers: {
        'content-type': 'application/json',
        'sec-fetch-site': 'same-origin',
        'client-ip': clientIp,
      },
      body: JSON.stringify({
        message: secretSecret,
        category: 'peer',
      }),
    });

    await handler(event, mockContext);

    // Scan all log outputs to guarantee no leaks
    const allLogs = [
      ...consoleLogSpy.mock.calls.flat(),
      ...consoleErrorSpy.mock.calls.flat(),
    ].join(' ');

    expect(allLogs).not.toContain(secretSecret);
    expect(allLogs).not.toContain(clientIp);
  });
});

