import React, { useState, useEffect, useRef, useMemo } from "react";
import { Float, useMatcapTexture, Text3D, useGLTF } from "@react-three/drei";
import { MeshMatcapMaterial } from "three";
import { useSpring, animated } from "@react-spring/three";

export function CarbonText() {
  const [isVisible, setIsVisible] = useState(false);
  const modelRef = useRef();

  // Load the GLTF model
  const { scene } = useGLTF("./models/CarbonTax.glb");

  // Load matcap texture
  const [matcapTexture] = useMatcapTexture(
    "C2AB7D_4A412E_7A6B4E_F9EDBE",
    512
  );

  // Spring animation for scaling
  const { scale } = useSpring({
    scale: isVisible ? 2 : 0,
    config: { tension: 170, friction: 26 },
  });

  // Set visibility after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Apply Matcap material to all meshes in the model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshMatcapMaterial({ matcap: matcapTexture });
        }
      });
    }
  }, [scene, matcapTexture]);

  return (
    <Float
      speed={1}
      floatIntensity={2}
      floatingRange={[0.2, 0.7]}
      rotationIntensity={0.2}
    >
      <animated.primitive
        ref={modelRef}
        visible={isVisible}
        object={scene}
        scale={scale}
        position={[0, 1, 0]}
      />
    </Float>
  );
}