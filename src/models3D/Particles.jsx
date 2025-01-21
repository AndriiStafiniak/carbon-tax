import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Particles({ count = 1000 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Create particles with memoized attributes
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        Math.random() * 15,
        (Math.random() - 0.5) * 15
      );
      const speed = 0.01 + Math.random() / 200;
      temp.push({ position, speed });
    }
    return temp;
  }, [count]);

  // Create instanced buffer geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
      scales[i] = Math.random() * 0.05 + 0.01;
    });
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    return geo;
  }, [count, particles]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      particle.position.y -= particle.speed;
      if (particle.position.y < -2) {
        particle.position.y = 15;
      }
      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}
