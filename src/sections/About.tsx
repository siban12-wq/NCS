import React from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { Users2, Compass, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About TEAM NCS"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-teal font-bold block mb-2">
              Who We Are
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-4">
              A peer bridge to wellness and belonging.
            </h2>
            <p className="text-sm sm:text-base text-lavender leading-relaxed">
              {siteConfig.mission}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal delay={150}>
            <GlassCard className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-royal/30 border border-royal flex items-center justify-center text-teal mb-5">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-paper mb-2">
                  Demystifying Counselling
                </h3>
                <p className="text-xs sm:text-sm text-lavender/90 leading-relaxed">
                  Counselling is not a last resort for crisis; it is everyday mental health care. We help break the hesitation so reaching out feels as ordinary as asking a friend for notes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-teal font-medium">
                Safe &amp; Stigma-Free Space
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={300}>
            <GlassCard className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-royal/30 border border-royal flex items-center justify-center text-peach mb-5">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-paper mb-2">
                  Peer-to-Peer Connection
                </h3>
                <p className="text-xs sm:text-sm text-lavender/90 leading-relaxed">
                  We are fellow NIST students walking the same campus paths, preparing for the same exam weeks, and sharing the same hostel stories. We listen with genuine empathy.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-peach font-medium">
                Student-Driven Initiatives
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={450}>
            <GlassCard className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-royal/30 border border-royal flex items-center justify-center text-gold mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-paper mb-2">
                  Academic Stress Relief
                </h3>
                <p className="text-xs sm:text-sm text-lavender/90 leading-relaxed">
                  Through flagship interactive gatherings like SANGAM, orientations, and daily peer guidance, we equip students with practical coping skills to thrive through challenges.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-gold font-medium">
                Continuous Campus Support
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
