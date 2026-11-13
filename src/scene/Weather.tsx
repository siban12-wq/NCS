import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { rainVertexShader, rainFragmentShader } from '@/shaders/rain';
import { useStore } from '@/store/useStore';

export const Weather: React.FC = () => {
  const quality = useStore((state) => state.quality);
  const count = quality === 'high' ? 800 : quality === 'medium' ? 400 : 150;

  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [geometry, uniforms] = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = 2.0 + Math.random() * 2.0; // speed
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));

    const u = {
      uTime: { value: 0 },
      uSpeed: { value: 1.8 },
      uColor: { value: new THREE.Color('#5ED3C8') },
    };

    return [geom, u];
  }, [count]);

  useFrame((_, delta) => {
    if (!materialRef.current || !pointsRef.current) return;
    const state = useStore.getState();
    const scroll = state.scroll;
    const mood = state.moodWeather;

    materialRef.current.uniforms.uTime.value += delta;

    // Visible during early journey (scroll < 0.45) or when mood is overwhelmed/foggy
    let targetOpacity = scroll < 0.45 || mood === 'overwhelmed' || mood === 'foggy' ? 1.0 : 0.0;
    pointsRef.current.visible = targetOpacity > 0.05;

    if (mood === 'overwhelmed') {
      materialRef.current.uniforms.uColor.value.set('#5ED3C8');
      materialRef.current.uniforms.uSpeed.value = 3.0;
    } else {
      materialRef.current.uniforms.uColor.value.set('#B9A7F5');
      materialRef.current.uniforms.uSpeed.value = 1.5;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={rainVertexShader}
        fragmentShader={rainFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
