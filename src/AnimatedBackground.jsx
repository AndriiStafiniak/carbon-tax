import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

export function AnimatedBackground() {
    const materialRef = useRef();
  
    useFrame(({ clock }) => {
      if (materialRef.current) {
        materialRef.current.uniforms.time.value = clock.getElapsedTime();
      }
    });
  
  
    return (
      <mesh>
    <sphereGeometry args={[50, 64, 64]} />
    <shaderMaterial
      ref={materialRef}
      side={THREE.BackSide} // Odwrócenie geometrii, aby wyglądało jak tło
      uniforms={{
        time: { value: 0 },
        color1: { value: new THREE.Color('#eeeeee') },
        color2: { value: new THREE.Color('#575757') },
        color3: { value: new THREE.Color('#A6A6A6') },
        
      }}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        uniform vec3 color5;
        varying vec2 vUv;
  
        void main() {
          float phase = mod(time * 0.3, 5.0); // Faza, zmieniająca kolory cyklicznie co 5 jednostek czasu
          vec3 mixedColor;
  
          if (phase < 1.0) {
            mixedColor = mix(color1, color2, phase); // Przejście między kolorami 1 i 2
          } else if (phase < 2.0) {
            mixedColor = mix(color2, color3, phase - 1.0); // Przejście między kolorami 2 i 3
          } else if (phase < 3.0) {
            mixedColor = mix(color3, color4, phase - 2.0); // Przejście między kolorami 3 i 4
          } else if (phase < 4.0) {
            mixedColor = mix(color4, color5, phase - 3.0); // Przejście między kolorami 4 i 5
          } else {
            mixedColor = mix(color5, color1, phase - 4.0); // Przejście między kolorami 5 i 1
          }
  
          gl_FragColor = vec4(mixedColor, 1.0);
        }
      `}
    />
  </mesh>
    );
  }
  