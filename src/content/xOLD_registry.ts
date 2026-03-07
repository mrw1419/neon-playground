// src/content/registry.ts
// Central registry for entities, effectors, and tools
// Only visuals and classes are registered here. Engine never imports this file.

import { PlanetEntity } from './entity/planet/PlanetEntity';
import { PlanetVisual } from './entity/planet/PlanetVisual';
import { ColinEntity } from './entity/colin/ColinEntity';
import { ColinVisual } from './entity/colin/ColinVisual';
import { BurstEffectorVisual } from './effects/radialeffector/BurstEffectorVisual';
import { RippleEffectorVisual } from './effects/radialeffector/RippleEffectorVisual'; // Canonical visual for ripple
import {
  PlanetPreviewOverlay,
  EffectorPreviewOverlay,
  ColinPreviewOverlay,
  ToolPreviewOverlay
} from './effects/previewOverlay';
// Placeholder imports for future visuals:
// import { GravityEffectorVisual } from './effects/radialeffector/GravityEffectorVisual';
// import { NudgeEffectorVisual } from './effects/radialeffector/NudgeEffectorVisual';
// Add other effectors and visuals as needed

export const registry = {
  entityTypes: {
    planet: { class: PlanetEntity, visual: PlanetVisual, previewOverlay: PlanetPreviewOverlay },
    colin: { class: ColinEntity, visual: ColinVisual, previewOverlay: ColinPreviewOverlay },
  },
  effectorTypes: {
    burst: {
      visual: BurstEffectorVisual, // Canonical visual for burst effector
      previewOverlay: EffectorPreviewOverlay,
      // See Datasheets/Effector/Radial/Burst for config and extensibility
    },
    ripple: {
      visual: RippleEffectorVisual, // Canonical visual for ripple effector
      previewOverlay: EffectorPreviewOverlay,
      // See Datasheets/Effector/Radial/Ripple for config and extensibility
    },
    gravity: {
      visual: undefined, // Placeholder for future gravity effector visual
      previewOverlay: EffectorPreviewOverlay,
      // See Datasheets/Effector/Radial/Gravity for config and extensibility
    },
    nudge: {
      visual: undefined, // Optional, for future soft burst/nudge variant
      previewOverlay: EffectorPreviewOverlay,
      // See Datasheets/Effector/Radial/Nudge for config and extensibility
    },
  },
  toolTypes: {
    interact: {
      previewOverlay: ToolPreviewOverlay,
    },
  },
};

// Visuals are modular and extensible for new variants and VFX overlays.
// Reference the data sheets for onboarding and cross-linking.
// NOTE: Only the game layer should import this registry. Engine and content must not import from game.
// This ensures clean separation and prevents circular dependencies.
