import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";

export function River() {
    const { scene, animations } = useGLTF('./models/river1.glb');
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();
    const animation = useAnimations(animations, scene);

    useEffect(
        ()=> { 
            const action = animation.actions.e
            action.play()
        }, 
    []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4450);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color = new THREE.Color("#ffffff");
            }
        });
    }, [scene]);

    const { positionX, positionY, positionZ, rotationY, modelScale } = useControls("River", {
        positionX: { value:1.1, min: -5, max: 5, step: 0.1 },
        positionY: { value: -2.86, min: -5, max: 5, step: 0.01 },
        positionZ: { value: -8.8, min: -25, max: 5, step: 0.1 },
        rotationY: { value:-1.5, min: -2, max: Math.PI * 2, step: 0.1 },
        modelScale: { value: 0.08, min: 0, max: 0.5, step: 0.0001 } // Zmieniona nazwa na modelScale
    });

    const { scale } = useSpring({
        scale: isVisible ? modelScale : 0, // Używamy modelScale
        config: { tension: 170, friction: 26 }, // Adjust animation smoothness
    });

    return (
        <animated.primitive
            ref={modelRef}
            visible={isVisible}
            object={scene}
            scale={scale}
            position={[positionX, positionY, positionZ]}
            rotation-y={rotationY}
        />
    );
}
