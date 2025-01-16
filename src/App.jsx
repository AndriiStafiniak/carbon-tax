
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
  Text,
} from '@react-three/drei';

import { Logo } from './models3D/Logo';
import { CarbonText } from './models3D/CarbonText';
import { Dolar } from './models3D/Dolar';
import { WindMil } from './models3D/WindMil';

import { Technologies } from './models3D/Technologies';
import { Auta } from './models3D/Auta';
import { Hala } from './models3D/Hala';
import { HydrogenHub } from './models3D/HydrogenHub';
import { HydrogenTruck } from './models3D/HydrogenTruck';
import { Leva } from 'leva';
import { AnimatedBackground } from './AnimatedBackground';
import Lights from './Lights';
import { gsap } from 'gsap';

export function App() {
  const [finishedLogos, setFinishedLogos] = useState([]);

  const handleLogoFinished = (data) => {
    setFinishedLogos((prev) => [...prev, data]);
  };

  return (
    <Canvas camera={{ position: [0, 0.5, 6] }} shadows>

      <PresentationControls
        global
        position={[0, -0.5, 0]}
        rotation={[0, 0, 0]}
        polar={[- 0.2, 0.2]}
        azimuth={[- 0.2, 0.2]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 3, tension: 200 }}
        touch-action={'auto'}
      >
        <Float
          speed={1.1}
          floatIntensity={1.1}
          floatingRange={[-0.3, 0.3]}
          rotationIntensity={0.1}>

          <AnimatedBackground />
          {/* <OrbitControls makeDefault /> */}
          <Leva hidden />
          <CarbonText />
          <Dolar />
          <WindMil />
          <Technologies />
          <Auta />
          <Hala />
          <HydrogenHub />
          <HydrogenTruck castShadow />
          <Lights />
          <Environment
            preset="night"
            backgroundBlurriness={0}
            backgroundIntensity={1}
            backgroundRotation={[0, Math.PI / 2, 0]}
          />
          <Logo 
            reciveShadow
            color="#61bc48"
            scale={8}
            finalX={-2}
            finalY={-0.5}
            finalZ={1.5}
            finalRotationZ={Math.PI * -0.5}
            position={[0, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            label="Programy"
            link="https://carbonid.org/programy/"
            onAnimationFinish={handleLogoFinished}
            textColor="#ffffff"
            textFontSize={0.16}
            textRotation={[0, 0, 0]}
            textOffset={[-0.7, -0.2, 1.5]}
          />
          <Logo
          reciveShadow
            color="#f8b643"
            scale={8}
            finalX={-1.5}
            finalY={-0.5}
            finalZ={1.5}
            finalRotationZ={Math.PI / 2}
            position={[0, 0, -0.2]}
            rotation={[0, Math.PI / 2, 0]}
            label="Finansowanie"
            link="https://carbonid.org/finansowanie/"
            onAnimationFinish={handleLogoFinished}
            textColor="#ffffff"
            textFontSize={0.16}
            textRotation={[0, 0, 0]}
            textOffset={[0.7, -0.3, 1.5]}
          />
          <Logo
          reciveShadow
            color="#2792d0"
            scale={8}
            finalX={1.5}
            finalY={-0.5}
            finalZ={3}
            finalRotationZ={Math.PI * -0.5}
            position={[0, 0, -0.2]}
            rotation={[Math.PI, -Math.PI / 2, 0]}
            label="Technologie"
            link="https://carbonid.org/bse/"
            onAnimationFinish={handleLogoFinished}
            textColor="#ffffff"
            textFontSize={0.16}
            textRotation={[0, 0, 0]}
            textOffset={[-0.8, -0.3, 0]}
          />
          <Logo
          reciveShadow
            color="#0f9748"
            scale={8}
            finalX={2}
            finalY={-0.5}
            finalZ={3}
            finalRotationZ={Math.PI * 0.5}
            position={[0, 0, 0]}
            rotation={[Math.PI, Math.PI / 2, 0]}
            label="Grupa Green Hub Pl"
            link="https://hubid.org/o-nas/"
            onAnimationFinish={handleLogoFinished}
            textColor="#ffffff"
            textFontSize={0.16}
            textRotation={[0, 0, 0]}
            textOffset={[0.5, -0.15, 0]}
          />

          {finishedLogos.map((item, i) => (
            <Text
              key={i}
              fontSize={item.textFontSize}
              color={item.textColor}
              position={[
                item.x + item.textOffset[0],
                item.y + item.textOffset[1],
                item.z + item.textOffset[2],
              ]}
              rotation={item.textRotation}
              onPointerOver={(e) => {
                gsap.to(e.object.scale, { duration: 0.3, x: 1.3, y: 1.3, z: 1.3 }); // Smooth scaling up
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={(e) => {
                gsap.to(e.object.scale, { duration: 0.3, x: 1, y: 1, z: 1 }); // Smooth scaling down
                document.body.style.cursor = 'auto';
              }}
              onClick={() => window.open(item.link, '_blank')}
            >
              {item.label}
            </Text>
          ))}
        </Float>
      </PresentationControls>
    </Canvas>
  );
}



