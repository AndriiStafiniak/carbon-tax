import { Html, useProgress } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const LoaderContainer = styled(motion.div)`
  // ... existing styles ...
`;

// ... other styled components ...

export function CustomLoader() {
  // ... existing CustomLoader implementation ...
}

export function SimpleLoader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
} 