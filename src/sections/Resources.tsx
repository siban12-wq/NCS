import React from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { useStore } from '@/store/useStore';
import { BookOpen, CheckCircle2, GraduationCap, ArrowRight, Download, Sparkles } from 'lucide-react';

export const Resources: React.FC = () => {
  const navigateTo = useStore((state) => state.navigateTo);

  return (
    <section
      id="resources"
      aria-label="Peer Self-Care Guides & Academic Vault"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        {/* PYQ Vault Major Callout Banner */}
        <Reveal>
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-royal/30 bg-gradient-to-r from-royal/10 via-white/80 to-blue-50/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-royal text-white flex items-center justify-center shrink-0 shadow-md shadow-royal/30">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal/15 text-royal font-bold text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Official Exam Archive · 2021-2025
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-paper">
                  University PYQ & Midsem Question Vault
                </h3>
                <p className="text-xs sm:text-sm text-lavender max-w-xl leading-relaxed">
                  Access digitized semester question papers for Basic Electrical Engineering, C Programming, and core subjects with instant PDF downloads.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('pyqs')}
              className="shrink-0 px-6 py-3.5 rounded-2xl bg-royal hover:bg-royal/90 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-royal/25 transition-all active:scale-95 group"
            >
              <Download className="w-4 h-4" />
              <span>Open PYQ Vault</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </Reveal>

        {/* Section Heading for Self-Care Toolkit */}
        <div className="text-center max-w-3xl mx-auto">
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

        {/* 3 Toolkit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.resources.map((res, idx) => (
            <Reveal key={res.title} delay={idx * 150}>
              <GlassCard className="h-full flex flex-col justify-between p-6 sm:p-8 bg-white/75 border border-slate-900/10 hover:border-royal/30">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 text-[11px] font-semibold text-royal mb-4">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{res.category}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-paper mb-2">
                    {res.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-lavender mb-6 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {res.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2.5 text-xs text-paper/85 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-900/10 text-[11px] text-lavender/70">
                  Readily accessible peer advice · Team NCS
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
