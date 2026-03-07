// Overlay domain hook: useOverlayManager
// Manages pure UI state for overlays
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function useOverlayManager() {
  // Accepts overlay type and pointer event for overlay logic
  return (overlayType: string, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for overlay placement, preview, or info overlays
    // Overlay state logic here (e.g., show/hide overlays based on pointer)
    // ...implementation...
  };
}
