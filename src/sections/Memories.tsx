import React, { useState } from 'react';
import manifest from '@/content/memories.manifest.json';
import { useStore, PhotoRecord } from '@/store/useStore';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { siteConfig } from '@/content/site';
import { Image as ImageIcon, ShieldCheck } from 'lucide-react';

export const Memories: React.FC = () => {
  const setActivePhoto = useStore((state) => state.setActivePhoto);
  const [selectedChapter, setSelectedChapter] = useState<string>('all');

  const photos = manifest.photos as PhotoRecord[];
  const chapters = manifest.chapters;

  const filteredPhotos =
    selectedChapter === 'all'
      ? photos
      : photos.filter((p) => p.chapter === selectedChapter);

  return (
    <section
      id="memories"
      aria-label="Memories Gallery and 3D Corridor"
      className="relative min-h-screen py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-teal font-bold block mb-2">
              Visual Archive
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-4">
              Moments across the campus year.
            </h2>
            <p className="text-sm sm:text-base text-lavender leading-relaxed">
              Every photograph is a chapter of connection: quiet mornings between lectures, collective team duty, and celebration under the trees.
            </p>
          </Reveal>
        </div>

        {/* Chapter Filter Tabs */}
        <Reveal delay={150}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedChapter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedChapter === 'all'
                  ? 'bg-royal text-white shadow-lg'
                  : 'glass-panel text-paper hover:bg-white/10'
              }`}
            >
              All Chapters ({photos.length})
            </button>
            {chapters.map((ch) => (
              <button
                key={ch.slug}
                onClick={() => setSelectedChapter(ch.slug)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedChapter === ch.slug
                    ? 'bg-royal text-white shadow-lg'
                    : 'glass-panel text-paper hover:bg-white/10'
                }`}
              >
                {ch.title} ({ch.photoIds.length})
              </button>
            ))}
          </div>
        </Reveal>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <Reveal key={photo.id} delay={Math.min(idx * 60, 400)}>
              <button
                type="button"
                onClick={() => setActivePhoto(photo)}
                aria-label={`View photo: ${photo.caption || photo.alt}`}
                className="w-full text-left group focus:outline-none focus:ring-2 focus:ring-teal/50 rounded-2xl overflow-hidden block"
              >
                <GlassCard className="p-2 sm:p-2.5 h-full group-hover:border-teal/50 transition-all">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                    <img
                      src={photo.thumb}
                      alt={photo.alt}
                      loading="lazy"
                      style={{
                        backgroundImage: photo.blur ? `url(${photo.blur})` : undefined,
                        backgroundSize: 'cover',
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-[11px] text-paper font-medium line-clamp-2">
                        {photo.caption || photo.alt}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 flex items-center justify-between text-[11px] text-lavender/70">
                    <span className="capitalize">{photo.chapter}</span>
                    <span>{photo.year}</span>
                  </div>
                </GlassCard>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Consent & Privacy Notice (Section 6 Rule 9) */}
        <Reveal delay={200}>
          <div className="mt-12 max-w-2xl mx-auto glass-panel p-4 rounded-2xl flex items-center gap-3 text-xs text-lavender/80 border border-white/10">
            <ShieldCheck className="w-5 h-5 text-teal shrink-0" />
            <p>
              {siteConfig.consentNotice}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
