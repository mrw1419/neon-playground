// PlanetAura.tsx
// Reusable aura/glow for planets and cosmic objects
import React from 'react';

export interface PlanetAuraProps {
  color?: string;
  radius?: number;
  opacity?: number;
}

export const PlanetAura: React.FC<PlanetAuraProps> = ({ color, radius = 50, opacity = 0.2 }) => (
  <circle cx={0} cy={0} r={radius} fill={color} opacity={opacity} />
);
