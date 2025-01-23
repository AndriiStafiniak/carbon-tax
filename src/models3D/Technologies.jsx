import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";

export function Technologies({ externalHover = false }) {
    const { scene } = useGLTF("./models/Technologie.glb");
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const modelRef = useRef();

    // Timer do wyświetlenia modelu po 3 sekundach
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3950);
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

    // Kontrolki Leva
    const { positionX, positionY, positionZ, rotationY } = useControls("Technologies", {
        positionX: { value: -0.6, min: -5, max: 5, step: 0.1 },
        positionY: { value: -0.5, min: -5, max: 5, step: 0.1 },
        positionZ: { value: 2.1, min: -5, max: 5, step: 0.1 },
        rotationY: { value: 2.2, min: 0, max: Math.PI * 2, step: 0.1 },
    });

    const { scale, position, rotation } = useSpring({
        scale: isVisible ? 0.3 : 0,
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
