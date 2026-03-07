──────────────────────────────
RADIAL EFFECTOR VISUALS & CONFIGS REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

# Visuals & Configs for all Radial Effectors (Burst, Gravity, Ripple, Nudge)
# Use this as a registry for all visual components and configuration presets.

- id: BurstVisual
  type: visual
  tags: [burst, shockwave, animated, themeable]
  component: BurstVisual
  themeKeys: [cyan, magenta, red, yellow, orange]
  compatibleEffectors: [Burst]
  description: Expanding shockwave ring with customizable color and intensity.
  crossLinks: [RadialEffector, BurstConfig]

- id: GravityVisual
  type: visual
  tags: [gravity, vortex, animated, themeable]
  component: GravityVisual
  themeKeys: [purple, blue, cyan, black]
  compatibleEffectors: [Gravity]
  description: Pulling radial lines, optional vortex or spiral animation.
  crossLinks: [RadialEffector, GravityConfig]

- id: RippleVisual
  type: visual
  tags: [ripple, wave, animated, themeable]
  component: RippleVisual
  themeKeys: [blue, cyan, magenta, white]
  compatibleEffectors: [Ripple]
  description: Expanding wave ring(s) with alternating color or opacity.
  crossLinks: [RadialEffector, RippleConfig]

- id: NudgeVisual
  type: visual
  tags: [nudge, directional, animated, themeable]
  component: NudgeVisual
  themeKeys: [yellow, orange, red, cyan]
  compatibleEffectors: [Nudge]
  description: Cone or slice-shaped area, quick flash or pulse, directional arrow.
  crossLinks: [RadialEffector, NudgeConfig]

──────────────────────────────
CONFIG PRESETS
──────────────────────────────

- id: BurstConfig
  type: config
  tags: [burst, impulse, scaling]
  compatibleEffectors: [Burst]
  baseStats:
    power: 1.0
    radius: M
    duration: instant
  upgradeable: true
  crossLinks: [BurstVisual, RadialEffector]

- id: GravityConfig
  type: config
  tags: [gravity, pull, scaling]
  compatibleEffectors: [Gravity]
  baseStats:
    power: 1.0
    radius: L
    duration: continuous
  upgradeable: true
  crossLinks: [GravityVisual, RadialEffector]

- id: RippleConfig
  type: config
  tags: [ripple, oscillation, scaling]
  compatibleEffectors: [Ripple]
  baseStats:
    power: 0.8
    radius: M
    duration: pulse
  upgradeable: true
  crossLinks: [RippleVisual, RadialEffector]

- id: NudgeConfig
  type: config
  tags: [nudge, directional, scaling]
  compatibleEffectors: [Nudge]
  baseStats:
    power: 0.5
    radius: S
    duration: instant
  upgradeable: true
  crossLinks: [NudgeVisual, RadialEffector]

──────────────────────────────
# Place this registry in /Guidelines/Datasheets/Effector/Radial/ as RadialVisualsAndConfigs.md
# Cross-link to this registry from all effector data sheets for consistency and extensibility.
──────────────────────────────
