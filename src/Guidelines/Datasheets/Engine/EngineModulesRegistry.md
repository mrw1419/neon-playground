──────────────────────────────
ENGINE MODULES REGISTRY – v1.0 (MODULAR FORMAT)
──────────────────────────────

# Registry for all engine modules relevant to Radial Effectors
# Includes id, type, tags, compatibleEntities, hooks, and crossLinks.

- id: effectSystem
  type: engine-module
  displayName: Effector System
  description: |
    Central engine module for managing all effectors, including registration, lifecycle, stacking, exclusions, and event triggers. Integrates with entity and physics systems.
  tags: [Engine, Effector, Modular, Extensible, Lifecycle]
  compatibleEntities: [All]
  hooks:
    - onEffectorRegister
    - onEffectorTrigger
    - onEffectorExpire
    - onStackLimitReached
    - onOverlayApply
  crossLinks:
    - RadialParentTypeRegistry
    - RadialVariantsAndTypes
    - RadialOverlaysAndModifiers
    - entity
    - physicsEngine

- id: entity
  type: engine-module
  displayName: Entity System
  description: |
    Handles all game entities, their states, and interactions with effectors. Provides hooks for effector application, state updates, and visual overlays.
  tags: [Engine, Entity, State, Extensible]
  compatibleEntities: [All]
  hooks:
    - onEffectorApply
    - onStateUpdate
    - onVisualOverlay
  crossLinks:
    - effectSystem
    - RadialParentTypeRegistry
    - physicsEngine

- id: physicsEngine
  type: engine-module
  displayName: Physics Engine
  description: |
    Manages all physics calculations, including force application, collision detection, and movement for entities and effectors. Supports custom force models and geometry modes.
  tags: [Engine, Physics, Force, Collision, Extensible]
  compatibleEntities: [All]
  hooks:
    - onForceApply
    - onCollision
    - onGeometryModeChange
  crossLinks:
    - effectSystem
    - entity
    - RadialParentTypeRegistry

──────────────────────────────
# Place this registry in /Guidelines/Datasheets/Engine/ as EngineModulesRegistry.md
# Cross-link to this registry from all effector, overlay, and entity data sheets for consistency and extensibility.
──────────────────────────────
