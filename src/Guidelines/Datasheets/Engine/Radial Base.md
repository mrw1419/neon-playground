═════════════════════════════════════════════
RADIAL BASE DATA SHEET
Subsystem: RadialBase
Layer: 2 — Effector Geometry Layer
Location: src/engine/effectors/RadialBase.ts
═════════════════════════════════════════════


SECTION I — PURPOSE
────────────────────────────────

RadialBase is a pure geometry + force computation engine.

It computes:

- Distance from origin
- Radius progression
- Angle filtering (FULL_360 or SLICE)
- Falloff curves
- Force vectors per target

It does NOT:

- Apply forces to Matter bodies
- Step physics
- Trigger effectors
- Render visuals
- Own lifecycle queues

It calculates.
Nothing more.


═════════════════════════════════════════════
SECTION II — INPUT CONTRACT
═════════════════════════════════════════════

RadialBase receives:

{
  origin: Vector,
  targets: Array<{
    id: string,
    position: Vector,
    mass: number
  }>,
  config: {
    mode: "FULL_360" | "SLICE",
    angle?: number,
    direction?: Vector,
    currentRadius: number,
    maxRadius: number,
    baseForce: number,
    falloff: "LINEAR" | "EXPONENTIAL" | "INVERSE_SQUARE",
    forceDirection: "OUTWARD" | "INWARD" | "CUSTOM",
    customVector?: Vector
  }
}

It does not access world state directly.
All required data must be passed in.


═════════════════════════════════════════════
SECTION III — OUTPUT CONTRACT
═════════════════════════════════════════════

Returns:

Array<{
  targetId: string,
  forceVector: Vector
}>

No side effects.
No mutation of input.
Pure function behavior.


═════════════════════════════════════════════
SECTION IV — GEOMETRY RULES
═════════════════════════════════════════════

1. DISTANCE CALCULATION

distance = magnitude(target.position - origin)

If distance > currentRadius:
    target is ignored.

2. SLICE MODE FILTERING

If mode === "SLICE":

- Compute vector from origin → target
- Normalize
- Compute angle between that vector and direction vector
- If angle > sliceAngle / 2:
    target is ignored.

Angle math must be deterministic.


3. FORCE DIRECTION RULE

If OUTWARD:
    forceDirection = normalize(target - origin)

If INWARD:
    forceDirection = normalize(origin - target)

If CUSTOM:
    forceDirection = normalize(customVector)


═════════════════════════════════════════════
SECTION V — FALLOFF CURVES
═════════════════════════════════════════════

Let d = distance
Let R = currentRadius
Let F = baseForce

1. LINEAR

forceMagnitude = F * (1 - d / R)

2. EXPONENTIAL

forceMagnitude = F * e^(-k * d)

3. INVERSE_SQUARE

forceMagnitude = F / (d² + epsilon)

epsilon prevents divide-by-zero.

Falloff math must never produce NaN.
Clamp at zero minimum.


═════════════════════════════════════════════
SECTION VI — RADIUS PROGRESSION MODEL
═════════════════════════════════════════════

RadialBase does NOT own time.

It receives currentRadius from EffectorSystem.

However, recommended progression model:

currentRadius += expansionSpeed * deltaTime

RadialBase must behave correctly at:

- radius = 0
- radius = maxRadius
- extremely large radius


═════════════════════════════════════════════
SECTION VII — MASS CONSIDERATION
═════════════════════════════════════════════

RadialBase may optionally scale by mass:

adjustedForce = forceMagnitude / target.mass

But this must be controlled via config flag.

RadialBase does NOT decide this automatically.


═════════════════════════════════════════════
SECTION VIII — WHAT IT MUST NEVER DO
═════════════════════════════════════════════

✗ Import PhysicsEngine
✗ Import WorldEngine
✗ Import BaseEntity
✗ Import React
✗ Modify world state
✗ Store internal state across frames
✗ Trigger events

If RadialBase becomes stateful,
you have violated the geometry layer.


═════════════════════════════════════════════
SECTION IX — DETERMINISM RULE
═════════════════════════════════════════════

Given identical inputs,
RadialBase must produce identical outputs.

No randomness.
No hidden time dependency.
No floating side effects.


═════════════════════════════════════════════
SECTION X — PERFORMANCE EXPECTATIONS
═════════════════════════════════════════════

- O(n) over targets
- No nested loops
- Minimal allocations
- Vector reuse encouraged

Geometry must scale to hundreds of targets.


═════════════════════════════════════════════
SECTION XI — FUTURE EXTENSIONS
═════════════════════════════════════════════

Allowed extensions:

- Cone geometry
- Ring-only band (innerRadius + outerRadius)
- Oscillating wave (sin-based magnitude modifier)
- Multi-pulse calculation

Not allowed:

- Lifecycle timers
- Effector queue management
- Visual event emission


═════════════════════════════════════════════
SECTION XII — MENTAL MODEL
═════════════════════════════════════════════

RadialBase is math.

It is a calculator.

It does not know:
- why the star exploded
- why the tractor beam fired
- what alignment the entity has

It only knows:

origin
distance
angle
force


If it starts knowing more,
the layer boundary has collapsed.


═════════════════════════════════════════════
END OF RADIAL BASE DATA SHEET
═════════════════════════════════════════════
