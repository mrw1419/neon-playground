import React from "react";
import { useEngineContext } from "../../context/EngineContext";
import { registry } from '../../../content/registry';
import { NEON_THEMES } from '../../../styles/neonThemes';
import { EntityInfoOverlayVisual } from '../../../content/effects/infoOverlay/entityInfoOverlay/EntityInfoOverlayVisual';
import { runBoundaryCheck, Boundary } from "../../systems/boundary/BoundarySystem";
import { useUnit } from 'effector-react';
import { $history } from '../../state/entityStore';

/**
 * EntityLayer
 * Iterates engine.entities, resolves visual via registry, renders visual component only.
 * Pure projection layer – no mutation.
 */
export const EntityLayer = React.memo(() => {
  const engine = useEngineContext();
  // Use Effector history store for undo/redo support
  const { present: entities } = useUnit($history);
  // ...existing code...
  if (!entities || entities.length === 0) return null;
  const seenIds = new Set();
  for (const entity of entities) {
    if (!entity.id || seenIds.has(entity.id)) {
      // ...existing code...
      return null;
    }
    seenIds.add(entity.id);
  }

  // Define world boundary (example values, adjust as needed)
  const boundary: Boundary = { xMin: 0, xMax: 1000, yMin: 0, yMax: 800 };
  // Run boundary check before rendering
  if (engine && entities.length > 0) {
    runBoundaryCheck({ entities, removeEntity: engine.removeEntity.bind(engine) }, boundary);
  }

  // Collect info overlay entities
  const infoOverlayEntities = entities
    .filter(e => e.type === 'planet' && e.infoOverlayEnabled)
    .map(e => ({
      id: e.id,
      type: e.type,
      x: e.position?.x ?? 0,
      y: e.position?.y ?? 0,
      radius: e.radius,
      ...e.previewProps,
      body: e.body,
    }));

  return (
    <>
        {entities.map((entity: { type: keyof typeof registry.entityTypes; id: string; [key: string]: any }) => {
        const registryEntry = registry.entityTypes?.[entity.type];
        const Visual = registryEntry?.visual;
        if (!Visual) {
        // ...existing code...
        }
        let visualElement = null;
          const uniqueKey = entity.id;
        if (Visual) {
          if (entity.type === 'planet') {
            // Use colorTheme to look up color from NEON_THEMES
            const theme = NEON_THEMES?.[entity.colorTheme as keyof typeof NEON_THEMES];
            const color = theme?.primary || '#4ecdc4';
            // Use glow as auraColor fallback if 'aura' does not exist
            const auraColor = (theme && 'aura' in theme ? (theme as any).aura : theme?.glow) || color;
            const overlays = entity.overlays?.map((o: string) => o.toLowerCase()) || [];
            // ...existing code...
            visualElement = <Visual
              key={uniqueKey}
              radius={entity.radius}
              color={color}
              auraColor={auraColor}
              overlays={overlays}
              overlayColor={'#b2bec3'}
              colorTheme={entity.colorTheme}
              craters={entity.craters}
              x={entity.position?.x}
              y={entity.position?.y}
              segments={entity.segments}
            />;
          } else if (entity.type === 'colin' && entity.segments) {
            visualElement = <Visual
              key={uniqueKey}
              segments={entity.segments}
              angle={entity.angle}
              isChomping={entity.isChomping}
              overlay={entity.overlay}
              color={entity.color}
              eyeColor={entity.eyeColor}
              mouthColor={entity.mouthColor}
              teethColor={entity.teethColor}
              alternating={entity.alternating}
            />;
          }
        }
        return (
          <React.Fragment key={uniqueKey}>
            {visualElement}
          </React.Fragment>
        );
      })}
      {/* Info overlays are now rendered in OverlayLayer */}
    </>
  );
});
