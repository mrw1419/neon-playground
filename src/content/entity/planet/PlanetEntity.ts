// Factory function to create planet entities
export function createEntities(engine: any): PlanetEntity[] {
  // Randomization helpers
  const parentTypes = ['Rocky', 'Gas', 'Ice', 'Lava'];
  const colorThemes = Object.keys(NEON_THEMES);
  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * 600 + 50), // adjust bounds as needed
    y: Math.floor(Math.random() * 400 + 50)
  });
  // Example: create N random planets
  const numPlanets = 3;
  const planets: PlanetEntity[] = [];
  for (let i = 0; i < numPlanets; i++) {
      // Diagnostic log for infoOverlayEnabled and type
      console.log(`🧪 [PlanetEntity] Debug: Will create entity with type=${'planet'}, infoOverlayEnabled=${true}`);
    const parentType = getRandom(parentTypes);
    const orbitalAttraction = parentType === 'Gas' ? 2.0 : 1.0;
    const canOrbit = parentType !== 'Lava';
    const canBeOrbited = parentType !== 'Ice';
    // Pick a valid colorTheme
    const validColorThemes = colorThemes.filter(t => typeof t === 'string');
    const colorTheme = getRandom(validColorThemes);
    if (!colorTheme || !colorThemes.includes(colorTheme)) {
      console.warn('⚠️ [PlanetEntity] Invalid or missing colorTheme for planet. Defaulting to "red".', { colorTheme });
    }
    const finalColorTheme = colorThemes.includes(colorTheme) ? colorTheme : 'red';
    console.log('🪐 [PlanetEntity] Creating planet entity', {
      position: getRandomPosition(),
      radius: Math.floor(Math.random() * 30 + 30),
      colorTheme: finalColorTheme,
      parentType,
      overlays: ['craters'],
      stats: { orbitalAttraction },
      canOrbit,
      canBeOrbited,
      infoOverlayEnabled: true,
    });
    planets.push(new PlanetEntity({
      position: getRandomPosition(),
      radius: Math.floor(Math.random() * 30 + 30),
      colorTheme: finalColorTheme,
      parentType,
      overlays: ['craters'],
      stats: { orbitalAttraction },
      canOrbit,
      canBeOrbited,
      infoOverlayEnabled: true,
    }));
    // Defensive: ensure infoOverlayEnabled is set on the instance
    if (planets.length > 0) {
      planets[planets.length - 1].infoOverlayEnabled = true;
    }
  }
  return planets;
}
// PlanetEntity.ts
// Entity class for planets, extends the engine's BaseEntity class

import { BaseEntity, EntityInitOptions } from '../../../engine/entities/BaseEntity';
import { NEON_THEMES } from '../../../styles/neonThemes';

export interface PlanetEntityOptions extends EntityInitOptions {
  position?: { x: number; y: number };
  radius?: number;
  parentType?: string;
  overlays?: string[];
  visuals?: string[];
  stats?: Record<string, number>;
  colorTheme?: string;
  canOrbit?: boolean;
  canBeOrbited?: boolean;
  infoOverlayEnabled?: boolean;
  type?: string;
  craters?: Array<{ x: number; y: number; radius: number }>;
}

export class PlanetEntity extends BaseEntity {
  position: { x: number; y: number };
  radius: number;
  parentType: string;
  overlays: string[];
  visuals: string[];
  stats: Record<string, number>;
  colorTheme: string;
  canOrbit?: boolean;
  canBeOrbited?: boolean;
  infoOverlayEnabled: boolean;
  type: string;
  craters: Array<{ x: number; y: number; radius: number }>;

  constructor(options: PlanetEntityOptions = {}) {
    super(options);
    // Always set type to 'planet' for registry lookup
    this.type = options.type || 'planet';
    this.parentType = options.parentType || 'Rocky';
    this.overlays = options.overlays || [];
    this.visuals = options.visuals || [];
    this.stats = options.stats || {};
    const validThemes = Object.keys(NEON_THEMES);
    if (options.colorTheme && validThemes.includes(options.colorTheme)) {
      this.colorTheme = options.colorTheme;
    } else {
      // fallback to a random valid theme
      this.colorTheme = validThemes[Math.floor(Math.random() * validThemes.length)];
    }
    this.position = options.position || { x: 0, y: 0 };
    this.radius = options.radius || 40;
    this.canOrbit = options.canOrbit;
    this.canBeOrbited = options.canBeOrbited;
    this.infoOverlayEnabled = options.infoOverlayEnabled !== undefined ? options.infoOverlayEnabled : true;
    this.craters = options.craters || [];
  }

  update(dt?: number): void {
    // ...planet-specific update logic...
    super.update(dt);
  }

  // Optionally override render or add planet-specific methods as needed
}
