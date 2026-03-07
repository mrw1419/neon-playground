// Placement domain hook: usePlanetPlacement
// Orchestrates entity placement via engine.spawnEntity
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';
import { generateRandomPlanetVisuals } from '../../../../content/entity/planet/generateRandomPlanetVisuals';

export function usePlanetPlacement(engine: any) {
  // Accepts config and pointer event for placement logic
  return (config: any, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for placement, hit-testing, or overlay feedback
    // Example: config.position = pointer if needed
    // Only generate random visuals if not provided
    const visualProps = (!config.colorTheme || !config.craters) && config.radius
      ? generateRandomPlanetVisuals(config.radius)
      : {};
    engine.spawnEntity('planet', { ...config, ...visualProps });
  };
}
