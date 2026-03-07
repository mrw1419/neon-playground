──────────────────────────────
PLANET VISUALS REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

Location: src/content/entity/planet/overlays/
Reference: src/ui/icons/content/, src/content/effects/

Purpose: Defines all core visual primitives and reusable components for planets. Each visual is modular, theme-driven, and composable. Visuals reference neon icon style, color tokens, and reusable effects.

──────────────────────────────
VISUAL PRIMITIVES & COMPONENTS
──────────────────────────────

- effects/planetvisuals/PlanetBase: Core planet shape, color-themable
- effects/planetvisuals/PlanetAura: Planet glow, pulsing, color-themable
- Rings: Modular ring overlay, animated, color-themable
- Cracks: Cracked surface overlay, animated, color-themable
- Shield: Shield bubble overlay, animated, color-themable
- Storm: Swirling/animated overlay, color-themable
- Stripes: Banded/striped overlay (gas/ice), color-themable
- Facets: Crystal/metallic facets overlay, color-themable
- Organic: Organic/biological overlay, color-themable
- Water: Water waves overlay, animated, color-themable
- Crystal: Crystal spikes/facets overlay, color-themable
- Atmosphere: Faint atmospheric glow, color-themable
- Glowing: Pulsing/animated glow, color-themable
- Trail: Comet/dust/particle trail, animated
- Satellite: Orbiting satellite visual, animated
- Debris: Orbiting debris/asteroids, animated

──────────────────────────────
VISUAL REGISTRY (YAML/Block Format)
──────────────────────────────

- id: effects/planetvisuals/PlanetBase
  type: primitive
  tags: [core, shape, themable]
  component: effects/planetvisuals/PlanetBase
  colorToken: planet.base
  hooks: [canBeOverlayed, canBeThemed]
  description: Core planet shape, color-themable

- id: effects/planetvisuals/PlanetAura
  type: effect
  tags: [glow, aura, themable, animated]
  component: effects/planetvisuals/PlanetAura
  colorToken: planet.glow
  hooks: [canPulse, canAnimate, canBeThemed]
  description: Planet glow aura, pulsing/animated

- id: Rings
  type: overlay
  tags: [rings, overlay, animated, themable]
  component: RingsOverlay
  colorToken: planet.rings
  hooks: [canAnimate, canBeThemed, canStack]
  description: Modular ring overlay, animated

- id: Cracked
  type: overlay
  tags: [cracks, overlay, animated, themable]
  component: effects/planetvisuals/CracksOverlayVisual
  colorToken: planet.cracks
  themeKeys: [moon, earth, ice, cyan, magenta, purple, red, acidGreen, orange, yellow]
  hooks: [canAnimate, canBeThemed, canStack]
  description: Cracked surface overlay, animated

- id: Rocky
  type: overlay
  tags: [rocky, overlay, rough, themable]
  component: RockyOverlay
  colorToken: planet.rocky
  themeKeys: [earth, moon, cyan, magenta, purple, red, acidGreen, orange, yellow]
  hooks: [canBeThemed, canStack]
  description: Rocky surface overlay, rough texture, boosts durability

- id: Craters
  type: overlay
  tags: [craters, overlay, impact, themable]
  component: CratersOverlay
  colorToken: planet.craters
  themeKeys: [moon, earth, ice, cyan, magenta, purple, red, acidGreen, orange, yellow]
  hooks: [canBeThemed, canStack]
  description: Crater marks overlay, adds impact visuals and collision effects

- id: Shield
  type: overlay
  tags: [shield, overlay, animated, themable]
  component: ShieldOverlay
  colorToken: planet.shield
  hooks: [canAnimate, canBeThemed, canStack]
  description: Shield bubble overlay, animated

- id: Storm
  type: overlay
  tags: [storm, overlay, animated, themable]
  component: StormOverlay
  colorToken: planet.storm
  hooks: [canAnimate, canBeThemed, canStack]
  description: Swirling/animated storm overlay

- id: Stripes
  type: overlay
  tags: [stripes, overlay, animated, themable]
  component: StripesOverlay
  colorToken: planet.stripes
  hooks: [canAnimate, canBeThemed, canStack]
  description: Banded/striped overlay (gas/ice)

- id: Facets
  type: overlay
  tags: [facets, overlay, themable]
  component: FacetsOverlay
  colorToken: planet.facets
  hooks: [canBeThemed, canStack]
  description: Crystal/metallic facets overlay

- id: Organic
  type: overlay
  tags: [organic, overlay, themable]
  component: OrganicOverlay
  colorToken: planet.organic
  hooks: [canBeThemed, canStack]
  description: Organic/biological overlay

- id: Water
  type: overlay
  tags: [water, overlay, animated, themable]
  component: WaterOverlay
  colorToken: planet.water
  hooks: [canAnimate, canBeThemed, canStack]
  description: Water waves overlay, animated

- id: Crystal
  type: overlay
  tags: [crystal, overlay, themable]
  component: CrystalOverlay
  colorToken: planet.crystal
  hooks: [canBeThemed, canStack]
  description: Crystal spikes/facets overlay

- id: Atmosphere
  type: effect
  tags: [atmosphere, glow, themable]
  component: AtmosphereGlow
  colorToken: planet.atmosphere
  hooks: [canBeThemed]
  description: Faint atmospheric glow

- id: Glowing
  type: effect
  tags: [glow, animated, themable]
  component: GlowingEffect
  colorToken: planet.glow
  hooks: [canPulse, canAnimate, canBeThemed]
  description: Pulsing/animated glow

- id: Trail
  type: effect
  tags: [trail, animated]
  component: TrailEffect
  colorToken: planet.trail
  hooks: [canAnimate]
  description: Comet/dust/particle trail, animated

- id: Satellite
  type: effect
  tags: [satellite, animated]
  component: SatelliteVisual
  colorToken: planet.satellite
  hooks: [canAnimate, canOrbit]
  description: Orbiting satellite visual, animated

- id: Debris
  type: effect
  tags: [debris, animated]
  component: DebrisVisual
  colorToken: planet.debris
  hooks: [canAnimate, canOrbit]
  description: Orbiting debris/asteroids, animated

──────────────────────────────
EXTENSIBILITY & HOOKS
──────────────────────────────
- All visuals are modular and composable
- Visuals reference color tokens/themes (never hardcoded)
- Visuals can be extended with new overlays/effects at any time
- Each visual exposes hooks for effector, engine, and interact systems:
    - canEmitEffector
    - canBeManipulated
    - onCollisionEffect
    - onDestructionEffect
    - onInteractTool
    - onEngineEvent
- Visuals can be filtered by tags, type, or hooks
- Designed for direct use in registry/config files

──────────────────────────────
REFERENCE: See overlays and effects registries for more details and usage examples.
──────────────────────────────
