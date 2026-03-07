──────────────────────────────
EFFECTOR SYSTEM DATA SHEET – 2.19.2026
──────────────────────────────

LOCATION
──────────────────────────────
src/engine/effectSystem.ts

PURPOSE
──────────────────────────────
Central orchestrator for all effectors (radial, linear, and future geometries).
Applies forces, triggers physics effects, and delegates visuals.
Maintains modularity for pluggable effectors and cross-entity interactions.
Ensures effect lifecycles, triggers, and exclusions are handled consistently.

CORE RESPONSIBILITIES
──────────────────────────────
- Accept effector trigger requests (entity, effect type, geometry, parameters)
- Gather effectModifiers from triggering entity
- Delegate force calculations to appropriate GeometryBase (RadialBase, LinearBase, future)
- Apply forces via PhysicsEngine
- Delegate visuals to VisualStrategy (content/effects/*)
- Maintain lifecycle, duration, and cooldown of effect triggers
- Handle exclusions (entity types, factions, or groups)
- Provide hooks for upgrades, variant behaviors, and stage-dependent modifications

INPUT CONTRACT
──────────────────────────────
TriggerConfig:
  - effectName: string (e.g., Burst, Gravity, Nudge, Ripple)
  - geometryType: string (Radial, Linear, future)
  - origin: Vector2
  - magnitude/strength: number
  - radius/length: number (geometry-specific)
  - duration: number
  - angle/slice: number (optional, geometry-specific)
  - targetFilter: function/entity tag list
  - upgradeModifiers: array
  - stageModifiers: array
  - optional: additional effect-specific params

OUTPUT CONTRACT
──────────────────────────────
EffectApplication:
  - List of affected entities with applied forces
  - Lifecycle tracking (start, progress, end)
  - Visual trigger signals (for rendering)
  - Optional callbacks for onHit, onFinish, onCancel

CORE METHODS
──────────────────────────────
- applyEffect(triggerConfig: TriggerConfig)
- gatherEffectModifiers(entity: BaseEntity, effectName: string)
- delegateGeometry(geometryType: string, config)
- applyPhysicsForces(affectedEntities, computedForces)
- triggerVisuals(effectName, affectedEntities, visualParams)
- handleLifecycle(entity, effectInstance)
- registerNewEffector(geometryBase: GeometryBase)
- unregisterEffector(geometryBase: GeometryBase)

FUTURE-PROOFING
──────────────────────────────
- Geometry-agnostic: supports any geometry plugin (RadialBase, LinearBase, FieldBase, BeamBase, etc.)
- Upgrade hooks: allow entity upgrades to modify effect behavior
- Stage hooks: allow multi-stage entities to modify effect impact
- Visual decoupling: all visuals delegated to content layer for pluggable rendering
- Modifier stacking: supports multiple effectModifiers without breaking contract
- Effect exclusions: entity, faction, group, or game rules considered

INTEGRATION
──────────────────────────────
- PhysicsEngine: handles actual force application
- BaseEntity: source of modifiers, position, and target data
- VisualStrategy (content/effects/): renders effect visuals
- Tools: can trigger effectors (Undo, Move, Launch, etc.)
- Mini-games: trigger via game rules and entity actions

FILES / ARCHITECTURE
──────────────────────────────
src/engine/
├─ effectSystem.ts         # Orchestrator
├─ effectors/              # Geometry layer
│   ├─ RadialBase.ts       # Circle or sector geometry
│   ├─ LinearBase.ts       # Line or beam geometry
│   └─ futureBase.ts       # Placeholder for future effectors
└─ types.ts                # Shared effect types, configs, vectors

DESIGN PRINCIPLES
──────────────────────────────
1. Separation of concerns: Physics, geometry, and visuals are decoupled.
2. Extensibility: New geometries or effect types can be plugged in without modifying existing code.
3. Deterministic: Effect computations are predictable and consistent per input config.
4. Upgradeable: Entities can influence effect outcome via modifiers or stages.
5. Modular: Each effector geometry is self-contained; system orchestrates them uniformly.
6. Hookable: Supports lifecycle, triggers, on-hit, on-finish, on-cancel callbacks.
──────────────────────────────
