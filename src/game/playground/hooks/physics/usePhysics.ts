// Physics domain hook: usePhysics
// Orchestrates physics actions (step, update, apply force, etc.)
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function usePhysics(physicsEngine: any) {
  // Accepts physics action, payload, and pointer event for physics logic
  return (action: string, payload?: any, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for physics actions (e.g., targeted force application)
    // Example: physicsEngine.performAction(action, payload, pointer)
    physicsEngine.performAction(action, payload);
  };
}
