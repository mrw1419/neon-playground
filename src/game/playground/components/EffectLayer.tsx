import { registry, EffectorTypeVisuals } from "../../../content/registry";
import React from "react";
import { useUnit } from 'effector-react';
import { $effects } from '../state/effectStore';


/**
 * EffectLayer
 * Iterates effectorSystem active effects, uses canonical RadialEffectorVisual.
 * Pure projection layer – no mutation.
 */
export const EffectLayer = React.memo(() => {
  // Use Effector store for all active effects (bursts, ripples, etc.)
  const effects = useUnit($effects);

  return (
    <>
      {effects.map((effect, i) => {
        const registryEntry: EffectorTypeVisuals | undefined = registry.effectorTypes?.[effect.type.toLowerCase?.() ?? effect.type];
        const Visual = registryEntry?.visual;
        // Pass effect position/props to the visual
        let visualElement = null;
        if (Visual && effect.position) {
          // Burst expects x/y, render as before
          if (Visual.displayName === 'BurstEffectorVisual' || Visual.name === 'BurstEffectorVisual') {
            visualElement = (
              <Visual
                key={`${effect.id}-${i}`}
                x={effect.position.x}
                y={effect.position.y}
                radius={effect.radius}
                color={effect.color}
                opacity={effect.opacity}
              />
            );
          } else {
            // All other visuals (Ripple, Trail, Gravity, etc.) now render as absolutely positioned SVGs themselves
            visualElement = (
              <Visual
                key={`${effect.id}-${i}`}
                position={effect.position}
                radius={effect.radius}
                color={effect.color}
                opacity={effect.opacity}
              />
            );
          }
        }
        return visualElement;
      })}
    </>
  );
});
