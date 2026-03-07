import React from 'react';
import { NEON_THEMES } from '../../../styles/neonThemes';

// Simple placeholder trail visual: absolutely positioned SVG circle at (x, y)
export interface TrailEffectorVisualProps {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  opacity?: number;
}

export const TrailEffectorVisual: React.FC<TrailEffectorVisualProps> = ({ x, y, radius = 30, color = 'rgb(255, 118, 118)', opacity = 0.3 }) => (
  <svg
    width={radius * 2}
    height={radius * 2}
    style={{
      position: 'absolute',
      left: x - radius,
      top: y - radius,
      pointerEvents: 'none',
      zIndex: 20,
    }}
  >
    <circle cx={radius} cy={radius} r={radius} fill={color} opacity={opacity} />
  </svg>
);