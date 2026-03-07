src/content/effectors/
├─ radial/
│  ├─ core/
│  │  ├─ RadialBase.ts              # Shared math + lifecycle logic
│  │  ├─ RadialTypes.ts             # 360 vs Slice, falloff curves, force models
│  │  └─ RadialVisualBase.tsx       # Shared glow / ring rendering primitives
│  │
│  ├─ Burst/
│  │  ├─ BurstEffector.ts           # Physics logic (impulse outward)
│  │  ├─ BurstVisual.tsx            # Flash + expanding ring
│  │  └─ BurstConfig.ts             # Default values + scaling tiers
│  │
│  ├─ Ripple/
│  │  ├─ RippleEffector.ts          # Oscillating force wave
│  │  ├─ RippleVisual.tsx
│  │  └─ RippleConfig.ts
│  │
│  ├─ Gravity/
│  │  ├─ GravityEffector.ts         # Pull inward toward origin
│  │  ├─ GravityVisual.tsx
│  │  └─ GravityConfig.ts
│  │
│  ├─ Nudge/
│  │  ├─ NudgeEffector.ts           # Directional push
│  │  ├─ NudgeVisual.tsx
│  │  └─ NudgeConfig.ts
```
src/content/effects/
├─ radialeffector/
│  ├─ BurstEffectorVisual.tsx      # Reusable VFX for burst (not canonical visual)
│  ├─ RippleEffectorVisual.tsx     # Reusable VFX for ripple (not canonical visual)
│  └─ ...                          # Other VFX overlays, modifiers

src/content/effectors/
├─ radial/
│  ├─ Burst/
│  │  ├─ BurstVisual.tsx           # Canonical visual for burst effector
│  ├─ Ripple/
│  │  ├─ RippleVisual.tsx          # Canonical visual for ripple effector
│  ├─ Gravity/
│  │  ├─ GravityVisual.tsx         # Canonical visual for gravity effector
│  ├─ Nudge/
│  │  ├─ NudgeVisual.tsx           # Canonical visual for nudge effector
...existing code...
──────────────────────────────
RADIAL EFFECTOR DATA SHEET – 2.18.2026 (MODULAR UPDATE)
──────────────────────────────

IDENTITY & METADATA
──────────────────────────────
Name: Radial Effector
Unique ID: radial_effector_default
Type: Effect / Effector
Variants: Burst, Gravity, Ripple, Custom
Parent Type: Radial Effector
Tags: Visual, Gameplay, Modular, Stackable
Alignment: Neutral / Player-Controlled / AI
Known From: Playground Game, Spaceship Game, Future Games

CORE VISUALS
──────────────────────────────
Base Appearance: Circular area-of-effect, customizable color and opacity
Burst Variant: Expanding shockwave, optional explosion particle overlay
Gravity Variant: Pulling radial lines, optional vortex animation
Ripple Variant: Wave propagation, optional directional slice visuals
Visual Overrides: Can be linked to entity states, stage triggers, or upgrades
Visual Strategy: Pluggable per variant, supports overlay particle layers
Trail Effects: Optional trail or tail for moving effectors (e.g., comet or mouse-follow)

BASE ATTRIBUTES
──────────────────────────────
Scope: Per-entity / Per-group / Global / Session
Power: Adjustable (strength, radius, duration)
Duration: Temporary or persistent, stage- or game-dependent
Radius: XS → XXL (example: 100 → 2000 units)
Stackable: True / False / Hybrid
Exclusions: Can be set per entity/effect type
Triggers: UI, game events, timers
Effect Modifiers: Can adjust linked entity stats, visuals, or behaviors
Hybrid Mode: True / False / Optional overrides

PHYSICS & INTERACTIONS
──────────────────────────────
Influences:
  - Entities: All / Some / None
  - Effects: All / Some / None
  - Tools / Interactors: Optional
Interaction Hierarchy: Effector → Entity → Tool → Visual overlay
Linked Physics Blueprint: radial_effector_physics
Traits:
  - RadialAttractionBehavior
  - RadialRepulsionBehavior
  - DecayBehavior (optional)
  - StackableEffectsBehavior
  - CustomBehaviors: [empty array for future expansion]
Affected by:
  - Engine state (paused, slowed, sped-up)
  - Other effectors (stacking, exclusion)
Movement: Stationary, expanding, or follow entity/finger/mouse

PARAMETERS & STATE
──────────────────────────────
Maintains State: True / False / Hybrid
State Description: Tracks radius, strength, duration, stack count, active entities
MaxStacks: Configurable (optional)
Linked Entity/Effect Blueprints: True / False / Hybrid
Lifecycle Hooks: onTrigger, onUpdate, onExpire, onStackLimitReached
Upgradeable: True / False / Hybrid

TRIGGERS & UI
──────────────────────────────
Trigger Options:
  - TabCard
  - Launcher Component
  - Button / Hotkey / Context Menu
  - Entity-linked triggers
  - Stage / Lifecycle triggers
Controllable: True / False / Hybrid
Can Be Disabled: True / False / Hybrid
Cross-Game Integration: Callable from multiple games via content or engine layer

EXTENSIBILITY & FUTURE-PROOFING
──────────────────────────────
New Variants: Easily added (e.g., directional waves, spiral vortex, comet tail)
Visual Extensions: Overlay layers, particle trails, color themes
Behavior Extensions: Stack modifiers, hybrid interactions, lifecycle-linked effects
Integration Notes: Engine integration in src/engine/effectSystem.ts, content in src/content/effects/
Blueprint Ready: Data sheet feeds directly into blueprint for implementation

─────────────────────────────────────────────
RADIAL EFFECTOR DATA SHEET – <DATE>
─────────────────────────────────────────────

IDENTITY & TAXONOMY
──────────────────────────────
Effector ID: RADIAL_<NAME>_<TIER>
Type: Effector
Parent Type: Radial Effector
Variant: Burst | Ripple | Gravity | Nudge | Custom
Geometry Mode: FULL_360 | SLICE
Alignment: Good | Neutral | Evil | Hybrid
Rarity: Common | Rare | Legendary | Mythic
Scale Tier: XS | S | M | L | XL | XXL
Tags:
  - [Radial]
  - [Impulse | Pull | Oscillation | Directional]
  - [Physics]
  - [Lifecycle-Aware]
  - [Upgradable]
  - Additional: _______________________

DESCRIPTION
──────────────────────────────
Short summary of what this effector does physically and visually.
Example:
"A high-energy outward impulse wave that expands rapidly and applies
force based on inverse-square falloff."

──────────────────────────────
CORE RADIAL CONFIGURATION
(Shared via RadialBase.ts)
──────────────────────────────
Origin Source:
  - Entity Center
  - Custom Offset
  - World Coordinate

Radius:
  - Start Radius:
  - Max Radius:
  - Expansion Speed:

Force Model:
  - Direction:
      [Outward] [Inward] [Custom Vector]
  - Base Force:
  - Falloff Curve:
      Linear | Exponential | Inverse-Square | Custom

Geometry Mode:
  - FULL_360:
      Applies to all entities within radius.
  - SLICE:
      Angle Width (degrees):
      Facing Direction Source:
         Entity Rotation | Manual Vector | Target Lock

Duration Model:
  - Instant (Impulse)
  - Timed (Pulse)
  - Continuous (Sustained)
  - Oscillating

Decay:
  - None
  - Force Decay Over Time
  - Radius Collapse
  - Visual Fade Only

──────────────────────────────
VARIANT-SPECIFIC BEHAVIOR
──────────────────────────────

If Burst:
  - Single impulse event
  - Strong outward force
  - Flash + shockwave ring

If Ripple:
  - Expanding oscillation wave
  - Alternating push/pull optional
  - Can chain multiple rings

If Gravity:
  - Continuous inward pull
  - Can form vortex behavior
  - Optional torque / spin effect

If Nudge:
  - Directional impulse
  - Usually SLICE-based
  - Short radius, high precision

Custom Notes:
____________________________________

──────────────────────────────
VISUAL STRATEGY
(Uses RadialVisualBase.tsx)
──────────────────────────────
Primary Visual:
  - Ring
  - Cone (Slice)
  - Sphere Pulse
  - Spiral
  - Shockwave Mesh

Color Profile:
  - Primary:
  - Secondary Glow:
  - Core Brightness:
  - Edge Falloff Intensity:

Animation Phases:
  1. Spawn
  2. Expand
  3. Peak
  4. Dissolve

Optional Visual Enhancements:
  - Particle Burst
  - Screen Shake
  - Chromatic Aberration
  - Distortion Field
  - Trail Residue

──────────────────────────────
LIFECYCLE INTEGRATION
──────────────────────────────
Trigger Conditions:
  - Manual (Tool)
  - On Entity Death
  - On Upgrade
  - On Collision
  - Timed
  - Stage Transition

Stage Scaling:
  Stage 1:
  Stage 2:
  Stage 3:
  Final Stage:

Example:
  Star → Supernova:
    Mode: FULL_360
    Radius: XXL
    Force: Extreme
    Falloff: Inverse-Square

  Spaceship Tractor Beam:
    Mode: SLICE
    Radius: Medium
    Force: Inward
    Continuous Duration

──────────────────────────────
PHYSICS INTERACTION RULES
──────────────────────────────
Affects:
  - All Entities
  - Tagged Entities Only
  - Exclude Parent
  - Mass Threshold Filter

Collision Response:
  - Adds Velocity
  - Modifies Angular Velocity
  - Applies Torque
  - Overrides Current Force

Stacking Behavior:
  - Stackable
  - Overrides Same Type
  - Dampened by Distance
  - Cancels Opposing Force

──────────────────────────────
UPGRADE PATHS
──────────────────────────────
Upgradeable Properties:
  - Radius
  - Force
  - Angle Width (Slice)
  - Duration
  - Falloff Curve
  - Visual Intensity
  - Alignment Modifier

Advanced Upgrades:
  - Dual Mode (Switch 360/Slice)
  - Multi-Ring Emission
  - Chain Reaction Trigger
  - Conditional Targeting

──────────────────────────────
REGISTRY ENTRY SNAPSHOT
──────────────────────────────
{
  id: "radial_<name>_<tier>",
  parentType: "radial",
  variant: "<burst|ripple|gravity|nudge>",
  geometryMode: "<full_360|slice>",
  scaleTier: "<xs-xl>",
  alignment: "<good|neutral|evil>",
  rarity: "<common|legendary>",
  tags: [...]
}

──────────────────────────────
ENGINE RESPONSIBILITIES
──────────────────────────────
- RadialBase handles:
    Radius math
    Angle filtering (slice)
    Falloff calculation
    Entity detection
    Lifecycle timing

- Variant module handles:
    Direction logic
    Force type
    Special modifiers

- Visual module handles:
    Rendering only
    Glow layers
    Animation timing

No duplicated radial math in variant files.

─────────────────────────────────────────────
END OF RADIAL EFFECTOR DATA SHEET
─────────────────────────────────────────────

─────────────────────────────────────────────
PLAN OF ATTACK
─────────────────────────────────────────────
✅ Start with the Most Granular: Visuals & Configs for Effectors
Standardize all effector visuals/configs (e.g., BurstVisual, GravityVisual, RippleVisual) in a YAML/block format.
Include: id, type, tags, component, themeKeys, compatibleEntities, description, crossLinks.
✅ Overlays/Modifiers for Effectors (if any)
If effectors have overlays or modifiers (e.g., visual overlays, effect stacking), create a registry for these using the same format.
✅ Effector Variants & Types
Refactor each effector data sheet (Burst, Gravity, Ripple, Nudge) to:
Use the YAML/block format.
List all possible variants, themeKeys, compatibleEntities, triggers, upgradeability, and cross-links.
Include a baseSize/scale reference if relevant.
✅ Effector Parent Types & Registries
Create or update a RadialEffector parent type/registry sheet.
List all child effectors, shared logic, and extensibility hooks.
✅ Engine Modules
Refactor engine module data sheets (e.g., PhysicsEngine, EffectorSystem) to the same format.
Include: id, type, tags, compatibleEntities, hooks, crossLinks.
✅ Interact Tools
Refactor interact tool data sheets (Move, Undo, Paintbrush, etc.) to the same format.
List all possible tools, themeKeys, compatibleEntities, triggers, and cross-links.
7. Entity Sheets (Top Level)
Ensure all entities reference effectors, overlays, visuals, and tools by registry name.
Include all possible options, themeKeys, compatibleTypes, and cross-links.
8. Cross-Linking & Navigation
At the end of each sheet, add a “Cross-links” section referencing related registries and sheets.
9. Modular Subfolders
Place each type of data sheet in its own subfolder (e.g., /Radial/, /Burst/, /Engine/, /Interact/).
10. Document the Standard
Create a “Data Sheet Guidelines” doc summarizing the format and requirements for all new sheets.
