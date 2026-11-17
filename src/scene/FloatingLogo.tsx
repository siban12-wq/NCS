import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export const FloatingLogo: React.FC = () => {
  const scroll = useStore((state) => state.scroll);
  const reducedMotion = useStore((state) => state.reducedMotion);

  // Load official NCS royal blue logo texture
  const activeTexture = useTexture('/brand/logo.png');

  const groupRef = useRef<THREE.Group>(null);
  const logoMeshRef = useRef<THREE.Group>(null);

  // Pointer & touch coordinates normalized (-1 to 1)
  const pointerPos = useRef({ x: 0, y: 0 });
  const entranceProgress = useRef(0);

  useEffect(() => {
    const handleMove = (x: number, y: number) => {
      pointerPos.current.x = (x / window.innerWidth) * 2 - 1;
      pointerPos.current.y = -(y / window.innerHeight) * 2 + 1;
    };

    const handlePointerMove = (e: PointerEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!logoMeshRef.current || !groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const d = Math.min(delta, 0.1);

    // 1. Entrance animation on website open
    if (entranceProgress.current < 1) {
      entranceProgress.current = Math.min(1, entranceProgress.current + d * 1.5);
    }
    const ep = entranceProgress.current;
    const entranceScale = ep === 1 ? 1 : 1 - Math.pow(1 - ep, 3);

    // 2. Smooth floating bob and gentle sway
    const bob = reducedMotion ? 0 : Math.sin(t * 1.5) * 0.14;
    const sway = reducedMotion ? 0 : Math.cos(t * 0.8) * 0.05;

    // Y position: sits gracefully at upper-center (y = 0.65) and glides smoothly with scroll
    groupRef.current.position.y = 0.65 + bob - scroll * 1.1;
    groupRef.current.position.x = sway;

    // 3. Dynamic 3D Mouse / Touch Tilt (responsive tracking)
    const px = pointerPos.current.x;
    const py = pointerPos.current.y;

    const targetRotX = reducedMotion ? 0 : -py * 0.45 + Math.cos(t * 0.7) * 0.04;
    const targetRotY = reducedMotion ? 0 : px * 0.55 + Math.sin(t * 0.6) * 0.05;
    const targetRotZ = reducedMotion ? 0 : -px * 0.08;

    logoMeshRef.current.rotation.x = THREE.MathUtils.damp(logoMeshRef.current.rotation.x, targetRotX, 5.0, d);
    logoMeshRef.current.rotation.y = THREE.MathUtils.damp(logoMeshRef.current.rotation.y, targetRotY, 5.0, d);
    logoMeshRef.current.rotation.z = THREE.MathUtils.damp(logoMeshRef.current.rotation.z, targetRotZ, 5.0, d);

    // Scale shifts subtly with scroll and entrance
    const baseScale = Math.max(0.65, 1.0 - scroll * 0.35) * entranceScale;
    logoMeshRef.current.scale.setScalar(baseScale);
  });

  return (
    <group ref={groupRef} position={[0, 0.65, 0]}>
      {/* Pure Floating 3D NCS Logo - NO circular disc / NO cylinder */}
      <group ref={logoMeshRef}>
        {/* Front Face: Crisp Official NCS Heart Logo */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.75, 1.75]} />
          <meshBasicMaterial
            map={activeTexture}
            transparent
            opacity={0.96}
            depthWrite={false}
          />
        </mesh>

        {/* Back Face for symmetric 3D viewing if tilted */}
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.75, 1.75]} />
          <meshBasicMaterial
            map={activeTexture}
            transparent
            opacity={0.96}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};
