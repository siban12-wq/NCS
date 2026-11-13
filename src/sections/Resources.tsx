import React from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export const Resources: React.FC = () => {
  return (
    <section
      id="resources"
      aria-label="Peer Self-Care Guides"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-teal font-bold block mb-2">
              Everyday Toolkit
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-4">
              Grounding tools for high-pressure days.
            </h2>
            <p className="text-sm sm:text-base text-lavender leading-relaxed">
              Tested strategies designed by and for college students navigating heavy semesters, deadlines, and hostel adjustments.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.resources.map((res, idx) => (
            <Reveal key={res.title} delay={idx * 150}>
              <GlassCard className="h-full flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-teal mb-4">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{res.category}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-paper mb-2">
                    {res.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-lavender/90 mb-6 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {res.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2.5 text-xs text-paper/85 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-peach shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-lavender/60">
                  Readily accessible peer advice
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
