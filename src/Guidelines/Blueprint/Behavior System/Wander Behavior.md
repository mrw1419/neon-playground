─────────────────────────────────────────────
WANDER BEHAVIOR – ENGINE BLUEPRINT
─────────────────────────────────────────────

# IDENTITY & METADATA
Name: WanderBehavior
Type: Behavior
Folder: src/engine/behaviors/wander/
Unique ID: behavior_wander
Parent Type: Wander
Tags: ☐ AI ☐ Movement ☐ Exploration ☐ PointerInput ☐ TouchInput
Alignment: Neutral

# CORE ATTRIBUTES
Speed: 0.8
TurnRate: 0.03
WanderRadius: 100
PauseProbability: 0.1
ObstacleAvoidance: ☐ True ☐ False

# CONFIGURABLE TRAITS
☐ RandomPath ☐ AvoidEdges ☐ StopOnCollision

# LIFECYCLE & STATE
Active on Spawn: ☐ True
Hooks:
  ☐ onUpdate
  ☐ onCollision
  ☐ onPause
  ☐ onResume
  ☐ onPointerMove
  ☐ onTouchMove

# ENGINE INTEGRATION
Folder: src/engine/behaviors/wander/
Engine System Hooks: engine.ts tick loop
Entity Integration: BaseEntity → behaviors array
Physics Interaction: Uses physicsEngine for position updates and collisions
Pointer/Touch Integration: Handles unified pointer events (mouse/touch) for wander control
Registry: src/engine/behaviors/index.ts exports WanderBehavior

# NOTES / SEQUENCE
1. Choose random heading within WanderRadius.
2. Apply movement vector each tick.
3. Randomly pause based on PauseProbability.
4. Check for obstacles; apply avoidance if enabled.
5. Update entity orientation to match heading.
6. Respond to pointer and touch input for dynamic wander control.
7. Test behavior on both mouse and touch devices.
