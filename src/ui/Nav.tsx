import React from 'react';
import { useStore } from '@/store/useStore';
import { Sun, Moon, Volume2, VolumeX, ShieldAlert, Command } from 'lucide-react';

export const Nav: React.FC = () => {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const sound = useStore((state) => state.sound);
  const toggleSound = useStore((state) => state.toggleSound);
  const toggleSupport = useStore((state) => state.toggleSupport);
  const togglePalette = useStore((state) => state.togglePalette);

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
        {/* Brand identity with official NCS logo */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal/50 rounded-lg p-1">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
            <img
              src="/brand/logo-white.png"
              alt="TEAM NCS Official Logo"
              className="w-full h-full object-contain drop-shadow group-hover:scale-105 transition-transform"
            />
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
