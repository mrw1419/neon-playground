import { getPlanetTheme } from '../../utils/getPlanetTheme';
// CratersOverlayVisual.tsx
// Reusable craters overlay for planets and moons
import React from 'react';

export interface CratersOverlayVisualProps {
  color?: string;
  colorTheme?: string;
  radius?: number;
  x?: number;
  y?: number;
  opacity?: number;
}

export const CratersOverlayVisual: React.FC<CratersOverlayVisualProps> = ({ color, colorTheme, radius = 10, x = 0, y = 0, opacity = 0.7 }) => {
    // ...existing code...
  const theme = getPlanetTheme(colorTheme);
  const shadowColor = theme.dark;
  const offset = radius * 0.15;
  const maskId = `crater-mask-${x}-${y}-${radius}`;
  return (
    <g>
      {/* Crescent shape only, using theme.dark */}
      <mask id={maskId}>
        <rect x={x - radius * 2} y={y - radius * 2} width={radius * 4} height={radius * 4} fill="white" />
        <circle cx={x} cy={y} r={radius} fill="black" />
      </mask>
      <circle
        cx={x + offset}
        cy={y + offset}
        r={radius}
        fill={shadowColor}
        opacity={opacity * 0.7}
        mask={`url(#${maskId})`}
      />
    </g>
  );
};
