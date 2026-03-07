# Gravity Effector Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
- Name: Gravity Effector
- Parent Type: Radial Effector
- Unique ID: radial_gravity_<tier>
- Type: Effect / Effector
- Variant: Gravity
- Tags: Radial, Pull, Physics, Visual, Stackable
- Alignment: Neutral / Player-Controlled / AI
- Known From: Playground Game, Spaceship Game

──────────────────────────────
DESCRIPTION
──────────────────────────────
A continuous inward pull effect that draws entities toward the origin, optionally with spiraling or vortex motion at higher strengths. Used for black holes, tractor beams, and gravity wells.

──────────────────────────────
CORE VISUALS
──────────────────────────────
- Pulling radial lines
- Optional vortex or spiral animation
- Animation phases: Spawn → Pull → Peak → Dissolve
- Optional: Event horizon, distortion field, particle swirl

──────────────────────────────
BASE ATTRIBUTES
──────────────────────────────
- Scope: Per-entity / Per-group / Global
- Power: Adjustable (strength, radius, duration)
- Duration: Continuous (sustained) or timed
- Radius: S → XXL (200 → 2000 units)
- Stackable: True (multiple gravity fields can overlap)
- Triggers: UI, game events, entity action, collision
- Effect Modifiers: Can adjust entity speed, orbit, or visuals

──────────────────────────────
PHYSICS & INTERACTIONS
──────────────────────────────
- Influences: All or tagged entities within radius
- Force Model: Inward, optional spiral/torque
- Geometry Mode: FULL_360 or SLICE (directional)
- Collision Response: Adds velocity, can apply torque or spin
- Stacking: Stackable, can form vortex at high strength
- Movement: Stationary or can follow moving entity

──────────────────────────────
PARAMETERS & STATE
──────────────────────────────
- Maintains State: True (tracks radius, strength, duration)
- MaxStacks: Configurable
- Lifecycle Hooks: onTrigger, onUpdate, onExpire
- Upgradeable: True (radius, force, spiral, visual intensity)

──────────────────────────────
TRIGGERS & UI
──────────────────────────────
- Trigger Options: TabCard, Launcher, Button, Hotkey, Entity-linked, Stage triggers
- Controllable: True (user or AI)
- Can Be Disabled: True
- Cross-Game Integration: Yes

──────────────────────────────
EXTENSIBILITY & FUTURE-PROOFING
──────────────────────────────
- Visual Extensions: Vortex, spiral, event horizon overlays
- Behavior Extensions: Entity removal, orbit, chain reaction
- Integration: Engine (effectSystem), Content (effects/)

──────────────────────────────
TOOL & EFFECT INTEGRATION
──────────────────────────────
- Can be triggered by Magnet Tool, Launcher, or entity action
- Can trigger visual effects: vortex, spiral, color shift
- Can be combined with Paintbrush for creative gravity fields

──────────────────────────────
REGISTRY ENTRY SNAPSHOT
──────────────────────────────
{
  id: "radial_gravity_<tier>",
  parentType: "radial",
  variant: "gravity",
  geometryMode: "full_360|slice",
  scaleTier: "<s-xxl>",
  alignment: "<good|neutral|evil>",
  rarity: "<common|legendary>",
  tags: ["Radial", "Pull", "Physics"]
}

──────────────────────────────
ENGINE RESPONSIBILITIES
──────────────────────────────
- RadialBase: Radius math, entity detection, timing
- GravityEffector: Inward force logic, stacking, special modifiers
- GravityVisual: Rendering, animation, overlays

──────────────────────────────
NOTES
──────────────────────────────
- Used for black holes, tractor beams, and gravity wells
- Visuals and force can be tuned per game or entity
- Designed for modular extension and future upgrades
