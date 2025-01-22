import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import {useControls} from "leva";
import { useSpring, animated } from "@react-spring/three";

export function HydrogenHub({ externalHover = false }) {
    const { scene, animations } = useGLTF("./models/wodorowy_hub.glb");
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const modelRef = useRef();

    // Kontrolki Leva - Move this before the spring animation
    const { positionX, positionY, positionZ, rotationY } = useControls("Wodorowy Hub", {
        positionX: { value: -2.8, min: -5, max: 5, step: 0.1 },
        positionY: { value: -0.41, min: -5, max: 5, step: 0.1 },
        positionZ: { value: 2.2, min: -5, max: 5, step: 0.1 },
        rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
    });

    // Timer do wyświetlenia modelu po 3 sekundach
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3850);
        return () => clearTimeout(timer);
    }, []);

    // Add material fixes
    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.material.transparent = false; // Disable transparency
                obj.material.opacity = 1; // Full opacity
                obj.material.needsUpdate = true; // Update material
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
    }, [scene]);

    useEffect(() => {
        // Ensure geometries are valid
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.geometry.computeBoundingSphere();
                obj.geometry.computeBoundingBox();
            }
        });
    }, [scene]);

    const { scale, position, rotation } = useSpring({
        scale: isVisible ? 0.35 : 0,
        position: [
            -2.8,
            (isHovered || externalHover) ? -0.41 + 0.2 : -0.41,
            2.2
        ],
        rotation: [
            0,
            (isHovered || externalHover) ? rotationY + Math.PI * 0.1 : rotationY,
            0
        ],
        config: { 
            tension: 170, 
            friction: 26 
        },
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
                onClick={() => window.open('https://teamid.f.pl/', '_blank', 'noopener,noreferrer')}
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto';
                }}
                frustumCulled
            />
        </>
    );
}
