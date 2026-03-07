import React from "react";
import { useEngineContext } from "../../context/EngineContext";
import { useEffectContext } from "../../context/EffectContext";
import { EntityInfoOverlayVisual } from "../../../content/effects/infoOverlay/entityInfoOverlay/EntityInfoOverlayVisual";
import { EffectorInfoOverlayVisual } from "../../../content/effects/infoOverlay/effectorInfoOverlay/EffectorInfoOverlayVisual";
import { registry } from '../../../content/registry';
import { useUnit } from 'effector-react';
import { $effectorPreview } from '../state/effectorStore';
import { $entities } from '../../state/entityStore';
import { $effects } from '../state/effectStore';
import { $effectorCooldowns } from '../state/effectorStore';
import { useToolSelection } from '../hooks/toolSelection/useToolSelection';
import { useColin } from '../hooks/placement/useColin';

/**
 * OverlayLayer
 * Pure UI overlays for entity and effector info.
 * No mutation, no engine/content logic.
 */
export interface OverlayLayerProps {
  selectedEffect: string | null;
  selectedObject: string | null;
  selectedInteract: string | null;
  powerValue: number;
  activeTab: string;
  pointerOverPanel: boolean;
}

export const OverlayLayer: React.FC<OverlayLayerProps> = React.memo(({
  selectedEffect,
  selectedObject,
  selectedInteract,
  powerValue,
  activeTab,
  pointerOverPanel,
}) => {
  const engine = useEngineContext();
  const effectorSystem = useEffectContext();

  // Use Effector store for reactivity
  const entities = useUnit($entities);
  // Get all active effects (bursts, etc.)
  const effects = useUnit($effects);
  const effectorCooldowns = useUnit($effectorCooldowns);
  const now = Date.now();
  const cooldownEnd = selectedEffect ? effectorCooldowns[selectedEffect.toLowerCase()] || 0 : 0;
  const cooldownActive = now < cooldownEnd;
  const cooldownDuration = cooldownEnd - now > 0 ? cooldownEnd - now : 0;

  const toolSelection = useToolSelection();
  const colinPlacement = useColin(engine);

  // Use effector preview store for preview overlays
  const effectorPreview = useUnit($effectorPreview);
  // Dynamically get the preview overlay from the registry for the selected effect
  const EffectorPreviewOverlay = selectedEffect && registry.effectorTypes[selectedEffect.toLowerCase()]?.previewOverlay;
  const showEffectorPreview = activeTab === 'effects' && selectedEffect && effectorPreview.position && !pointerOverPanel;
  const effectorPreviewProps = {
    previewPos: effectorPreview.position ?? { x: 0, y: 0 },
    previewRadius: effectorPreview.radius ?? 60,
    previewActive: showEffectorPreview,
    selectedEffector: selectedEffect || '',
    cooldownActive,
    cooldownDuration,
    cooldownEnd,
  };

  return (
    <>
      {/* Effector Preview Overlay (for any effector) */}
      {EffectorPreviewOverlay && showEffectorPreview && (
        <EffectorPreviewOverlay {...effectorPreviewProps} />
      )}
      {/* Info overlays for entities */}
      <EntityInfoOverlayVisual
        entities={entities.filter(e => e.type === 'planet' && e.infoOverlayEnabled).map(e => ({
          id: e.id,
          type: e.type,
          x: e.position?.x ?? 0,
          y: e.position?.y ?? 0,
          radius: e.radius,
          ...e.previewProps,
          body: e.body,
        }))}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
          zIndex: 1000 // Lower than PlaygroundControlPanel (zIndex: 9999)
        }}
      />
      {/* Info overlays for all effectors */}
      <EffectorInfoOverlayVisual
        effectors={effects.map(e => ({
          ...e,
          id: e.id,
          type: e.type,
          x: e.position?.x ?? 0,
          y: e.position?.y ?? 0,
          radius: e.radius,
          power: e.power,
        }))}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
          zIndex: 1001 // Above entity overlays, below control panel
        }}
      />
    </>
  );
});
