import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";

export function HydrogenTruck({ externalHover = false }) {
    const { scene } = useGLTF("./models/wodorowy_tir.glb");
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const modelRef = useRef();

    // Leva controls - Move this before spring animation
    const { positionX, positionY, positionZ, rotationY } = useControls("HydrogenTruck",{
        positionX: { value: 1.25, min: -5, max: 5, step: 0.001 },
        positionY: { value: -0.527, min: -5, max: 5, step: 0.001},
        positionZ: { value: 2.1, min: -5, max: 5, step: 0.001 },
        rotationY: { value: -1.7, min: -2, max: Math.PI * 2, step: 0.1 },
    });

    // Enable castShadow for all meshes in the model
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

    // Timer to display the model after 4.25 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4250);
        return () => clearTimeout(timer);
    }, []);

    // Spring animation for scaling
    const { scale, position, rotation } = useSpring({
        scale: isVisible ? 0.27 : 0,
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