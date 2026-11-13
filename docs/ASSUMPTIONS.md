# Assumptions Log

This document records architectural, design, and implementation decisions made autonomously to fulfill the prompt requirements.

## 1. Environment & Architecture
- **Runtime & Tooling:** Vite + React 18 + TypeScript (strict) on Windows (PowerShell compatible).
- **Styling:** Tailwind CSS with CSS variables on `:root` and `[data-theme='dark']` / `[data-theme='light']`.
- **Motion & 3D:** Three.js, React Three Fiber (R3F v8 line for React 18), Drei (v9), Postprocessing (`@react-three/postprocessing` v2 line with `postprocessing` ^6.36.0 peer dependency), GSAP + ScrollTrigger, Lenis for unified scroll physics.
- **Scroll Sync:** A central Zustand store holds normalized scroll `progress` (0 to 1), synchronized via Lenis. Both DOM sections and the R3F CameraRig reference `sectionRanges` defined in `src/content/site.ts`.

## 2. Content & Privacy
- **Strict Adherence to Section 2:** Only verified facts regarding TEAM NCS, SANGAM 2026 (Oct 3, 2026, 400 first-years, interactive games, Q&A), Parent-Teacher Meeting 2026 (royal-blue polo identity), and official Instagram `@the_team_ncs` are hardcoded.
- **Placeholders:** Team roster names, office location, emergency external hotlines, and booking forms are defined with clear `TODO:` markers in `src/content/site.ts` and cataloged in `docs/TODO.md`.
- **Consent Mechanism:** The `hidden: true` flag in `src/content/captions.json` enables any student to request photo omission without deleting source files.

## 3. Photo Manifest & Canonical Captions
- Sharp is used to extract image dimensions, aspect ratios, dominant colors, and low-quality 16px blur data URIs.
- Canonical caption merging gives precedence to the most recently modified caption file, prioritizing non-empty values over empty ones, and flags any value with `TODO` for review.
- Fallback alt texts follow the pattern: `"TEAM NCS memory from campus, 2026"`.

## 4. Performance & Fallbacks
- **Lazy Loading:** WebGL SceneRoot is loaded via `React.lazy` with Suspense.
- **Quality Tiers:** High, Medium, Low, Lite. Users on low-spec hardware or those with `prefers-reduced-motion` can use `LiteApp` (zero WebGL, high accessibility).
- **Offline Capable:** The application requires no external backend or live API keys to build and run.
