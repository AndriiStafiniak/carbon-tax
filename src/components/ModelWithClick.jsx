import { memo } from 'react';

export const ModelWithClick = memo(({ children, url }) => {
  return (
    <group
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'auto' }}
    >
      {children}
    </group>
  );
}); 