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
      uTopColor: { value: new THREE.Color('#BFDBFE') },
      uBottomColor: { value: new THREE.Color('#EFF6FF') },
      uHorizonColor: { value: new THREE.Color('#FFFFFF') },
      uProgress: { value: 0.0 },
      uTime: { value: 0.0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;

    const state = useStore.getState();
    const scroll = clamp(state.scroll, 0, 1);

    uniforms.uTime.value += delta;
    uniforms.uProgress.value = scroll;

    // Normal serene light blue sky
    // Subtle daylight shift with scroll from fresh morning blue to golden afternoon daylight
    const morningTop = new THREE.Color('#B8DBF9');
    const noonTop = new THREE.Color('#C9E4FB');
    const eveningTop = new THREE.Color('#D8EAF9');

    let targetTop: THREE.Color;
    if (scroll < 0.5) {
      targetTop = morningTop.clone().lerp(noonTop, scroll * 2);
    } else {
      targetTop = noonTop.clone().lerp(eveningTop, (scroll - 0.5) * 2);
    }

    const targetBottom = new THREE.Color('#EFF6FF');

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
