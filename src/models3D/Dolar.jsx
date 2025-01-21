import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from 'three'

export function Dolar({ externalHover = false }) {
    const { scene } = useGLTF('./models/dolar_sign.glb');
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
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

    const { scale, position, rotation } = useSpring({
        scale: isVisible ? 0.15 : 0,
        position: [
            -1.2,
            (isHovered || externalHover) ? -0.4 + 0.2 : -0.4,
            2.5
        ],
        rotation: [
            0,
            modelRef.current?.rotation.y || 0,
            (isHovered || externalHover) ? Math.PI * 0.1 : 0
        ],
        config: { tension: 170, friction: 26 },
    });

    useFrame(()=> {
        if(modelRef.current){
            modelRef.current.rotation.y += 0.01;
        }
    })

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