import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import {useControls} from "leva";
import { useSpring, animated } from "@react-spring/three";
export function Technologies() {
    const { scene } = useGLTF("./models/Technologie.glb");
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();

    // Timer do wyświetlenia modelu po 3 sekundach
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3950);
        return () => clearTimeout(timer);
    }, []);

    // Kontrolki Leva
    const { positionX, positionY, positionZ, rotationY } = useControls("Technologies", {
        positionX: { value:-0.6, min: -5, max: 5, step: 0.1 },
        positionY: { value: -0.5, min: -5, max: 5, step: 0.1 },
        positionZ: { value: 2.1, min: -5, max: 5, step: 0.1 },
        rotationY: { value: 2.2, min: 0, max: Math.PI * 2, step: 0.1 },
    });
    const { scale } = useSpring({
        scale: isVisible ? 0.3 : 0, // Scale up when visible
        config: { tension: 170, friction: 26 }, // Adjust animation smoothness
      });
    return (
        <>
            {/* Model */}
            <animated.primitive
                castShadow
                ref={modelRef}
                visible={isVisible}
                object={scene}
                scale={scale}
                position={[positionX, positionY, positionZ]} // Pozycja dynamiczna
                rotation-y={rotationY} // Rotacja dynamiczna
            />
        </>
    );
}
