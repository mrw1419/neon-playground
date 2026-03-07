──────────────────────────────
RADIAL EFFECTOR PARENT TYPE & REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

# Parent type and registry for all Radial Effectors
# Lists all child effectors, shared logic, extensibility hooks, and cross-links.

- id: radial
  type: effector-parent-type
  displayName: Radial Effector
  description: |
    Parent type for all radial area-of-effect effectors. Handles shared math, lifecycle, and extensibility for Burst, Gravity, Ripple, Nudge, and future variants. Supports modular overlays, stacking, and theme-aware visuals.
  childEffectors:
    - radial_burst_default
    - radial_gravity_default
    - radial_ripple_default
    - radial_nudge_default
  sharedLogic:
    - Radius math (RadialBase.ts)
    - Angle filtering (slice mode)
    - Falloff calculation
    - Entity detection
    - Lifecycle timing
    - Extensible overlays/modifiers
  extensibilityHooks:
    - Add new variants via registry
    - Plug in overlays/modifiers
    - ThemeKeys for color/visuals
    - Cross-game integration
    - Engine hooks for effect stacking, exclusion, and hybrid modes
  themeKeys: [cyan, magenta, yellow, orange, purple, blue, black, red, white]
  tags: [Radial, AreaOfEffect, Modular, Stackable, Themeable, Extensible]
  compatibleEntities: [Player, Asteroid, Spaceship, Planet]
  crossLinks:
    - RadialVariantsAndTypes
    - RadialVisualsAndConfigs
    - RadialOverlaysAndModifiers
    - effectSystem (engine)
    - entity (engine)
    - physicsEngine (engine)
  registryNotes: |
    All child effectors must be registered here for engine and content discovery. New variants and overlays can be added without modifying core logic. Cross-link to all relevant registries for navigation and blueprinting.

──────────────────────────────
# Place this registry in /Guidelines/Datasheets/Effector/Radial/ as RadialParentTypeRegistry.md
# Cross-link to this registry from all effector, overlay, and entity data sheets for consistency and extensibility.
──────────────────────────────
