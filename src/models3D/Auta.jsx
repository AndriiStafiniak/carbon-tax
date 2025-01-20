import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";

export function Auta() {
    const { scene, animations } = useGLTF("./models/Auta.glb");
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();
    const animation = useAnimations(animations, scene);
    console.log(animation);

    useEffect(() => {
        // Poprawiony dostęp do akcji animacji
        const action = animation.actions["Car.Low.003Action.001"];
        if (action) {
            action.play();
        } else {
            console.error("Nie znaleziono akcji: Car.Low.003Action.001");
        }
    }, [animation.actions]);

    // Timer do wyświetlenia modelu po 3 sekundach
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4350);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true; // Enable casting shadows
                obj.receiveShadow = true; // Enable receiving shadows
            }
        });
    }, [scene]);

    // Animations with react-spring
    const { scale } = useSpring({
        scale: isVisible ? 0.2 : 0, // Scale up when visible
        config: { tension: 170, friction: 26 }, // Adjust animation smoothness
    });

    // Kontrolki Leva
    const { positionX, positionY, positionZ, rotationY } = useControls("Auta",{
        positionX: { value: 0.44, min: -5, max: 5, step: 0.001},
        positionY: { value: -0.515, min: -5, max: 5, step: 0.001},
        positionZ: { value: 2.08, min: -5, max: 5, step: 0.001 },
        rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
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
