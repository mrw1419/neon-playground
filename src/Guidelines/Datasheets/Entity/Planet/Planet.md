──────────────────────────────
PLANET ENTITY DATA SHEET – 2.19.2026 (MODULAR FORMAT)
──────────────────────────────

Planet entity file structure

src/content/entity/planet
├─ PlanetEntity.ts           # Base logic for all planets (physics, core stats, upgrades)
├─ PlanetTypes.ts            # Core planet metadata, parent types, overlays, tags
├─ PlanetRegistry.ts         # Catalog entry for planets
│   ├─ ParentTypes/
│   │   ├─ Rocky.ts         # Rocky planet defaults and constraints
│   │   ├─ Gas.ts           # Gas giant defaults and constraints
│   │   ├─ Ice.ts           # Ice planet defaults and constraints
│   │   └─ ...
│   ├─ Overlays/
│   │   ├─ Cracked.ts       # Cracked overlay logic and visuals
│   │   ├─ Rings.ts         # Rings overlay logic and visuals
│   │   ├─ Shield.ts        # Shield overlay logic and visuals
│   │   └─ ...
│   └─ Variants/
│       ├─ NeonEarth.ts     # Example: Neon Earth variant config
│       ├─ Moon.ts          # Example: Moon variant config
│       └─ ...
├─ PlanetVisual.tsx         # Core and overlay visual components (composable)
├─ overlays/                # Shared overlay visual components (rings, cracks, shield, etc.)
└─ ...

// All overlays, upgrades, and parent types are modular and composable.
// Visuals reference neon icon style in src/ui/icons/content/.

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
Name: (varies per planet)

Base Appearance: Neon color palette, modular overlays (rings, cracks, stripes, craters, moons, satellites)
Visual Variants: Banded/striped (gas), spot (gas giant), rings (ringed), craters (rocky), cracks (ice/lava/evil), metallic shine, organic overlays, water waves, crystal facets
Visual Strategy: All visuals use color tokens/themes (never hardcoded); overlays and effects are modular and content-driven

──────────────────────────────
BASE ATTRIBUTES
──────────────────────────────
Mass: Numeric (physics/effector interaction, assign defaults per type/variant)
Radius: Numeric (physics/visuals, assign defaults per type/variant)
Durability: All planets have durability (destructible, tweakable per type/variant)
Energy: All planets can have energy (for shields, abilities, or advanced effects; assign defaults, tweak as needed)
Drag: Numeric (physics/effector interaction)
Alignment: Primarily Neutral, but can be set per planet or game context

Add-ons / Upgrade Compatibility: Modular add-ons, upgrades, and trait overlays (true/false per planet or game)

──────────────────────────────
UPGRADES & ADD-ONS
──────────────────────────────
Planets and moons can be equipped with modular upgrades and add-ons, such as:
- Lasers (offensive/defensive weapons)
- Shields (protective barriers, visualized with reusable shield effects)
- Satellites (orbiting add-ons, can provide buffs or abilities)
- Resource Extractors (mining, energy, or other gameplay effects)
- Special Auras (e.g., healing, damage, attraction fields)

How it works:
- Upgrades/add-ons are attached via the modular trait system and can be toggled per planet or moon.
- Visuals for upgrades use the reusable visual effects system (e.g., shield glows, laser beams, satellite orbits).
- Add-ons can modify stats, grant abilities, or provide new interactions.
- Add-ons are defined in their own data sheets and referenced in the planet/moon config.
- The system is designed for future expansion—new upgrades can be added without changing the core architecture.

──────────────────────────────
PHYSICS & MOVEMENT
──────────────────────────────
Physics Body: Matter.Body (dynamic by default)
Collision: Standard entity collision unless overridden per variant
Physics handled by engine (see PhysicsEngine.md)
- DecayBehavior (unstable/temporary planets)
- EvolutionBehavior (lifecycle events, e.g., supernova, splitting, merging — hybrid/optional)
- Orbiting / Grouping (moons, satellites)

──────────────────────────────
INTERACTIONS & CROSS-GAME CONTROL
──────────────────────────────
Placeable: By player or procedural generation
Removable: By player or effectors
Interaction Hierarchy: Entity → WorldEngine → EffectorSystem → PhysicsEngine

Available Tools:
  - Move (MVP: enabled)
  - Undo (future)
  - Paintbrush (future)
  - Magnet (future)
  - Clone (future)
  - Delete (future)
  - Custom/Other (future)

──────────────────────────────
EXTENSIBILITY & FUTURE-PROOFING
──────────────────────────────
Supports New Variants: Easily added (hybrid/rare types, new effectors, lifecycle triggers)
Behavior Extensions: Modular trait system allows for new abilities and overlays

Cosmic & Interactive Visual Effects:
- Planets can have persistent or reactive trails (comet tails, dust, orbiting debris)
- Impact/destruction effects: collision sparks, debris shards, ripple/splash (for water/ice/gas)
- Ambient auras: pulsing neon glows, light flares, particle storms (auroras, meteor showers, cosmic weather)
- Composable visual modifiers: color shifts/pulses, scaling/stretch, rotation/spin, opacity/fade
- Effects can be triggered by player actions, environment, or planet state changes
- Each planet or legendary variant can have a unique “signature” effect (aurora fields, orbiting satellites, animated storms, interactive particles)
- All effects are modular and can be layered for rich, cosmic visuals
- Parameters (color, intensity, speed, etc.) are exposed for tuning and theming

Reusable Visual Effects: Planets can leverage effects from /src/content/effects for modular, cross-entity visuals (e.g., glows, sparkles, trails, overlays, animated states). Effects are designed to be plug-and-play for any planet type or variant, supporting both gameplay and purely visual enhancements.

Cosmic Signature Effects: Planets can have unique, signature effects or behaviors (e.g., cosmic auras, color pulses, scaling/stretch, rotation/spin, collision sparks, auroras, storms, or other visual/gameplay phenomena) that can be toggled per planet, variant, or game mode.

Integration Notes: Logic lives in engine/content files; visuals in content/entities and /src/content/effects
Blueprint Ready: Data sheet feeds directly into blueprint for implementation

──────────────────────────────
REUSABLE VISUAL EFFECTS SYSTEM (REFERENCE)
──────────────────────────────
All planet overlays/tags (e.g., Rings, Cracked, Storm, Glowing, Atmosphere) are implemented as reusable visual effects.
These effects are modular, composable, and can be applied to any planet or entity.
Visual effects can be purely visual or also modify stats/config.
For more details and effect definitions, see:
    - [Reusable visual effects data sheet](../../Effects/Reusable%20visual%20effects.md)
    - [Visual style reference icons](../../../ui/icons/content/)

**Cross-link:** This planet system is designed to leverage the universal, reusable visual effects system for maximum flexibility and consistency across all entities.

──────────────────────────────
REFERENCES & DEPENDENCIES
──────────────────────────────
Game-specific content: src/content/ (visuals, variants, add-ons)
UI components: src/ui/ (customization, placement, feedback)
Registry/blueprint storage: src/Guidelines/ (canonical data sheets, blueprints)
Dependencies: PhysicsEngine, EffectorSystem, WorldEngine, EntityRegistry
References:
    - Grand Vision & Instructions.md
    - Game Architecture.md
    - Physics Engine.md
    - Object to Entity Blueprint.md
    - Universal Starter Prompt.md

──────────────────────────────
COSMIC INTERACTIONS & EFFECTOR SYNERGY
──────────────────────────────
Planets are not just passive objects—they are active, dynamic players in the simulation. They can:

- Emit radial effectors (burst, ripple, gravity/black hole) as supernovae, freezing waves, or cosmic pulls
- Fire linear/directional effectors (laser beams, shock lances, directional ripples) as volcanic eruptions, magnetic storms, or energy bursts
- Leave comet tails, particle trails, or dash/boost with momentum (rogue planets, comets)
- Be manipulated, cloned, deleted, or painted by interact tools (move, clone, delete, paintbrush, magnet, etc.)
- Trigger world events: collisions can cause bursts, destruction can spawn debris, merging can create new planets or moons
- Have unique tool interactions: only certain planets can be split, merged, or painted; some may resist manipulation
- Act as both sources and targets for effectors—planets can trigger, absorb, or be affected by any effector in the system
- Cause engine-level events: splitting, merging, or destruction can alter the simulation, spawn new entities, or change world state

This synergy between planets, effectors, tools, and the engine makes every planet a true cosmic actor—capable of shaping, reacting to, and transforming the universe around it.

- This system is intentionally open-ended—new effectors, tools, interactions, and cosmic phenomena can be added at any time.
- Encourage experimentation: planets can interact with anything in the simulation, and new mechanics can always be layered in.
- Future ideas: time-based events, interplanetary links, emergent behaviors, or cross-game interactions are all possible.

──────────────────────────────
DONT FORGET TO LOOK THROUGH
──────────────────────────────
base size that xs-xxl is based off of?
how about data sheets in the /effector, /engine, /interatct folders?
If you add new overlays or visuals, always include themeKeys/colorThemes and compatibleTypes.
For new parent types or variants, reference overlays and visuals using the updated generic names.
Continue to cross-link data sheets for easy navigation and future expansion.
OVERLAY REGISTRY (YAML/Block Format)

─────────────────────────────────────────────
PLAN OF ATTACK
─────────────────────────────────────────────
✅ 
──────────────────────────────
PLANETS, ORBITS, AND ORBITAL RULES IMPLEMENTATION NOTES
──────────────────────────────

Orbit Logic & Properties:
- Each planet (and parent type) can define `orbitalAttraction`, `canOrbit`, and `canBeOrbited` properties.
- These control which entities can orbit others, and how strong the orbital force is.
- Variants inherit these properties from their parent type, but can override them for special cases (e.g., moons, legendary planets).

Physics & Orbit Behavior:
- The physics engine should process orbital forces using `orbitalAttraction`.
- Entities must be set up with correct parent/child relationships (e.g., moons orbiting planets, planets orbiting a star).
- Orbit behavior can be modular: add a `behaviors` array or `orbit` property to PlanetEntity for extensibility.
- The update loop should apply position changes based on these forces and relationships.

Controlling Orbits in Playground/Hooks:
- You can control which planets can orbit others by checking `canOrbit` and `canBeOrbited` in your playground logic or custom hooks.
- Filter or set relationships before applying orbit/physics logic.
- Dynamically enable/disable orbiting by updating these properties or adding conditional checks in your entity update loop or physics system.

Implementation Steps (for future wiring):
1. Ensure parent types and variants have `orbitalAttraction`, `canOrbit`, and `canBeOrbited` defined.
2. Add `behaviors` array and/or `orbit` property to PlanetEntity for modular orbit logic.
3. In the entity instantiation logic, wire up orbit properties from parent type/variant.
4. In the physics engine, process orbital forces and update positions based on relationships and attraction values.
5. In the playground scene or hooks, add rules to control which entities can orbit others (using the above properties).
6. Test with multiple planets and moons to validate edge cases and emergent behaviors.
7. Document any custom rules or gameplay logic for orbits in this file for future reference.

Notes:
- This system is designed for extensibility—new rules, behaviors, or entity types can be added easily.
- You can experiment with different orbital rules, parent/child setups, and physics parameters for gameplay or visualization.

For more details, see:
  - PlanetParentTypes.md (parent type attributes)
  - PhysicsEngine.md (physics and orbit logic)
  - Playground Surgery.md (stepwise implementation checklist)
  - Entity System Blueprint.md (entity relationships)