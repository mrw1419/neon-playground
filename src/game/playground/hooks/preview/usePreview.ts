// Preview domain hook: usePreview
// Orchestrates preview overlay actions (placement, drag, info, etc.)
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function usePreview(overlayManager: any) {
  // Accepts preview config and pointer event for preview logic
  return (config: any, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Optionally use pointer position for preview overlay placement or feedback
    // Example: config.position = pointer if needed
    overlayManager.showPreview(config);
  };
}
