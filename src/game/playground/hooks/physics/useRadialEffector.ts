import { useCallback } from 'react';
import { addEffect, removeEffect } from '../../state/effectStore';
import { setEffectorCooldown, $effectorCooldowns } from '../../state/effectorStore';
import { useUnit } from 'effector-react';
import { registry } from '../../../../content/registry';

/**
 * useRadialEffector
 * Generic hook for triggering any radial effector (burst, ripple, trail, gravity, etc.)
 * Looks up config/visual in registry by effectorKey.
 *
 * Usage:
 *   const triggerEffector = useRadialEffector(engine, effectorSystem);
 *   triggerEffector('burst', { position, radius, power }, event);
 */
export function useRadialEffector(engine?: any, effectorSystem?: any) {
  const effectorCooldowns = useUnit($effectorCooldowns);
  return useCallback((effectorKey: string, config: any, event?: any) => {
    const now = Date.now();
    const cooldownEnd = effectorCooldowns[effectorKey] || 0;
    if (now < cooldownEnd) {
      // On cooldown, block trigger
      return;
    }
    const effectorType = registry.effectorTypes[effectorKey.toLowerCase()];
    if (!effectorType) {
      console.warn(`🛑 [useRadialEffector] Unknown effector type: ${effectorKey}`);
      return;
    }
    // Add effect to effectStore (for visuals/overlays)
    const effectId = `${effectorKey}-${now}`;
    const effect = {
      id: effectId,
      type: effectorKey,
      ...config,
      createdAt: now,
    };
    addEffect(effect);
    // Lookup duration from registry/type (fallback to 1200ms if missing)
    let duration = 1200;
    switch (effectorKey) {
      case 'burst':
        duration = 1200;
        break;
      case 'ripple':
        duration = 2000;
        break;
      case 'gravity':
        duration = 2500;
        break;
      case 'nudge':
        duration = 400;
        break;
      default:
        duration = 1200;
    }
    // Set cooldown for this effector type
    setEffectorCooldown({ effectorKey, cooldownEnd: now + duration });
    setTimeout(() => removeEffect(effectId), duration);
    setTimeout(() => setEffectorCooldown({ effectorKey, cooldownEnd: 0 }), duration); // Clear cooldown after duration
    // Optionally trigger physics/engine logic here
    if (effectorSystem && typeof effectorSystem.triggerEffector === 'function') {
      effectorSystem.triggerEffector(effectorKey, config, event);
    } else if (engine && typeof engine.triggerEffector === 'function') {
      engine.triggerEffector(effectorKey, config, event);
    }
    // Add more extensibility as needed
  }, [engine, effectorSystem, effectorCooldowns]);
}
