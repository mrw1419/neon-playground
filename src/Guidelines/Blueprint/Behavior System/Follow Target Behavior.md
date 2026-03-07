─────────────────────────────────────────────
FOLLOW TARGET BEHAVIOR – ENGINE BLUEPRINT
─────────────────────────────────────────────

# IDENTITY & METADATA
Name: FollowTargetBehavior
Type: Behavior
Folder: src/engine/behaviors/follow/
Unique ID: behavior_follow_target
Parent Type: Follow
Tags: ☐ AI ☐ Movement ☐ Utility ☐ Touch ☐ Mouse ☐ Pointer
Alignment: Neutral

# CORE ATTRIBUTES
SpeedMultiplier: 1.0
Acceleration: 0.05
Deceleration: 0.02
TargetAcquisitionRadius: 500
MaxFollowDistance: 300
MaintainOrientation: ☐ True ☐ False

# CONFIGURABLE TRAITS
☐ SmoothFollow ☐ MaintainDistance ☐ StopAtTarget ☐ PredictiveMotion

# LIFECYCLE & STATE
Tracks Target: ☐ True
Active on Spawn: ☐ True
Hooks:
  ☐ onUpdate
  ☐ onTargetLost
  ☐ onCollision
  ☐ onPointerMove (mouse/touch, if target is pointer)

# ENGINE INTEGRATION
Folder: src/engine/behaviors/follow/
Engine System Hooks: effectorSystem.ts (optional), engine.ts tick loop
Entity Integration: BaseEntity → behaviors array
Physics Interaction: Uses physicsEngine for movement forces
Registry: src/engine/behaviors/index.ts exports FollowTargetBehavior

# NOTES / SEQUENCE
1. Acquire target via entity ID, tag, or pointer (mouse/touch).
2. Calculate vector toward target (entity or pointer).
3. Apply acceleration toward target respecting MaxFollowDistance.
4. Optionally rotate entity to face target if MaintainOrientation is true.
5. Update entity state each tick via engine update loop.
6. Trigger onTargetLost if target goes out of radius.
