import React from 'react';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { useStore } from '@/store/useStore';

export const Effects: React.FC = () => {
  const quality = useStore((state) => state.quality);

  if (quality === 'low' || quality === 'lite') {
    return null;
  }

  if (quality === 'high') {
    return (
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={0.65}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <DepthOfField
          focusDistance={0.03}
          focalLength={0.08}
          bokehScale={2.0}
          height={480}
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.65}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
    </EffectComposer>
  );
};
