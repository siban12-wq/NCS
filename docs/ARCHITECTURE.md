# Architecture & System Design: "The Confluence"

## 1. Concept: The Confluence
"Sangam" means meeting point or confluence where streams join. In TEAM NCS, every student arrives as a separate stream of light with individual worries and rhythm. At NCS, the streams meet, growing calmer and stronger.

The website manifests this through:
- A single persistent 3D `<Canvas>` sitting behind responsive HTML sections.
- Scroll progress (0 to 1) synchronously drives camera trajectory, sky dome colors (slate-indigo storm -> lavender dusk -> peach-gold dawn), particle density, and weather.
- Dual-tier rendering: High/Medium/Low WebGL via Three.js/R3F, plus a zero-WebGL `LiteApp` for accessibility and low-power devices.

## 2. Directory Layout
```
D:/ncs website
├── _originals/         # Unmodified backups of initial scaffold & raw captions
├── docs/               # ASSUMPTIONS.md, TODO.md, CAPTIONS_REPORT.md, ARCHITECTURE.md
├── public/
│   ├── memories/       # Optimized photos (-1600.webp, -480.webp, .jpg)
│   ├── brand/          # Logo assets (SVG/PNG)
│   └── audio/          # Optional ambient audio
├── scripts/
│   ├── build-memories.mjs # Sharp image pipeline & manifest generator
│   └── check-content.mjs  # Verification script for TODOs, missing alts, and assets
├── src/
│   ├── app/            # App shell, ErrorBoundary, LiteApp fallback
│   ├── content/        # site.ts (facts & sectionRanges), memories.manifest.json, captions.json
│   ├── hooks/          # useQuality, useReducedMotion, useScrollProgress, useInView
│   ├── lib/            # math, texture, device, a11y utilities
│   ├── scene/          # SceneRoot, CameraRig, SkyDome, Ribbons, Orb, Weather, MemoryCorridor, Effects
│   ├── sections/       # Hero, About, Breathe, Mood, LetGo, Events, Memories, Team, Resources, Reach, Footer
│   ├── shaders/        # ribbons, sky, orb, rain, release shaders
│   ├── store/          # useStore.ts (Zustand)
│   └── ui/             # Nav, SupportPanel, CommandPalette, Loader, Lightbox, GlassCard, Reveal, etc.
└── netlify.toml        # Production headers, SPA redirects, cache policies
```

## 3. Scroll Synchronization
Lenis provides inertial smooth scrolling. On every frame:
1. Lenis updates scroll distance and fires `lenis.on('scroll')`.
2. Normalized progress (`0 <= p <= 1`) is updated in `useStore`.
3. In R3F components, `useFrame` reads scroll values from the Zustand store without triggering React component re-renders.
4. GSAP ScrollTrigger ticker is synchronized with Lenis.
5. DOM sections and the 3D CameraRig align to the exact same `sectionRanges` declared in `src/content/site.ts`.

## 4. Performance & Graceful Degradation
- **High:** Full particle volume, bloom, firefly custom cursor, dynamic lighting.
- **Medium:** 50% particle volume, bloom, reduced shadows.
- **Low:** 25% particle volume, no postprocessing, static sky dome.
- **Lite:** Zero WebGL. Pure CSS gradients, SVG streams, full semantic DOM parity.
- **Reduced Motion:** Camera snaps to section coordinates without flying; animations become simple fades.
