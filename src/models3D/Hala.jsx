import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import {useControls} from "leva";
import { useSpring, animated } from "@react-spring/three";

export function Hala({ externalHover = false }) {
    const { scene } = useGLTF("./models/Hala.glb");
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const modelRef = useRef();

    // Kontrolki Leva - Move this before spring animation
    const { positionX, positionY, positionZ, rotationY } = useControls("Hala", {
        positionX: { value: 2.8, min: -5, max: 5, step: 0.1 },
        positionY: { value:-0.40, min: -5, max: 5, step: 0.01 },
        positionZ: { value: 2.0, min: -5, max: 5, step: 0.1 },
        rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
    });

    // Timer do wyświetlenia modelu po 3 sekundach
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4550);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.material.transparent = false;
                obj.material.opacity = 1;
                obj.material.needsUpdate = true;
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
    }, [scene]);

    const { scale, position, rotation } = useSpring({
        scale: isVisible ? 0.30 : 0,
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
    );
}
