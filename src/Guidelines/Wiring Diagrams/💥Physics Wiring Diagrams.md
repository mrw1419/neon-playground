# --------------------
# 💡 Effector Behavior Clarifications (Ripple & Gravity)
# --------------------

## Ripple Effector (Gravity Waves)
- Ripple is intended to act like gravity waves emanating from the source of the radial effector.
- Entities should experience a slight nudge away from the center, but not a strong burst—more like a gentle oscillation.
- As the wave passes under an entity, it should cause a brief freeze or slow of movement, then a bobbing up and down effect (vertical oscillation) as the wave passes.
- The effect should be radius-based, affecting all entities within the wavefront, not just those directly under the cursor.

## Gravity Effector
- Gravity effector is intended to pull objects inward toward the effect center.
- All entities within the effect radius should experience a force vector pointing toward the center, with strength possibly falling off with distance.
- This is the opposite of burst/ripple, which push away or oscillate.

## Implementation Notes
- Both effectors should use a distance check (entity to effect center) to determine which entities are affected.
- For ripple, apply a vertical oscillation (e.g., using a sine wave based on distance and time) to simulate bobbing.
- For gravity, apply a force vector toward the center.

See below for the main physics and effect application flow.
# 💥 Physics Wiring Diagrams

> **Note:**
> This file covers core physics, entity sync, and store-driven reactivity. For extensible effector, overlay, and registry-driven effect logic (burst, ripple, trail, gravity, etc.), see:
> 
> 🎛️ [Control Panel Wiring Diagram](./🎛️Control%20Panel%20Wiring%20Diagram.md)
> 
> That diagram includes all emoji [Filename] references and extensible flows for effectors, overlays, and registry wiring.

## Purpose
Map out the flow of physics logic in Neon Playground, including how entities are updated, collisions are handled, and forces are applied. Use this file to plan, troubleshoot, and document physics-related wiring and log keys.

- Show how the engine tick, physics step, and entity sync interact.
- Add logs for tick start/end, entity before/after physics, collisions, and force application.
- Cross-reference Entity Wiring Diagrams.md for how entity positions are synced and rendered.

# Emoji [Filename] Reference (Grouped)

### ⚡ Core Physics
- ⚡ [physicsEngine] Tick start/end—Physics tick boundaries
- 🪐 [physicsEngine] Entity before/after physics—Entity state before/after physics step

### 💥 Collisions & Forces
- 💥 [physicsEngine] Collision detected (left/right/top/bottom)—Boundary collision
- 🏋️ [physicsEngine] Force applied to entity—Direct force
- 🏋️ [physicsEngine] Radial impulse applied—Burst/radial force

### 📝 Engine Sync & Rendering
- 📝 [engine] Synced entity.position/velocity from body—Engine sync
- 🖼️ [EntityLayer] PlanetVisual props—Visual rendering

### 🟦 Stores
- 🟦 [entityStore.ts]—Effector entity store, holds and manages entity state/history
- 🟧 [effectStore.ts]—Effector effect store, holds and manages active effects (if used in physics)

# --------------------
# 💥 Grand Physics & Engine Flow (Updated for Effector Store Reactivity)
# --------------------


# Context: This pipeline covers the complete wiring from engine tick, physics step, entity sync, collision/force handling, Effector entity store update, and rendering. Each step uses the emoji [Filename] // comment format for clarity.



[⚡ physicsEngine.ts] Tick start: Physics tick begins
    ↓
[🪐 physicsEngine.ts] All entities before physics: Log state for all entities with physics bodies
    ↓
[💥 physicsEngine.ts] Collision detected (boundaries/entities): Log any boundary or entity collisions
    ↓
[🏋️ physicsEngine.ts] Force/impulse applied: Log any forces or impulses applied (from effectors, gravity, etc.)
    ↓
[🪐 physicsEngine.ts] All entities after physics: Log state for all entities after physics step
    ↓
[📝 engine.ts] Sync entity.position/velocity from body: Engine syncs each entity's state from its physics body
    ↓
🟦 [entityStore.ts] setEntities called: Entity store updated with latest entity states (array/objects)
    ↓
// (If effects/impulses are present)
🧰 [useRadialEffector.ts] (generic, registry-driven effect trigger for all radial effectors; adds effect to effectStore)
🟧 [effectStore.ts] effectStore updated: Active effects/impulses may be consumed or cleared here
    ↓
[👁️ OverlayLayer.tsx] Overlays rendered with updated entity/effect positions (fully reactive, uses entityStore/effectStore)
    ↓
[🖼️ EntityLayer.tsx] Entity visuals rendered with updated positions
    ↓
[⚡ physicsEngine.ts] Tick end: Physics tick ends

# --------------------
# 💥 Physics Tick Pipeline (Granular)
# --------------------


# Context: This pipeline details the step-by-step flow for a single physics tick, including per-entity updates, collision checks, force application, entity store update, and sync to engine/entity state. Each step uses the emoji [Filename] // comment format for clarity.



[⚡ physicsEngine.ts] Tick start { delta }
    ↓
for each entity with a physics body:
    ↓
    [🪐 physicsEngine.ts] Entity before physics { id, type, position, velocity }
    ↓
    [💥 physicsEngine.ts] Collision detected (boundaries/entities) { id, type }
    ↓
    [🏋️ physicsEngine.ts] Force/impulse applied { id, type, force, origin, radius } // If force applied
    ↓
    [🪐 physicsEngine.ts] Entity after physics { id, type, position, velocity }
    ↓
    [📝 engine.ts] Synced entity.position/velocity from body { id, type, position, velocity }
    ↓
    🟦 [entityStore.ts] setEntities called: Entity store updated with latest entities
    ↓
    // (If effects/impulses are present)
    🧰 [useRadialEffector.ts] (generic, registry-driven effect trigger for all radial effectors; adds effect to effectStore)
    🟧 [effectStore.ts] effectStore updated: Active effects/impulses may be consumed or cleared here
    ↓
    [🖼️ EntityLayer.tsx] Entity visual props { key, type, ...visualProps }
    ↓
[⚡ physicsEngine.ts] Tick end

# --------------------
# 💥 Physics: Gravity, Collisions, Forces — Expectations
# --------------------

## Context: This section describes the expected behaviors and logs for gravity, collisions, and forces in the physics system.

### Gravity
- Each planet/entity with a physics body is affected by gravity set in physicsEngine.
- Expect: Planets accelerate downward (or in gravity direction) each tick.
- Log: Entity velocity increases due to gravity; position updates accordingly.

### Collisions
- Planets/entities bounce off screen boundaries (left, right, top, bottom).
- Expect: When a planet reaches a boundary, velocity reverses and is dampened.
- Log: Collision detected (left/right/top/bottom); entity position/velocity after collision.

### Forces
- Radial impulses or other forces can be applied to planets/entities.
- Expect: Planets/entities respond instantly to applied forces (velocity changes, movement direction shifts).
- Log: Force applied to entity; entity velocity/position after force.

### Tick Logging
- For each physics tick:
  - Log tick start/end
  - Log entity position/velocity before physics
  - Log entity position/velocity after physics

### Visual/Debug Overlay
- DevOverlay or console should show:
  - Current tick number
  - Entity positions/velocities
  - Collision and force events

# --------------------
# 💥 Validation & Troubleshooting Checklist
# --------------------

- [ ] Gravity visibly affects planets/entities (velocity increases, position changes)
- [ ] Planets/entities bounce off boundaries (collision logs appear)
- [ ] Forces applied to planets/entities change their movement (force logs appear)
- [ ] Before/after logs show correct position/velocity changes
- [ ] No unexpected behavior (e.g., stuck entities, missing logs)

- [ ] Confirm tick logs appear each frame
- [ ] Confirm entity logs show position/velocity changes
- [ ] Confirm collision logs trigger on boundary events
- [ ] Confirm force logs trigger on impulse events

# --------------------
# 💥 Custom Rules & Next Steps
# --------------------

- Only physics-related logs should be enabled during focused debugging.
- Use emoji log keys for clarity and filtering.
- Expand diagram with visual flow (Mermaid/ASCII) as needed.
- Add edge cases and error handling logs.
- Document integration points with engine and entity systems.

---

# Burst Effector/Physics/Overlay Wiring (2026)

```mermaid
flowchart TD
    subgraph UI
      A[PlaygroundControlPanel.tsx<br/>TabCard click] --> B[setSelectedEffect]
      B --> C[PlaygroundScene.tsx<br/>selectedEffect prop]
      C --> D[PlaygroundCanvas.tsx<br/>pointerDown]
      D --> E[useRadialEffector.ts<br/>triggerEffector]
    end
    E --> F[effectStore.ts<br/>addEffect]
    F --> G[EffectorVisuals<br/>(Burst, Ripple, Trail, Gravity)]
    E --> H[effectorSystem.ts<br/>enqueueBurst]
    H --> I[engine.ts<br/>engine tick]
    I --> J[physicsEngine.ts<br/>applyRadialImpulse]
    J --> K[entityStore.ts<br/>setEntities]
    K --> L[EntityLayer.tsx<br/>render entities]
    subgraph Overlays
      F --> M[OverlayLayer.tsx<br/>useUnit($effects)]
      M --> N[EffectorPreviewOverlay]
      M --> O[EffectorInfoOverlayVisual]
    end
    K --> M
    style F fill:#ffecb3
    style H fill:#b3e5fc
    style J fill:#c8e6c9
    style K fill:#ffe0b2
    style L fill:#d1c4e9
    style M fill:#f8bbd0
    style N fill:#f8bbd0
    style O fill:#f8bbd0
```
