import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useStore } from '@/store/useStore';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  yOffset?: number; // px
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  yOffset = 24,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useStore((state) => state.reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: reducedMotion ? '0ms' : '800ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isVisible || reducedMotion ? 'none' : `translateY(${yOffset}px)`,
        opacity: isVisible || reducedMotion ? 1 : 0,
      }}
      className={clsx('transition-all', className)}
    >
      {children}
    </div>
  );
};
