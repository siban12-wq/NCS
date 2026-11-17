import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Search, Sparkles, Smile, Heart, Image, Users, BookOpen, MessageCircle, X } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const paletteOpen = useStore((state) => state.paletteOpen);
  const setPaletteOpen = useStore((state) => state.setPaletteOpen);
  const toggleSupport = useStore((state) => state.toggleSupport);
  const navigateTo = useStore((state) => state.navigateTo);
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
      if (e.key === 'Escape' && paletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paletteOpen, setPaletteOpen]);

  if (!paletteOpen) return null;

  const commands = [
    { id: 'hero', title: 'Top / The Confluence', icon: Sparkles, section: '#hero' },
    { id: 'pyqs', title: 'PYQ Vault (BEE, C Programming Question Papers)', icon: BookOpen, section: '/pyqs' },
    { id: 'support-areas', title: 'Four Cornerstones of Support', icon: Smile, section: '#support-areas' },
    { id: 'letgo', title: 'Leave a Worry Behind (Release)', icon: Heart, section: '#letgo' },
    { id: 'events', title: 'SANGAM 2026 & PTM Gatherings', icon: BookOpen, section: '#events' },
    { id: 'memories', title: 'Memories & 3D Photo Gallery', icon: Image, section: '#memories' },
    { id: 'team', title: 'Members Directory (Guides, Coordinators, Trainees)', icon: Users, section: '/members' },
    { id: 'resources', title: 'Self-Care & Study Guides', icon: BookOpen, section: '#resources' },
    { id: 'reach', title: 'Reach Out / Counselling Desk', icon: MessageCircle, section: '#reach' },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (section: string) => {
    setPaletteOpen(false);
    if (section === '/members') {
      navigateTo('members');
      return;
    }
    if (section === '/pyqs') {
      navigateTo('pyqs');
      return;
    }
    navigateTo('home');
    setTimeout(() => {
      const el = document.querySelector(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setPaletteOpen(false)}
    >
      <div
        className="glass-panel bg-indigo-900/95 max-w-lg w-full rounded-2xl shadow-2xl border border-white/20 overflow-hidden text-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-teal" />
          <input
            type="text"
            autoFocus
            placeholder="Type a destination or activity..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-paper placeholder-lavender/50"
          />
          <button
            onClick={() => setPaletteOpen(false)}
            aria-label="Close command palette"
            className="p-1 text-lavender hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-lavender">No matching destinations found.</div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd.section)}
                  className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 hover:bg-white/10 text-paper transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-royal/30 text-teal transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{cmd.title}</span>
                </button>
              );
            })
          )}

          <div className="pt-2 border-t border-white/10 mt-2">
            <button
              onClick={() => {
                setPaletteOpen(false);
                toggleSupport();
              }}
              className="w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 bg-royal/20 hover:bg-royal/40 text-peach transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-xs font-semibold">Open Urgent Support & Crisis Hotlines</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
