// Placement domain hook: useColin
// Orchestrates Colin entity placement via engine.spawnEntity
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function useColin(engine: any) {
  // Accepts pointer event and optional config, extracts coordinates for Colin placement
  return (config: any = {}, e?: MouseEvent | TouchEvent) => {
    let pointer = e ? getPointerPosition(e) : null;
    const finalConfig = pointer ? { ...config, position: pointer } : config;
    engine.spawnEntity('colin', finalConfig);
  };
}
