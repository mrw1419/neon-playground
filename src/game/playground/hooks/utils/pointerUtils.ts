// Unified pointer event utility for Neon Playground hooks
// Handles both mouse and touch events for consistent input abstraction

export function getPointerPosition(e: MouseEvent | TouchEvent): { x: number; y: number } | null {
  if ('touches' in e && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  } else if ('clientX' in e && 'clientY' in e) {
    return {
      x: (e as MouseEvent).clientX,
      y: (e as MouseEvent).clientY,
    };
  }
  return null;
}

// Usage example:
// import { getPointerPosition } from './utils/pointerUtils';
// const { x, y } = getPointerPosition(event) || { x: 0, y: 0 };
