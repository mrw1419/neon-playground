─────────────────────────────────────────────
WORLD ENGINE DATA SHEET
Subsystem: WorldEngine
Layer: Orchestration
Location: src/engine/world/WorldEngine.ts
─────────────────────────────────────────────

ROLE
──────────────────────────────
The WorldEngine is the universe conductor.

It orchestrates:
- Physics stepping
- Entity lifecycle updates
- Effector dispatch timing
- Collision routing
- Render state production

It does NOT implement physics.
It does NOT compute effector geometry.
It does NOT render directly.

It coordinates systems. It does not replace them.

──────────────────────────────
PRIMARY RESPONSIBILITIES
──────────────────────────────

1. Own the Simulation Loop
   - start()
   - stop()
   - step(deltaTime)

2. Hold Core Subsystems
   - PhysicsEngine instance
   - EffectorSystem instance
   - EntityRegistry
   - RenderCoordinator

3. Manage Entity Lifecycle
   - registerEntity(entity)
   - removeEntity(entity)
   - update all entities each tick

4. Route Collisions
   - Subscribe to PhysicsEngine collision events
   - Forward to involved entities
   - Trigger effector hooks if needed

5. Orchestrate Effector Execution
   - Receive effector triggers from entities
   - Delegate to EffectorSystem

6. Produce Frame Render State
   - Collect render tokens
   - Pass to RenderCoordinator

──────────────────────────────
WHAT WORLD ENGINE MUST NEVER DO
──────────────────────────────

✗ Compute radial math
✗ Apply forces directly to Matter bodies
✗ Contain rendering logic
✗ Contain entity-specific behavior
✗ Know about visual styling tokens
✗ Import React
✗ Hardcode effector variants (Burst, Gravity, etc.)

If it does any of the above, it is violating its layer boundary.

──────────────────────────────
DEPENDENCY RULES
──────────────────────────────

WorldEngine MAY import:
- PhysicsEngine
- EffectorSystem
- BaseEntity
- EntityRegistry
- RenderCoordinator

WorldEngine MUST NOT be imported by:
- PhysicsEngine
- RadialBase
- Effector implementations

Flow direction is always downward:

WorldEngine
   → PhysicsEngine
   → EffectorSystem
   → Entity layer
   → RenderCoordinator

Never upward.

──────────────────────────────
UPDATE LOOP FLOW
──────────────────────────────

step(deltaTime):

1. Physics Step
   PhysicsEngine.step(deltaTime)

2. Entity Update Phase
   for each entity:
       entity.update(deltaTime)

3. Effector Execution Phase
   EffectorSystem.processQueue()

4. Cleanup Phase
   Remove destroyed entities
   Resolve lifecycle transitions

5. Render Phase
   renderState = RenderCoordinator.collect()
   emit(renderState)

Strict order. No reordering.

──────────────────────────────
COLLISION FLOW
──────────────────────────────

PhysicsEngine emits collision event:
   → WorldEngine receives
       → identify involved entities
           → entityA.onCollision(entityB)
           → entityB.onCollision(entityA)

WorldEngine does not resolve collision logic.
Entities decide how to respond.

──────────────────────────────
ENTITY MANAGEMENT MODEL
──────────────────────────────

WorldEngine maintains:

- entities: Map<EntityID, BaseEntity>
- pendingRemovals: Set<EntityID>

registerEntity(entity):
    - Add to registry
    - Add body to PhysicsEngine

removeEntity(entity):
    - Mark for removal
    - Remove from PhysicsEngine
    - Cleanup render state

Entities never remove themselves directly.
They request removal through WorldEngine.

──────────────────────────────
EFFECTOR TRIGGER FLOW
──────────────────────────────

Entity calls:
    worldEngine.triggerEffector(config)

WorldEngine:
    → forwards to EffectorSystem
    → does not modify config
    → does not compute geometry

EffectorSystem handles all force calculations.

──────────────────────────────
RENDER COORDINATION
──────────────────────────────

WorldEngine does NOT render.

Instead:

renderState = RenderCoordinator.collect({
    entities,
    activeEffectors,
})

React/UI layer consumes renderState.

Engine produces data.
UI renders visuals.

Strict separation.

──────────────────────────────
STATE OWNERSHIP
──────────────────────────────

WorldEngine owns:
- Simulation running state
- Entity registry
- Subsystem instances

WorldEngine does NOT own:
- Physics internal state (PhysicsEngine does)
- Effector math state (EffectorSystem does)
- Visual state (UI does)

──────────────────────────────
SCALABILITY CONSIDERATIONS
──────────────────────────────

Designed to support:
- Multiple simultaneous effectors
- Large entity counts
- Lifecycle-driven entity transitions
- Deterministic update order
- Pausable simulation
- Time scaling

Future extension:
- Multiple worlds
- Network sync layer
- Save/load snapshot system

──────────────────────────────
MENTAL MODEL
──────────────────────────────

PhysicsEngine = gravity
EffectorSystem = cosmic forces
Entities = celestial bodies
RenderCoordinator = telescope
WorldEngine = the universe manager

It governs.
It does not micromanage.

─────────────────────────────────────────────
END OF WORLD ENGINE DATA SHEET
─────────────────────────────────────────────
