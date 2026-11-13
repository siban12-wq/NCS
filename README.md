# TEAM NCS · NIST Counselling Services Website

> *"UNITED WE STAND ,DIVIDED WE FALL."*

Official production website for **TEAM NCS**, the student-run counselling team at NIST working alongside the institute's Counselling Services. Built around **"The Confluence"** (Sangam) metaphor: every student arrives as a separate stream of light with individual worries and rhythm; at NCS, the streams meet, creating a calmer, stronger community.

---

## Architecture & Visual System

- **3D Confluence Journey:** A single persistent WebGL `<Canvas>` rendered behind semantic HTML sections. Scroll progress (0 to 1) synchronously drives camera waypoints, sky dome atmosphere (stormy indigo -> violet dusk -> peach-gold dawn), particles, and the central breathing orb.
- **Dynamic Weather Station:** Interactive mood check-in enables visitors to alter the atmosphere in real time (Overwhelmed, Foggy, Hopeful, Calm).
- **Interactive Reset & Release:** 4-7-8 breathing pacer and private in-browser worry-release station.
- **Adaptive Quality Tiers:**
  - `High`: Full particle volume, postprocessing Bloom & Depth-of-Field, custom firefly cursor.
  - `Medium`: 50% particles, Bloom.
  - `Low`: 25% particles, zero postprocessing.
  - `Lite`: Zero WebGL. Seamless 2D fallback powered by accessible CSS gradients and SVG streams.
- **Performance & Lazy Loading:** The 3D scene is lazy-loaded via `React.lazy`, ensuring the DOM shell and typography render immediately.

---

## Consent & Photo Removal Mechanism

All photographs displayed on the website are documented from campus events with student consent.

Anyone wishing to remove their photograph from the website can request removal by contacting the team via Instagram ([@the_team_ncs](https://www.instagram.com/the_team_ncs)).
To take down any photograph without deleting disk files:
1. Open `src/content/captions.json`.
2. Set `"hidden": true` for that photo's ID.
3. Re-run `npm run build`. The photo will be excluded from the generated manifest and public gallery.

---

## Verified Facts & Content Boundaries

In strict compliance with verified institutional facts:
- **Flagship Event (SANGAM 2026):** Held on 3 October 2026 (11:00 AM – 4:30 PM), engaging ~400 first-year undergraduate students across programmes with team games, stress-relief activities, and an open Q&A.
- **Parent-Teacher Meeting 2026:** TEAM NCS supported B.Tech 2nd & 3rd year sessions wearing signature royal-blue polos and campus lanyards.
- **Instagram:** [@the_team_ncs](https://www.instagram.com/the_team_ncs).
- Placeholders for team roster names and campus office numbers are cataloged in `docs/TODO.md` and marked with `TODO:` in `src/content/site.ts`.

---

## Development Scripts

All scripts are cross-platform Node.js (Windows PowerShell / macOS / Linux):

```bash
# Install dependencies
npm install

# Run photo pipeline & launch local dev server
npm run dev

# Run content integrity & TODO check
npm run check

# Rebuild photo manifest & blur placeholders
npm run photos

# Full production build (Photo pipeline -> TypeScript check -> Vite bundle)
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment (Netlify)

Configured via `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Includes single-page application (SPA) rewrites (`/* -> /index.html 200`), security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`), and immutable cache headers for hashed assets.
