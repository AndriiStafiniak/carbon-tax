import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import {useControls} from "leva";
import { useSpring, animated } from "@react-spring/three";
export function HydrogenHub() {
    const { scene } = useGLTF("./models/wodorowy_hub.glb");
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();

    // Timer do wyświetlenia modelu po 3 sekundach
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3850);
        return () => clearTimeout(timer);
    }, []);
    const { scale } = useSpring({
        scale: isVisible ? 0.35 : 0, // Scale up when visible
        config: { tension: 170, friction: 26 }, // Adjust animation smoothness
      });
    // Kontrolki Leva
    const { positionX, positionY, positionZ, rotationY } = useControls("Wodorowy Hub", {
        positionX: { value: -2.8, min: -5, max: 5, step: 0.1 },
        positionY: { value: -0.41, min: -5, max: 5, step: 0.1 },
        positionZ: { value: 2.2, min: -5, max: 5, step: 0.1 },
        rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
    });

    return (
        <>
            {/* Model */}
            <animated.primitive
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
