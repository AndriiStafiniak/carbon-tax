import { RotatingPhone } from './RotatingPhone';

export const OrientationMessage = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    textAlign: 'center',
    margin: 0,
    overflow: 'hidden'
  }}>
    <RotatingPhone />
    <div style={{ fontSize: '24px', marginBottom: '20px', padding: '20px', }}>
      Proszę dostosować proporcje ekranu
    </div>
    <div style={{ fontSize: '16px', width: '90%', padding: '20px' }}>
      Dla lepszego doświadczenia, zalecamy korzystanie z aplikacji w proporcji szerokości do wysokości minimum 3:2.
    </div>
  </div>
); 