import React from 'react';
import { useStore } from '@/store/useStore';
import { sectionRanges } from '@/content/site';

export const ProgressRiver: React.FC = () => {
  const scroll = useStore((state) => state.scroll);
  const activeSection = useStore((state) => state.activeSection);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Confluence Scroll River"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 pointer-events-auto"
    >
      <div className="relative w-1.5 h-48 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-teal via-lavender to-peach rounded-full transition-all duration-150"
          style={{ height: `${Math.min(100, Math.max(0, scroll * 100))}%` }}
        />
      </div>

      <div className="flex flex-col gap-2.5 mt-2">
        {sectionRanges.map((range) => {
          const isActive = activeSection === range.id;
          return (
            <button
              key={range.id}
              onClick={() => scrollToSection(range.id)}
              title={range.name}
              aria-label={range.name}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-teal scale-150 shadow-[0_0_8px_#5ED3C8]'
                  : 'bg-white/30 hover:bg-white/60 scale-100'
              }`}
            />
          );
        })}
      </div>
    </aside>
  );
};
