import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";

export function Fotowolt() {
    const { scene, animations } = useGLTF('./models/Fotowolt.glb');
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();
    const animation = useAnimations(animations, scene);
console.log(scene)
    // Kontrolki Leva
    const { positionX, positionY, positionZ, rotationY, scaleValue } = useControls("Fotowolt", {
        positionX: { value: 2.96, min: -1, max: 4, step: 0.001 },
        positionY: { value: -0.36, min: -1, max: 1, step: 0.001 },
        positionZ: { value: 2.62, min: 0, max: 4, step: 0.001 },
        rotationY: { value: 4.23, min: 0, max: Math.PI * 2, step: 0.001 },
        scaleValue: { value: 0.3, min: 0, max: 1, step: 0.001 }
    });

    // Włączamy wszystkie dostępne animacje
    useEffect(() => {
        // Pobieramy wszystkie nazwy animacji
        const actionNames = Object.keys(animation.actions);
        
        // Włączamy każdą animację
        actionNames.forEach(name => {
            const action = animation.actions[name];
            action.play();
        });
    }, [animation]);

    // Timer do pokazania modelu
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4450); // Ten sam timing co WindMill
        return () => clearTimeout(timer);
    }, []);


    const { scale } = useSpring({
        scale: isVisible ? scaleValue : 0,
        config: { tension: 170, friction: 26 },
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