// PlanetBase.tsx
// Reusable base shape for planets and round cosmic objects
import React from 'react';

export interface PlanetBaseProps {
  color?: string;
  radius?: number;
}

export const PlanetBase: React.FC<PlanetBaseProps> = ({ color, radius = 40 }) => (
  <circle cx={0} cy={0} r={radius} fill={color} />
);
