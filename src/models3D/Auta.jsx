import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";

export function Auta({ externalHover = false }) {
    const { scene, animations } = useGLTF("./models/Auta.glb");
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const modelRef = useRef();
    const animation = useAnimations(animations, scene);

    // Kontrolki Leva - Move this before spring animation
    const { positionX, positionY, positionZ, rotationY } = useControls("Auta",{
        positionX: { value: 0.44, min: -5, max: 5, step: 0.001},
        positionY: { value: -0.515, min: -5, max: 5, step: 0.001},
        positionZ: { value: 2.08, min: -5, max: 5, step: 0.001 },
        rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    });
    
    const action = animation.actions["Car.Low.003Action.001"];
    useEffect(() => {
        // Poprawiony dostęp do akcji animacji
        if (action) {
            action.play();
        } else {
            console.error("Nie znaleziono akcji: Car.Low.003Action.001");
        }
    }, [animation.actions]);

   useEffect(() => {
    if (isHovered) {
        action.stop();
    } else {
        action.play();
    }
   }, [isHovered]);
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
    const { scale, position, rotation } = useSpring({
        scale: isVisible ? 0.2 : 0,
        position: [
            positionX,
            (isHovered || externalHover) ? positionY + 0.2 : positionY,
            positionZ
        ],
        rotation: [
            0,
            (isHovered || externalHover) ? rotationY + Math.PI * 0.1 : rotationY,
            0
        ],
        config: { tension: 170, friction: 26 },
    });

    return (
        <>
            {/* Model */}
            <animated.primitive
                ref={modelRef}
                visible={isVisible}
                object={scene}
                scale={scale}
                position={position}
                rotation={rotation}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            />
        </>
    );
}
    