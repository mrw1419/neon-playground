──────────────────────────────
COLIN ENTITY DATA SHEET – 2.22.2026 (COSMIC, MODULAR, FUTURE-PROOF)
──────────────────────────────

IDENTITY & METADATA
──────────────────────────────
Name: Colin
Unique ID: colin_modular_cosmic
Type: Entity (Spaceworm, Tool, Cosmic Feature)
Variants: Classic, Neon, Cosmic, Emerald, Legendary, Future (expandable)
Parent Type: Colin
Tags: [Friendly, Evil, Unique, Modular, Player-Controlled, Rare, Cosmic, Legendary, Tool, Hybrid, Upgradeable]
Alignment: Good / Evil / Hybrid (per game context)
Known From: Playground Game, Spaceship Game, Asteroid Game, Future Games
Theme Keys / Color Tokens: neonRed, neonEmerald, cosmicStarfield, legendaryGold, themeable

CORE VISUALS
──────────────────────────────
Base Appearance: Evil red segmented spaceworm, animated head, mouth, teeth, eyes, and chomp effect
Neon Variant: Animated neon outline, glowing, volumetric aura
Cosmic Variant: Starfield fill, sparkles, animated cosmic background, particle trails
Emerald Variant: Emerald/Crystal body, color-based abilities
Legendary Variant: Gold, rare overlays, unique particle effects
Visual Strategy: Pluggable per variant, overlays (shields, trails, cosmic auras, status effects)
Visual Overrides: Color/theme changes on power-up, eating, or ability use
Overlay Effects: EntityOverlayVisual (diagnostics, status, cosmic lore popups, multiplayer indicators)
Trail Effects: Comet-style, mouse-follow sparkles, thruster trails, ripple mines (optional)
Background Effect: XXL burst triggers optional background change (big bang restart, cosmic event)
Visual Components: Modular, composable, themeable, cross-linked to overlays/variants registry

BASE ATTRIBUTES
──────────────────────────────
Mass: Medium (scales with stage, upgrades, or eating)
Radius: Segment-based, grows with stage or eating
Durability: Stage-based, upgradable, can be invincible in god mode
Energy: Optional, for abilities or charge-based effects
Drag: Low (momentum-based movement, tweakable)
Faction: Neutral / Player / AI / Hybrid
Segment Count: 1–16 (grows with eating, upgrades, or stage)
Segment Effects: Influence mass, collision, visual presence, and abilities
Stackable Effects: True / False / Hybrid
Orbital / Grouping Behavior: True / False / Hybrid
Add-ons / Upgrade Compatibility: True / False / Hybrid
Alignment: Configurable per game, can change dynamically

PHYSICS & MOVEMENT
──────────────────────────────
Physics Body: Matter.Body (kinematic by default, can be dynamic or hybrid)
Traits:
  - ExplodesOnDestroy
  - BounceBehavior (optional)
  - DecayBehavior (optional, stage-based)
  - RadialAttractionBehavior (gravity/sucking effect)
  - TrailEffectBehavior (comet, ripple, sparkle)
  - EvolutionBehavior (grows, evolves, mutates)
  - Orbiting / Grouping (can orbit, group, or form chains)
  - RegeneratesShield (optional)
  - MagneticCoreTrait (optional)
  - CustomBehavior: [e.g., CosmicRoar, LegendaryChomp, TimeControl]
Movement: Momentum-based, can be invincible or supersonic in special modes
Collision: Standard or custom, can be overridden per game or variant
Affected by: Gravity, Physics Fields, Radial Effectors, Other Entities, Upgrades, Tools
Linked Physics Blueprint: colin_physics_modular, cross-linked to engine/physicsEngine

ABILITIES & EFFECTORS
──────────────────────────────
Roar: Nudge, damage, or shockwave (scales with stage)
Ripple: Freeze, slow, crowd control, ripple mines, directional sonar
Gravity: Pull, spiral, high-strength, entity removal, cosmic vortex
Burst: XS–XXL, from small explosion to universe-clearing shockwave
Chomp: Consumes entities, triggers effects, can trigger upgrades or stage growth
Trail: Comet, sparkle, ripple, or custom particle trail
Ability Growth: Strength, radius, duration, and effects scale per stage, upgrade, or event
Trigger: User button, hotkey, per-entity/game event, context menu, or tool
Effect Baseline (XS–XXL):
  - Burst: 100–2000 units, 0.1–5 strength, 0.5–10s duration
  - Ripple: 80–1500 units, 0.5–8s duration
  - Gravity: 100–1800 units, 0.1–4 pullStrength
  - Roar: 50–1200 units, 0.05–3 strength
Nudge Effect: Optional, on mouse/finger interaction or ability use
EffectModifiers: All abilities can be modified by upgrades, overlays, or game rules
Stackable: True / False / Hybrid
Compatible Effectors: All radial, cosmic, and custom effectors

TOOLS & INTERACTORS
──────────────────────────────
Compatible Tools: Move, Undo, Launch, Paintbrush, Paint Bucket, Time Control, Screen Capture, Video Record, Custom Tools
Trigger Options: TabCard, Button, Context Menu, Hotkey, Launcher, API
Tool Effects: Can interact with entity, effects, overlays, environment, or other tools
Stackable Tool Effects: True / False / Hybrid
Interaction Hierarchy: Entity → Tools → Effectors → Visual Overlays
UI Components: Buttons, TabCards, Sliders, Panels, Overlays, Custom UI

UPGRADES & SLOT SYSTEM
──────────────────────────────
Upgrade Slots: 2 default, extendable (configurable per game or variant)
Upgrades: Weapons, shields, lasers, visual mods, cosmic auras, legendary effects
Effect Modifiers: Can alter abilities, visuals, or behavior
Stage Unlocks: Abilities and upgrades unlocked per stage, event, or achievement
Ability Stacking: True / False / Hybrid
Add-ons: Satellites, orbiters, resource extractors, custom overlays

LIFECYCLE & STAGES
──────────────────────────────
Stage 1: Eat asteroids, satellites, small ships
Stage 2: Eat planets, moons
Stage 3: Eat stars, solar systems
Stage 4: Eat nebulas, galaxies
Final Stage: Universe-consuming, optional "eat self" restart, triggers cosmic event
Age Tracking: True / False / Hybrid
Lifecycle Effects: Supernova, nebula expansion, galaxy collapse, cosmic rebirth
Destroyed / Sleeping State: Tracked per stage/game rules
Hooks/Triggers: onCollision, onUpdate, onDestroy, onUpgradeFilled, onUpgradeRemoved, time-based, massThreshold, lifecycle effect triggers, onChomp, onRoar, onCosmicEvent

INTERACTIONS & CROSS-GAME CONTROL
──────────────────────────────
Placeable: True / False / Hybrid
Removable: True / False / Hybrid
Movable / Controllable: True / False / Hybrid
Controlled by: Player / AI / Hybrid
Interacts With Entities: All / Some / None (configurable)
Interacts With Effects / Effectors: All / Some / None (configurable)
Interaction Priority: Abilities can override/cancel others, configurable per game
Game Rules: src/game/* establishes per-game rules for Colin
Cross-Game: Registry & Blueprint pattern ensures reusability and extensibility

EXTENSIBILITY & FUTURE-PROOFING
──────────────────────────────
New Variants: Easily added (Neon, Cosmic, Emerald, Legendary, others)
New Behaviors: Modular trait system allows for new abilities, overlays, and upgrades
Emerald/Crystal Effects: Placeholder for future color-based abilities
Slice / Directional Effects: Optional for advanced variants
Timed Mine / Trail Effects: Optional for ripple/burst placement
Integration Notes: Logic in content/game files, visuals in content/entities, overlays in overlays/
Cross-links: overlays, visuals, variants, effectors, tools, engine modules, registries
Overlay Registry: Reference overlays and visuals using updated generic names, include themeKeys/colorThemes and compatibleTypes
Hooks: All core hooks exposed for engine, effectors, overlays, and UI
Data Sheet Guidelines: Follows Universal Starter Prompt, Object to Entity Blueprint, and Planet data sheet best practices
Blueprint Ready: Data sheet feeds directly into blueprint for implementation


