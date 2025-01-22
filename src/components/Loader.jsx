import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useProgress } from '@react-three/drei';

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoaderText = styled(motion.h1)`
  color: white;
  font-size: 2rem;
  margin-top: 20px;
`;

const ProgressBar = styled(motion.div)`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  left: 0;
  top: 0;
`;

export function CustomLoader() {
  const { progress, active } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const [startHiding, setStartHiding] = useState(false);

  useEffect(() => {
    if (progress === 100 && !active && !startHiding) {
      // Wait for a minimum time before starting to hide
      const minLoadingTimer = setTimeout(() => {
        setStartHiding(true);
      }, 1500); // Minimum loading time

      return () => clearTimeout(minLoadingTimer);
    }
  }, [progress, active, startHiding]);

  useEffect(() => {
    if (startHiding) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Fade out duration

      return () => clearTimeout(hideTimer);
    }
  }, [startHiding]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <LoaderContainer
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeDasharray="80, 125"
          />
        </motion.svg>
        <LoaderText>{Math.round(progress)}%</LoaderText>
        <ProgressBar>
          <Progress
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </ProgressBar>
      </LoaderContainer>
    </AnimatePresence>
  );
} 