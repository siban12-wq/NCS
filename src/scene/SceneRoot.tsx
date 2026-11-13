import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import { CameraRig } from './CameraRig';
import { SkyDome } from './SkyDome';
import { Ribbons } from './Ribbons';
import { Orb } from './Orb';
import { Weather } from './Weather';
import { Particles } from './Particles';
import { MemoryCorridor } from './MemoryCorridor';
import { Effects } from './Effects';

export const SceneRoot: React.FC = () => {
  const quality = useStore((state) => state.quality);
  const setQuality = useStore((state) => state.setQuality);
  const [tabHidden, setTabHidden] = useState(false);

  // Tab visibility check to pause rendering when backgrounded
  useEffect(() => {
    const handleVisibility = () => {
      setTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Determine DPR based on quality tier
  const dpr = quality === 'high' ? Math.min(window.devicePixelRatio, 1.75) : quality === 'medium' ? 1.25 : 1.0;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none"
    >
      <Canvas
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        dpr={dpr}
        frameloop={tabHidden ? 'never' : 'always'}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;

          // Handle webglcontextlost
          gl.domElement.addEventListener(
            'webglcontextlost',
            (e) => {
              e.preventDefault();
              console.warn('WebGL context lost, switching to Lite mode.');
              setQuality('lite');
            },
            false
          );
        }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFE2A8" />
          <pointLight position={[0, 0, 0]} intensity={2.0} color="#5ED3C8" distance={10} />

          <SkyDome />
          <Ribbons />
          <Orb />
          <Weather />
          <Particles />
          <MemoryCorridor />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneRoot;
