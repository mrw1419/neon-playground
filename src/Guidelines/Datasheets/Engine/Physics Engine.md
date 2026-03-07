═════════════════════════════════════════════
PHYSICS ENGINE DATA SHEET
Subsystem: PhysicsEngine
Layer: 1 — Physics Layer (Foundation)
Location: src/engine/physics/PhysicsEngine.ts
═════════════════════════════════════════════


SECTION I — PURPOSE
────────────────────────────────

PhysicsEngine is a thin, controlled wrapper around Matter.js.

It provides:
- Engine creation
- World management
- Physics stepping
- Body management
- Force application
- Collision event forwarding

It is infrastructure only.

It does NOT:
- Know what an Entity is
- Know what an Effector is
- Know about rendering
- Contain gameplay logic
- Contain upgrade logic

It is deterministic simulation plumbing.


═════════════════════════════════════════════
SECTION II — OWNERSHIP
═════════════════════════════════════════════

PhysicsEngine owns:

- Matter.Engine instance
- Matter.World instance
- Matter.Runner (optional)
- Registered Matter.Body instances
- Collision event subscription

It does NOT own:

- Entity registry
- Effector queue
- Render state
- Upgrade modifiers


═════════════════════════════════════════════
SECTION III — PUBLIC API SURFACE
═════════════════════════════════════════════

Creation

- constructor(config)
- initialize()

World Control

- step(deltaTime)
- setTimeScale(scale)
- pause()
- resume()

Body Management

- addBody(body)
- removeBody(body)
- clearWorld()

Force Application

- applyForce(body, vector)
- applyImpulse(body, vector)
- applyTorque(body, value)

Query Utilities (optional but allowed)

- getBodies()
- queryRegion(bounds)
- raycast(start, end)

Collision Events

- onCollision(callback)
- offCollision(callback)

No other systems directly touch Matter.


═════════════════════════════════════════════
SECTION IV — WHAT IT MUST NEVER DO
═════════════════════════════════════════════

✗ Import WorldEngine
✗ Import BaseEntity
✗ Import EffectorSystem
✗ Import React
✗ Compute radial math
✗ Modify entity state
✗ Trigger effectors
✗ Store game-specific metadata

If any gameplay logic appears here,
the layer is compromised.


═════════════════════════════════════════════
SECTION V — COLLISION HANDLING MODEL
═════════════════════════════════════════════

PhysicsEngine listens to Matter collision events.

On collision:

1. Extract raw Matter.Body references
2. Emit simple collision payload:

   {
     bodyA,
     bodyB,
     collisionData
   }

3. WorldEngine decides what those bodies represent.

PhysicsEngine does not resolve collisions.
It only reports them.


═════════════════════════════════════════════
SECTION VI — FORCE MODEL RULES
═════════════════════════════════════════════

PhysicsEngine applies force exactly as instructed.

It does NOT:

- Clamp values
- Modify force strength
- Apply falloff
- Check tags
- Check alignment

All higher-level logic is computed before reaching this layer.

PhysicsEngine is a dumb executor.


═════════════════════════════════════════════
SECTION VII — TIME STEPPING RULE
═════════════════════════════════════════════

step(deltaTime):

- Advance Matter.Engine by deltaTime
- Do not run game logic
- Do not trigger effectors
- Do not mutate external state

Physics step must always occur before entity update phase.


═════════════════════════════════════════════
SECTION VIII — FORCE HELPERS (OPTIONAL MODULE)
═════════════════════════════════════════════

File: ForceHelpers.ts

Purpose:
Reusable math utilities for raw force application.

Examples:

- normalize(vector)
- scaleVector(vector, scalar)
- computeImpulseFromMass(mass, desiredVelocity)
- clampMagnitude(vector, max)

These are pure math helpers.
No state. No side effects.


═════════════════════════════════════════════
SECTION IX — COLLISION SYSTEM MODULE
═════════════════════════════════════════════

File: CollisionSystem.ts

Purpose:
Encapsulate collision subscription logic.

Responsibilities:

- Subscribe to Matter events
- Normalize event payload
- Emit minimal collision data

No entity mapping.
No gameplay triggers.


═════════════════════════════════════════════
SECTION X — DEPENDENCY RULES
═════════════════════════════════════════════

PhysicsEngine MAY import:
- Matter.Engine
- Matter.World
- Matter.Runner
- Matter.Body
- Local math utilities

PhysicsEngine MUST NOT import:
- ../world/*
- ../entities/*
- ../effectors/*
- ../rendering/*
- React


Dependency flow ends here.

Nothing below this layer exists.


═════════════════════════════════════════════
SECTION XI — PERFORMANCE PRINCIPLES
═════════════════════════════════════════════

PhysicsEngine should:

- Minimize allocations per frame
- Avoid deep object cloning
- Avoid conditional branching based on game rules
- Expose minimal abstraction overhead

Physics must be stable before it is clever.


═════════════════════════════════════════════
SECTION XII — EXTENSIBILITY RULES
═════════════════════════════════════════════

Future additions allowed:

- Spatial partitioning helpers
- Broadphase optimization controls
- Deterministic replay support
- Snapshot serialization hooks

Future additions NOT allowed:

- Effector-specific logic
- Tag-based filtering
- Upgrade-aware force modification
- Visual callbacks


═════════════════════════════════════════════
SECTION XIII — MENTAL MODEL
═════════════════════════════════════════════

PhysicsEngine is gravity.

It pulls.
It pushes.
It collides.

It does not care why.

If it starts caring,
you have broken the architecture.


═════════════════════════════════════════════
END OF PHYSICS ENGINE DATA SHEET
═════════════════════════════════════════════
