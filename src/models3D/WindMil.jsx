import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";

export function WindMil() {
    const { scene, animations } = useGLTF('./models/MillWithAnimation.glb');
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();
    const animation = useAnimations(animations, scene);

    // Kontrolki Leva
    const controls = useControls("WindMil", {
        positionX: { value: -2.74, min: -3, max: 1, step: 0.001 },
        positionY: { value: -0.49, min: -1, max: 1, step: 0.001 },
        positionZ: { value: 2.12, min: 0, max: 4, step: 0.001 },
        rotationY: { value: 3.78, min: 0, max: Math.PI * 2, step: 0.001 },
        scaleValue: { value: 0.05, min: 0, max: 0.2, step: 0.001 }
    });

    useEffect(
        ()=> { 
            const action = animation.actions.CircleAction;
            action.play();
        }, 
    [animation.actions]);

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

    const springProps = useSpring({
        scale: isVisible ? controls.scaleValue : 0,
        position: [controls.positionX, controls.positionY, controls.positionZ],
        rotation: [0, controls.rotationY, 0],
        config: { tension: 170, friction: 26 },
    });

    return (
        <animated.primitive 
            ref={modelRef} 
            visible={isVisible} 
            object={scene} 
            scale={springProps.scale}
            position={springProps.position}
            rotation={springProps.rotation}
        />
    );
}