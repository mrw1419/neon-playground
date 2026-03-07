═════════════════════════════════════════════
ENGINE ARCHITECTURE CONSTITUTION
Location: /src/engine
Purpose: Define immutable architectural law
═════════════════════════════════════════════


SECTION I — CORE PHILOSOPHY
────────────────────────────────

The Engine is pure simulation infrastructure.

It:
- Owns physics
- Owns simulation timing
- Owns entity lifecycle
- Owns effector execution
- Produces render state

It does NOT:
- Render UI
- Import React
- Contain game-specific logic
- Hardcode variant behaviors
- Know about content folders

The Engine is reusable, headless, and deterministic.


═════════════════════════════════════════════
SECTION II — LAYER HIERARCHY
═════════════════════════════════════════════

Layers are ordered bottom → top.

Lower layers MUST NOT depend on higher layers.

    6. UI Layer (Outside Engine)
    5. Render Bridge Layer
    4. World Orchestration Layer
    3. Entity Abstraction Layer
    2. Effector Geometry Layer
    1. Physics Layer


Dependency flow is strictly:

Top → Down

Never Down → Up.


═════════════════════════════════════════════
SECTION III — MINI ARCHITECTURE TREE
═════════════════════════════════════════════

src/
└─ engine/
   ├─ physics/
   │   ├─ PhysicsEngine.ts
   │   ├─ ForceHelpers.ts
   │   └─ CollisionSystem.ts
   │
   ├─ effectors/
   │   ├─ EffectorSystem.ts
   │   ├─ RadialBase.ts
   │   └─ types.ts
   │
   ├─ entities/
   │   ├─ BaseEntity.ts
   │   └─ EntityRegistry.ts
   │
   ├─ world/
   │   └─ WorldEngine.ts
   │
   └─ rendering/
       └─ RenderCoordinator.ts


Nothing else lives in /engine.

No React.
No content.
No UI components.
No variant files.


═════════════════════════════════════════════
SECTION IV — LAYER DEFINITIONS
═════════════════════════════════════════════


1. PHYSICS LAYER
────────────────────
Files:
- PhysicsEngine.ts
- ForceHelpers.ts
- CollisionSystem.ts

Owns:
- Matter.Engine
- Matter.World
- Physics stepping
- Body management
- Raw force application

Allowed to import:
- Matter.js modules

Must NOT import:
- WorldEngine
- Entities
- EffectorSystem
- React
- Renderer

Rule:
Only this layer touches Matter.js.


2. EFFECTOR GEOMETRY LAYER
────────────────────
Files:
- RadialBase.ts
- types.ts

Owns:
- Radius expansion math
- Slice angle filtering
- Falloff calculations
- Force vector computation

Does NOT:
- Apply forces
- Step physics
- Render
- Own entities

Allowed to receive:
- Entity list
- Origin
- Config

Returns:
- Force vectors


3. ENTITY ABSTRACTION LAYER
────────────────────
Files:
- BaseEntity.ts
- EntityRegistry.ts

Owns:
- Matter.Body reference
- Lifecycle hooks
- Upgrade storage
- Tag system
- Effector modifier lookup

Must NOT:
- Apply raw physics forces directly
- Compute radial math
- Render visuals
- Know about React

Entities request.
They do not execute physics.


4. WORLD ORCHESTRATION LAYER
────────────────────
Files:
- WorldEngine.ts

Owns:
- Simulation loop
- Subsystem initialization
- Entity lifecycle management
- Effector dispatch timing
- Collision routing
- Render state production

Must NOT:
- Compute geometry math
- Apply raw Matter forces
- Render UI
- Hardcode effector variants

WorldEngine coordinates.
It does not calculate.


5. RENDER BRIDGE LAYER
────────────────────
Files:
- RenderCoordinator.ts

Owns:
- Render state aggregation
- Entity visual token collection
- Effector visual token collection

Does NOT:
- Render React components
- Import Matter
- Compute physics

Produces:
Plain data render state.

UI consumes it.


═════════════════════════════════════════════
SECTION V — DEPENDENCY LAW
═════════════════════════════════════════════

Allowed:

WorldEngine → PhysicsEngine
WorldEngine → EffectorSystem
WorldEngine → Entities
WorldEngine → RenderCoordinator

EffectorSystem → RadialBase
EffectorSystem → PhysicsEngine

Entities → (no upward imports)

Forbidden:

PhysicsEngine → WorldEngine
RadialBase → PhysicsEngine
Entity → PhysicsEngine
RenderCoordinator → PhysicsEngine
Any Engine file → React


If a lower layer imports a higher layer,
the architecture is violated.


═════════════════════════════════════════════
SECTION VI — DATA OWNERSHIP RULES
═════════════════════════════════════════════

PhysicsEngine owns:
- Physics state
- Body transforms
- Collision events

EffectorSystem owns:
- Active effector queue
- Effector lifecycle timing

WorldEngine owns:
- Entity registry
- Simulation state
- Subsystem instances

Entities own:
- Upgrade data
- Tags
- Internal state

RenderCoordinator owns:
- Frame render state only


No shared mutable state across layers.


═════════════════════════════════════════════
SECTION VII — EVENT FLOW LAW
═════════════════════════════════════════════

Collision Flow:
PhysicsEngine → WorldEngine → Entities

Effector Flow:
Entity → WorldEngine → EffectorSystem
EffectorSystem → PhysicsEngine

Render Flow:
WorldEngine → RenderCoordinator → UI

Physics never emits directly to UI.


═════════════════════════════════════════════
SECTION VIII — RENDER SEPARATION RULE
═════════════════════════════════════════════

Engine must be fully headless.

It must be possible to:
- Run simulation without UI
- Unit test without React
- Serialize world state

If React import appears in /engine,
architecture is broken.


═════════════════════════════════════════════
SECTION IX — EXTENSIBILITY PRINCIPLES
═════════════════════════════════════════════

Future systems must respect layer order:

Networking Layer (above WorldEngine)
Save/Load Layer (parallel to WorldEngine)
AI System (above Entity Layer)

New geometry types (Cone, Field, Beam)
must extend Effector Geometry Layer.

Never inject behavior directly into Physics.


═════════════════════════════════════════════
SECTION X — THE PRIME DIRECTIVE
═════════════════════════════════════════════

The Engine governs simulation.

It does not:
- Decide game design
- Decide visuals
- Decide content

It provides laws.
Content lives elsewhere.

If confusion arises, ask:

"Which layer owns this responsibility?"

If unclear,
it does not belong in the engine.


═════════════════════════════════════════════
END OF ENGINE ARCHITECTURE CONSTITUTION
═════════════════════════════════════════════
