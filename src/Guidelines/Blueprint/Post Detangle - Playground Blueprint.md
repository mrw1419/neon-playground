─────────────────────────────────────────────
NEON PLAYGROUND – BLUEPRINT 3.1 (Post-Detangle + Behavior System)
─────────────────────────────────────────────

# CORE IDENTITY

Neon Playground is a cyberpunk creative sandbox.
It is not a demo.
It is not a physics testbed.
It is a universe builder.

It exists to encourage playful experimentation,
emergent behavior,
and modular expansion across the Neon game suite.

All architecture decisions must support:
- Reusability across games
- Clear ownership boundaries
- Visual modularity
- Engine independence
- Data-driven expansion
- Modular behavior-driven entity logic

─────────────────────────────────────────────
# ARCHITECTURAL PRINCIPLES
─────────────────────────────────────────────

ENGINE
- Pure simulation layer.
- No React.
- No UI.
- No content-specific imports.
- Owns physics, tick loop, entity lifecycle, effector behavior, and entity behavior system.
- Behavior System:
    • Resides in src/engine/behaviors/
    • Organizes behaviors into buckets (follow, wander, reactive, interact, physicsAware)
    • Provides BehaviorRegistry for lookup by bucket/type
    • Integrates with WorldState snapshot and engine tick loop
    • Entities attach behaviors dynamically on spawn or runtime
- Generic and reusable for all future games.

CONTENT
- Defines entities, effectors, tools, and visuals.
- May import engine.
- Never imports game layer.
- Visuals are pure render components.
- Behavior lives in engine systems.
- Organized by ParentType → Variants → Visual.

REGISTRY PATTERN
- All entities, effectors, tools, and behaviors register themselves.
- Game layer resolves type → class + visual → behaviors via registry.
- New content requires zero manual wiring in UI logic.
- Data-driven expansion is mandatory for scalability.

GAME LAYER
- Orchestrates engine + content.
- Composition root for scenes.
- Uses hooks for orchestration.
- Layers are render-only projections of engine state.
- Never mutates engine outside public API.

FUTURES
- Experimental sandbox.
- May import engine and content.
- Never becomes a dependency of core systems.

─────────────────────────────────────────────
# VISUAL SYSTEM PHILOSOPHY
─────────────────────────────────────────────

Visuals are projections of state.
They never contain simulation logic.

There is exactly one canonical visual per effector type.
No duplicate visuals.
No shadow implementations.

Overlays are modular, extensible, and diagnostic-friendly.
Entities and effectors support real-time overlays
for stats, tuning, and expansion.

Preview systems (Object, Effector, Interact):
- Always visually consistent.
- High-contrast and accessible.
- Decoupled from simulation logic.
- Extensible by type registration.

─────────────────────────────────────────────
# PLAYGROUND DESIGN RULES
─────────────────────────────────────────────

Gravity is disabled at the scene level, not the engine level.
Engine remains generic.

All entities spawn with physics bodies.
They remain stable unless acted upon.

Boundary logic:
- Entities remain in viewport.
- Control panel area is protected.
- Physics remains deterministic and tunable.

Planet Placement:
- Hold-to-grow mechanic.
- Preview reflects final spawn state.
- Spawn inherits preview properties.
- Object count updates automatically via registry/state.

Effectors:
- Radial family includes Burst, Ripple, Gravity, Nudge.
- Power scaling is adjustable.
- Preview overlays are consistent and extensible.
- Behavior defined in engine effectorSystem.

Behaviors:
- Entities can attach multiple behaviors via BehaviorRegistry.
- Behaviors act on WorldState and entity context.
- Deterministic updates through engine tick loop.
- Includes initial set: FollowTargetBehavior, OrbitBehavior, WanderBehavior, FollowMouseBehavior.
- Expandable to AI-driven, physics-aware, or reactive behaviors.

Interact Tools:
- Tools are simple: type + optional visual.
- Tools manipulate entities via engine public API.
- Interaction previews are decoupled from effectors and behaviors.

─────────────────────────────────────────────
# CONTROL PANEL PHILOSOPHY
─────────────────────────────────────────────

Three Tabs:
- Objects
- Effects
- Interact

Objects tab is default on load.

TabCards represent actions, not implementations.

Adding new cards must be registry-driven.
UI reads from registry data.

Control panel is collapsible.
Positioned bottom-center.
Designed for global reuse across games.

─────────────────────────────────────────────
# EXPANSION STRATEGY
─────────────────────────────────────────────

Adding New Entity:
- Create Entity class.
- Create Visual.
- Attach behaviors as needed via BehaviorRegistry.
- Register in content registry.
- Done.

Adding New Effector:
- Define behavior in engine effectorSystem.
- Create Visual.
- Register.
- Done.

Adding New Tool:
- Define tool logic.
- Optional visual.
- Register.
- Done.

Adding New Behavior:
- Implement behavior class in src/engine/behaviors/ bucket.
- Define tick(worldState, deltaTime) method.
- Add metadata/config typing.
- Register in BehaviorRegistry index.ts.
- Attach to entity via spawn config or runtime API.
- Test in PlaygroundScene.
- Done.

Manual wiring is considered architectural debt.

─────────────────────────────────────────────
# CODE QUALITY DOCTRINE
─────────────────────────────────────────────

- No `any` in core systems.
- Use type guards for entity filtering.
- Abstract mouse handlers by tool type.
- Keep simulation deterministic.
- Stop animation loops explicitly on scene cleanup.
- Explicit lifecycle: start → run → stop.
- Engine must be stoppable and reusable.

Debugging:
- Debug overlays preferred over console spam.
- Logs are temporary, never permanent architecture.

Performance:
- Throttle mouse move events if necessary.
- Resize canvas explicitly.
- Keep rendering lightweight and declarative.

─────────────────────────────────────────────
# EXPERIENCE & VISION
─────────────────────────────────────────────

The Playground is:
- A creative instrument.
- A universe construction kit.
- A shared object pool for all Neon games.

Future goals:
- Expanded entity families.
- AI-driven behaviors (spaceships, autonomous systems).
- Physics-aware autonomous behaviors.
- Modular backgrounds and theme swapping.
- Plugin-style dynamic module loading.
- Undo/redo history system.
- Cross-game object portability.
- Data-driven effect stacking.
- Blueprint-based upgrades.

The long-term aim:
A composable Neon ecosystem
where games share entities,
entities share behaviors,
behaviors share systems.

─────────────────────────────────────────────
# FINAL INVARIANTS
─────────────────────────────────────────────

Engine owns behavior.
Behavior system is modular and registry-driven.
Content defines modular building blocks.
Registry enables expansion.
Game composes.
Visuals project.
Futures experiment.

No circular dependencies.
No duplicate visuals.
No silent authority drift.

Architecture is enforced through boundaries,
not discipline alone.

─────────────────────────────────────────────
# EFFECTOR STORE ARCHITECTURE (2026)
─────────────────────────────────────────────

Effector stores are the single source of truth for all entity, effect, overlay, and tool state in the game layer.

- $entities: Holds the current array of all entities. Updated after every engine tick with a new array of shallow-copied entity objects.
- $history: Manages undo/redo/history for entities. All entity-changing actions flow through this store for time travel and state restoration.
- effectStore: Holds all active effect instances (e.g., bursts, ripples) for rendering and logic.
- effectorStore: Tracks effector tool selection, preview state, and pointer overlays.

All state changes (entity positions, effectors, overlays, undo/redo) flow through Effector events/stores for robust reactivity and debugging.

OverlayLayer, EntityLayer, and all overlays/visuals subscribe to these stores using useUnit for real-time updates. No UI or overlay reads directly from engine state.

After each engine tick, the engine calls setEntities with a new array of shallow-copied entity objects, ensuring React/Effector reactivity for overlays and visuals.

Undo/redo is managed via $history, allowing time travel and state restoration for all entity state.

This pattern applies to all overlays, effectors, and tools: always use Effector stores for state, and ensure new references are returned for reactivity.

Registry-driven expansion now includes store wiring for new entities, effectors, and overlays. All new content must integrate with the Effector store pattern for full reactivity and debugging support.

─────────────────────────────────────────────
# REGISTRY-DRIVEN EFFECTOR TRIGGERING (2026)
─────────────────────────────────────────────

All effect triggering for radial effectors (burst, ripple, trail, gravity, etc.) is now handled by the generic useRadialEffector hook. This hook is registry-driven: it looks up the effector type, config, and visual in the central registry and adds the effect to the effectStore. This enables easy extensibility—new effectors require only a registry entry and visual.

- useRadialEffector.ts: Canonical, registry-driven effect trigger for all radial effectors.
- Effect-specific hooks (e.g., useBurst, useRipple) are deprecated and should not be used for new effectors.
- All effect triggering in the UI and game layer must use useRadialEffector for consistency, extensibility, and debugging.

This pattern ensures that all effectors are extensible, registry-driven, and fully integrated with the Effector store architecture for robust reactivity and debugging.
