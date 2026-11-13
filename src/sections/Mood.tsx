import React from 'react';
import { useStore, MoodWeather } from '@/store/useStore';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { CloudRain, CloudFog, SunMedium, Sunset } from 'lucide-react';

export const Mood: React.FC = () => {
  const moodWeather = useStore((state) => state.moodWeather);
  const setMoodWeather = useStore((state) => state.setMoodWeather);

  const moods: { id: MoodWeather; label: string; sub: string; icon: React.FC<{ className?: string }> }[] = [
    {
      id: 'overwhelmed',
      label: 'Overwhelmed',
      sub: 'Carrying too much at once. Soft rain and steady quiet.',
      icon: CloudRain,
    },
    {
      id: 'foggy',
      label: 'Foggy & Uncertain',
      sub: 'Thoughts feel scattered. Gentle mist to slow down the rush.',
      icon: CloudFog,
    },
    {
      id: 'hopeful',
      label: 'Quietly Hopeful',
      sub: 'Looking for direction. Fresh breeze and morning clearing.',
      icon: SunMedium,
    },
    {
      id: 'calm',
      label: 'Grounded & Calm',
      sub: 'Ready to share space and listen. Warm golden dusk.',
      icon: Sunset,
    },
  ];

  return (
    <section
      id="mood"
      aria-label="Mood Check-in Station"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto w-full text-center pointer-events-auto">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-teal font-bold block mb-2">
            Weather Station
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-3">
            How are you arriving today?
          </h2>
          <p className="text-xs sm:text-sm text-lavender max-w-lg mx-auto mb-12 leading-relaxed">
            There is no wrong way to show up. Choose what fits your mood right now, and watch the 3D sky respond around you.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {moods.map((m, idx) => {
            const Icon = m.icon;
            const isSelected = moodWeather === m.id;
            return (
              <Reveal key={m.id} delay={idx * 100}>
                <button
                  type="button"
                  onClick={() => setMoodWeather(m.id)}
                  className={`w-full text-left transition-all duration-300 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-teal/50 ${
                    isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                  }`}
                >
                  <GlassCard
                    className={`h-full flex flex-col justify-between border transition-all ${
                      isSelected
                        ? 'border-teal bg-teal/10 shadow-[0_0_24px_rgba(94,211,200,0.25)]'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                          isSelected ? 'bg-teal text-indigo-900' : 'bg-white/10 text-teal group-hover:bg-white/20'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-paper mb-1">
                        {m.label}
                      </h3>
                      <p className="text-xs text-lavender/80 leading-relaxed">
                        {m.sub}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className={isSelected ? 'text-teal font-bold' : 'text-lavender/50'}>
                        {isSelected ? 'Current Sky' : 'Shift Atmosphere'}
                      </span>
                      {isSelected && <span className="text-teal font-bold">●</span>}
                    </div>
                  </GlassCard>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
