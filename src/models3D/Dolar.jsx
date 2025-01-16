import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from 'three'

export function Dolar() {
    const { scene } = useGLTF('./models/dolar_sign.glb');
    const [isVisible, setIsVisible] = useState(false);
    const modelRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4150);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color = new THREE.Color("#0f9748")
            }
        })
    }, [scene]);

    const { scale } = useSpring({
        scale: isVisible ? 0.15 : 0, // Scale up when visible
        config: { tension: 170, friction: 26 }, // Adjust animation smoothness
      });

    useFrame(()=> {
        if(modelRef.current){
            modelRef.current.rotation.y += 0.01;
        }
    })
    return <animated.primitive ref = {modelRef} visible={isVisible} object={scene} scale={scale} position={[-1.2, -0.4, 2.5]} />
}