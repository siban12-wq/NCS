import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ribbonVertexShader, ribbonFragmentShader } from '@/shaders/ribbons';
import { useStore } from '@/store/useStore';

export const Ribbons: React.FC = () => {
  const count = 36;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [geometry, uniforms] = useMemo(() => {
    // Thin curved plane ribbon
    const geom = new THREE.PlaneGeometry(0.08, 4.5, 1, 32);

    const offsets = new Float32Array(count);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#5ED3C8'), // Teal
      new THREE.Color('#2340C8'), // Royal
      new THREE.Color('#B9A7F5'), // Lavender
      new THREE.Color('#FFE2A8'), // Gold
    ];

    for (let i = 0; i < count; i++) {
      offsets[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.5 + Math.random() * 0.8;

      const col = palette[i % palette.length];
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geom.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 1));
    geom.setAttribute('aSpeed', new THREE.InstancedBufferAttribute(speeds, 1));
    geom.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3));

    const u = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
    };

    return [geom, u];
  }, [count]);

  // Set initial instance matrices in spiral converging arrangement
  useMemo(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + (i % 3) * 0.4;
      dummy.position.set(Math.cos(angle) * radius, 1.0 - (i % 5) * 0.4, Math.sin(angle) * radius);
      dummy.rotation.set(0, angle + Math.PI / 2, 0.2);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uProgress.value = useStore.getState().scroll;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      frustumCulled={false}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={ribbonVertexShader}
        fragmentShader={ribbonFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};
