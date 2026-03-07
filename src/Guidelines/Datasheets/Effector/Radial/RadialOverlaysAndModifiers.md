──────────────────────────────
RADIAL EFFECTOR OVERLAYS & MODIFIERS REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

# Overlays and Modifiers for Radial Effectors (Burst, Gravity, Ripple, Nudge)
# Use this registry to define all visual overlays, effect stacking, and special modifiers that can be applied to radial effectors.

- id: ShockwaveOverlay
  type: visual-overlay
  tags: [burst, shockwave, animated, themeable]
  compatibleEffectors: [Burst]
  themeKeys: [cyan, magenta, red, yellow, orange]
  description: Adds a secondary expanding ring with glow and particle burst.
  stackable: true
  crossLinks: [BurstVisual, RadialEffector]

- id: VortexOverlay
  type: visual-overlay
  tags: [gravity, vortex, animated, themeable]
  compatibleEffectors: [Gravity]
  themeKeys: [purple, blue, cyan, black]
  description: Adds a swirling vortex or spiral effect to the gravity field.
  stackable: false
  crossLinks: [GravityVisual, RadialEffector]

- id: RippleTrailModifier
  type: effect-modifier
  tags: [ripple, trail, animated]
  compatibleEffectors: [Ripple]
  themeKeys: [blue, cyan, magenta, white]
  description: Leaves a fading trail behind each ripple wave.
  stackable: true
  crossLinks: [RippleVisual, RadialEffector]

- id: PrecisionBoost
  type: effect-modifier
  tags: [nudge, precision, gameplay]
  compatibleEffectors: [Nudge]
  themeKeys: [yellow, orange, red, cyan]
  description: Increases accuracy and reduces spread for directional nudges.
  stackable: false
  crossLinks: [NudgeVisual, RadialEffector]

──────────────────────────────
# Place this registry in /Guidelines/Datasheets/Effector/Radial/ as RadialOverlaysAndModifiers.md
# Cross-link to this registry from all effector data sheets for consistency and extensibility.
──────────────────────────────
