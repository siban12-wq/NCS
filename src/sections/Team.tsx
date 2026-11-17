import React from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { useStore } from '@/store/useStore';
import {
  MapPin,
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';

export const Team: React.FC = () => {
  const navigateTo = useStore((state) => state.navigateTo);
  const { guides, coordinators, trainees } = siteConfig.members;

  return (
    <section
      id="team"
      aria-label="The Team in Royal Blue"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-royal font-bold block mb-2">
              Our Identity &amp; Leadership
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-4">
              Students supporting students in royal blue.
            </h2>
            <p className="text-sm sm:text-base text-lavender leading-relaxed">
              {siteConfig.teamIdentity.description}
            </p>
          </Reveal>
        </div>

        {/* Leadership & Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Club Advisor Highlight */}
          <Reveal delay={100}>
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-royal/30 bg-gradient-to-br from-royal/10 via-white/60 to-blue-50/40 flex items-start gap-4 h-full shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-royal text-white flex items-center justify-center shrink-0 shadow-md shadow-royal/30">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal/15 text-royal font-bold text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Club Advisor
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-paper">
                  {siteConfig.advisor.name}
                </h3>
                <p className="text-xs text-lavender font-medium">
                  {siteConfig.advisor.designation} · {siteConfig.advisor.department}
                </p>
                <div className="pt-2 text-xs text-lavender/90 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-royal shrink-0" />
                  <span>Office: <strong>{siteConfig.contact.officeLocation}</strong></span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Campus Location Card */}
          <Reveal delay={150}>
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-teal/30 bg-gradient-to-br from-teal/10 via-white/60 to-emerald-50/40 flex items-start gap-4 h-full shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0 shadow-md shadow-teal/30">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal/20 text-teal-800 dark:text-teal font-bold text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  On-Campus Headquarters
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-paper">
                  {siteConfig.contact.officeLocation}
                </h3>
                <p className="text-xs text-lavender leading-relaxed">
                  Walk-in peer support, student mentoring, and confidential guidance. Spot our team members wearing signature royal-blue polo shirts.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3 Wings Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal delay={200}>
            <GlassCard className="p-6 rounded-3xl h-full flex flex-col justify-between border border-slate-900/10 dark:border-white/10">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-royal/15 text-royal flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-paper">
                  Student Guides
                </h4>
                <p className="text-xs text-lavender leading-relaxed">
                  3rd-year peer mentors across AIML, CSE, ECE, DS, and BCA trained to guide junior batches through academic and campus hurdles.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/10 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-royal">{guides.length} Active Guides</span>
                <span className="text-[11px] text-lavender">3rd Year</span>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={250}>
            <GlassCard className="p-6 rounded-3xl h-full flex flex-col justify-between border border-slate-900/10 dark:border-white/10">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal/20 text-teal-800 dark:text-teal flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-paper">
                  Event Coordinators
                </h4>
                <p className="text-xs text-lavender leading-relaxed">
                  The student coordination force organizing flagship initiatives like SANGAM, PTM orientations, and mental wellness workshops.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/10 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 dark:text-teal">{coordinators.length} Coordinators</span>
                <span className="text-[11px] text-lavender">Core Operations</span>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={300}>
            <GlassCard className="p-6 rounded-3xl h-full flex flex-col justify-between border border-slate-900/10 dark:border-white/10">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-white/10 text-indigo-700 dark:text-lavender flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-paper">
                  Trainees 2026
                </h4>
                <p className="text-xs text-lavender leading-relaxed">
                  Incoming peer support trainees developing skills under faculty guidance to foster active listening and empathetic dialogue.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/10 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-lavender">{trainees.length} Trainees</span>
                <span className="text-[11px] text-lavender">2026 Intake</span>
              </div>
            </GlassCard>
          </Reveal>
        </div>

        {/* Dedicated Members Page Navigation Banner */}
        <Reveal delay={350}>
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-royal/30 bg-gradient-to-r from-royal/15 via-white/50 to-blue-50/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-royal">
                Official Roster 2026
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-paper">
                Explore the Complete Members Directory
              </h3>
              <p className="text-xs sm:text-sm text-lavender max-w-xl">
                Browse all 66 team members, filter by guides, coordinators, trainees, or branches on our dedicated directory page.
              </p>
            </div>

            <button
              onClick={() => navigateTo('members')}
              className="shrink-0 px-7 py-3.5 rounded-2xl bg-royal hover:bg-royal/90 text-white font-bold text-sm shadow-xl shadow-royal/30 hover:shadow-royal/50 transition-all flex items-center gap-2 active:scale-95 group cursor-pointer"
            >
              <span>View Members Page (66)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
