import React from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { ArrowDown, Heart, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Hero: React.FC = () => {
  const toggleSupport = useStore((state) => state.toggleSupport);

  const scrollToNext = () => {
    const el = document.getElementById('about');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="The Confluence Hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-8 overflow-hidden pointer-events-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center pointer-events-auto">
        {/* Subtle top clearance for the 3D floating interactive logo */}
        <div className="w-full h-12 sm:h-16 flex items-center justify-center pointer-events-none" aria-hidden="true" />

        <Reveal delay={100}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-slate-900/10 text-xs font-semibold text-royal tracking-wide uppercase mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-royal" />
            <span>NIST Counselling Services · Student Support Team</span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-paper leading-[1.12] mb-5">
            United we stand, divided we fall.
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="max-w-2xl text-base sm:text-lg text-lavender font-light leading-relaxed mb-7">
            You don&apos;t have to figure it out alone. Every student arrives as a separate stream of light with individual worries and pace.
            At <strong className="font-semibold text-paper">TEAM NCS</strong>, our streams meet — creating a calmer, stronger community.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToNext}
              className="px-7 py-3 rounded-2xl bg-royal hover:bg-royal/90 text-white font-medium text-sm sm:text-base shadow-xl shadow-royal/30 hover:shadow-teal/20 transition-all flex items-center gap-2 border border-white/20 active:scale-95"
            >
              <span>Step into The Confluence</span>
              <ArrowDown className="w-4 h-4 text-teal animate-bounce" />
            </button>

            <button
              onClick={toggleSupport}
              className="px-6 py-3 rounded-2xl glass-panel hover:bg-white/15 text-paper font-medium text-sm sm:text-base transition-all flex items-center gap-2 border border-white/20 active:scale-95"
            >
              <Heart className="w-4 h-4 text-peach" />
              <span>Confidential Help</span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-8 flex items-center gap-2 text-xs text-lavender/60">
            <span>Scroll gently to begin the journey</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
