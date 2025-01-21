import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
  Text,
  useProgress,
  Html,
  useGLTF,
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

import Lights from './Lights';
import { gsap } from 'gsap';
import { River } from './models3D/River';
import { Perf } from 'r3f-perf';
import  { AnimatedBackground} from './AnimatedBackground';
import { Particles } from './models3D/Particles';

const isDev = process.env.NODE_ENV === 'development';

// Add a loading component
function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

// Preload all models
useGLTF.preload("./models/wodorowy_hub.glb");
useGLTF.preload("./models/wodorowy_tir.glb");
useGLTF.preload("./models/dolar_sign.glb");
useGLTF.preload("./models/Technologie.glb");
useGLTF.preload("./models/Auta.glb");
useGLTF.preload("./models/Hala.glb");
// ... preload other models

export function App(scene) {
  const [finishedLogos, setFinishedLogos] = useState([]);
  const [hubHovered, setHubHovered] = useState(false);
  const [firstLogoHovered, setFirstLogoHovered] = useState(false);
  const [secondLogoHovered, setSecondLogoHovered] = useState(false);
  const [thirdLogoHovered, setThirdLogoHovered] = useState(false);
  const [fourthLogoHovered, setFourthLogoHovered] = useState(false);
  
  const handleLogoFinished = (data) => {
    setFinishedLogos((prev) => [...prev, data]);
  };
  
  return (
    <Canvas
      shadows
      gl={{ 
        antialias: true,
      }}
      camera={{ position: [0, 0.5, 6], far: 50 }}
      style={{ background: '#000000' }}
    >
      <Suspense fallback={<Loader />}>
        {/* <AnimatedBackground/> */}
        {/* Panel wydajności */}
        {isDev && <Perf position="top-left" />}
        
        {/* Environment z wyłączonym tłem */}
        <Environment
          preset="night"
          backgroundBlurriness={0.5}
          backgroundIntensity={0.7}
          resolution={256}
        />
        <Particles count={500} />
        {/* Kontrolery i elementy */}
        <PresentationControls
          global
          position={[0, -0.5, 0]}
          rotation={[0, 0, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.2, 0.2]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 3, tension: 200 }}
          touch-action="auto"
        >
          {/* <OrbitControls makeDefault/> */}
          <Leva hidden={true}/>
          <Float
            speed={1.1}
            floatIntensity={1.1}
            floatingRange={[-0.3, 0.3]}
            rotationIntensity={0.1}
          >
            {/* <OrbitControls makeDefault /> */}
            
            {/* Twoje modele */}
            <CarbonText />
            <Dolar externalHover={secondLogoHovered} />
            <WindMil />
            <Technologies externalHover={secondLogoHovered} />
            <Auta externalHover={thirdLogoHovered} />
            <Hala externalHover={fourthLogoHovered} />
            <HydrogenHub externalHover={firstLogoHovered} />
            <HydrogenTruck 
              castShadow 
              position={[0, hubHovered ? 0.5 : 0, 0]}
              externalHover={thirdLogoHovered}
            />
            <Lights />

            {/* Logotypy */}
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
              link="https:/teamid.f.pl/"
              onAnimationFinish={handleLogoFinished}
              textColor="#ffffff"
              textFontSize={0.16}
              textRotation={[0, 0, 0]}
              textOffset={[-0.7, -0.2, 1.5]}
              onPointerEnter={() => {
                setHubHovered(true);
                setFirstLogoHovered(true);
              }}
              onPointerLeave={() => {
                setHubHovered(false);
                setFirstLogoHovered(false);
              }}
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
              link="https:/teamid.f.pl/finansowanie"
              onAnimationFinish={handleLogoFinished}
              textColor="#ffffff"
              textFontSize={0.16}
              textRotation={[0, 0, 0]}
              textOffset={[0.7, -0.3, 1.5]}
              onPointerEnter={() => setSecondLogoHovered(true)}
              onPointerLeave={() => setSecondLogoHovered(false)}
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
              link="https:/teamid.f.pl/technologie"
              onAnimationFinish={handleLogoFinished}
              textColor="#ffffff"
              textFontSize={0.16}
              textRotation={[0, 0, 0]}
              textOffset={[-0.8, -0.3, 0]}
              onPointerEnter={() => setThirdLogoHovered(true)}
              onPointerLeave={() => setThirdLogoHovered(false)}
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
              label="Green Hub PL"
              link="https://hubid.org/"
              onAnimationFinish={handleLogoFinished}
              textColor="#ffffff"
              textFontSize={0.16}
              textRotation={[0, 0, 0]}
              textOffset={[0.5, -0.15, 0]}
              onPointerEnter={() => setFourthLogoHovered(true)}
              onPointerLeave={() => setFourthLogoHovered(false)}
            />

            {/* Animowane logotypy po zakończeniu */}
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
                  gsap.to(e.object.scale, { duration: 0.3, x: 1.3, y: 1.3, z: 1.3 });
                  document.body.style.cursor = 'pointer';
                  if (item.label === "Programy") {
                    setHubHovered(true);
                    setFirstLogoHovered(true);
                  } else if (item.label === "Finansowanie") {
                    setSecondLogoHovered(true);
                  } else if (item.label === "Technologie") {
                    setThirdLogoHovered(true);
                  } else if (item.label === "Green Hub PL") {
                    setFourthLogoHovered(true);
                  }
                }}
                onPointerOut={(e) => {
                  gsap.to(e.object.scale, { duration: 0.3, x: 1, y: 1, z: 1 });
                  document.body.style.cursor = 'auto';
                  if (item.label === "Programy") {
                    setHubHovered(false);
                    setFirstLogoHovered(false);
                  } else if (item.label === "Finansowanie") {
                    setSecondLogoHovered(false);
                  } else if (item.label === "Technologie") {
                    setThirdLogoHovered(false);
                  } else if (item.label === "Green Hub PL") {
                    setFourthLogoHovered(false);
                  }
                }}
                onClick={() => window.open(item.link, '_blank')}
                frustumCulled
                maxWidth={2}
                textRendering="optimizeLegibility"
              >
                {item.label}
              </Text>
            ))}
          </Float>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}



