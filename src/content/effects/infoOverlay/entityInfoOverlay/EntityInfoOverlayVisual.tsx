// EntityInfoOverlayVisual.tsx
// Global overlay visual for entities (cosmic universe)
// Displays entity information such as type, position, radius, velocity, etc.
import React from 'react';

export interface EntityInfoOverlayVisualProps {
  entities: Array<{
    id: string;
    type: string;
    x: number;
    y: number;
    radius?: number;
    [key: string]: any;
  }>;
  style?: React.CSSProperties;
}

export const EntityInfoOverlayVisual: React.FC<EntityInfoOverlayVisualProps> = ({ entities, style }) => {
  // ...existing code...
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', width: '100vw', height: '100vh', zIndex: 2147483647, ...style }}>
      {entities.map((entity, i) => (
        <div
          key={entity.id ? `${entity.id}-${i}` : i}
          style={{
            position: 'absolute',
            left: entity.x,
            top: entity.y,
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            fontSize: '12px',
            fontFamily: "'Rajdhani', 'Exo 2', 'Rubik', 'Inter', sans-serif",
            padding: '2px 6px',
            borderRadius: '4px',
            transform: 'translate(-50%, -120%)',
            zIndex: 9999,
          }}
        >
          <strong>Entity</strong> (Type: {entity.type})<br />
          x: {Math.round(entity.x)}, y: {Math.round(entity.y)}<br />
          {entity.radius !== undefined && <>r: {Number(entity.radius).toFixed(1)}<br /></>}
          {entity.body && entity.body.velocity && (
            <>vel: {entity.body.velocity.x.toFixed(2)}, {entity.body.velocity.y.toFixed(2)}<br /></>
          )}
          {/* Add more fields or visuals as needed */}
        </div>
      ))}
    </div>
  );
};
