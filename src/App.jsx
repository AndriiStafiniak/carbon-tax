import { useState, Suspense, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
  Text,
  useGLTF,
} from '@react-three/drei';
import { Logo } from './models3D/Logo';

import { WindMil } from './models3D/WindMil';
import { Technologies } from './models3D/Technologies';
import { Auta } from './models3D/Auta';
import { Hala } from './models3D/Hala';
import { HydrogenHub } from './models3D/HydrogenHub';
import { HydrogenTruck } from './models3D/HydrogenTruck';
import { Leva } from 'leva';
import { Particles } from './models3D/Particles';
import Lights from './Lights';
import { gsap } from 'gsap';
import { Perf } from 'r3f-perf';
import { Text3D } from './models3D/Text3D';
import { CustomLoader, SimpleLoader } from './components/Loader';
import { ModelWithClick } from './components/ModelWithClick';
import { OrientationMessage } from './components/OrientationMessage';
import { appStyles } from './components/styles';
import { Euro } from './models3D/Euro';
import { Fotowolt } from './models3D/Fotowolt';

const isDev = process.env.NODE_ENV === 'development';

export function App(scene) {
  const [isLoading, setIsLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [finishedLogos, setFinishedLogos] = useState([]);
  const [hubHovered, setHubHovered] = useState(false);
  const [firstLogoHovered, setFirstLogoHovered] = useState(false);
  const [secondLogoHovered, setSecondLogoHovered] = useState(false);
  const [thirdLogoHovered, setThirdLogoHovered] = useState(false);
  const [fourthLogoHovered, setFourthLogoHovered] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogoFinished = useCallback((data) => {
    if (!data) return;
    setFinishedLogos(prev => [...prev, data]);
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Promise.all([
          useGLTF.preload("./models/wodorowy_hub.glb"),
          useGLTF.preload("./models/wodorowy_tir.glb"),
          useGLTF.preload("./models/euro.glb"),
          useGLTF.preload("./models/Technologie.glb"),
          useGLTF.preload("./models/Auta.glb"),
          useGLTF.preload("./models/Hala.glb"),
          useGLTF.preload("./models/Fotowolt.glb"),
        ]);
        setTimeout(() => {
          setAssetsLoaded(true);
        }, 1500);
      } catch (error) {
        console.error("Error loading assets:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    loadAssets();
  }, []);

  useEffect(() => {
    const checkOrientation = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isWrongAspectRatio = aspectRatio < 1.5; // 3/2 = 1.5
      setIsPortrait(isWrongAspectRatio);
      const isMobileDevice = window.innerWidth < 1024;
      setIsMobile(isMobileDevice);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (isPortrait) {
    return <OrientationMessage />;
  }

  return (
    <div style={appStyles}>
      <Leva hidden={false} />
      {!assetsLoaded && <CustomLoader />}
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0.5, 6], far: 50 }}
        style={{ 
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        dpr={[1, 2]}
        >
        <OrbitControls/>
        <Suspense fallback={<SimpleLoader />}>
          {isDev && <Perf position="top-left" />}
          <Environment
            preset="night"
            backgroundBlurriness={0.5}
            backgroundIntensity={0.7}
            resolution={256}
          />
          <Float
            speed={1.1}
            floatIntensity={1.1}
            floatingRange={[-0.3, 0.3]}
            rotationIntensity={0.1}
          >
            <Suspense fallback={null}>
              <Particles count={1000} />
            </Suspense>
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
              <Float
                speed={1.1}
                floatIntensity={1.1}
                floatingRange={[-0.3, 0.3]}
                rotationIntensity={0.1}
              >
                <Suspense fallback={null}>
                  <Text3D />
                </Suspense>
                <ModelWithClick url="https://teamid.f.pl/finansowanie">
                  <Euro externalHover={secondLogoHovered} />
                </ModelWithClick>
                <WindMil
                  onClick={() => window.open("https://hubid.org/", '_blank', 'noopener,noreferrer')}
                  onPointerOver={() => { document.body.style.cursor = 'pointer' }}
                  onPointerOut={() => { document.body.style.cursor = 'auto' }}
                />
                <Fotowolt />
                <ModelWithClick url="https://teamid.f.pl/technologie">
                  <Technologies externalHover={secondLogoHovered} />
                </ModelWithClick>
                <ModelWithClick url="https://teamid.f.pl/technologie">
                  <Auta externalHover={thirdLogoHovered} />
                </ModelWithClick>
                <ModelWithClick url="https://hubid.org/">
                  <Hala externalHover={fourthLogoHovered} />
                </ModelWithClick>
                <ModelWithClick url="https://teamid.f.pl/technologie">
                  <HydrogenHub externalHover={firstLogoHovered} />
                </ModelWithClick>
                <HydrogenTruck
                  castShadow
                  position={[0, hubHovered ? 0.5 : 0, 0]}
                  externalHover={thirdLogoHovered}
                />
                <Lights />

                {/* Logotypy */}
                <Logo
                  onClick={() => window.open("https://teamid.f.pl/", '_blank', 'noopener,noreferrer')}
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
                  link="https://teamid.f.pl/"
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
                  onClick={() => window.open("https://teamid.f.pl/finansowanie", '_blank', 'noopener,noreferrer')}
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
                  link="https://teamid.f.pl/finansowanie"
                  onAnimationFinish={handleLogoFinished}
                  textColor="#ffffff"
                  textFontSize={0.16}
                  textRotation={[0, 0, 0]}
                  textOffset={[0.7, -0.3, 1.5]}
                  onPointerEnter={() => setSecondLogoHovered(true)}
                  onPointerLeave={() => setSecondLogoHovered(false)}
                />
                <Logo
                  onClick={() => window.open("https://teamid.f.pl/technologie", '_blank', 'noopener,noreferrer')}
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
                  link="https://teamid.f.pl/technologie"
                  onAnimationFinish={handleLogoFinished}
                  textColor="#ffffff"
                  textFontSize={0.16}
                  textRotation={[0, 0, 0]}
                  textOffset={[-0.8, -0.3, 0]}
                  onPointerEnter={() => setThirdLogoHovered(true)}
                  onPointerLeave={() => setThirdLogoHovered(false)}
                />
                <Logo
                  onClick={() => window.open("https://hubid.org/", '_blank', 'noopener,noreferrer')}
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

                {finishedLogos && finishedLogos.length > 0 && finishedLogos.map((item, i) => {
                  if (!item || !item.textOffset) return null;
                  return (
                    <Text
                      key={i}
                      fontSize={item.textFontSize || 0.16}
                      color={item.textColor || '#ffffff'}
                      font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
                      position={[
                        (item.x + (item.textOffset[0] || 0)),
                        (item.y + (item.textOffset[1] || 0)),
                        (item.z + (item.textOffset[2] || 0))
                      ]}
                      rotation={item.textRotation || [0, 0, 0]}
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
                      onClick={() => item.link && window.open(item.link, '_blank', 'noopener,noreferrer')}
                      anchorX="center"
                      anchorY="middle"
                    >
                      {item.label || ''}
                    </Text>
                  );
                })}
              </Float>
            </PresentationControls>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

