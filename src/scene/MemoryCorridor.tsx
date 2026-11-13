import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import manifest from '@/content/memories.manifest.json';
import { useStore, PhotoRecord } from '@/store/useStore';

interface FrameProps {
  photo: PhotoRecord;
  position: [number, number, number];
  rotation: [number, number, number];
}

const PhotoPlane: React.FC<FrameProps> = ({ photo, position, rotation }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(photo.thumb);
  const setActivePhoto = useStore((state) => state.setActivePhoto);

  return (
    <group position={position} rotation={rotation}>
      {/* 3D Glass Frame Border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.5 * photo.aspect + 0.12, 1.5 + 0.12]} />
        <meshBasicMaterial color="#B9A7F5" transparent opacity={0.3} />
      </mesh>

      {/* Photo Surface */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          setActivePhoto(photo);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[1.5 * photo.aspect, 1.5]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

export const MemoryCorridor: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const journeyPhotos = useMemo(() => {
    return (manifest.photos as PhotoRecord[]).filter((p) => p.journey).slice(0, 16);
  }, []);

  // Blurred campus backdrop
  const backdropTexture = useTexture('/memories/campus-hills-1600.webp');

  useFrame(() => {
    if (!groupRef.current) return;
    const scroll = useStore.getState().scroll;
    // Memory corridor is centered around scroll 0.62 to 0.74
    const isVisible = scroll >= 0.50 && scroll <= 0.85;
    groupRef.current.visible = isVisible;
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Darkened campus background backdrop billboard */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[32, 18]} />
        <meshBasicMaterial
          map={backdropTexture}
          color="#2C2360"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Floating 3D gallery frames arranged in an arc */}
      {journeyPhotos.map((photo, i) => {
        const angle = ((i - journeyPhotos.length / 2) / journeyPhotos.length) * 1.6;
        const radius = 9.0;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius + 5.0;
        const y = ((i % 3) - 1) * 0.8;

        return (
          <React.Suspense key={photo.id} fallback={null}>
            <PhotoPlane
              photo={photo}
              position={[x, y, z]}
              rotation={[0, -angle * 0.8, 0]}
            />
          </React.Suspense>
        );
      })}
    </group>
  );
};
