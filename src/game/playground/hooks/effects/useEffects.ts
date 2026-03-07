// Effects domain hook: useEffects
// Orchestrates effect actions (visual, overlay, or non-physics) via effect system
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function useEffects(effectorSystem: any) {
  // Accepts effect config and pointer event for effect logic
  return (config: any, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for effect location, overlay, or feedback
    // Example: config.position = pointer if needed
    // Trigger effect via effectorSystem
    effectorSystem.triggerEffect(config);
  };
}
