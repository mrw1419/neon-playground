// PlanetRegistry.ts
// Simple registry for planet entity configs (modular, extensible)

import { PlanetEntityOptions } from './PlanetEntity';

export interface PlanetRegistryEntry extends PlanetEntityOptions {
  id: string;
  name: string;
  weight?: number;
  description?: string;
}

export const PlanetRegistry: PlanetRegistryEntry[] = [
  {
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
  },
  // Add more planet configs here
];

export function getPlanetById(id: string): PlanetRegistryEntry | undefined {
  return PlanetRegistry.find(p => p.id === id);
}
