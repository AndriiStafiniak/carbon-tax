import { extend } from '@react-three/fiber';
import { Text3D as DreiText3D, Center, useMatcapTexture } from '@react-three/drei';
import { useEffect, useState, Suspense } from 'react';
import { useSpring, animated, config } from '@react-spring/three';

// Extend Text3D to use in JSX
extend({ DreiText3D });

export const Text3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [matcap] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256); // Add material texture
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Changed to 3 seconds
    return () => clearTimeout(timer);
  }, []);

  // Individual letter animations for "CARBON"
  const carbonLetters = "CARBON".split('').map((letter, i) => useSpring({
    position: isVisible ? [i * 0.6 - 2.2, 0, 0] : [-5 - i, Math.random() * 2 - 1, -5],
    rotation: isVisible ? [0, 0, 0] : [0, -Math.PI * 2, 0],
    scale: isVisible ? 1.5 : 0,
    config: { mass: 1, tension: 280, friction: 60 },
    delay: isVisible ? i * 100 : 0
  }));

  // Individual letter animations for "TAX"
  const taxLetters = "TAX".split('').map((letter, i) => useSpring({
    position: isVisible ? [i * 0.5 + 2.2, 0, 0] : [10 + i, Math.random() * 2 - 1, 5],
    rotation: isVisible ? [0, 0, 0] : [0, Math.PI * 2, 0],
    scale: isVisible ? 1.5 : 0,
    config: { mass: 1, tension: 280, friction: 60 },
    delay: isVisible ? (i + 6) * 100 : 0
  }));

  return (
    <Suspense fallback={null}>
      <Center position={[0, 1.2, 0]}>
        <group>
          {/* CARBON letters */}
          {"CARBON".split('').map((letter, i) => (
            <animated.group 
              key={`carbon-${i}`} 
              position={carbonLetters[i].position}
              rotation={carbonLetters[i].rotation}
              scale={carbonLetters[i].scale}
            >
              <DreiText3D
                font="/fonts/Ubuntu_Regular.json"
                size={0.4}
                height={0.1}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.01}
                bevelSize={0.01}
                bevelOffset={0}
                bevelSegments={5}
              >
                {letter}
                <meshStandardMaterial 
                  color="#ffffff"
                  metalness={0.8}
                  roughness={0.2}
                />
              </DreiText3D>
            </animated.group>
          ))}

          {/* TAX letters */}
          {"TAX".split('').map((letter, i) => (
            <animated.group 
              key={`tax-${i}`} 
              position={taxLetters[i].position}
              rotation={taxLetters[i].rotation}
              scale={taxLetters[i].scale}
            >
              <DreiText3D
                font="/fonts/Ubuntu_Regular.json"
                size={0.4}
                height={0.1}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.01}
                bevelSize={0.01}
                bevelOffset={0}
                bevelSegments={5}
              >
                {letter}
                <meshStandardMaterial 
                  color="#ffffff"
                  metalness={0.8}
                  roughness={0.2}
                />
              </DreiText3D>
            </animated.group>
          ))}
        </group>
      </Center>
    </Suspense>
  );
} 