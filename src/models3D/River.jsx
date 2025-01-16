import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import { useSpring, animated } from "@react-spring/three";

export function River() {
    const { scene, animations } = useGLTF('./models/fish_river.glb');
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();
    const animation = useAnimations(animations, scene)

    // useEffect(
    //     ()=> { 
    //         const action = animation.actions.CircleAction
    //         action.play()
    //     }, 
    // []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4450);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color = new THREE.Color("#ffffff")
            }
        })
    }, [scene]);
    const { scale } = useSpring({
        scale: isVisible ? 0.005 : 0, // Scale up when visible
        config: { tension: 170, friction: 26 }, // Adjust animation smoothness
    });


    return <animated.primitive ref={modelRef} visible={isVisible} object={scene} scale={scale} position={[2.7, -0.4, 2.5]} rotation-y={Math.PI * 0.86} />
}