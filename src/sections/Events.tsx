import React from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { Calendar, Clock, Users, Sparkles, CheckCircle } from 'lucide-react';

export const Events: React.FC = () => {
  return (
    <section
      id="events"
      aria-label="Flagship Events and Campus Support"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-teal font-bold block mb-2">
              Campus Gatherings
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-4">
              Where streams meet and connections begin.
            </h2>
            <p className="text-sm sm:text-base text-lavender leading-relaxed">
              From flagship orientations like SANGAM to annual parent-teacher coordination, TEAM NCS creates warm spaces for mutual growth.
            </p>
          </Reveal>
        </div>

        <div className="space-y-8">
          {siteConfig.events.map((ev, idx) => (
            <Reveal key={ev.id} delay={idx * 150}>
              <GlassCard className="p-6 sm:p-10 border border-white/15">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/40 border border-royal text-teal text-xs font-semibold mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{ev.highlightTag}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-4xl font-bold text-paper mb-1">
                      {ev.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-peach font-medium">
                      {ev.tagline}
                    </p>
                  </div>

                  {/* Event Badges */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-lavender">
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                      <Calendar className="w-4 h-4 text-teal" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                      <Clock className="w-4 h-4 text-gold" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                      <Users className="w-4 h-4 text-peach" />
                      <span>{ev.participants}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-paper/85 leading-relaxed mb-6">
                  {ev.summary}
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-lavender leading-relaxed">
                    <strong>Outcome:</strong> {ev.closing}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
