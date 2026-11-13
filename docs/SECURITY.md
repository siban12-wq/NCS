# TEAM NCS Website Security & Privacy Architecture

This document outlines the security controls, data privacy policies, threat model, and incident response procedures for the TEAM NCS website.

---

## 1. Threat Model & Risk Assessment

| Risk Vector | Attack Scenario | Mitigation & Controls |
|---|---|---|
| **Bot Flooding & Spam** | Automated scripts spamming the anonymous contact form. | • Hidden honeypot field (`website_url`) silently rejects bots.<br>• Cloudflare Turnstile CAPTCHA verification server-side.<br>• Client-side 30-second cooldown timer. |
| **Denial of Service (DoS)** | Rapid requests attempting to exhaust email quotas. | • In-memory per-IP rate limiting (max 3 submissions per 10 minutes).<br>• Request payload strictly limited to 2 KB.<br>• Netlify edge DDoS mitigation. |
| **Data Leakage & Logging** | Sensitive student emotional distress messages leaking via logs or DB leaks. | • **Zero Database Policy:** No database exists.<br>• Serverless function logs **zero** message content and **zero** IP addresses.<br>• In-memory rate limiting hashes IPs with an ephemeral salt. |
| **Cross-Site Attacks (XSS/Clickjacking)** | Hostile sites embedding or injecting scripts. | • `X-Frame-Options: DENY` & `frame-ancestors: 'none'`.<br>• Strict Content-Security-Policy (CSP) header in report-only/enforced mode.<br>• `Strict-Transport-Security` (HSTS) with 1-year preload.<br>• `Sec-Fetch-Site: same-origin` validation on the function. |
| **Account Takeover** | Compromised admin account on Netlify, GitHub, or Instagram. | • Mandatory 2FA on GitHub, Netlify, Domain Registrar, and Instagram.<br>• Multi-admin ownership (minimum 2 designated club coordinators). |
| **Distress / Crisis Misdirection** | A student in acute crisis submitting a form and waiting indefinitely for a reply. | • Prominent warning: **"Not Monitored 24/7"** displayed directly above the input.<br>• Direct links to the Support Panel with 24/7 verified toll-free crisis hotlines (Tele-MANAS, KIRAN). |

---

## 2. What Is and Isn't Stored

### What is NEVER Stored:
- **No Database:** No database (SQL, NoSQL, or local file store) is connected to this site.
- **No Message Storage:** Questions submitted through the form are forwarded immediately to the club inbox via HTTPS API and are discarded from memory.
- **No Interactive Station Persistence:** The **Mood Check-in** and **Leave a Worry Behind (LetGo)** stations run 100% in local component state. They make **zero network requests** and perform **zero storage writes** (verified by automated tests in `tests/privacy.test.tsx`).
- **No Plaintext IP Logging:** Neither the serverless function nor client scripts write IP addresses to persistent logs.

### What is Ephemerally Kept:
- **Rate-Limiting Hash:** Client IP is hashed with a one-time process salt (`sha256(IP + salt)`) in an in-memory Map that automatically purges entries older than 10 minutes.
- **Theme Preference:** Local storage key `ncs-theme` (`'dark'` or `'light'`), purely client-side.

---

## 3. Environment Variables Configuration (Netlify)

Configure the following environment variables in the **Netlify Dashboard** under:
*Site configuration > Environment variables*

| Variable | Environment | Description |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | All (Public) | Cloudflare Turnstile Public Site Key (starts with `0x4AAAAAAA...`). Used by the frontend widget in `src/sections/Reach.tsx`. |
| `TURNSTILE_SECRET` | Functions (Secret) | Cloudflare Turnstile Secret Key. Used by `netlify/functions/submit-question.ts` to verify tokens server-side. |
| `EMAIL_API_KEY` | Functions (Secret) | Resend API Key (`re_...`) from [Resend](https://resend.com) used to forward questions to the club inbox. |
| `INBOX_TO` | Functions | The verified destination email address (e.g., `counselling@nist.edu`). |

> [!IMPORTANT]
> Never commit `.env` or `.env.local` to Git. Keep `.env.example` updated with non-sensitive variable names only.

---

## 4. Key Rotation Procedure

1. **Cloudflare Turnstile Key Rotation:**
   - Log into Cloudflare Dashboard > Turnstile.
   - Generate a new widget or reset secret key.
   - Update `VITE_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET` in Netlify.
   - Trigger a deploy without cache in Netlify.
2. **Resend Email API Key Rotation:**
   - Log into [Resend API Keys](https://resend.com/api-keys).
   - Create a new API key with *Sending only* permissions.
   - Update `EMAIL_API_KEY` in Netlify environment variables.
   - Revoke the old key from the Resend dashboard.

---

## 5. Inbox Triage & Human Safety Protocol

- **TODO: Assigned Inbox Readers:**
  - Designate at least two trained senior TEAM NCS student coordinators and one faculty counsellor to review the forwarding inbox.
- **Response SLA:**
  - Standard non-urgent queries: 24 to 48 hours during term time.
- **Distress Escalation:**
  - If any message expresses suicidal ideation or imminent self-harm, immediately escalate to institutional Counselling Services and campus health authorities. Do not attempt unassisted crisis intervention via email.

---

## 6. Security Incident Response Checklist

If an API key is leaked or an account is compromised:
1. [ ] **Revoke Leaked Secrets:** Immediately delete the affected key in Cloudflare or Resend dashboard.
2. [ ] **Rotate in Netlify:** Issue a new secret key and update Netlify environment variables.
3. [ ] **Trigger Immediate Redeployment:** Deploy latest clean commit to clear cache.
4. [ ] **Audit Git History:** Ensure secrets were not committed to public repositories. If committed, purge git history using `git-filter-repo` and rotate credentials.
5. [ ] **Notify Club Admins:** Alert faculty advisors and executive student coordinators.
