// Generic entity placement hook with unified pointer abstraction
import { getPointerPosition } from '../utils/pointerUtils';

export function useEntityPlacement<TConfig>(engine: any) {
  // Accepts pointer event and config, extracts coordinates for placement
  return (entityType: string, config: TConfig, e?: MouseEvent | TouchEvent) => {
    let pointer = e ? getPointerPosition(e) : null;
    // Optionally add pointer position to config if needed
    const finalConfig = pointer ? { ...config, position: pointer } : config;
    engine.spawnEntity(entityType, finalConfig);
  };
}

// Generic entity deletion hook
export function useEntityDeletion<TId>(engine: any) {
  return (entityId: TId) => {
    // Orchestrate entity deletion via engine API
    engine.removeEntity(entityId);
  };
}

// Example usage:
// const placePlanet = useEntityPlacement<PlanetConfig>(engine);
// placePlanet('planet', planetConfig, event);
// const deleteEntity = useEntityDeletion<string>(engine);
// deleteEntity('planet-123');
