import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useControls } from 'leva';

export function Particles({ count = 500, texturePath = '/textures/star_04.png'}) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Ładowanie tekstury
  const texture = useLoader(THREE.TextureLoader, texturePath);

  // Create particles with memoized attributes
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions.set(
        [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        i * 3
      );
    }
    return positions;
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0007;
    }
  });

  const { alphaTest, size, opacity } = useControls('Particles', {
    alphaTest: { value: 0.30, min: 0, max: 1, step: 0.01 },
    size: { value: 0.25, min: 0.01, max: 1, step: 0.01 },
    opacity: { value: 0.79, min: 0, max: 1, step: 0.01 },
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          itemSize={3}
          count={particles.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        transparent={true}
        alphaTest={alphaTest}
        size={size}
        sizeAttenuation={true}
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
        fog={true}
        toneMapped={false}
      />
    </points>
  );
}
