import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, memo } from "react";
import * as THREE from 'three';
import { useSpring, animated } from "@react-spring/three";

export const Logo = memo(function Logo({ color, finalY, finalX, finalZ, finalRotationZ, label, link, onAnimationFinish, textColor, textFontSize, textRotation, textOffset = [0, 0, 0], scale = 8, ...props }) {
    const { scene } = useGLTF('./models/one_part_logo.glb');
    const logoRef = useRef();
    const [startAnimation, setStartAnimation] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Adjust scale factors
    const scaleX = scale * 1.3; // Oryginalna skala w osi X
    const scaleY = scale ; // Oryginalna skala w osi Y
    const scaleZ = scale ; // Zwiększona skala w osi Z

    const { scale: springScale } = useSpring({
        scale: [scaleX, scaleY, scaleZ],
        config: { tension: 170, friction: 26 },
    });

    useEffect(() => {
        const clone = scene.clone(true);
        clone.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true; // Ustawianie rzucania cieni
                obj.receiveShadow = true; // Ustawianie odbierania cieni
                obj.material = obj.material.clone();
                obj.material.color.set(color); // Ustawienie koloru
            }
        });
        logoRef.current.add(clone);
    }, [scene, color]);
 
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
                onAnimationFinish && onAnimationFinish({
                    label,
                    link,
                    x: finalX,
                    y: finalY,
                    z: finalZ,
                    textColor,
                    textFontSize: textFontSize * 0.5,
                    textRotation,
                    textOffset: Array.isArray(textOffset) ? textOffset.map(val => val * 0.5) : [0, 0, 0]
                });
            }
        }
    });

   
 
    return <group ref={logoRef} position={[0, 0, 0]} {...props}>
        <animated.primitive
            object={scene}
            scale={springScale}
            onClick={() => {
                if (link) {
                    if (link.startsWith('http')) {
                        window.open(link, '_blank', 'noopener,noreferrer');
                    } else {
                        window.location.href = link;
                    }
                }
            }}
        />
    </group>;
});