import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import { CameraRig } from './CameraRig';
import { SkyDome } from './SkyDome';
import { FloatingLogo } from './FloatingLogo';
import { FloatingElements } from './FloatingElements';
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
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        dpr={dpr}
        frameloop={tabHidden ? 'never' : 'always'}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;

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

          {/* Normal, natural daylight illumination (no fancy/blinding neon spotlights) */}
          <ambientLight intensity={0.9} color="#FFFFFF" />
          <directionalLight position={[5, 8, 5]} intensity={1.15} color="#FFFFFF" castShadow />
          <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#DCEBFA" />

          {/* Serene sky backdrop */}
          <SkyDome />

          {/* Centerpiece 3D Floating Interactive Logo */}
          <FloatingLogo />

          {/* Surrounding 3D Floating Elements with Parallax Depth */}
          <FloatingElements />

          {/* Subtle Ambient Daylight Motes */}
          <Particles />

          {/* Interactive Memories Photo Gallery Corridor */}
          <MemoryCorridor />

          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneRoot;
