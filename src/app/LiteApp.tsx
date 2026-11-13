import React from 'react';
import { Nav } from '@/ui/Nav';
import { SupportPanel } from '@/ui/SupportPanel';
import { CommandPalette } from '@/ui/CommandPalette';
import { Lightbox } from '@/ui/Lightbox';
import { ProgressRiver } from '@/ui/ProgressRiver';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Breathe } from '@/sections/Breathe';
import { Mood } from '@/sections/Mood';
import { LetGo } from '@/sections/LetGo';
import { Events } from '@/sections/Events';
import { Memories } from '@/sections/Memories';
import { Team } from '@/sections/Team';
import { Resources } from '@/sections/Resources';
import { Reach } from '@/sections/Reach';
import { Footer } from '@/sections/Footer';

export const LiteApp: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-indigo-900 text-paper overflow-x-hidden">
      {/* 2D Confluence Ambient Background Layer */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 opacity-60 bg-gradient-to-b from-indigo-900 via-indigo-700/80 to-peach/30 transition-all duration-1000"
      />

      {/* SVG Confluence Streams Ambient Decorative Curves */}
      <svg
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,100 C 300,300 700,100 1200,600 S 1600,900 2000,800"
          stroke="#5ED3C8"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 0,300 C 400,200 800,500 1300,400 S 1700,700 2000,600"
          stroke="#2340C8"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 0,600 C 500,700 900,400 1400,800 S 1800,500 2000,900"
          stroke="#FFC9A3"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Non-blocking Lite Mode notice badge */}
      <div className="fixed bottom-4 left-4 z-40 bg-black/60 border border-white/10 px-3 py-1.5 rounded-xl text-[11px] text-lavender flex items-center gap-2 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-teal" />
        <span>Lite 2D Accessible Mode</span>
      </div>

      {/* Main UI and Content */}
      <Nav />
      <ProgressRiver />

      <main className="relative z-10">
        <Hero />
        <About />
        <Breathe />
        <Mood />
        <LetGo />
        <Events />
        <Memories />
        <Team />
        <Resources />
        <Reach />
      </main>

      <Footer />

      {/* Overlays & Modals */}
      <SupportPanel />
      <CommandPalette />
      <Lightbox />
    </div>
  );
};
