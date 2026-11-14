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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 overflow-hidden pointer-events-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center pointer-events-auto">
        <Reveal delay={50}>
          <div className="relative mb-4 flex items-center justify-center">
            <div className="absolute -inset-3 rounded-full bg-teal/25 blur-xl animate-pulse" />
            <img
              src="/brand/logo-white.png"
              alt="TEAM NCS Heart Emblem"
              className="relative w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_24px_rgba(94,211,200,0.45)] transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-white/20 text-xs font-semibold text-teal tracking-wide uppercase mb-6 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>NIST Counselling Services · Student Support Team</span>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-paper leading-[1.1] mb-6">
            United we stand, divided we fall.
          </h1>
        </Reveal>

        <Reveal delay={400}>
          <p className="max-w-2xl text-base sm:text-xl text-lavender font-light leading-relaxed mb-8">
            You don&apos;t have to figure it out alone. Every student arrives as a separate stream of light with individual worries and pace.
            At <strong className="font-semibold text-paper">TEAM NCS</strong>, our streams meet — creating a calmer, stronger community.
          </p>
        </Reveal>

        <Reveal delay={550}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToNext}
              className="px-7 py-3.5 rounded-2xl bg-royal hover:bg-royal/90 text-white font-medium text-sm sm:text-base shadow-xl shadow-royal/30 hover:shadow-teal/20 transition-all flex items-center gap-2 border border-white/20 active:scale-95"
            >
              <span>Step into The Confluence</span>
              <ArrowDown className="w-4 h-4 text-teal animate-bounce" />
            </button>

            <button
              onClick={toggleSupport}
              className="px-6 py-3.5 rounded-2xl glass-panel hover:bg-white/15 text-paper font-medium text-sm sm:text-base transition-all flex items-center gap-2 border border-white/20 active:scale-95"
            >
              <Heart className="w-4 h-4 text-peach" />
              <span>Confidential Help</span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={700}>
          <div className="mt-14 flex items-center gap-2 text-xs text-lavender/60">
            <span>Scroll gently to begin the journey</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
