import React, { useState, useRef, useEffect } from 'react';
import { useStore, QualityOption } from '@/store/useStore';
import { Volume2, VolumeX, ShieldAlert, Command, Settings, Check, Sparkles } from 'lucide-react';

export const Nav: React.FC = () => {
  const sound = useStore((state) => state.sound);
  const toggleSound = useStore((state) => state.toggleSound);
  const quality = useStore((state) => state.quality);
  const qualityOverride = useStore((state) => state.qualityOverride);
  const setQuality = useStore((state) => state.setQuality);
  const setQualityOverride = useStore((state) => state.setQualityOverride);
  const toggleSupport = useStore((state) => state.toggleSupport);
  const togglePalette = useStore((state) => state.togglePalette);
  const navigateTo = useStore((state) => state.navigateTo);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };
    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Events (Sangam)', href: '#events' },
    { label: 'Memories', href: '#memories' },
    { label: 'Members', href: '/members', isPage: true },
    { label: 'Resources', href: '#resources' },
    { label: 'Contact', href: '#reach' },
  ];

  const graphicsOptions: {
    id: QualityOption;
    label: string;
    desc: string;
    badge: string;
  }[] = [
      {
        id: 'high',
        label: 'High Quality',
        desc: 'Full 3D bloom, depth of field & rich particles',
        badge: 'High',
      },
      {
        id: 'medium',
        label: 'Medium Quality',
        desc: 'Balanced 60 FPS & visual effects',
        badge: 'Med',
      },
      {
        id: 'low',
        label: 'Low Quality',
        desc: 'Maximum performance, smooth & battery-friendly',
        badge: 'Low',
      },
      {
        id: 'auto',
        label: 'Auto (Device Detect)',
        desc: 'Automatically adjusts to your phone or PC hardware',
        badge: 'Auto',
      },
    ];

  const currentBadge = qualityOverride === 'auto' ? `Auto (${quality.toUpperCase()})` : qualityOverride.toUpperCase();

  const handleSelectQuality = (option: QualityOption) => {
    setQualityOverride(option);
    if (option !== 'auto') {
      setQuality(option);
    }
    setSettingsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-auto px-4 py-3 md:px-8 backdrop-blur-md bg-white/85 border-b border-slate-900/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand identity with official NCS logo */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal/50 rounded-lg p-1">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
            <img
              src="/brand/logo.png"
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
          {navLinks.map((link) =>
            link.isPage ? (
              <button
                key={link.label}
                onClick={() => navigateTo('members')}
                className="hover:text-teal transition-colors py-1 relative focus:outline-none focus:underline cursor-pointer"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-teal transition-colors py-1 relative focus:outline-none focus:underline"
              >
                {link.label}
              </a>
            )
          )}
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

          {/* Graphics Quality Settings Controls */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              aria-label="Graphics Quality Settings"
              className="p-2 rounded-xl glass-panel hover:bg-white/15 text-paper transition-all flex items-center gap-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal/50"
              title={`Graphics Quality: ${currentBadge}`}
            >
              <Settings className="w-4 h-4 text-lavender group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline uppercase text-[10px] text-teal font-semibold tracking-wider">
                {currentBadge}
              </span>
            </button>

            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl glass-panel bg-white/95 shadow-2xl p-2.5 z-50 text-xs text-paper flex flex-col gap-1 border border-slate-900/10 backdrop-blur-xl animate-fade-in">
                <div className="px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                  <span className="font-semibold text-paper text-[12px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal" />
                    Graphics Settings
                  </span>
                  <span className="text-[10px] text-lavender bg-white/10 px-2 py-0.5 rounded-full font-mono">
                    Active: {quality.toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  {graphicsOptions.map((opt) => {
                    const isSelected = qualityOverride === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectQuality(opt.id)}
                        className={`text-left px-3 py-2 rounded-xl transition-all flex items-start justify-between gap-2 ${isSelected
                            ? 'bg-royal text-white font-medium shadow-md shadow-royal/30'
                            : 'hover:bg-white/10 text-paper/85'
                          }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-[12px] font-semibold flex items-center gap-1.5">
                            {opt.label}
                            {opt.id === 'medium' && (
                              <span className="text-[9px] bg-teal/20 text-teal px-1.5 py-0.2 rounded font-normal">
                                Phone Ready
                              </span>
                            )}
                          </span>
                          <span className={`text-[10px] leading-tight mt-0.5 ${isSelected ? 'text-white/80' : 'text-lavender/70'}`}>
                            {opt.desc}
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
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
