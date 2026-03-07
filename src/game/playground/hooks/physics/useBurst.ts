import { addEffect } from '../../state/effectStore';
// Depreciated: This file can be deleted.
// Physics domain hook: useBurst
// Orchestrates burst effector actions via engine/effect system
// Supports unified pointer abstraction (mouse/touch)

import { getPointerPosition } from '../utils/pointerUtils';

export function useBurst(engine: any, effectorSystem: any) {
  // Accepts burst config and pointer event for burst logic
  return (config: any, e?: MouseEvent | TouchEvent) => {
    const pointer = e ? getPointerPosition(e) : null;
    // Use pointer position if available
    const position = pointer || config.position;
    // Trigger burst effect via effectorSystem (physics)
    if (effectorSystem && typeof effectorSystem.triggerBurst === 'function') {
      effectorSystem.triggerBurst({ ...config, position });
    } else if (effectorSystem && typeof effectorSystem.enqueueBurst === 'function') {
      // Fallback for legacy API
      effectorSystem.enqueueBurst({ ...config, position });
    } else {
      console.warn('No triggerBurst or enqueueBurst method found on effectorSystem:', effectorSystem);
    }

    // Add visual burst effect to effectStore
    // Import addEffect from effectStore
    // (import at top: import { addEffect } from '../../state/effectStore';)
    if (position) {
      const id = `burst-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const effect = {
        id,
        type: 'burst',
        position,
        radius: config.radius || 60,
        color: config.color || '#fff176',
        createdAt: Date.now(),
      };
      // @ts-ignore: addEffect is imported at top
      addEffect(effect);
    }
  };
}
