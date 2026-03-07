// RippleEffectorVisual.tsx
// Reusable ripple visual effect for radial effectors
import React from 'react';

export interface RippleEffectorVisualProps {
  position?: { x: number; y: number };
  size?: number;
  color?: string;
  opacity?: number;
}

export const RippleEffectorVisual: React.FC<RippleEffectorVisualProps> = ({ position = { x: 0, y: 0 }, size = 60, color = '#80d8ff', opacity = 0.7 }) => (
  <svg style={{ position: 'absolute', left: position.x - size / 2, top: position.y - size / 2, pointerEvents: 'none' }} width={size} height={size}>
    <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} stroke={color} strokeWidth="4" fill="none" opacity={opacity} />
    <circle cx={size / 2} cy={size / 2} r={size / 3} stroke={color} strokeWidth="2" fill="none" opacity={opacity ? opacity * 0.5 : 0.35} />
  </svg>
);
