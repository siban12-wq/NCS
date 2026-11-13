import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { isTouchDevice } from '@/lib/device';

export const Cursor: React.FC = () => {
  const quality = useStore((state) => state.quality);
  const reducedMotion = useStore((state) => state.reducedMotion);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (reducedMotion || quality !== 'high' || isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button';
        setIsPointer(Boolean(isClickable));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [quality, reducedMotion]);

  if (reducedMotion || quality !== 'high' || isTouchDevice()) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: 'transform 0.08s ease-out, width 0.2s, height 0.2s',
      }}
      className={`fixed top-0 left-0 -ml-2 -mt-2 pointer-events-none z-50 rounded-full transition-all duration-150 ${
        isPointer
          ? 'w-8 h-8 -ml-4 -mt-4 bg-teal/30 border border-teal shadow-[0_0_12px_#5ED3C8]'
          : 'w-4 h-4 bg-gold/50 border border-gold/80 shadow-[0_0_8px_#FFE2A8]'
      }`}
    />
  );
};
