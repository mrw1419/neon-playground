# Burst Effector Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
- Name: Burst Effector
- Parent Type: Radial Effector
- Unique ID: radial_burst_<tier>
- Type: Effect / Effector
- Variant: Burst
- Tags: Radial, Impulse, Physics, Visual, Stackable
- Alignment: Neutral / Player-Controlled / AI
- Known From: Playground Game, Spaceship Game

──────────────────────────────
DESCRIPTION
──────────────────────────────
A high-energy outward impulse wave that expands rapidly and applies force to all entities within its radius, based on inverse-square falloff. Used for explosions, shockwaves, and screen-clearing effects.

──────────────────────────────
CORE VISUALS
──────────────────────────────
- Expanding shockwave ring
- Flash at origin
- Optional explosion particle overlay
- Color and opacity customizable per tier
- Animation phases: Spawn → Expand → Peak → Dissolve
- Optional: Screen shake, chromatic aberration, particle burst

──────────────────────────────
BASE ATTRIBUTES
──────────────────────────────
- Scope: Per-entity / Per-group / Global
- Power: Adjustable (strength, radius, duration)
- Duration: Instant (impulse) or short pulse
- Radius: XS → XXL (100 → 2000 units)
- Stackable: True (multiple bursts can overlap)
- Exclusions: Can exclude parent or tagged entities
- Triggers: UI, game events, entity death, collision
- Effect Modifiers: Can adjust linked entity stats or visuals

──────────────────────────────
PHYSICS & INTERACTIONS
──────────────────────────────
- Influences: All entities within radius
- Force Model: Outward, inverse-square falloff
- Geometry Mode: FULL_360 (applies in all directions)
- Collision Response: Adds velocity, can override current force
- Stacking: Stackable, dampened by distance, cancels opposing force
- Movement: Stationary or can follow moving entity

──────────────────────────────
PARAMETERS & STATE
──────────────────────────────
- Maintains State: True (tracks radius, strength, duration)
- MaxStacks: Configurable
- Lifecycle Hooks: onTrigger, onExpire
- Upgradeable: True (radius, force, visual intensity)

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
- Visual Extensions: Overlay layers, color themes, particle trails
- Behavior Extensions: Chain reaction, conditional targeting
- Integration: Engine (effectSystem), Content (effects/)

──────────────────────────────
TOOL & EFFECT INTEGRATION
──────────────────────────────
- Can be triggered by Launcher/Slingshot, Ripple Tool, or entity death
- Can trigger visual effects: screen shake, particle burst, color shift
- Can be combined with Paintbrush or Paint Bucket for color-themed bursts

──────────────────────────────
REGISTRY ENTRY SNAPSHOT
──────────────────────────────
{
  id: "radial_burst_<tier>",
  parentType: "radial",
  variant: "burst",
  geometryMode: "full_360",
  scaleTier: "<xs-xl>",
  alignment: "<good|neutral|evil>",
  rarity: "<common|legendary>",
  tags: ["Radial", "Impulse", "Physics"]
}

──────────────────────────────
ENGINE RESPONSIBILITIES
──────────────────────────────
- RadialBase: Radius math, entity detection, timing
- BurstEffector: Outward force logic, stacking, special modifiers
- BurstVisual: Rendering, animation, overlays

──────────────────────────────
NOTES
──────────────────────────────
- Used for explosions, supernovas, and dramatic gameplay moments
- Visuals and force can be tuned per game or entity
- Designed for modular extension and future upgrades
