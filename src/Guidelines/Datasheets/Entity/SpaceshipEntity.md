──────────────────────────────
ENTITY SHEET – v1.0 (MODULAR FORMAT, RADIAL EFFECTOR INTEGRATION)
──────────────────────────────

# Example entity sheet referencing effectors, overlays, visuals, and tools by registry name
# Use this format for all entities that can interact with or be affected by Radial Effectors

- id: spaceship_entity_default
  type: entity
  displayName: Spaceship
  description: |
    Player-controlled or AI spaceship capable of triggering and being affected by radial effectors. Supports overlays, upgrades, and interact tools.
  themeKeys: [cyan, magenta, yellow, orange, blue, white]
  compatibleEffectors:
    - radial_burst_default
    - radial_gravity_default
    - radial_ripple_default
    - radial_nudge_default
  overlays:
    - ShockwaveOverlay
    - VortexOverlay
    - RippleTrailModifier
    - PrecisionBoost
  visuals:
    - BurstVisual
    - GravityVisual
    - RippleVisual
    - NudgeVisual
  interactTools:
    - move_tool
    - undo_tool
    - radial_launcher
    - paintbrush_tool
  upgradeable: true
  baseStats:
    health: 100
    speed: 300
    mass: 1.5
  triggers:
    - TabCard
    - Launcher Component
    - Hotkey
    - Stage Event
  crossLinks:
    - RadialVariantsAndTypes
    - RadialOverlaysAndModifiers
    - RadialVisualsAndConfigs
    - InteractToolsRegistry
    - EngineModulesRegistry
    - RadialParentTypeRegistry
  notes: |
    All effectors, overlays, visuals, and tools are referenced by registry name for modularity and extensibility. Add or remove options as needed for each entity type.

──────────────────────────────
# Place entity sheets in /Guidelines/Datasheets/Entity/ (e.g., SpaceshipEntity.md)
# Cross-link to all relevant registries for navigation and blueprinting.
──────────────────────────────
