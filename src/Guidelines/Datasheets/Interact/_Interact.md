──────────────────────────────
TOOLS DATA SHEET – 2.18.2026
──────────────────────────────

IDENTITY & METADATA
──────────────────────────────
Category: Playground / Interactive Tools
Purpose: User-driven interactions to manipulate entities, effectors, or world state
Usage Scope: Playground Game, Spaceship Game, Future Games
Unique ID Prefix: tool_


TOOLS REGISTRY (YAML/Block Format)
──────────────────────────────
- id: tool_move
    type: manipulation
    tags: [move, drag, entity, modular]
    compatibleEntities: [All]
    description: Click and drag entities to move them in the world. Handles multiple selections; works on any movable entity.
    crossLinks: [InteractToolsRegistry, PlanetEntity, RadialParentTypeRegistry]

- id: tool_undo
    type: control
    tags: [undo, revert, stack, modular]
    compatibleEntities: [All]
    description: Reverts last entity placement or effector trigger. Stack-based; configurable depth.
    crossLinks: [InteractToolsRegistry]

- id: tool_delete
    type: manipulation
    tags: [delete, remove, entity, modular]
    compatibleEntities: [All]
    description: Removes selected entity or effector from world. Can optionally delete groups or child entities.
    crossLinks: [InteractToolsRegistry]

- id: tool_refresh_canvas
    type: control
    tags: [refresh, reset, world, modular]
    compatibleEntities: [All]
    description: Resets world to initial state. Can preserve entities or effectors optionally.
    crossLinks: [InteractToolsRegistry]

- id: tool_background
    type: control-visual
    tags: [background, visual, world, modular]
    compatibleEntities: [All]
    description: Switches background visuals. Works with dynamic effects like bursts or universe-scale events.
    crossLinks: [InteractToolsRegistry, WorldBackgrounds]

- id: tool_paintbrush
    type: interactive-visual
    tags: [paintbrush, trail, particle, modular]
    compatibleEntities: [All]
    description: Draw particle trails, influence entities indirectly. Optional physics interactions, can be used for runways or barriers.
    crossLinks: [InteractToolsRegistry, Trail Effects Data Sheet]

- id: tool_paintbucket
    type: interactive-visual
    tags: [paintbucket, color, swap, modular]
    compatibleEntities: [All]
    description: Change colors or skins of entities. Can target single or multiple entities.
    crossLinks: [InteractToolsRegistry, PlanetVisuals]

- id: tool_follow
    type: manipulation
    tags: [follow, pointer, entity, modular]
    compatibleEntities: [All]
    description: Entity follows pointer or touch. Optional lag, spring, or momentum behavior.
    crossLinks: [InteractToolsRegistry]

- id: tool_launcher
    type: manipulation-physics
    tags: [launcher, slingshot, projectile, modular]
    compatibleEntities: [All]
    description: Picks an object and propels it with force. Configurable strength, angle, and projectile type.
    crossLinks: [InteractToolsRegistry, RadialVariantsAndTypes]

- id: tool_magnet
    type: manipulation-physics
    tags: [magnet, attraction, physics, modular]
    compatibleEntities: [All]
    description: Pulls nearby entities toward a defined point. Strength and radius adjustable per game.
    crossLinks: [InteractToolsRegistry, RadialVariantsAndTypes]

- id: tool_repulse
    type: manipulation-physics
    tags: [repulse, push, physics, modular]
    compatibleEntities: [All]
    description: Pushes nearby entities away from a defined point. Can combine with particle trails.
    crossLinks: [InteractToolsRegistry, RadialVariantsAndTypes]

- id: tool_spawner
    type: interactive-gameplay
    tags: [spawner, auto-swarm, entity, modular]
    compatibleEntities: [All]
    description: Spawns entities at cursor or fixed point. Configurable quantity, rate, and type.
    crossLinks: [InteractToolsRegistry]

- id: tool_projectile
    type: interactive-physics
    tags: [projectile, creator, physics, modular]
    compatibleEntities: [All]
    description: Fires projectiles, lasers, or effectors. Directional, velocity configurable, optional trail effects.
    crossLinks: [InteractToolsRegistry, Trail Effects Data Sheet]

- id: tool_ripple
    type: effector-trigger
    tags: [ripple, nudge, effector, modular]
    compatibleEntities: [All]
    description: Sends a controlled wave or nudge through nearby entities. Can scale strength and radius per user input.
    crossLinks: [InteractToolsRegistry, RadialVariantsAndTypes]

- id: tool_time
    type: control
    tags: [time, manipulation, control, modular]
    compatibleEntities: [All]
    description: Pause, slow, or speed up entities. Optional global or per-entity scope; visual cues recommended.
    crossLinks: [InteractToolsRegistry]

- id: tool_clone
    type: manipulation-gameplay
    tags: [clone, split, entity, modular]
    compatibleEntities: [All]
    description: Duplicates or divides entities. Can spawn swarm-like behaviors.
    crossLinks: [InteractToolsRegistry]

- id: tool_random
    type: interactive-fun
    tags: [randomizer, chaos, fun, modular]
    compatibleEntities: [All]
    description: Randomizes positions, velocities, or visual states. Good for testing limits or creative play.
    crossLinks: [InteractToolsRegistry]

- id: tool_vortex
    type: physics-effector
    tags: [vortex, blackhole, gravity, modular]
    compatibleEntities: [All]
    description: Localized gravity or spiral pull. Can remove entities at higher strength; integrates with other effectors.
    crossLinks: [InteractToolsRegistry, RadialVariantsAndTypes]

- id: tool_capture
    type: control-utility
    tags: [capture, snapshot, utility, modular]
    compatibleEntities: [All]
    description: Captures current canvas or viewport. Configurable format (PNG, JPEG).
    crossLinks: [InteractToolsRegistry]

- id: tool_video
    type: control-utility
    tags: [video, gif, record, modular]
    compatibleEntities: [All]
    description: Records gameplay sequences for playback or sharing. Adjustable frame rate and duration.
    crossLinks: [InteractToolsRegistry]

- id: tool_replay
    type: control-utility
    tags: [replay, playback, utility, modular]
    compatibleEntities: [All]
    description: Replays last N seconds of world state. Useful for testing or cinematic playback.
    crossLinks: [InteractToolsRegistry]
