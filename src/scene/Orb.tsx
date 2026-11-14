import React, { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { orbVertexShader, orbFragmentShader } from '@/shaders/orb';
import { useStore } from '@/store/useStore';

const LogoCore: React.FC = () => {
  const texture = useTexture('/brand/logo-white.png');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle floating and subtle pulse
    const scale = 0.55 + Math.sin(t * 1.5) * 0.03;
    meshRef.current.scale.set(scale, scale, 1);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.05]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

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

      {/* Embedded Official NCS Logo at the Confluence Core */}
      <Suspense fallback={null}>
        <LogoCore />
      </Suspense>
    </group>
  );
};
