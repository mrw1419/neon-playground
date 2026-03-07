─────────────────────────────────────────────
NEON PLAYGROUND – ENGINE BEHAVIOR SYSTEM BLUEPRINT
─────────────────────────────────────────────

Reference:
/src/Guidelines/Blueprint
   - 🎮  Playground detangling.md
   - Post Detangle - Playground Blueprint.md
   
─────────────────────────────────────────────
NEON PLAYGROUND – BEHAVIOR SYSTEM CHECKLIST
─────────────────────────────────────────────

1. CREATE BEHAVIOR FOLDER STRUCTURE
   [ ] Create src/engine/behaviors/
   [ ] Create subfolders for buckets:
       - follow/
       - wander/
       - reactive/
       - physicsAware/
       - interact/
   [ ] Add index.ts for BehaviorRegistry export
   [ ] Add README.md for documentation and contribution guide

2. IMPLEMENT INITIAL BEHAVIORS
   [ ] FollowTargetBehavior.ts → follow/
   [ ] OrbitBehavior.ts → follow/
   [ ] WanderBehavior.ts → wander/
   [ ] FollowPointerBehavior.ts → interact/  # Handles both mouse and touch input
   [ ] FollowTouchBehavior.ts → interact/    # (Optional, if separate logic needed)
   [ ] (Optional) Placeholder behaviors for reactive/physicsAware buckets

3. DEFINE BEHAVIOR INTERFACES
   [ ] BehaviorClass / BehaviorInstance interface
   [ ] tick(worldState: WorldState, deltaTime: number) method
   [ ] Config and metadata typing
   [ ] Input abstraction: Behaviors respond to pointer events (mouse/touch unified)

4. SET UP BEHAVIOR REGISTRY
   [ ] index.ts exports all behaviors grouped by bucket
   [ ] Ensure easy lookup: BehaviorRegistry[bucket][behaviorName]
   [ ] Document usage in README.md

5. INTEGRATE WORLDSTATE
      [ ] Confirm WorldState snapshot structure:
         - entities
         - global parameters (time, tick)
         - pointer state (mouse/touch position, active pointers)
   [ ] Behaviors access WorldState, do not mutate engine directly
   [ ] Confirm BaseEntity.tickBehaviors(worldState, deltaTime) exists

6. INTEGRATE WITH ENGINE TICK LOOP
   [ ] engine.ts calls BehaviorSystem.update(worldState, deltaTime)
   [ ] Each entity executes its behaviors deterministically
   [ ] Ensure lightweight updates for performance

7. LINK WITH ENTITY SPAWNING & HOOKS
   [ ] engine.spawnEntity(type, config.behaviors) attaches behaviors
   [ ] Hooks like useColin / usePlanetPlacement can pass behaviors dynamically
   [ ] Document API for adding/removing behaviors post-spawn

8. ENSURE REGISTRY-DRIVEN EXPANSION
   [ ] Verify behaviors can be added to registry without touching UI or game layer
   [ ] Ensure registry lookup works for new entities dynamically

9. DOCUMENTATION & GUIDELINES
   [ ] Write behavior bucket guidelines in README.md
   [ ] Include usage, inputs, outputs, and WorldState dependencies
   [ ] Document input abstraction and pointer event handling (mouse/touch)
   [ ] Note performance considerations and deterministic rules

10. TESTING & DEBUGGING
   [ ] Attach debug overlays (optional) to verify behavior actions
   [ ] Unit test behaviors in isolation with mock WorldState (mouse/touch input)
   [ ] Integration test behaviors with engine tick loop (mouse/touch input)
   [ ] Verify FollowPointerBehavior moves entity correctly in PlaygroundScene




# Folder Structure
src/engine/
├── behaviors/                     # All behaviors live here
│   ├── follow/                    # Behaviors related to targeting or tracking
│   │   ├── FollowTargetBehavior.ts
│   │   └── OrbitBehavior.ts
│   ├── wander/                    # Autonomous/random movement
│   │   └── WanderBehavior.ts
│   ├── reactive/                  # Event-driven or conditional behaviors
│   │   └── OnCollisionBehavior.ts
│   ├── physicsAware/              # Behaviors aware of physics/world
│   │   └── AvoidObstacleBehavior.ts
│   ├── interact/                  # User/Tool-driven behaviors
│   │   └── FollowMouseBehavior.ts
│   ├── index.ts                   # Central BehaviorRegistry export
│   └── README.md                  # Overview and contribution guide
├── engine.ts                       # Tick loop + orchestrator
├── physicsEngine.ts                # Matter.js wrapper & physics helpers
├── effectorSystem.ts               # Engine effector behaviors
├── effectSystem.ts                 # Timed effects tracker
├── entity.ts                       # Shared entity lifecycle helpers
├── entities/
│   └── BaseEntity.ts               # Core entity base class
└── worldState.ts                   # Global simulation snapshot (entities, targets, environment)

─────────────────────────────────────────────
# BEHAVIOR SYSTEM PRINCIPLES

1. **Ownership**
   - Engine owns all behaviors.
   - Behaviors mutate only the entities they are attached to.
   - Read WorldState for context; never import visuals or game layer code.

2. **Registry**
   - index.ts exports a single `BehaviorRegistry`.
   - Registry shape example:
     ```ts
     export const BehaviorRegistry = {
       follow: {
         FollowTarget: FollowTargetBehavior,
         Orbit: OrbitBehavior,
       },
       wander: {
         Wander: WanderBehavior,
       },
       reactive: {
         OnCollision: OnCollisionBehavior,
       },
       physicsAware: {
         AvoidObstacle: AvoidObstacleBehavior,
       },
       interact: {
         FollowMouse: FollowMouseBehavior,
       },
     };
     ```
   - Enables dynamic attachment of behaviors to entities via engine public API.

3. **WorldState Integration**
   - WorldState tracks:
     - All active entities (position, velocity, metadata)
     - Global simulation parameters (time, tick, mouse/cursor)
     - Effect states (if relevant to behavior decisions)
   - Behaviors access state via:
     ```ts
     const { entities, cursorPosition, globalTime } = worldState;
     ```
   - Behaviors mutate entities via:
     - `entity.setVelocity(vx, vy)`
     - `entity.applyForce(x, y)`
     - `entity.updatePosition(x, y)`
   - No direct manipulation of physicsEngine internal structures.

4. **Behavior Buckets**
   - **Follow:** target tracking, orbiting
   - **Wander:** autonomous movement, patrol
   - **Reactive:** collision triggers, timers, event reactions
   - **PhysicsAware:** environment-aware movement
   - **Interact:** tool or mouse-driven behaviors
   - Each bucket is a folder; encourages modular expansion.

5. **Tick Integration**
   - engine.ts calls `BehaviorSystem.update(deltaTime, worldState)` each tick.
   - Each entity executes its attached behaviors in deterministic order.
   - Prioritize lightweight calculations for performance.

6. **Future-Ready Guidelines**
   - Add new behaviors only in their appropriate bucket.
   - Document each behavior in README.md with:
     - Purpose
     - Inputs (entity, WorldState)
     - Outputs (forces, velocity changes)
     - Dependencies (other behaviors or systems)
   - Keep behavior logic **pure simulation**: no UI, no React, no visual dependencies.

7. **Integration with Entities**
   - BaseEntity includes:
     ```ts
     behaviors: BehaviorInstance[];
     addBehavior(behaviorClass: BehaviorClass, config?: any);
     removeBehavior(behaviorName: string);
     tickBehaviors(worldState: WorldState, deltaTime: number);
     ```
   - Engine attaches behaviors at spawn or dynamically via hooks:
     ```ts
     engine.spawnEntity("colin", { behaviors: ["FollowMouse", "Orbit"] });
     ```

─────────────────────────────────────────────
# README.md SUGGESTIONS

- Overview of behavior system
- Registry explanation and how to attach behaviors
- Folder/bucket structure rationale
- Guidelines for adding new behaviors
- Notes on tick loop and WorldState integration
- Recommended coding conventions (no any, deterministic, decoupled)

─────────────────────────────────────────────
# KEY TAKEAWAYS

- Behaviors live **only in engine**.
- WorldState is central for entity/environment awareness.
- Registry enables dynamic attachment and future AI behaviors.
- Buckets maintain clarity, modularity, and scalability.
- Detached from visuals/UI, supporting Neon Playground’s post-detangle architecture.
