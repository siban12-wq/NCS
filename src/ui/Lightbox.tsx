import React, { useEffect } from 'react';
import { useStore, PhotoRecord } from '@/store/useStore';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import manifest from '@/content/memories.manifest.json';

export const Lightbox: React.FC = () => {
  const activePhoto = useStore((state) => state.activePhoto);
  const setActivePhoto = useStore((state) => state.setActivePhoto);

  const photos = manifest.photos as PhotoRecord[];
  const currentIndex = activePhoto ? photos.findIndex((p) => p.id === activePhoto.id) : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActivePhoto(photos[currentIndex - 1]);
    } else {
      setActivePhoto(photos[photos.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setActivePhoto(photos[currentIndex + 1]);
    } else {
      setActivePhoto(photos[0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, currentIndex]);

  if (!activePhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={() => setActivePhoto(null)}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActivePhoto(null)}
          aria-label="Close photo view"
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev / Next Buttons */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/40 sm:bg-white/10 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/40 sm:bg-white/10 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Container with Blur Placeholder */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[70vh] flex items-center justify-center bg-black/50">
          <img
            src={activePhoto.display}
            alt={activePhoto.alt}
            style={{
              backgroundImage: activePhoto.blur ? `url(${activePhoto.blur})` : undefined,
              backgroundSize: 'cover',
            }}
            className="max-h-[70vh] max-w-full object-contain rounded-2xl"
          />
        </div>

        {/* Metadata & Caption Card */}
        <div className="w-full mt-4 glass-panel bg-indigo-900/90 rounded-2xl p-4 sm:p-5 text-paper border border-white/20">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-base sm:text-lg text-paper">
              {activePhoto.caption || activePhoto.alt}
            </h3>
            <div className="flex items-center gap-3 text-xs text-lavender">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-teal" />
                {activePhoto.chapter.toUpperCase()}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                {activePhoto.year}
              </span>
            </div>
          </div>
          {activePhoto.story && (
            <p className="text-xs sm:text-sm text-paper/80 mt-1 leading-relaxed">
              {activePhoto.story}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
