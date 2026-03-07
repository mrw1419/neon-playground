// src/content/registry.ts
// Central registry for entities, effectors, and tools
// Only visuals and classes are registered here. Engine never imports this file.

import { ColinEntity } from './entity/colin/ColinEntity';
import { PlanetEntity } from './entity/planet/PlanetEntity';
import { ColinVisual } from './entity/colin/ColinVisual';
import { PlanetVisual } from './entity/planet/PlanetVisual';
import * as PlanetVisuals from './effects/planetvisuals';
import * as RadialEffectorVisuals from './effects/radialeffector';
import * as PreviewOverlays from './effects/previewOverlay';
import * as InfoOverlays from './effects/infoOverlay';
// Placeholder imports for future visuals:
// import { GravityEffectorVisual } from './effects/radialeffector/GravityEffectorVisual';
// import { NudgeEffectorVisual } from './effects/radialeffector/NudgeEffectorVisual';
// Add other effectors and visuals as needed

export interface EffectorTypeVisuals {
  visual: React.FC<any>;
  previewOverlay: React.FC<any>;
  infoOverlay: React.FC<any>;
  overlay: React.FC<any>;
  glow: React.FC<any>;
}

export interface Registry {
  entityTypes: Record<string, any>;
  effectorTypes: Record<string, EffectorTypeVisuals>;
  toolTypes: Record<string, any>;
}

export const registry: Registry = {
  entityTypes: {
    planet: {
      class: PlanetEntity,
      visual: PlanetVisual,
      previewOverlay: PreviewOverlays.PlanetPreviewOverlay,
      overlays: {
        rocky: PlanetVisuals.RockyOverlayVisual,
        craters: PlanetVisuals.CratersOverlayVisual,
        cracks: PlanetVisuals.CracksOverlayVisual,
        aura: PlanetVisuals.PlanetAura,
      },
      infoOverlay: InfoOverlays.EntityInfoOverlayVisual,
    },
    colin: {
      class: ColinEntity,
      visual: ColinVisual,
      previewOverlay: PreviewOverlays.ColinPreviewOverlay,
      infoOverlay: InfoOverlays.EntityInfoOverlayVisual,
    },
    // Add more entities as needed
  },
  effectorTypes: {
    burst: {
      visual: RadialEffectorVisuals.BurstEffectorVisual,
      previewOverlay: PreviewOverlays.EffectorPreviewOverlay,
      infoOverlay: InfoOverlays.EffectorInfoOverlayVisual,
      overlay: RadialEffectorVisuals.OverlayEffect,
      glow: RadialEffectorVisuals.GlowEffect,
    },
    ripple: {
      visual: RadialEffectorVisuals.RippleEffectorVisual,
      previewOverlay: PreviewOverlays.EffectorPreviewOverlay,
      infoOverlay: InfoOverlays.EffectorInfoOverlayVisual,
      overlay: RadialEffectorVisuals.OverlayEffect,
      glow: RadialEffectorVisuals.GlowEffect,
    },
    trail: {
      visual: RadialEffectorVisuals.TrailEffectorVisual,
      previewOverlay: PreviewOverlays.EffectorPreviewOverlay,
      infoOverlay: InfoOverlays.EffectorInfoOverlayVisual,
      overlay: RadialEffectorVisuals.OverlayEffect,
      glow: RadialEffectorVisuals.GlowEffect,
    },
    gravity: {
      visual: RadialEffectorVisuals.GravityEffectorVisual,
      previewOverlay: PreviewOverlays.EffectorPreviewOverlay,
      infoOverlay: InfoOverlays.EffectorInfoOverlayVisual,
      overlay: RadialEffectorVisuals.OverlayEffect,
      glow: RadialEffectorVisuals.GlowEffect,
    },
    // Add gravity, nudge, etc. as needed
  },
  toolTypes: {
    interact: {
      previewOverlay: PreviewOverlays.ToolPreviewOverlay,
    },
    // Add move, delete, preview tools as needed
  },
};

// Visuals are modular and extensible for new variants and VFX overlays.
// Reference the data sheets for onboarding and cross-linking.
// NOTE: Only the game layer should import this registry. Engine and content must not import from game.
// This ensures clean separation and prevents circular dependencies.
