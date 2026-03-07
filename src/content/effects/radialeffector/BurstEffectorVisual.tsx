/**
 * BurstEffectorVisual.tsx
 *
 * CANONICAL burst effect visual for the playground game.
 *
 * - Pure visual: receives all data via props, no engine mutation.
 * - Used ONLY for rendering the animated burst effect (not overlays or diagnostics).
 * - Should be the only burst visual referenced in effect rendering logic.
 * - Do NOT use for overlays, stats, or info—see EffectorOverlayVisual for that purpose.
 *
 * This separation ensures visuals and overlays remain decoupled and maintainable.
 */
// This is the sole radial effector visual. Engine drives behavior.
// BurstEffectorVisual.tsx
// Reusable burst visual effect for radial effectors (e.g., burst, sun explosion, muzzle flash)
import React from 'react';
import { NEON_THEMES } from '../../../styles/neonThemes';

// Simple placeholder burst visual: absolutely positioned SVG circle at (x, y)
export interface BurstEffectorVisualProps {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  opacity?: number;
}

export const BurstEffectorVisual: React.FC<BurstEffectorVisualProps> = ({ x, y, radius = 30, color = '#fff176', opacity = 0.3 }) => (
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
