# Ripple Effector Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
- Name: Ripple Effector
- Parent Type: Radial Effector
- Unique ID: radial_ripple_<tier>
- Type: Effect / Effector
- Variant: Ripple
- Tags: Radial, Oscillation, Physics, Visual, Stackable
- Alignment: Neutral / Player-Controlled / AI
- Known From: Playground Game, Spaceship Game

──────────────────────────────
DESCRIPTION
──────────────────────────────
An expanding oscillation wave that propagates outward, applying alternating push/pull forces to entities within its radius. Used for crowd control, path creation, and chain reactions.

──────────────────────────────
CORE VISUALS
──────────────────────────────
- Expanding wave ring(s)
- Optional alternating color or opacity
- Animation phases: Spawn → Expand → Oscillate → Dissolve
- Optional: Directional slice visuals, ripple mine effect

──────────────────────────────
BASE ATTRIBUTES
──────────────────────────────
- Scope: Per-entity / Per-group / Global
- Power: Adjustable (strength, radius, duration, oscillation rate)
- Duration: Timed (pulse) or continuous (sustained)
- Radius: S → XXL (200 → 2000 units)
- Stackable: True (multiple ripples can overlap)
- Triggers: UI, game events, entity action, collision
- Effect Modifiers: Can adjust entity speed, status, or visuals

──────────────────────────────
PHYSICS & INTERACTIONS
──────────────────────────────
- Influences: All or tagged entities within radius
- Force Model: Alternating push/pull, oscillating strength
- Geometry Mode: FULL_360 or SLICE (directional)
- Collision Response: Adds or reverses velocity, can freeze or nudge
- Stacking: Stackable, can chain multiple rings
- Movement: Expanding from origin, can be stationary or follow entity

──────────────────────────────
PARAMETERS & STATE
──────────────────────────────
- Maintains State: True (tracks radius, strength, oscillation phase)
- MaxStacks: Configurable
- Lifecycle Hooks: onTrigger, onUpdate, onExpire
- Upgradeable: True (radius, force, oscillation rate, visual intensity)

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
- Visual Extensions: Multi-ring, color cycling, particle overlays
- Behavior Extensions: Chain reaction, freeze/nudge toggle
- Integration: Engine (effectSystem), Content (effects/)

──────────────────────────────
TOOL & EFFECT INTEGRATION
──────────────────────────────
- Can be triggered by Ripple Tool, Launcher, or entity action
- Can trigger visual effects: color shift, freeze, nudge, sound pulse
- Can be combined with Paintbrush for creative path effects

──────────────────────────────
REGISTRY ENTRY SNAPSHOT
──────────────────────────────
{
  id: "radial_ripple_<tier>",
  parentType: "radial",
  variant: "ripple",
  geometryMode: "full_360|slice",
  scaleTier: "<s-xxl>",
  alignment: "<good|neutral|evil>",
  rarity: "<common|legendary>",
  tags: ["Radial", "Oscillation", "Physics"]
}

──────────────────────────────
ENGINE RESPONSIBILITIES
──────────────────────────────
- RadialBase: Radius math, entity detection, timing
- RippleEffector: Oscillation logic, stacking, special modifiers
- RippleVisual: Rendering, animation, overlays

──────────────────────────────
NOTES
──────────────────────────────
- Used for crowd control, path creation, and creative gameplay
- Visuals and force can be tuned per game or entity
- Designed for modular extension and future upgrades
