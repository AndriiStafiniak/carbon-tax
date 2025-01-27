import { useControls } from 'leva';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Text3D } from '@react-three/drei';

export function FinansowanieText() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const controls = useControls("Finansowanie Text", {
        positionX: { value: -1.3, min: -5, max: 5, step: 0.1 },
        positionY: { value: -0.61, min: -5, max: 5, step: 0.1 },
        positionZ: { value: 2.818, min: -5, max: 5, step: 0.1 },
        scale: { value: 0.22, min: 0, max: 1, step: 0.01 },
        rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4350);
        return () => clearTimeout(timer);
    }, []);

    const { scale, rotation, color } = useSpring({
        scale: isVisible ? controls.scale : 0,
        rotation: [0, controls.rotationY, 0],
        color: isHovered ? "black" : "white",
        config: { tension: 170, friction: 26 },
    });

    return (
        <animated.mesh
            position={[controls.positionX, controls.positionY, controls.positionZ]}
            scale={scale}
            rotation={rotation}
        >
            {/* Niewidzialny box do interakcji */}
            <mesh
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
                position={[1.3, 0, 0]}
            >
                <boxGeometry args={[5, 1, 0.5]} />
                <meshStandardMaterial visible={false} />
            </mesh>
            
            <Text3D
                font="/fonts/Ubuntu_Regular.json"
                size={0.5}
                height={0.1}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.01}
                bevelSize={0.001}
                bevelOffset={0}
                bevelSegments={5}
            >
                Finansowanie
                <animated.meshStandardMaterial color={color} />
            </Text3D>
        </animated.mesh>
    );
} 