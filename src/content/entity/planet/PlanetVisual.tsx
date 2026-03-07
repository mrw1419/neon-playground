// PlanetVisual.tsx
// Composite planet visual using modular primitives
import React from 'react';

import { PlanetBase } from '../../effects/planetvisuals/PlanetBase';
import { PlanetAura, RockyOverlayVisual, CratersOverlayVisual, CracksOverlayVisual } from '../../effects/planetvisuals';
import { getPlanetTheme } from '../../utils/getPlanetTheme';

export interface Crater {
  x: number;
  y: number;
  radius: number;
}

export interface PlanetVisualProps {
  radius?: number;
  color?: string;
  auraColor?: string;
  overlays?: Array<'rocky' | 'craters' | 'cracks'>;
  overlayColor?: string;
  colorTheme?: string;
  x?: number;
  y?: number;
  craters?: Crater[];
}


export const PlanetVisual: React.FC<PlanetVisualProps> = (props) => {
  const {
    radius = 40,
    overlays = ['rocky', 'craters'],
    colorTheme,
    x = 0,
    y = 0,
  } = props;

  const theme = getPlanetTheme(colorTheme);

  // Pick a random theme if not provided
  const chosenTheme = colorTheme && theme ? colorTheme : undefined;

  const color = theme.primary;
  const auraColor = theme.light;
  const overlayColor = theme.dark;

  const auraPadding = 24; // Extra space for glow
  const boxSize = radius * 2 + auraPadding * 2;
  // Use craters from props (locked in at entity creation)
  const craters = (props.craters || []).map((c: Crater, i: number) => (
    <CratersOverlayVisual
      key={`crater-${i}`}
      colorTheme={colorTheme}
      radius={c.radius}
      x={c.x}
      y={c.y}
      opacity={0.8}
    />
  ));
  return (
    <svg
      width={boxSize}
      height={boxSize}
      style={{ position: 'absolute', left: x - boxSize / 2, top: y - boxSize / 2, pointerEvents: 'none' }}
    >
      <g transform={`translate(${boxSize / 2},${boxSize / 2})`}>
        <PlanetAura color={auraColor} radius={radius + 10} opacity={0.18} />
        <PlanetBase color={color} radius={radius} />
        {craters}
      </g>
    </svg>
  );
};
