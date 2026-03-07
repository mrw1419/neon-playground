// Earth.ts
// Starter variant config for Earth

import { PlanetRegistryEntry } from '../PlanetRegistry';

export const EarthVariant: PlanetRegistryEntry = {
  id: 'earth',
  name: 'Earth',
  parentType: 'Rocky',
  overlays: ['Rocky', 'Craters', 'Cracked'],
  visuals: [
    'effects/planetvisuals/PlanetBase',
    'effects/planetvisuals/PlanetAura',
    'effects/planetvisuals/RockyOverlayVisual',
    'effects/planetvisuals/CratersOverlayVisual',
  ],
  stats: { mass: 1.0, radius: 1.0, durability: 1.0, energy: 0.5, drag: 0.1 },
  colorTheme: 'earth',
  weight: 1,
  description: 'Earth-like planet with water, rocky, and crater overlays; themeable.'
};
