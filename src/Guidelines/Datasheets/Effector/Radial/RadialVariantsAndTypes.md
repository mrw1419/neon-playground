──────────────────────────────
RADIAL EFFECTOR VARIANTS & TYPES REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

# Registry of all Radial Effector Variants & Types
# Use this registry to define all variants, their properties, themeKeys, compatible entities, triggers, upgradeability, and cross-links.

- id: radial_burst_default
  type: effector-variant
  parentType: radial
  variant: Burst
  geometryMode: full_360
  scaleTier: M
  alignment: neutral
  rarity: common
  tags: [Radial, Impulse, Physics, Upgradable]
  themeKeys: [cyan, magenta, yellow, orange]
  compatibleEntities: [Player, Asteroid, Spaceship, Planet]
  triggers: [UI, Hotkey, EntityDeath, StageEvent]
  upgradeable: true
  baseSize: 500
  crossLinks: [BurstVisual, ShockwaveOverlay, RadialOverlaysAndModifiers]
  description: |
    Expanding outward shockwave that applies a strong impulse to all entities within its radius. Visualized as a glowing ring with optional explosion overlay.

- id: radial_gravity_default
  type: effector-variant
  parentType: radial
  variant: Gravity
  geometryMode: full_360
  scaleTier: L
  alignment: neutral
  rarity: rare
  tags: [Radial, Pull, Physics, Upgradable]
  themeKeys: [purple, blue, cyan, black]
  compatibleEntities: [Player, Asteroid, Spaceship, Planet]
  triggers: [UI, Hotkey, EntityUpgrade, StageEvent]
  upgradeable: true
  baseSize: 700
  crossLinks: [GravityVisual, VortexOverlay, RadialOverlaysAndModifiers]
  description: |
    Continuous inward pull effect, drawing entities toward the center. Can form a vortex with swirling visual overlays.

- id: radial_ripple_default
  type: effector-variant
  parentType: radial
  variant: Ripple
  geometryMode: full_360
  scaleTier: M
  alignment: neutral
  rarity: rare
  tags: [Radial, Oscillation, Physics, Upgradable]
  themeKeys: [blue, cyan, magenta, white]
  compatibleEntities: [Player, Asteroid, Spaceship, Planet]
  triggers: [UI, Hotkey, Timed, StageEvent]
  upgradeable: true
  baseSize: 600
  crossLinks: [RippleVisual, RippleTrailModifier, RadialOverlaysAndModifiers]
  description: |
    Expanding oscillation wave that alternates push and pull, can chain multiple rings. Leaves a fading trail behind each wave.

- id: radial_nudge_default
  type: effector-variant
  parentType: radial
  variant: Nudge
  geometryMode: slice
  scaleTier: S
  alignment: neutral
  rarity: common
  tags: [Radial, Directional, Physics, Upgradable]
  themeKeys: [yellow, orange, red, cyan]
  compatibleEntities: [Player, Spaceship]
  triggers: [UI, Hotkey, PrecisionTool]
  upgradeable: true
  baseSize: 300
  crossLinks: [NudgeVisual, PrecisionBoost, RadialOverlaysAndModifiers]
  description: |
    Directional impulse with high precision, usually slice-based. Used for targeted pushes or fine control.

──────────────────────────────
# Place this registry in /Guidelines/Datasheets/Effector/Radial/ as RadialVariantsAndTypes.md
# Cross-link to this registry from all effector and entity data sheets for consistency and extensibility.
──────────────────────────────
