import React, { useState } from 'react';
import { useStore, QualityOption } from '@/store/useStore';
import { Sun, Moon, Volume2, VolumeX, ShieldAlert, Command, Settings } from 'lucide-react';

export const Nav: React.FC = () => {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const sound = useStore((state) => state.sound);
  const toggleSound = useStore((state) => state.toggleSound);
  const quality = useStore((state) => state.quality);
  const qualityOverride = useStore((state) => state.qualityOverride);
  const setQualityOverride = useStore((state) => state.setQualityOverride);
  const toggleSupport = useStore((state) => state.toggleSupport);
  const togglePalette = useStore((state) => state.togglePalette);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Breathe', href: '#breathe' },
    { label: 'Events (Sangam)', href: '#events' },
    { label: 'Memories', href: '#memories' },
    { label: 'Resources', href: '#resources' },
    { label: 'Contact', href: '#reach' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-auto px-4 py-3 md:px-8 backdrop-blur-md bg-indigo-900/40 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal/50 rounded-lg p-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-royal via-teal to-peach flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white text-xs font-bold tracking-widest">NCS</span>
          </div>
          <div className="text-left">
            <span className="block font-display font-semibold text-lg leading-tight tracking-wide text-paper">
              TEAM NCS
            </span>
            <span className="hidden sm:block text-[11px] text-lavender tracking-wider uppercase font-medium">
              NIST Counselling Services
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-paper/85">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-teal transition-colors py-1 relative focus:outline-none focus:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Support Trigger */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Palette Trigger */}
          <button
            onClick={togglePalette}
            aria-label="Open Command Menu (Ctrl+K)"
            className="p-2 rounded-xl glass-panel hover:bg-white/15 text-paper transition-all text-xs hidden sm:flex items-center gap-1.5"
            title="Command Menu (Ctrl+K)"
          >
            <Command className="w-4 h-4 text-teal" />
            <kbd className="bg-black/30 px-1.5 py-0.5 rounded text-[10px] text-lavender font-mono">⌘K</kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl glass-panel hover:bg-white/15 text-paper transition-all"
            title={`Current theme: ${theme}`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-gold hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-700" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={sound ? 'Mute ambient audio' : 'Play ambient audio'}
            className="p-2 rounded-xl glass-panel hover:bg-white/15 text-paper transition-all"
            title={sound ? 'Sound enabled' : 'Sound muted'}
          >
            {sound ? (
              <Volume2 className="w-4 h-4 text-teal animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-paper/50" />
            )}
          </button>

          {/* Quality Tier Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              aria-label="Graphics Quality Settings"
              className="p-2 rounded-xl glass-panel hover:bg-white/15 text-paper transition-all flex items-center gap-1 text-xs"
              title={`Mode: ${qualityOverride} (${quality})`}
            >
              <Settings className="w-4 h-4 text-lavender" />
              <span className="hidden xl:inline uppercase text-[10px] text-teal font-semibold">{quality}</span>
            </button>

            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel bg-indigo-900/90 shadow-2xl p-2 z-50 text-xs text-paper flex flex-col gap-1">
                <div className="px-2 py-1 text-[11px] text-lavender/80 border-b border-white/10 font-semibold">
                  Graphics Quality
                </div>
                {(['auto', 'high', 'low', 'lite'] as QualityOption[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => {
                      setQualityOverride(tier);
                      setSettingsOpen(false);
                    }}
                    className={`text-left px-3 py-1.5 rounded-lg capitalize transition-colors flex items-center justify-between ${
                      qualityOverride === tier
                        ? 'bg-royal text-white font-bold'
                        : 'hover:bg-white/10 text-paper/80'
                    }`}
                  >
                    <span>{tier}</span>
                    {qualityOverride === tier && <span className="text-[10px]">●</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Urgent Support Button */}
          <button
            onClick={toggleSupport}
            className="bg-gradient-to-r from-royal to-indigo-700 hover:from-royal hover:to-teal text-white font-medium text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-lg shadow-royal/20 transition-all flex items-center gap-1.5 border border-white/20 active:scale-95"
          >
            <ShieldAlert className="w-4 h-4 text-peach" />
            <span>Need Support?</span>
          </button>
        </div>
      </div>
    </header>
  );
};
