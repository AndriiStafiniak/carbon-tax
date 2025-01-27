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
  const { active, progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!active && !show) return null;

  return (
    <Html center>
      <div style={{
        color: 'white',
        fontSize: '3em',
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        background: 'rgba(0,0,0,0.85)',
        padding: '30px 40px',
        borderRadius: '15px',
        textAlign: 'center',
        letterSpacing: '2px',
        fontWeight: '600',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
} 