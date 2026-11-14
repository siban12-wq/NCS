import React from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const Team: React.FC = () => {
  return (
    <section
      id="team"
      aria-label="The Team in Royal Blue"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-royal font-bold block mb-2 text-peach">
              Our Identity
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-4">
              Students supporting students in royal blue.
            </h2>
            <p className="text-sm sm:text-base text-lavender leading-relaxed">
              {siteConfig.teamIdentity.description}
            </p>
          </Reveal>
        </div>

        {/* Visual Callout for the Royal Blue Polo */}
        <Reveal delay={150}>
          <div className="mb-12 glass-panel p-6 sm:p-8 rounded-3xl border border-royal/40 bg-gradient-to-r from-royal/30 via-indigo-900/60 to-royal/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-royal border border-white/20 flex items-center justify-center p-2.5 shadow-xl shadow-royal/40">
                <img
                  src="/brand/logo-white.png"
                  alt="TEAM NCS Royal Blue Polo Emblem"
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-paper">
                  Look for the Royal Blue Polos &amp; Lanyards
                </h3>
                <p className="text-xs sm:text-sm text-lavender mt-1">
                  At campus events, parent orientations, or around academic blocks, you can spot TEAM NCS volunteers readily available to guide and listen.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-paper border border-white/20">
                <ShieldCheck className="w-4 h-4 text-teal" />
                Active Student Roster 2026
              </span>
            </div>
          </div>
        </Reveal>

        {/* Team Wings & Roster Placeholders (Operating Rule 4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.teamRoster.map((wing, idx) => (
            <Reveal key={wing.role} delay={idx * 150}>
              <GlassCard className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-teal flex items-center justify-center mb-4">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-paper mb-2">
                    {wing.role}
                  </h4>
                  <p className="text-xs text-lavender mb-6 leading-relaxed">
                    {wing.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal block mb-1">
                    Team Members
                  </span>
                  {wing.members.map((member, mIdx) => (
                    <div
                      key={mIdx}
                      className="text-xs py-1.5 px-3 rounded-lg bg-black/20 border border-white/5 text-paper/90 font-mono"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
