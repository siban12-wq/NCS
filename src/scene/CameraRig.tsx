import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sectionRanges } from '@/content/site';
import { useStore } from '@/store/useStore';
import { clamp, damp } from '@/lib/math';

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const pointerPos = useRef({ x: 0, y: 0 });
  const currentCamPos = useRef(new THREE.Vector3(0, 1.2, 5.0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Waypoints for Catmull-Rom curve
  const { waypoints, targets } = useMemo(() => {
    const pts = sectionRanges.map((s) => new THREE.Vector3(...s.cameraWaypoint));
    const tgts = sectionRanges.map((s) => new THREE.Vector3(...s.cameraTarget));
    return {
      waypoints: new THREE.CatmullRomCurve3(pts),
      targets: new THREE.CatmullRomCurve3(tgts),
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalized pointer coordinates (-1 to 1)
      pointerPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    const state = useStore.getState();
    const progress = clamp(state.scroll, 0, 1);
    const reducedMotion = state.reducedMotion;

    // Evaluate curve points
    const targetPos = waypoints.getPointAt(progress);
    const targetLook = targets.getPointAt(progress);

    // Subtle pointer parallax (max 0.3 units)
    if (!reducedMotion) {
      targetPos.x += pointerPos.current.x * 0.25;
      targetPos.y += pointerPos.current.y * 0.2;
    }

    if (reducedMotion) {
      // Snap directly without continuous travel
      camera.position.copy(targetPos);
      camera.lookAt(targetLook);
    } else {
      // Damped following (damp factor ~4)
      const d = Math.min(delta, 0.1);
      currentCamPos.current.x = damp(currentCamPos.current.x, targetPos.x, 4.0, d);
      currentCamPos.current.y = damp(currentCamPos.current.y, targetPos.y, 4.0, d);
      currentCamPos.current.z = damp(currentCamPos.current.z, targetPos.z, 4.0, d);

      currentLookAt.current.x = damp(currentLookAt.current.x, targetLook.x, 4.0, d);
      currentLookAt.current.y = damp(currentLookAt.current.y, targetLook.y, 4.0, d);
      currentLookAt.current.z = damp(currentLookAt.current.z, targetLook.z, 4.0, d);

      camera.position.copy(currentCamPos.current);
      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
};
