// OverlayEffect.tsx
// Reusable overlay visual effect for compositing on top of entities/effects
import React from 'react';

export interface OverlayEffectProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const OverlayEffect: React.FC<OverlayEffectProps> = ({ size = 60, color = '#fff', opacity = 0.3 }) => (
  <svg width={size} height={size}>
    <rect x={size * 0.1} y={size * 0.1} width={size * 0.8} height={size * 0.8} rx={size * 0.1} fill={color} opacity={opacity} />
  </svg>
);
