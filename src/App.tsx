import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';
import { useQuality } from '@/hooks/useQuality';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { sectionRanges } from '@/content/site';

// UI components
import { Nav } from '@/ui/Nav';
import { SupportPanel } from '@/ui/SupportPanel';
import { CommandPalette } from '@/ui/CommandPalette';
import { Lightbox } from '@/ui/Lightbox';
import { Loader } from '@/ui/Loader';
import { Cursor } from '@/ui/Cursor';
import { ProgressRiver } from '@/ui/ProgressRiver';

// HTML Sections
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Mood } from '@/sections/Mood';
import { LetGo } from '@/sections/LetGo';
import { Events } from '@/sections/Events';
import { Memories } from '@/sections/Memories';
import { Team } from '@/sections/Team';
import { Resources } from '@/sections/Resources';
import { Reach } from '@/sections/Reach';
import { Footer } from '@/sections/Footer';

// Dedicated Standalone Pages
import { MembersPage } from '@/pages/MembersPage';
import { PyqPage } from '@/pages/PyqPage';

// Fallback & Error Handling
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { LiteApp } from '@/app/LiteApp';

// Lazy load 3D WebGL scene so HTML and text paint first
const SceneRoot = lazy(() => import('@/scene/SceneRoot'));

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const { quality } = useQuality();
  useReducedMotion();

  const setScroll = useStore((state) => state.setScroll);
  const setActiveSection = useStore((state) => state.setActiveSection);

  // Lenis Smooth Scroll Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', (e: { progress: number }) => {
      setScroll(e.progress);

      // Determine active section from ranges
      for (const range of sectionRanges) {
        if (e.progress >= range.start && e.progress <= range.end) {
          setActiveSection(range.id);
          break;
        }
      }

      ScrollTrigger.update();
    });

    // GSAP ticker sync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [setScroll, setActiveSection]);

  const currentPage = useStore((state) => state.currentPage);

  // If user or device selected Lite mode, switch completely to 2D LiteApp
  if (quality === 'lite') {
    return <LiteApp />;
  }

  // If user is on the dedicated Members Directory Page (different page, not in scroll)
  if (currentPage === 'members') {
    return (
      <div className="relative min-h-screen text-paper overflow-x-hidden selection:bg-teal selection:text-indigo-900">
        <MembersPage />
        <SupportPanel />
        <CommandPalette />
      </div>
    );
  }

  // If user is on the dedicated PYQ & Midsem Vault Page (different page, not in scroll)
  if (currentPage === 'pyqs') {
    return (
      <div className="relative min-h-screen text-paper overflow-x-hidden selection:bg-teal selection:text-indigo-900">
        <PyqPage />
        <SupportPanel />
        <CommandPalette />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-paper overflow-x-hidden selection:bg-teal selection:text-indigo-900">
      {/* 2-3% Opacity SVG Noise Overlay */}
      <div className="noise-overlay" />

      {/* Persistent 3D WebGL Canvas */}
      <ErrorBoundary fallback={<div className="fixed inset-0 bg-indigo-900/90" />}>
        <Suspense fallback={null}>
          <SceneRoot />
        </Suspense>
      </ErrorBoundary>

      {/* Floating UI Elements */}
      <Nav />
      <ProgressRiver />
      <Cursor />
      <Loader />

      {/* Semantic DOM Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Mood />
        <LetGo />
        <Events />
        <Memories />
        <Team />
        <Resources />
        <Reach />
      </main>

      <Footer />

      {/* Modals & Dialogs */}
      <SupportPanel />
      <CommandPalette />
      <Lightbox />
    </div>
  );
};

export default App;
