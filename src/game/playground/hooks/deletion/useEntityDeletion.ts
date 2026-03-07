// Deletion domain hook: useEntityDeletion
// Orchestrates entity removal via engine.removeEntity
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function useEntityDeletion(engine: any) {
  // Accepts entityId and optional pointer event for deletion logic
  return (entityId: any, e?: MouseEvent | TouchEvent) => {
    let pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for hit-testing or overlay feedback
    // (actual deletion logic may not need pointer, but included for extensibility)
    engine.removeEntity(entityId);
  };
}
