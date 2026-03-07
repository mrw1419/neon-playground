─────────────────────────────────────────────
ORBIT BEHAVIOR – ENGINE BLUEPRINT
─────────────────────────────────────────────

# IDENTITY & METADATA
Name: OrbitBehavior
Type: Behavior
Folder: src/engine/behaviors/follow/
Unique ID: behavior_orbit
Parent Type: Follow
Tags: ☐ AI ☐ Movement ☐ Utility ☐ PointerInput ☐ TouchInput
Alignment: Neutral

# CORE ATTRIBUTES
OrbitRadius: 200
OrbitSpeed: 0.02
OrbitDirection: Clockwise | CounterClockwise
TargetEntityID: ______________________
MaintainAltitude: ☐ True ☐ False

# CONFIGURABLE TRAITS
☐ DynamicRadius ☐ VariableSpeed ☐ PauseOnObstacle

# LIFECYCLE & STATE
Active on Spawn: ☐ True
Hooks:
  ☐ onUpdate
  ☐ onTargetLost
  ☐ onOrbitComplete
  ☐ onPointerMove
  ☐ onTouchMove

# ENGINE INTEGRATION
Folder: src/engine/behaviors/follow/
Engine System Hooks: engine.ts tick loop
Entity Integration: BaseEntity → behaviors array
Physics Interaction: Uses physicsEngine for radial movement calculations
Pointer/Touch Integration: Handles unified pointer events (mouse/touch) for orbit control
Registry: src/engine/behaviors/index.ts exports OrbitBehavior

# NOTES / SEQUENCE
1. Acquire orbit target entity.
2. Compute circular path based on OrbitRadius and OrbitDirection.
3. Apply movement along orbit vector per tick.
4. Maintain altitude or offset if MaintainAltitude is true.
5. Trigger onOrbitComplete if full orbit completed.
6. Monitor target validity; trigger onTargetLost if needed.
7. Respond to pointer and touch input for dynamic orbit control.
8. Test behavior on both mouse and touch devices.
