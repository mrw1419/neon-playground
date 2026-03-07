// RockyOverlayVisual.tsx
// Visually creative rocky overlay for planets and asteroids
import React from 'react';
import { getPlanetTheme } from '../../utils/getPlanetTheme';

export interface RockyOverlayVisualProps {
  color?: string;
  radius?: number;
  opacity?: number;
  theme?: string;
}

function getThemeColors(theme: string) {
  const t = getPlanetTheme(theme);
  return {
    main: t.primary,
    highlight: t.light,
    shadow: t.dark,
  };
}

export const RockyOverlayVisual: React.FC<RockyOverlayVisualProps> = ({ color, radius = 40, opacity = 0.5, theme = 'earth' }) => {
  const { main, highlight, shadow } = getThemeColors(theme);
  // Use color prop if provided, else theme color
  const fill = color || main;

  // Generate several jagged rocky shapes
  const rocks = Array.from({ length: 6 }).map((_, i) => {
    // Randomize jaggedness
    const angle = (i / 6) * 2 * Math.PI + Math.random() * 0.2;
    const rx = radius * (0.7 + Math.random() * 0.25);
    const ry = radius * (0.5 + Math.random() * 0.2);
    const rot = angle * (180 / Math.PI);
    const x = Math.cos(angle) * radius * 0.5;
    const y = Math.sin(angle) * radius * 0.5;
    return (
      <ellipse
        key={i}
        cx={x}
        cy={y}
        rx={rx}
        ry={ry}
        fill={i % 2 === 0 ? fill : shadow}
        opacity={opacity * (0.7 + Math.random() * 0.3)}
        transform={`rotate(${rot} ${x} ${y})`}
      />
    );
  });

  // Add a highlight shape for extra roughness
  const highlightShape = (
    <ellipse
      cx={0}
      cy={-radius * 0.3}
      rx={radius * 0.45}
      ry={radius * 0.18}
      fill={highlight}
      opacity={opacity * 0.4}
    />
  );

  return (
    <g>
      {rocks}
      {highlightShape}
    </g>
  );
};
