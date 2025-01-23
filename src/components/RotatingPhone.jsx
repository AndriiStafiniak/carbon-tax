import { useEffect } from 'react';

// Dodajemy style dla animacji
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes rotatePhone {
    0% {
      transform: rotate(-90deg);
    }
    20% {
      transform: rotate(0deg);
    }
    80% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-90deg);
    }
  }
`;
document.head.appendChild(styleSheet);

export const RotatingPhone = () => (
  <div
    style={{
      fontSize: '48px',
      marginBottom: '30px',
      animation: 'rotatePhone 2s infinite ease-in-out'
    }}
  >
    📱
  </div>
); 