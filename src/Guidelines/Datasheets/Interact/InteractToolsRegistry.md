──────────────────────────────
INTERACT TOOLS REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

# Registry for all interact tools relevant to Radial Effectors
# Includes id, type, tags, themeKeys, compatibleEntities, triggers, and crossLinks.

- id: move_tool
  type: interact-tool
  displayName: Move Tool
  description: |
    Allows the user to move entities or effectors directly within the scene. Supports drag-and-drop, snapping, and precision adjustments. Can trigger radial effectors on move.
  tags: [Interact, Move, Drag, Precision, UI]
  themeKeys: [cyan, yellow, magenta]
  compatibleEntities: [Player, Asteroid, Spaceship, Planet]
  triggers: [UI, Drag, Hotkey]
  crossLinks:
    - effectSystem
    - RadialParentTypeRegistry
    - Undo Tool

- id: undo_tool
  type: interact-tool
  displayName: Undo Tool
  description: |
    Reverts the last action performed by the user, including effector triggers, entity moves, and overlay applications. Supports multi-step undo and redo.
  tags: [Interact, Undo, Redo, UI]
  themeKeys: [red, cyan, white]
  compatibleEntities: [All]
  triggers: [UI, Hotkey]
  crossLinks:
    - effectSystem
    - move_tool

- id: radial_launcher
  type: interact-tool
  displayName: Radial Launcher
  description: |
    Specialized tool for triggering radial effectors (Burst, Gravity, Ripple, Nudge) via UI or hotkey. Supports targeting, power adjustment, and visual feedback.
  tags: [Interact, Effector, Launcher, UI, Power]
  themeKeys: [magenta, cyan, yellow, orange]
  compatibleEntities: [Player, Spaceship]
  triggers: [UI, Hotkey, TabCard]
  crossLinks:
    - effectSystem
    - RadialVariantsAndTypes
    - RadialVisualsAndConfigs

- id: paintbrush_tool
  type: interact-tool
  displayName: Paintbrush Tool
  description: |
    Applies visual overlays or modifiers to entities and effectors. Supports theme-aware painting, erasing, and blending of overlays.
  tags: [Interact, Paint, Overlay, Visual, UI]
  themeKeys: [yellow, magenta, blue, white]
  compatibleEntities: [Player, Planet, Spaceship]
  triggers: [UI, Drag, Hotkey]
  crossLinks:
    - RadialOverlaysAndModifiers
    - effectSystem

──────────────────────────────
# Place this registry in /Guidelines/Datasheets/Interact/ as InteractToolsRegistry.md
# Cross-link to this registry from all effector, overlay, and entity data sheets for consistency and extensibility.
──────────────────────────────
