import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { orbVertexShader, orbFragmentShader } from '@/shaders/orb';
import { useStore } from '@/store/useStore';

export const Orb: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color('#2340C8') }, // Royal
      uColorGlow: { value: new THREE.Color('#5ED3C8') }, // Teal glow
    }),
    []
  );

  useFrame((_, delta) => {
    if (!materialRef.current || !meshRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;

    const scroll = useStore.getState().scroll;
    // Orb position moves gently with the journey
    meshRef.current.position.y = Math.sin(materialRef.current.uniforms.uTime.value * 0.8) * 0.15;
    meshRef.current.rotation.y += delta * 0.2;

    // Scale shifts subtly with scroll
    const s = 1.0 - scroll * 0.3;
    meshRef.current.scale.setScalar(Math.max(0.6, s));
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Glow Halo */}
      <mesh scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial
          color="#5ED3C8"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Main Breathing Orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 48, 48]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={orbVertexShader}
          fragmentShader={orbFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
