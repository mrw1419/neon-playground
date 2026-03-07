// RadialEffectorRegistry.ts
//
// Future ideas:
// - Define base configs for radial effector scaling tiers (xs, sm, md, lg, xl, xxl)
//   e.g. power, radius, color, duration, etc. for each size
// - Use these base configs as parent types for all radial effector variants (burst, ripple, gravity, nudge, etc.)
// - Allow each variant to multiply/override base values for custom behavior
// - Centralize all scaling logic and shared constants here for easy tuning and expansion
// - Reference these configs from the main registry and effect logic for DRY, extensible design
//
// RadialEffectorRegistry.ts
// Registry for radial effectors (MVP: Burst)

export interface RadialEffectorEntry {
  id: string;
  parentType: 'Radial';
  type: string;
  variation: string;
  visual: string;
  overlay?: string;
  description?: string;
}

export const RadialEffectorRegistry: RadialEffectorEntry[] = [
  {
    id: 'burst',
    parentType: 'Radial',
    type: 'burst',
    variation: 'MVP default',
    visual: 'effects/radialeffector/BurstEffectorVisual',
    overlay: 'effects/radialeffector/OverlayEffect',
    description: 'Core burst radial effector (MVP)',
  },
  {
    id: 'ripple',
    parentType: 'Radial',
    type: 'ripple',
    variation: 'MVP default',
    visual: 'effects/radialeffector/RippleEffectorVisual',
    overlay: 'effects/radialeffector/OverlayEffect',
    description: 'Core ripple radial effector (MVP)',
  },
  {
    id: 'gravity',
    parentType: 'Radial',
    type: 'gravity',
    variation: 'MVP default',
    visual: 'effects/radialeffector/GlowEffect',
    overlay: 'effects/radialeffector/OverlayEffect',
    description: 'Core gravity radial effector (MVP)',
  },
  {
    id: 'nudge',
    parentType: 'Radial',
    type: 'nudge',
    variation: 'MVP default',
    visual: 'effects/radialeffector/GlowEffect',
    overlay: 'effects/radialeffector/OverlayEffect',
    description: 'Core nudge radial effector (MVP)',
  },
];
