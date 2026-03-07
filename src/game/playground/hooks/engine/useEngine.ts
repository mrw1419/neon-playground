// Engine domain hook: useEngine
// Orchestrates engine actions (tick, state updates, etc.)
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function useEngine(engine: any) {
  // Accepts engine action and pointer event for engine logic
  return (action: string, payload?: any, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for engine actions (e.g., targeted updates)
    // Example: engine.performAction(action, payload, pointer)
    engine.performAction(action, payload);
  };
}
