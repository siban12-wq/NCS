import { create } from 'zustand';

export type QualityTier = 'high' | 'medium' | 'low' | 'lite';
export type QualityOption = 'auto' | 'high' | 'medium' | 'low' | 'lite';
export type MoodWeather = 'overwhelmed' | 'foggy' | 'hopeful' | 'calm';
export type ThemeMode = 'dark' | 'light';

export interface PhotoRecord {
  id: string;
  chapter: string;
  thumb: string;
  display: string;
  original: string;
  width: number;
  height: number;
  aspect: number;
  blur: string;
  dominant: string;
  alt: string;
  caption: string | null;
  story: string | null;
  year: number;
  journey: boolean;
  hidden: boolean;
  needsReview: boolean;
}

interface AppState {
  // Scroll progress & section
  scroll: number; // 0.0 to 1.0
  activeSection: string;
  setScroll: (scroll: number) => void;
  setActiveSection: (section: string) => void;

  // Theme
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // Audio
  sound: boolean;
  toggleSound: () => void;
  setSound: (sound: boolean) => void;

  // Quality & Performance
  quality: QualityTier;
  qualityOverride: QualityOption;
  setQuality: (tier: QualityTier) => void;
  setQualityOverride: (option: QualityOption) => void;

  // Accessibility
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;

  // Interactive stations
  moodWeather: MoodWeather;
  setMoodWeather: (mood: MoodWeather) => void;

  // Modals & UI panels
  supportOpen: boolean;
  setSupportOpen: (open: boolean) => void;
  toggleSupport: () => void;

  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  togglePalette: () => void;

  // Gallery Lightbox
  activePhoto: PhotoRecord | null;
  setActivePhoto: (photo: PhotoRecord | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  scroll: 0,
  activeSection: 'hero',
  setScroll: (scroll) => set({ scroll }),
  setActiveSection: (activeSection) => set({ activeSection }),

  // Persistent Theme
  theme: (typeof window !== 'undefined' && (localStorage.getItem('ncs-theme') as ThemeMode)) || 'dark',
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('ncs-theme', next);
      document.documentElement.setAttribute('data-theme', next);
    }
    set({ theme: next });
  },
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ncs-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
    set({ theme });
  },

  // Audio state
  sound: false,
  toggleSound: () => set((state) => ({ sound: !state.sound })),
  setSound: (sound) => set({ sound }),

  // Quality
  quality: 'high',
  qualityOverride: 'auto',
  setQuality: (quality) => set({ quality }),
  setQualityOverride: (qualityOverride) => set({ qualityOverride }),

  // Reduced motion
  reducedMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  // Mood
  moodWeather: 'hopeful',
  setMoodWeather: (moodWeather) => set({ moodWeather }),

  // Panels
  supportOpen: false,
  setSupportOpen: (supportOpen) => set({ supportOpen }),
  toggleSupport: () => set((state) => ({ supportOpen: !state.supportOpen })),

  paletteOpen: false,
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  togglePalette: () => set((state) => ({ paletteOpen: !state.paletteOpen })),

  // Lightbox
  activePhoto: null,
  setActivePhoto: (activePhoto) => set({ activePhoto }),
}));
