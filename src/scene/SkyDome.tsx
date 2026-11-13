import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skyVertexShader, skyFragmentShader } from '@/shaders/sky';
import { useStore } from '@/store/useStore';
import { sectionRanges } from '@/content/site';
import { clamp } from '@/lib/math';

export const SkyDome: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTopColor: { value: new THREE.Color('#12163A') },
      uBottomColor: { value: new THREE.Color('#1D2563') },
      uHorizonColor: { value: new THREE.Color('#3d2f6e') },
      uProgress: { value: 0.0 },
      uTime: { value: 0.0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;

    const state = useStore.getState();
    const scroll = clamp(state.scroll, 0, 1);
    const mood = state.moodWeather;

    uniforms.uTime.value += delta;
    uniforms.uProgress.value = scroll;

    // Find active section palette
    let activeSec = sectionRanges[0];
    for (const s of sectionRanges) {
      if (scroll >= s.start && scroll <= s.end) {
        activeSec = s;
        break;
      }
    }

    // Blend towards section sky palette
    const targetTop = new THREE.Color(activeSec.skyPalette.top);
    const targetBottom = new THREE.Color(activeSec.skyPalette.bottom);

    // Subtle mood adjustment
    if (mood === 'overwhelmed') {
      targetTop.lerp(new THREE.Color('#0E1230'), 0.4);
    } else if (mood === 'calm') {
      targetBottom.lerp(new THREE.Color('#FFC9A3'), 0.3);
    }

    materialRef.current.uniforms.uTopColor.value.lerp(targetTop, 0.05);
    materialRef.current.uniforms.uBottomColor.value.lerp(targetBottom, 0.05);
  });

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[60, 32, 24]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
};
