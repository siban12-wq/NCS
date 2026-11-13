import React, { useState, useEffect } from 'react';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

export const Breathe: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Change phase: 4s inhale -> 7s hold -> 8s exhale
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 7;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 8;
          } else {
            setPhase('Inhale');
            return 4;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCounter(4);
  };

  const getPhaseColor = () => {
    if (phase === 'Inhale') return 'from-teal to-royal text-teal border-teal/40';
    if (phase === 'Hold') return 'from-lavender to-royal text-lavender border-lavender/40';
    return 'from-peach to-gold text-peach border-peach/40';
  };

  return (
    <section
      id="breathe"
      aria-label="Interactive Breathing Exercise"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 pointer-events-none"
    >
      <div className="max-w-2xl mx-auto w-full text-center pointer-events-auto">
        <Reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel text-xs text-teal mb-3 font-semibold uppercase tracking-wider">
            <Wind className="w-3.5 h-3.5" />
            <span>Interactive Reset</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-3">
            Pause. Take a deep breath.
          </h2>
          <p className="text-xs sm:text-sm text-lavender max-w-md mx-auto mb-10 leading-relaxed">
            The 4-7-8 breathing rhythm activates your parasympathetic nervous system, easing tension and lowering rapid heart rates.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <GlassCard className="p-8 sm:p-12 flex flex-col items-center justify-center relative">
            {/* Visual breathing orb container */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center mb-8">
              {/* Outer pulsing ring */}
              <div
                className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                  isActive
                    ? phase === 'Inhale'
                      ? 'scale-110 border-teal/60 animate-pulse'
                      : phase === 'Hold'
                      ? 'scale-110 border-lavender/60'
                      : 'scale-90 border-peach/40'
                    : 'scale-95 border-white/20'
                }`}
              />

              {/* Core Breathing Sphere */}
              <div
                className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr ${getPhaseColor()} shadow-2xl flex flex-col items-center justify-center transition-all duration-1000 ${
                  isActive
                    ? phase === 'Inhale'
                      ? 'scale-105 shadow-[0_0_36px_#5ED3C8]'
                      : phase === 'Hold'
                      ? 'scale-105 shadow-[0_0_36px_#B9A7F5]'
                      : 'scale-90 shadow-[0_0_24px_#FFC9A3]'
                    : 'scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                }`}
              >
                <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {isActive ? phase : 'Ready'}
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  {isActive ? counter : '4-7-8'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsActive(!isActive)}
                className="px-6 py-2.5 rounded-xl bg-royal hover:bg-royal/90 text-white text-sm font-semibold transition-all shadow-lg flex items-center gap-2 border border-white/20 active:scale-95"
              >
                {isActive ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Begin Breathing</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                aria-label="Reset timer"
                className="p-2.5 rounded-xl glass-panel hover:bg-white/10 text-paper transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
};
