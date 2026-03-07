──────────────────────────────
PLANET OVERLAYS REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

Location: src/content/entity/planet/overlays/
Reference: src/Guidelines/Datasheets/Entity/PlanetVisuals.md, src/content/effects/

Purpose: Defines all modular overlays for planets. Each overlay is composable, theme-driven, and can modify visuals, stats, or gameplay. Overlays reference visual components, tags, and hooks for effector, engine, and interact systems.

──────────────────────────────
OVERLAY REGISTRY (YAML/Block Format)
──────────────────────────────

- id: Rings
  tags: [visual, rings, animated, themable]
  visual: RingsOverlay
  compatibleTypes: [Gas, Ice, Rocky]
  statModifiers:
    mass: +0.1x
    drag: +0.2x
  effectHooks: [canEmitEffector, canBeManipulated]
  visualHooks: [canAnimate, canBeThemed]
  upgradeCompatible: true
  restrictions: Cannot combine with Shield
  description: Animated neon rings overlay, color-themable

  tags: [visual, cracks, animated, themable, gameplay]
  visual: effects/planetvisuals/CracksOverlayVisual
  compatibleTypes: [Ice, Rocky, Lava]
  statModifiers:
    durability: -0.2x
    energy: +0.1x
  effectHooks: [onCollisionEffect, canEmitEffector]
  visualHooks: [canAnimate, canBeThemed]
  upgradeCompatible: true
  restrictions: Cannot combine with Shield
  colorThemes: [moon, earth, ice, cyan, magenta, purple, red, acidGreen, orange, yellow]
  description: Cracked surface overlay, animated

- id: Rocky
  tags: [visual, rocky, rough, themable]
  visual: RockyOverlay
  compatibleTypes: [Rocky, Moon, Metal]
  statModifiers:
    durability: +0.2x
    density: +0.1x
  effectHooks: [canBeManipulated]
  visualHooks: [canBeThemed]
  upgradeCompatible: true
  restrictions: None
  colorThemes: [earth, moon, cyan, magenta, purple, red, acidGreen, orange, yellow]
  description: Rocky surface overlay, rough texture, boosts durability

- id: Craters
  tags: [visual, craters, impact, themable, gameplay]
  visual: CratersOverlay
  compatibleTypes: [Rocky, Moon, Ice]
  statModifiers:
    durability: +0.1x
    health: +0.1x
  effectHooks: [onCollisionEffect]
  visualHooks: [canBeThemed]
  upgradeCompatible: true
  restrictions: None
  colorThemes: [moon, earth, ice, cyan, magenta, purple, red, acidGreen, orange, yellow]
  description: Crater marks overlay, adds impact visuals and collision effects

- id: Shield
  tags: [visual, shield, animated, themable, gameplay]
  visual: ShieldOverlay
  compatibleTypes: [All]
  statModifiers:
    durability: +0.5x
    energy: -0.1x
  effectHooks: [onDestructionEffect, canBeManipulated]
  visualHooks: [canAnimate, canBeThemed]
  upgradeCompatible: true
  restrictions: Cannot combine with Cracked, Rings
  description: Animated shield bubble overlay, color-themable

- id: Storm
  tags: [visual, storm, animated, themable, effector]
  visual: StormOverlay
  compatibleTypes: [Gas, Ice]
  statModifiers:
    energy: +0.2x
    drag: +0.1x
  effectHooks: [canEmitEffector, onEngineEvent]
  visualHooks: [canAnimate, canBeThemed]
  upgradeCompatible: true
  restrictions: None
  description: Swirling storm overlay, animated

- id: Stripes
  tags: [visual, stripes, animated, themable]
  visual: StripesOverlay
  compatibleTypes: [Gas, Ice]
  statModifiers:
    mass: +0.05x
  effectHooks: [canBeManipulated]
  visualHooks: [canAnimate, canBeThemed]
  upgradeCompatible: true
  restrictions: None
  description: Banded/striped overlay (gas/ice)

- id: Facets
  tags: [visual, facets, themable]
  visual: FacetsOverlay
  compatibleTypes: [Crystal, Metallic]
  statModifiers:
    durability: +0.2x
  effectHooks: [canBeManipulated]
  visualHooks: [canBeThemed]
  upgradeCompatible: true
  restrictions: None
  description: Crystal/metallic facets overlay

- id: Organic
  tags: [visual, organic, themable, gameplay]
  visual: OrganicOverlay
  compatibleTypes: [Organic, Rocky]
  statModifiers:
    energy: +0.1x
  effectHooks: [onInteractTool]
  visualHooks: [canBeThemed]
  upgradeCompatible: true
  restrictions: None
  description: Organic/biological overlay

- id: Water
  tags: [visual, water, animated, themable]
  visual: WaterOverlay
  compatibleTypes: [Rocky, Ice]
  statModifiers:
    drag: +0.1x
  effectHooks: [onCollisionEffect]
  visualHooks: [canAnimate, canBeThemed]
  upgradeCompatible: true
  restrictions: None
  description: Water waves overlay, animated

- id: Crystal
  tags: [visual, crystal, themable]
  visual: CrystalOverlay
  compatibleTypes: [Crystal, Ice]
  statModifiers:
    durability: +0.3x
  effectHooks: [canBeManipulated]
  visualHooks: [canBeThemed]
  upgradeCompatible: true
  restrictions: None
  description: Crystal spikes/facets overlay

- id: Atmosphere
  tags: [visual, atmosphere, glow, themable]
  visual: AtmosphereGlow
  compatibleTypes: [All]
  statModifiers:
    drag: +0.05x
  effectHooks: [canBeManipulated]
  visualHooks: [canBeThemed]
  upgradeCompatible: true
  restrictions: None
  description: Faint atmospheric glow overlay

- id: NeonBase
  type: primitive
  tags: [core, shape, themable]
  component: effects/planetvisuals/PlanetBase
  colorToken: planet.base
  hooks: [canBeOverlayed, canBeThemed]
  description: Core planet shape, color-themable

- id: GlowAura
  type: effect
  tags: [glow, aura, themable, animated]
  component: effects/planetvisuals/PlanetAura
  colorToken: planet.glow
  hooks: [canPulse, canAnimate, canBeThemed]
  description: Planet glow aura, pulsing/animated

──────────────────────────────
EXTENSIBILITY & HOOKS
──────────────────────────────
- Overlays are modular and composable
- Each overlay references a visual component and tags
- Overlays can modify stats, visuals, or gameplay
- Hooks for effector, engine, and interact systems:
    - canEmitEffector
    - canBeManipulated
    - onCollisionEffect
    - onDestructionEffect
    - onInteractTool
    - onEngineEvent
- Overlays can be filtered by tags, compatible types, or hooks
- Designed for direct use in registry/config files

──────────────────────────────
REFERENCE: See visuals and effects registries for more details and usage examples.
──────────────────────────────
