import React, { useState } from 'react';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { Sparkles, Send, CheckCircle2 } from 'lucide-react';

export const LetGo: React.FC = () => {
  const [worry, setWorry] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [released, setReleased] = useState(false);

  const handleRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!worry.trim()) return;

    setIsReleasing(true);
    setTimeout(() => {
      setIsReleasing(false);
      setReleased(true);
      setWorry('');
    }, 1200);
  };

  const handleAnother = () => {
    setReleased(false);
  };

  return (
    <section
      id="letgo"
      aria-label="Release a Worry"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 pointer-events-none"
    >
      <div className="max-w-xl mx-auto w-full text-center pointer-events-auto">
        <Reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel text-xs text-peach mb-3 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cathartic Release</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-3">
            Leave a worry behind.
          </h2>
          <p className="text-xs sm:text-sm text-lavender max-w-md mx-auto mb-10 leading-relaxed">
            Name whatever is weighing on your mind. This text never leaves your browser — as you release it, let yourself breathe out.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <GlassCard className="p-6 sm:p-8 relative">
            {!released ? (
              <form onSubmit={handleRelease} className="space-y-4">
                <div className="relative">
                  <textarea
                    rows={4}
                    value={worry}
                    onChange={(e) => setWorry(e.target.value)}
                    placeholder="E.g., I'm worried about upcoming midterms, or feeling like I haven't found my place yet..."
                    disabled={isReleasing}
                    className={`w-full rounded-2xl bg-black/20 border border-white/15 p-4 text-sm text-paper placeholder-lavender/40 outline-none focus:border-peach transition-all resize-none ${
                      isReleasing ? 'opacity-20 blur-sm scale-95 transition-all duration-1000' : ''
                    }`}
                  />
                  {isReleasing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-peach/80 border-t-transparent animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-lavender/60">
                    100% private · Never saved or stored
                  </span>
                  <button
                    type="submit"
                    disabled={!worry.trim() || isReleasing}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-royal to-peach hover:opacity-90 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2"
                  >
                    <span>Release into Light</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-peach/20 border border-peach flex items-center justify-center text-peach">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-paper">
                  It has dissolved into the stream.
                </h3>
                <p className="text-xs sm:text-sm text-lavender max-w-sm leading-relaxed">
                  You carried it, and now you have acknowledged it. Take one more gentle breath. You are capable of moving through this.
                </p>
                <button
                  onClick={handleAnother}
                  className="mt-4 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-paper font-medium transition-colors"
                >
                  Release another thought
                </button>
              </div>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
};
