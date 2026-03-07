──────────────────────────────
PLANET VARIANTS REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

Location: src/content/entity/planet/variants/
Reference: src/Guidelines/Datasheets/Entity/PlanetParentTypes.md, PlanetVisuals.md, PlanetOverlays.md

Purpose: Defines all planet variants as configs that compose a parent type, overlays, visuals, color themes, and unique stats/behaviors. Each variant references the parent type, overlays, and visuals registries, and can specify unique hooks for effector, engine, or interact systems.

Note: Most variants are themeable using NEON_THEMES keys (cyan, magenta, purple, red, acidGreen, orange, yellow, earth, moon, ice, evil, lava, metallicSilver, metallicGold, metallicBronze, organicGreen, organicBrown, organicDarkGreen, waterDeepBlue, waterAqua, waterLightBlue, crystalLightBlue, crystalPink, crystalWhite). Metal and Crystal are inherently unique and not themeable.

──────────────────────────────
VARIANT REGISTRY (YAML/Block Format)
──────────────────────────────

- id: Earth
  parentType: Rocky
  overlays: [Atmosphere, Water, Rocky, Craters]
  visuals: [effects/planetvisuals/PlanetBase, effects/planetvisuals/PlanetAura, AtmosphereGlow, WaterOverlay, RockyOverlay, CratersOverlay]
  colorTheme: [earth, moon, cyan, magenta, purple, red, acidGreen, orange, yellow]
  baseStats:
    mass: 1.0
    radius: 1.0
    durability: 1.0
    energy: 0.5
    drag: 0.1
  tags: [default, earthlike, rocky, water, atmosphere]
  effectHooks: [canBeManipulated, onCollisionEffect]
  upgradeCompatible: true
  description: Earth-like planet with water, rocky, and crater overlays; themeable (earth, moon, neon, etc.)

- id: Jupiter
  parentType: Gas
  overlays: [Rings, Stripes, Storm]
  visuals: [effects/planetvisuals/PlanetBase, effects/planetvisuals/PlanetAura, RingsOverlay, StripesOverlay, StormOverlay]
  colorTheme: [gasgiant, cyan, magenta, purple, red, acidGreen, orange, yellow]
  baseStats:
    mass: 2.0
    radius: 1.5
    durability: 1.2
    energy: 0.7
    drag: 0.2
  tags: [default, gas, giant, rings, storm]
  effectHooks: [canEmitEffector, canBeManipulated, onEngineEvent]
  upgradeCompatible: true
  description: Gas giant with rings, stripes, and storm overlays; themeable (gasgiant, neon, etc.)

- id: TheMoon
  parentType: TheMoon
  overlays: [Cracked, Rocky, Craters]
  visuals: [effects/planetvisuals/PlanetBase, effects/planetvisuals/PlanetAura, effects/planetvisuals/CracksOverlayVisual, RockyOverlay, CratersOverlay]
  colorTheme: [moon, earth, cyan, magenta, purple, red, acidGreen, orange, yellow]
  baseStats:
    mass: 0.3
    radius: 0.5
    durability: 0.6
    energy: 0.2
    drag: 0.05
  tags: [default, theMoon, rocky, cracked]
  effectHooks: [canBeManipulated, onCollisionEffect]
  upgradeCompatible: true
  description: Earth's Moon with cracked, rocky, and crater overlays; themeable (moon, earth, neon, etc.)

- id: Crystal
  parentType: Crystal
  overlays: [Facets, Crystal]
  visuals: [NeonBase, GlowAura, FacetsOverlay, CrystalOverlay]
  colorTheme: [crystalLightBlue, crystalPink, crystalWhite]
  baseStats:
    mass: 1.2
    radius: 1.0
    durability: 1.5
    energy: 0.8
    drag: 0.15
  tags: [default, crystal, facets, glowing]
  effectHooks: [canBeManipulated, onInteractTool]
  upgradeCompatible: true
  description: Crystal planet with facets and crystal overlays; special, not themeable

- id: Comet
  parentType: Ice
  overlays: [Cracked, Trail]
  visuals: [NeonBase, GlowAura, effects/planetvisuals/CracksOverlayVisual, TrailEffect]
  colorTheme: [ice, waterDeepBlue, waterAqua, waterLightBlue, cyan, magenta, purple, red, acidGreen, orange, yellow]
  baseStats:
    mass: 0.5
    radius: 0.4
    durability: 0.4
    energy: 0.3
    drag: 0.05
  tags: [default, comet, ice, cracked, trail]
  effectHooks: [canEmitEffector, canBeManipulated]
  upgradeCompatible: true
  description: Comet with cracked surface and animated trail; themeable (ice, water, neon, etc.)

──────────────────────────────
EXTENSIBILITY & HOOKS
──────────────────────────────
- Variants are modular configs composed from parent types, overlays, and visuals
- Each variant can specify unique stats, overlays, visuals, and hooks
- Hooks for effector, engine, and interact systems:
    - canEmitEffector
    - canBeManipulated
    - onCollisionEffect
    - onDestructionEffect
    - onInteractTool
    - onEngineEvent
- Variants can be filtered by tags, parent type, overlays, or hooks
- Designed for direct use in registry/config files

──────────────────────────────
REFERENCE: See parent types, overlays, and visuals registries for more details and usage examples.
──────────────────────────────
