import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

interface BallDef {
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  speed: number;
  bobAmpX: number;
  bobAmpY: number;
  depthFactor: number;
}

export const FloatingElements: React.FC = () => {
  const scroll = useStore((state) => state.scroll);
  const reducedMotion = useStore((state) => state.reducedMotion);

  // Normalized cursor/touch coordinates (-1 to 1)
  const pointerPos = useRef({ x: 0, y: 0 });
  const isPointerActive = useRef(false);

  useEffect(() => {
    const updateCoord = (clientX: number, clientY: number) => {
      pointerPos.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointerPos.current.y = -(clientY / window.innerHeight) * 2 + 1;
      isPointerActive.current = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateCoord(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoord(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // 14 carefully composed floating 3D spheres ("3D balls") across varied depth planes
  const balls: BallDef[] = useMemo(
    () => [
      // Foreground / Mid-depth left
      {
        baseX: -2.8,
        baseY: 1.2,
        baseZ: 0.9,
        radius: 0.32,
        color: '#60A5FA',
        speed: 1.4,
        bobAmpX: 0.12,
        bobAmpY: 0.18,
        depthFactor: 0.9,
      },
      // Foreground / Mid-depth right
      {
        baseX: 2.9,
        baseY: 0.8,
        baseZ: 1.1,
        radius: 0.35,
        color: '#2563EB',
        speed: 1.2,
        bobAmpX: 0.14,
        bobAmpY: 0.22,
        depthFactor: 1.0,
      },
      // Upper center-left
      {
        baseX: -1.6,
        baseY: 2.1,
        baseZ: 0.3,
        radius: 0.22,
        color: '#93C5FD',
        speed: 1.8,
        bobAmpX: 0.1,
        bobAmpY: 0.15,
        depthFactor: 0.7,
      },
      // Upper center-right
      {
        baseX: 1.7,
        baseY: 1.9,
        baseZ: -0.2,
        radius: 0.26,
        color: '#BFDBFE',
        speed: 1.5,
        bobAmpX: 0.12,
        bobAmpY: 0.16,
        depthFactor: 0.6,
      },
      // Lower right near hero text
      {
        baseX: 3.2,
        baseY: -1.2,
        baseZ: 0.7,
        radius: 0.3,
        color: '#3B82F6',
        speed: 1.3,
        bobAmpX: 0.15,
        bobAmpY: 0.2,
        depthFactor: 0.85,
      },
      // Lower left near hero text
      {
        baseX: -3.1,
        baseY: -1.0,
        baseZ: 0.5,
        radius: 0.28,
        color: '#0D9488',
        speed: 1.6,
        bobAmpX: 0.14,
        bobAmpY: 0.19,
        depthFactor: 0.75,
      },
      // Delicate floating pearl white orb top
      {
        baseX: -0.8,
        baseY: 2.6,
        baseZ: -0.8,
        radius: 0.18,
        color: '#F8FAFC',
        speed: 2.0,
        bobAmpX: 0.08,
        bobAmpY: 0.14,
        depthFactor: 0.5,
      },
      // Deep background floating soft blue orb left
      {
        baseX: -4.0,
        baseY: 0.2,
        baseZ: -2.0,
        radius: 0.42,
        color: '#DBEAFE',
        speed: 0.9,
        bobAmpX: 0.08,
        bobAmpY: 0.12,
        depthFactor: 0.3,
      },
      // Deep background floating soft blue orb right
      {
        baseX: 3.8,
        baseY: -0.3,
        baseZ: -1.8,
        radius: 0.38,
        color: '#C7D2FE',
        speed: 1.0,
        bobAmpX: 0.09,
        bobAmpY: 0.13,
        depthFactor: 0.35,
      },
      // Tiny lively bubble 1
      {
        baseX: -1.9,
        baseY: -0.2,
        baseZ: 1.2,
        radius: 0.15,
        color: '#60A5FA',
        speed: 2.2,
        bobAmpX: 0.12,
        bobAmpY: 0.16,
        depthFactor: 1.05,
      },
      // Tiny lively bubble 2
      {
        baseX: 2.0,
        baseY: -0.3,
        baseZ: 1.3,
        radius: 0.16,
        color: '#93C5FD',
        speed: 2.1,
        bobAmpX: 0.11,
        bobAmpY: 0.17,
        depthFactor: 1.1,
      },
      // Mid background top right
      {
        baseX: 2.5,
        baseY: 2.4,
        baseZ: -1.0,
        radius: 0.2,
        color: '#F0F9FF',
        speed: 1.7,
        bobAmpX: 0.09,
        bobAmpY: 0.14,
        depthFactor: 0.45,
      },
      // Bottom center-left ambient orb
      {
        baseX: -1.4,
        baseY: -2.2,
        baseZ: -0.5,
        radius: 0.24,
        color: '#93C5FD',
        speed: 1.4,
        bobAmpX: 0.1,
        bobAmpY: 0.15,
        depthFactor: 0.55,
      },
      // Bottom center-right ambient orb
      {
        baseX: 1.5,
        baseY: -2.1,
        baseZ: -0.3,
        radius: 0.25,
        color: '#3B82F6',
        speed: 1.5,
        bobAmpX: 0.11,
        bobAmpY: 0.16,
        depthFactor: 0.6,
      },
    ],
    []
  );

  const meshesRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const d = Math.min(delta, 0.1);

    const px = pointerPos.current.x;
    const py = pointerPos.current.y;

    // Projected cursor position in 3D world coordinates
    const cursorX = px * 3.6;
    const cursorY = py * 2.4;

    balls.forEach((ball, i) => {
      const mesh = meshesRef.current[i];
      if (!mesh) return;

      // 1. Organic harmonic floating bob
      const naturalBobX = Math.cos(t * ball.speed * 0.8 + i * 1.1) * ball.bobAmpX;
      const naturalBobY = Math.sin(t * ball.speed + i * 0.9) * ball.bobAmpY;

      // 2. Pronounced follow motion along with touch/cursor
      // Strong multiplier so balls visibly and joyfully travel across the viewport
      const followX = px * (1.6 + ball.depthFactor * 1.8);
      const followY = py * (1.3 + ball.depthFactor * 1.5);

      // 3. Interactive cursor repulsion/swirl when touch/mouse gets close
      let repulseX = 0;
      let repulseY = 0;
      const currentX = ball.baseX + naturalBobX + followX;
      const currentY = ball.baseY + naturalBobY + followY;
      const dx = currentX - cursorX;
      const dy = currentY - cursorY;
      const distSq = dx * dx + dy * dy;
      const interactionRadius = 2.4;

      if (distSq < interactionRadius * interactionRadius && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const strength = (1 - dist / interactionRadius) * 1.4;
        repulseX = (dx / dist) * strength;
        repulseY = (dy / dist) * strength;
      }

      // Target position in 3D space
      const targetX = ball.baseX + naturalBobX + followX + repulseX;
      const targetY = ball.baseY + naturalBobY + followY + repulseY - scroll * 1.4;
      const targetZ = ball.baseZ;

      // Smooth, responsive spring damping
      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetX, 5.5, d);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 5.5, d);
      mesh.position.z = targetZ;

      // Gentle continuous rotation
      mesh.rotation.y += 0.3 * delta;
      mesh.rotation.x += 0.2 * delta;
    });
  });

  return (
    <group>
      {balls.map((ball, i) => (
        <mesh
          key={i}
          ref={(el) => (meshesRef.current[i] = el)}
          position={[ball.baseX, ball.baseY, ball.baseZ]}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[ball.radius, 32, 32]} />
          <meshStandardMaterial
            color={ball.color}
            roughness={0.16}
            metalness={0.12}
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
    </group>
  );
};
