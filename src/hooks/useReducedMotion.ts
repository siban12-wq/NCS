import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export function useReducedMotion() {
  const reducedMotion = useStore((state) => state.reducedMotion);
  const setReducedMotion = useStore((state) => state.setReducedMotion);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      setReducedMotion(mq.matches);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [setReducedMotion]);

  return reducedMotion;
}
