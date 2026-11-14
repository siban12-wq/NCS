import { useEffect } from 'react';
import { useStore, QualityTier } from '@/store/useStore';
import { getDeviceSpecs, hasWebGL } from '@/lib/device';

export function useQuality() {
  const quality = useStore((state) => state.quality);
  const setQuality = useStore((state) => state.setQuality);

  useEffect(() => {
    // 100% Automatic Graphics Optimization as per phone / hardware
    const specs = getDeviceSpecs();
    if (!specs.hasGL || !hasWebGL()) {
      setQuality('lite');
      return;
    }

    const isPhone =
      specs.isMobile ||
      (typeof window !== 'undefined' &&
        (window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)));

    let autoTier: QualityTier = 'high';

    if (isPhone) {
      // Automatically optimize graphics for phones for smooth 60fps & battery conservation
      if (specs.memory <= 2 || specs.cores <= 2) {
        autoTier = 'low';
      } else {
        autoTier = 'medium';
      }
    } else {
      // Desktop / Laptop
      if (specs.memory < 4 || specs.cores < 4) {
        autoTier = 'medium';
      } else {
        autoTier = 'high';
      }
    }

    setQuality(autoTier);

    // Dynamic 1.5-second FPS probe: automatically steps down if phone experiences frame drops
    let frameCount = 0;
    const startTime = performance.now();
    let animId: number;

    const probe = (now: number) => {
      frameCount++;
      const elapsed = now - startTime;
      if (elapsed < 1500) {
        animId = requestAnimationFrame(probe);
      } else {
        const fps = (frameCount / elapsed) * 1000;
        if (fps < 25) {
          if (autoTier === 'high') setQuality('medium');
          else if (autoTier === 'medium') setQuality('low');
        } else if (fps < 14) {
          setQuality('lite');
        }
      }
    };

    animId = requestAnimationFrame(probe);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [setQuality]);

  return { quality };
}
