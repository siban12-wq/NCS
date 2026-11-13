import { useEffect } from 'react';
import { useStore, QualityTier } from '@/store/useStore';
import { getDeviceSpecs, hasWebGL } from '@/lib/device';

export function useQuality() {
  const quality = useStore((state) => state.quality);
  const qualityOverride = useStore((state) => state.qualityOverride);
  const setQuality = useStore((state) => state.setQuality);

  useEffect(() => {
    // If user has explicitly overridden, respect that
    if (qualityOverride !== 'auto') {
      setQuality(qualityOverride);
      return;
    }

    // Step 1: Initial determination from device specs
    const specs = getDeviceSpecs();
    if (!specs.hasGL || !hasWebGL()) {
      setQuality('lite');
      return;
    }

    let initialTier: QualityTier = 'high';
    if (specs.isMobile || specs.memory < 4 || specs.cores < 4) {
      initialTier = 'medium';
    }
    if (specs.memory <= 2 || specs.cores <= 2) {
      initialTier = 'low';
    }

    setQuality(initialTier);

    // Step 2: 1.5-second FPS probe
    let frameCount = 0;
    let startTime = performance.now();
    let animId: number;

    const probe = (now: number) => {
      frameCount++;
      const elapsed = now - startTime;
      if (elapsed < 1500) {
        animId = requestAnimationFrame(probe);
      } else {
        const fps = (frameCount / elapsed) * 1000;
        // If FPS < 30 on initial tier, downgrade
        if (fps < 24) {
          if (initialTier === 'high') setQuality('medium');
          else if (initialTier === 'medium') setQuality('low');
        } else if (fps < 15) {
          setQuality('lite');
        }
      }
    };

    animId = requestAnimationFrame(probe);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [qualityOverride, setQuality]);

  return { quality, qualityOverride };
}
