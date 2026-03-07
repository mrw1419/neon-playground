// GlowEffect.tsx
// Reusable glow visual effect for highlighting or aura
import React from 'react';

export interface GlowEffectProps {
  size?: number;
  color?: string;
  intensity?: number;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({ size = 60, color = '#fff', intensity = 0.5 }) => (
  <svg width={size} height={size}>
    <circle cx={size / 2} cy={size / 2} r={size / 2 - 4} fill={color} opacity={intensity} />
  </svg>
);
