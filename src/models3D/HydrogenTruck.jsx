import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";

export function HydrogenTruck() {
    const { scene } = useGLTF("./models/wodorowy_tir.glb");
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();

    // Enable castShadow for all meshes in the model
    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true; // Enable casting shadows
                obj.receiveShadow = true; // Enable receiving shadows
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
    const { scale } = useSpring({
        scale: isVisible ? 0.3 : 0, // Scale up when visible
        config: { tension: 170, friction: 26 }, // Adjust animation smoothness
    });

    // Leva controls
    const { positionX, positionY, positionZ, rotationY } = useControls("HydrogenTruck",{
        positionX: { value: 1.1, min: -5, max: 5, step: 0.001 },
        positionY: { value: -0.527, min: -5, max: 5, step: 0.001},
        positionZ: { value:2.1, min: -5, max: 5, step: 0.001 },
        rotationY: { value: -0.5, min: -2, max: Math.PI * 2, step: 0.1 },
    });

    return (
        <>
            {/* Model */}
            <animated.primitive
                ref={modelRef}
                visible={isVisible}
                object={scene}
                scale={scale}
                position={[positionX, positionY, positionZ]} // Dynamic position
                rotation-y={rotationY} // Dynamic rotation
            />
        </>
    );
}