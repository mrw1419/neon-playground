// EntityDebugOverlay.tsx
// Global debug overlay for inspecting entities
import React from 'react';

export interface EntityDebugOverlayProps {
  entities: Array<{
    id: string;
    type: string;
    x: number;
    y: number;
    radius?: number;
    [key: string]: any;
  }>;
}

export const EntityDebugOverlay: React.FC<EntityDebugOverlayProps> = ({ entities }) => (
  <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100vw', height: '100vh', zIndex: 9999 }}>
    {entities.map((entity, idx) => (
      <div
        key={`${entity.id}-${idx}`}
        style={{
          position: 'absolute',
          left: entity.x,
          top: entity.y,
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          fontSize: '12px',
          padding: '2px 6px',
          borderRadius: '4px',
          transform: 'translate(-50%, -120%)',
          zIndex: 9999,
        }}
      >
        <strong>{entity.type}</strong> (ID: {entity.id})<br />
        x: {Math.round(entity.x)}, y: {Math.round(entity.y)}<br />
        {entity.radius !== undefined && <>radius: {entity.radius}<br /></>}
        {/* Add more fields as needed */}
      </div>
    ))}
  </div>
);
