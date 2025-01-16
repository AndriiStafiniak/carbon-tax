import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export function Logo({ color, finalY, finalX, finalZ, finalRotationZ, label, link, onAnimationFinish, textColor, textFontSize, textRotation, textOffset, ...props }) {
    const gltf = useGLTF('./models/one_part_logo.glb');
    const logoRef = useRef();
    const [startAnimation, setStartAnimation] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);
 
    useEffect(() => {
        const clone = gltf.scene.clone(true);
        clone.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true; // Ustawianie rzucania cieni
                obj.receiveShadow = true; // Ustawianie odbierania cieni
                obj.material = obj.material.clone();
                obj.material.color.set(color); // Ustawienie koloru

            }
        });
        logoRef.current.add(clone);
    }, [gltf, color]);
 
    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
 
    useFrame(() => {
        if (startAnimation && logoRef.current && !animationFinished) {
            const currentRotationZ = logoRef.current.rotation.z;
            const currentPosX = logoRef.current.position.x;
            const currentPosY = logoRef.current.position.y;
            const currentPosZ = logoRef.current.position.z;
 
            logoRef.current.rotation.z = THREE.MathUtils.lerp(currentRotationZ, finalRotationZ, 0.05);
            logoRef.current.position.y = THREE.MathUtils.lerp(currentPosY, finalY, 0.05);
            logoRef.current.position.x = THREE.MathUtils.lerp(currentPosX, finalX, 0.05);
            logoRef.current.position.z = THREE.MathUtils.lerp(currentPosZ, finalZ, 0.05);
 
            const rotationDiff = Math.abs(logoRef.current.rotation.z - finalRotationZ);
            const posDiff = Math.sqrt(
                Math.pow(logoRef.current.position.x - finalX, 2) +
                Math.pow(logoRef.current.position.y - finalY, 2) +
                Math.pow(logoRef.current.position.z - finalZ, 2)
            );
 
            if (posDiff < 0.01 && rotationDiff < 0.01) {
                setAnimationFinished(true);
                // Przekazujemy do onAnimationFinish wszystkie potrzebne dane do wyrenderowania tekstu
                onAnimationFinish && onAnimationFinish({
                    label,
                    link,
                    x: finalX,
                    y: finalY,
                    z: finalZ,
                    textColor,
                    textFontSize,
                    textRotation,
                    textOffset
                });
            }
        }
    });
 
    return <group ref={logoRef} {...props} />;
}