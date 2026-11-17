import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import {
  BookOpen,
  Building2,
  HeartHandshake,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

interface SupportArea {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: React.FC<{ className?: string }>;
  accentColor: string;
}

export const Mood: React.FC = () => {
  const toggleSupport = useStore((state) => state.toggleSupport);
  const navigateTo = useStore((state) => state.navigateTo);
  const [activeArea, setActiveArea] = useState<string>('academic');

  const areas: SupportArea[] = [
    {
      id: 'academic',
      badge: 'Academics & Exams',
      title: 'Exam & Academic Pressure',
      tagline: 'Syllabus backlog, midsem stress & study planning',
      description:
        'Struggling with complex course subjects, upcoming exams, or maintaining CGPA? Connect with senior guides who have walked your path and access our curated PYQ archives.',
      highlights: ['Midsem & Endsem PYQ Papers', '3rd-Year Guide Mentoring', 'Time & Stress Management'],
      icon: BookOpen,
      accentColor: 'royal',
    },
    {
      id: 'hostel',
      badge: 'Campus Living',
      title: 'Hostel & Campus Adaptation',
      tagline: 'Adjusting to college life away from home',
      description:
        'Moving into campus hostels, managing mess routines, or experiencing homesickness can feel disorienting. Our coordinators help freshers settle in comfortably.',
      highlights: ['Fresher Orientation (Sangam)', 'Roommate & Routine Harmony', 'Campus Buddy System'],
      icon: Building2,
      accentColor: 'teal',
    },
    {
      id: 'emotional',
      badge: 'Mental Wellness',
      title: 'Emotional Well-Being',
      tagline: 'Anxiety, burnout, self-doubt & staying grounded',
      description:
        'When college life feels heavy or anxious thoughts keep you awake, having someone who listens empathetically makes all the difference. No judgment, ever.',
      highlights: ['Active Empathic Listening', 'De-escalation & Grounding', 'Mental Health First Aid'],
      icon: HeartHandshake,
      accentColor: 'indigo',
    },
    {
      id: 'confidential',
      badge: 'Private & Safe',
      title: '1-on-1 Confidential Guidance',
      tagline: 'Direct, private conversations at Room ATR 303',
      description:
        'Need a completely private space to share what is on your mind? Visit our faculty advisor Asst. Prof. Minakshi Dash or request a private peer session in ATR 303.',
      highlights: ['Strict Confidentiality Protocol', 'Faculty Club Advisor Access', '24/7 Helpline Link'],
      icon: ShieldAlert,
      accentColor: 'peach',
    },
  ];

  const currentArea = areas.find((a) => a.id === activeArea) || areas[0];

  return (
    <section
      id="support-areas"
      aria-label="Student Support Pillars"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-royal/20 text-xs font-bold text-royal uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-royal" />
              <span>Campus Wellness Pillars · Team NCS</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper tracking-tight">
              Whatever You Are Facing, You Are Not Alone.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-xs sm:text-base text-lavender max-w-xl mx-auto leading-relaxed">
              From tough semester exams to personal hurdles, Team NCS is here to guide, listen, and support you every step of your journey at NIST.
            </p>
          </Reveal>
        </div>

        {/* 4 Interactive Support Pillars (Replacing the Old Weather Station Row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area, idx) => {
            const Icon = area.icon;
            const isSelected = activeArea === area.id;

            return (
              <Reveal key={area.id} delay={idx * 80}>
                <button
                  type="button"
                  onClick={() => setActiveArea(area.id)}
                  className={`w-full text-left transition-all duration-300 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-royal/40 ${
                    isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                  }`}
                >
                  <GlassCard
                    className={`h-full flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-royal bg-white/95 shadow-xl shadow-royal/15 ring-2 ring-royal/20'
                        : 'border-slate-900/10 hover:border-royal/30 bg-white/70'
                    }`}
                  >
                    <div>
                      {/* Top icon and badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
                            isSelected
                              ? 'bg-royal text-white shadow-royal/30'
                              : 'bg-royal/10 text-royal group-hover:bg-royal/15'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isSelected
                              ? 'bg-royal/10 text-royal'
                              : 'bg-slate-900/5 text-lavender'
                          }`}
                        >
                          {area.badge}
                        </span>
                      </div>

                      <h3 className="font-display text-base font-bold text-paper mb-1 group-hover:text-royal transition-colors">
                        {area.title}
                      </h3>

                      <p className="text-xs text-lavender leading-relaxed">
                        {area.tagline}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-900/10 flex items-center justify-between text-xs font-semibold">
                      <span className={isSelected ? 'text-royal' : 'text-lavender/70'}>
                        {isSelected ? 'Active Focus' : 'Learn More'}
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? 'text-royal translate-x-1' : 'text-lavender/50'
                        }`}
                      />
                    </div>
                  </GlassCard>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Selected Area Deep Dive Detail Banner */}
        <Reveal delay={350}>
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-royal/20 bg-gradient-to-br from-white/90 via-blue-50/40 to-white/90 shadow-lg space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>How Team NCS Supports You in: {currentArea.title}</span>
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-paper">
                  {currentArea.tagline}
                </h4>
                <p className="text-xs sm:text-sm text-lavender max-w-2xl leading-relaxed">
                  {currentArea.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {currentArea.id === 'academic' && (
                  <button
                    onClick={() => navigateTo('pyqs')}
                    className="px-4 py-2.5 rounded-xl bg-royal text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-royal/20 hover:bg-royal/90 active:scale-95 transition-all"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Open PYQ Vault</span>
                  </button>
                )}

                <button
                  onClick={toggleSupport}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-900/10 hover:border-royal/40 text-royal font-semibold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <ShieldAlert className="w-4 h-4 text-peach" />
                  <span>Get Confidential Help</span>
                </button>
              </div>
            </div>

            {/* Feature Highlights Pills */}
            <div className="pt-3 border-t border-slate-900/10 flex flex-wrap items-center gap-3">
              {currentArea.highlights.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-paper/85 bg-white/70 px-3 py-1 rounded-lg border border-slate-900/5 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
