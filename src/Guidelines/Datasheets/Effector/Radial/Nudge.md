# Nudge Effector Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
- Name: Nudge Effector
- Parent Type: Radial Effector
- Unique ID: radial_nudge_<tier>
- Type: Effect / Effector
- Variant: Nudge
- Tags: Radial, Directional, Physics, Visual, Stackable
- Alignment: Neutral / Player-Controlled / AI
- Known From: Playground Game, Spaceship Game

──────────────────────────────
DESCRIPTION
──────────────────────────────
A directional impulse effect that applies a short-range, high-precision push to entities within a slice of the radius. Used for targeted nudges, directional bursts, and fine control.

──────────────────────────────
CORE VISUALS
──────────────────────────────
- Cone or slice-shaped area
- Quick flash or pulse
- Animation phases: Spawn → Push → Dissolve
- Optional: Directional arrow, highlight, or color accent

──────────────────────────────
BASE ATTRIBUTES
──────────────────────────────
- Scope: Per-entity / Per-group / Global
- Power: Adjustable (strength, radius, angle width)
- Duration: Instant (impulse)
- Radius: XS → M (50 → 500 units)
- Stackable: True (multiple nudges can overlap)
- Triggers: UI, game events, entity action, collision
- Effect Modifiers: Can adjust entity velocity, direction, or visuals

──────────────────────────────
PHYSICS & INTERACTIONS
──────────────────────────────
- Influences: All or tagged entities within slice
- Force Model: Outward or custom vector, high precision
- Geometry Mode: SLICE (angle width, facing direction)
- Collision Response: Adds velocity, can override current force
- Stacking: Stackable, can chain multiple nudges
- Movement: Stationary or can follow moving entity

──────────────────────────────
PARAMETERS & STATE
──────────────────────────────
- Maintains State: True (tracks radius, strength, angle)
- MaxStacks: Configurable
- Lifecycle Hooks: onTrigger, onExpire
- Upgradeable: True (radius, force, angle width, visual intensity)

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
- Visual Extensions: Arrow overlays, color themes, particle trails
- Behavior Extensions: Chain reaction, combo with other effectors
- Integration: Engine (effectSystem), Content (effects/)

──────────────────────────────
TOOL & EFFECT INTEGRATION
──────────────────────────────
- Can be triggered by Ripple Tool, Launcher, or entity action
- Can trigger visual effects: directional highlight, color shift
- Can be combined with Paintbrush for creative nudges

──────────────────────────────
REGISTRY ENTRY SNAPSHOT
──────────────────────────────
{
  id: "radial_nudge_<tier>",
  parentType: "radial",
  variant: "nudge",
  geometryMode: "slice",
  scaleTier: "<xs-m>",
  alignment: "<good|neutral|evil>",
  rarity: "<common|legendary>",
  tags: ["Radial", "Directional", "Physics"]
}

──────────────────────────────
ENGINE RESPONSIBILITIES
──────────────────────────────
- RadialBase: Radius math, entity detection, timing
- NudgeEffector: Directional force logic, stacking, special modifiers
- NudgeVisual: Rendering, animation, overlays

──────────────────────────────
NOTES
──────────────────────────────
- Used for targeted nudges, directional bursts, and fine control
- Visuals and force can be tuned per game or entity
- Designed for modular extension and future upgrades
