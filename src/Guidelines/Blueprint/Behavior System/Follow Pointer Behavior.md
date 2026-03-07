─────────────────────────────────────────────
FOLLOW POINTER BEHAVIOR – ENGINE BLUEPRINT
─────────────────────────────────────────────

# IDENTITY & METADATA
Name: FollowPointerBehavior
Type: Behavior
Folder: src/engine/behaviors/interact/
Unique ID: behavior_follow_pointer
Parent Type: Interact
Tags: ☐ AI ☐ Movement ☐ User-Controlled ☐ Touch ☐ Mouse ☐ Pointer
Alignment: Neutral

# CORE ATTRIBUTES
SpeedMultiplier: 1.2
Acceleration: 0.06
Deceleration: 0.03
MaintainOrientation: ☐ True ☐ False
MaxDistanceFromCursor: 250

# CONFIGURABLE TRAITS
☐ SmoothFollow ☐ SnapToCursor ☐ StopAtMaxDistance

# LIFECYCLE & STATE
Active on Spawn: ☐ True
Hooks:
  ☐ onUpdate
  ☐ onPointerMove (mouse/touch)
  ☐ onCollision

# ENGINE INTEGRATION
Folder: src/engine/behaviors/interact/
Engine System Hooks: engine.ts tick loop, physicsEngine
Entity Integration: BaseEntity → behaviors array
Physics Interaction: Forces applied toward pointer position (mouse/touch)
Registry: src/engine/behaviors/index.ts exports FollowPointerBehavior

# NOTES / SEQUENCE
1. Track pointer position (mouse/touch) in scene coordinates.
2. Calculate vector from entity to pointer.
3. Apply acceleration toward pointer respecting MaxDistanceFromCursor.
4. Optionally rotate entity to face pointer if MaintainOrientation is true.
5. Update entity state each tick via engine update loop.
