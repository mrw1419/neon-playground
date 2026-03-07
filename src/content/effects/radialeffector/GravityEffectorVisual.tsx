import React from 'react';

export const GravityEffectorVisual: React.FC<{ position: { x: number; y: number }; radius: number; color?: string; opacity?: number }>
  = ({ position, radius, color = '#b39ddb', opacity = 0.7 }) => {
  const size = radius * 2;
  return (
    <svg style={{ position: 'absolute', left: position.x - size / 2, top: position.y - size / 2, pointerEvents: 'none', zIndex: 10 }} width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth="4" fill="none" opacity={opacity} />
      <circle cx={size / 2} cy={size / 2} r={radius * 0.7} stroke={color} strokeWidth="2" fill="none" opacity={opacity ? opacity * 0.5 : 0.35} strokeDasharray="4 4" />
      <circle cx={size / 2} cy={size / 2} r={radius * 0.4} stroke={color} strokeWidth="1.5" fill="none" opacity={opacity ? opacity * 0.3 : 0.2} strokeDasharray="2 6" />
    </svg>
  );
};
