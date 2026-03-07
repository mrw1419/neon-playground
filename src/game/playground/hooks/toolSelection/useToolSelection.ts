// Tool selection domain hook: useToolSelection
// Manages active tool enum for UI
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function useToolSelection() {
  // Accepts tool name and pointer event for tool selection logic
  return (toolName: string, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for tool selection, overlay feedback, or UI logic
    // Tool selection state logic here (e.g., set active tool based on pointer)
    // ...implementation...
  };
}
