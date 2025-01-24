import { useControls } from 'leva';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Text } from '@react-three/drei';

export function ProgramyText() {
    const [isVisible, setIsVisible] = useState(false);
    
    const controls = useControls("Programy Text", {
        positionX: { value: -2.6, min: -5, max: 5, step: 0.1 },
        positionY: { value: -0.5, min: -5, max: 5, step: 0.001 },
        positionZ: { value: 2.812, min: -5, max: 5, step: 0.1 },
        scale: { value: 0.16, min: 0, max: 1, step: 0.01 },
        rotationY: { value: 0.00, min: 0, max: Math.PI * 2, step: 0.01 }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4350);
        return () => clearTimeout(timer);
    }, []);

    const { scale, rotation } = useSpring({
        scale: isVisible ? controls.scale : 0,
        rotation: [0, controls.rotationY, 0],
        config: { tension: 170, friction: 26 },
    });

    return (
        <animated.mesh
            position={[controls.positionX, controls.positionY, controls.positionZ]}
            scale={scale}
            rotation={rotation}
        >
            <Text
                font="/fonts/ubuntu-v20-latin-regular.woff"
                fontSize={1}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Programy
            </Text>
        </animated.mesh>
    );
} 