// Entity domain hook: useEntityManager
// Orchestrates entity management actions (add, remove, update, etc.)
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function useEntityManager(engine: any) {
  // Accepts entity action, entityId, and pointer event for entity management logic
  return (action: string, entityId: any, payload?: any, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for entity management (e.g., targeted updates)
    // Example: engine.manageEntity(action, entityId, payload, pointer)
    engine.manageEntity(action, entityId, payload);
  };
}
