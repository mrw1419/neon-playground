Universal Object Starter 2.17.2026
────────────────────────────────────────────
<Object Name>

This starter is used to create both:
- A registry entry (for cataloging all objects)
- A blueprint (detailed plan for implementation)

Use this template to brainstorm, then add to the Object Registry and create an Object Blueprint for building.


🔹 Identity
  - id: "[unique ID]"
  - name: "[Human-readable name]"
  - type: "[planet / spaceship / star / comet / nebula / asteroid / ...]"
  - variant: "[rocky / gas / ringed / icy / lava / ...]"  # Supports multiple visual/physical variants
  - parentType: "[Planet / Spaceship / Star / ...]"      # Groups related variants
  - tags: ["optional", "metadata", "tags"]             # e.g., ["mechanical", "organic", "enemy", "collectible"]

🔹 Stats (Base Attributes)
  - mass: [default value]
  - radius: [default value]
  - durability: [default value]
  - energy: [optional]
  - drag: [default value]
  - faction: [optional]
  - additionalTags: [optional array]

🔹 Physics Reference
  - linkedPhysicsBlueprint: "[PhysicsBlueprint id]"
  - physicsBody: "[Matter.Body instance or placeholder]"

🔹 Traits & Behaviors (Modular, State-Preserving)
  - traits: [ array of small behavior modules ]
      # Example: ExplodesOnDestroy, MagneticCoreTrait, RegeneratesShield
  - RadialAttractionBehavior: { strength: [default] }
  - BounceBehavior: { restitution: [default] }
  - DecayBehavior: { lifetime: [default/null] }
  - TrailEffectBehavior: { enabled: true/false, color: "[rgba]" }
  - EvolutionBehavior: { stages: ["stage_1","stage_2"], ageTrigger: [value] }
  - CustomBehaviors: [empty array for future stateful modules]

🔹 Upgrades & Effect Modifiers
  - upgradeSlots: ["slot1: empty", "slot2: empty", ...]
  - upgrades: [ array of attached Upgrade instances ]
      # Upgrades can modify stats, apply EffectModifiers, or add Visual Layers
  - effectModifiers: [ function(effectName) => { radiusMultiplier?, strengthMultiplier?, visualStyleOverride?, falloffCurve? } ]

🔹 Lifecycle & State
  - age: 0
  - maxAge: null
  - isDestroyed: false
  - isSleeping: false
  - hooks: ["onCollision", "onUpdate", "onDestroy", "onUpgradeSlotFilled", "onUpgradeRemoved", ...]
  - triggers: ["time", "massThreshold", ...]             # For evolution or auto-events

🔹 Visual / Render (Pluggable Strategies)
  - visualStrategy: "[reference to BaseVisualStrategy or variant-specific strategy]"
  - overlayEffects: []                                   # e.g., shield glows, particle layers
  - renderModules: [empty array for future visual modules]
  - upgradeVisualLayers: [collected from attached upgrades]

🔹 Recommended Guidance for Core Objects
  - Planet:
      # Base mass large, slow drag
      # Traits: MagneticCoreTrait, ShatterOnCollision
      # Effects: reacts to Burst, Gravity, Nudge with physics modifiers
      # VisualStrategy: PlanetVisualStrategy with pluggable overlay for rings, ice, lava
  - Spaceship:
      # Base mass medium, maneuverable
      # Traits: RegeneratesShield, ExplodesOnDestroy
      # Effects: can trigger Burst, Wave, Nudge
      # Upgrades: shields, plasma cannons, engine boosts
      # VisualStrategy: SpaceshipVisualStrategy, upgrades attach neon glows or weapon layers
  - Future Objects:
      # Follow same blueprint
      # Define type, stats, traits, upgrades, and visual strategy
      # Avoid subclassing unless physics fundamentally changes

─────────────────────────────
[AI Guidelines / Guardrails]
1. All fields must have default values or be explicitly marked optional.
2. Never remove hooks, upgrade slots, or placeholders for evolution, physics, or visuals.
3. Optional fields may remain blank, but placeholders for core modules must always exist.
4. Behaviors and traits must maintain modular stateful + functional combo.
5. Physics blueprint reference must be preserved; use Matter.Body instances for all interactive entities.
6. EffectModifiers must be exposed for all objects that can trigger or react to effects.
7. Variants must maintain unique defaults but follow parentType grouping.
8. Visual strategies must be pluggable; upgrades and effects attach layers without duplicating physics.
9. Generated code must be compatible with Neon Playground architecture and scalable for future games.

─────────────────────────────

# Cross-References
Guidelines/  
|- Blueprint/                  # Game and system blueprints
|   └─ Playground Game Blueprint.md   # Main game architecture and build plan
|- Registry/                   # Canonical lists of objects, planets, etc.
|   |- Colin Registry.md       # All Colin variants and metadata
|   └─ Planet Registry.md      # All planet types, variants, and metadata
|- Starters/                   # Starter prompts/templates for new entities
|   |- Object Starter.md       # For new objects (planets, ships, etc.)
|   |- Tool Starter.md         # For new tools (undo, move, etc.)
|   |- Physics Starter.md      # For new physics modules/entities
|   |- Effects Starter.md      # For new effects (burst, gravity, etc.)
|   |- UI Component Starter.md # For new UI components
|   └─ Universal Starter.md    # Universal starter Q&A prompt
|- VisualLanguageEmotionalTone.md   # Visual style, mood, and design principles
|- Game Architecture.md             # Project structure and folder map
|- Grand Vision & Instructions.md   # Project vision, goals, and instructions
└─ Guidelines directory.md          # This visual map and quick reference

# AI Note: Treat this as a living reference; preserve placeholders, merge updates, and append new elements without removing existing slots or context.
