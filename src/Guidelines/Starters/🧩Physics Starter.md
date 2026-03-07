Universal Effects Starter 2.17.2026
────────────────────────────────────────────
<Physics Entity Name>

This starter is used to create both:
- A registry entry (for cataloging all physics entities)
- A blueprint (detailed plan for implementation)

Use this template to brainstorm, then add to the Physics Registry and create a Physics Blueprint for building.

─────────────────────────────
[Engine & Content Integration]
  - engineIntegration: Physics entity should connect to src/engine/physicsEngine.ts and respect engine contracts (state, events, simulation).
  - contentIntegration: Physics variants should live in src/content/physics/ as separate files (e.g., PlanetPhysics.ts, CometPhysics.ts).
  - registry: Update Physics Registry as new variants or behaviors are added.

[Cross-Game Control & Extensibility]
  - canBeSimulated: true/false (is physics simulation enabled for this entity?)
  - canBeRemoved: true/false
  - interactsWithObjects: true/false
  - interactsWithEffects: true/false
  - canBeControlled: true/false
  - notes: "[Describe how physics can be toggled, controlled, or excluded in different games]"

🔹 Identity
  - id: "[unique ID]"
  - name: "[Human-readable name]"
  - type: "[planetPhysics / spaceshipPhysics / cometPhysics / ...]"
  - variant: "[rocky / gas / ringed / icy / lava / ...]"
  - parentType: "[Planet / Spaceship / Star / ...]"
  - tags: ["optional", "metadata", "tags"]

🔹 Physics Parameters (Base Attributes)
  - mass: [default value]
  - radius: [default value]
  - restitution: [default value]
  - friction: [optional]
  - drag: [optional]
  - physicsMode: "dynamic" | "static" | "kinematic" | "ghost"
  - fieldInfluenceStrength: [optional]
  - fieldRadius: [optional]
  - canCollide: true/false
  - maxInteractions: [optional limit]
  - body: "[Matter.Body instance / placeholder]"

🔹 Traits & Behaviors (Modular, State-Preserving)
  - traits: [ array of physics-aware traits ]
      # Examples: MagneticCoreTrait, ExplodesOnDestroy, RegeneratesShield
  - RadialAttractionBehavior: { strength: [default] }
  - BounceBehavior: { restitution: [default] }
  - DecayBehavior: { lifetime: [default/null] }
  - CustomBehaviors: [empty array for future stateful modules]

🔹 Lifecycle & State
  - age: 0
  - maxAge: null
  - isDestroyed: false
  - isSleeping: false
  - hooks: ["onCollision", "onUpdate", "onDestroy", ...]
  - triggers: ["time", "massThreshold", ...]

🔹 Integration & Modularity
  - linkedObjectBlueprint: "[ObjectBlueprint id]"
  - linkedEffectsBlueprint: "[EffectsBlueprint id]"
  - engineIntegration: Connects to src/engine/physicsEngine.ts and respects engine contracts (state, events, simulation).
  - contentIntegration: Physics variants live in src/content/physics/ as separate files (e.g., PlanetPhysics.ts, CometPhysics.ts).
  - registry: Update Physics Registry as new variants or behaviors are added.

🔹 Recommended Guidance for Core Physics Entities
  - PlanetPhysics:
      # Mass large, slow drag, magnetic core
      # Traits: MagneticCoreTrait, ShatterOnCollision
      # Effects: reacts to Burst, Gravity, Nudge with physics modifiers
  - SpaceshipPhysics:
      # Mass medium, maneuverable, shield regeneration
      # Traits: RegeneratesShield, ExplodesOnDestroy
      # Effects: can trigger Burst, Wave, Nudge
  - Future Physics Entities:
      # Follow same blueprint
      # Define type, parameters, traits, behaviors, and integration
      # Avoid subclassing unless simulation fundamentally changes



# AI Note: Treat this as a living reference; preserve placeholders, merge updates, and append new elements without removing existing slots or context.
[AI Guidelines / Guardrails]
1. All fields must have default values or be explicitly marked optional.
2. Never remove hooks, trait slots, or placeholders for evolution, simulation, or integration.
3. Optional fields may remain blank, but placeholders for core modules must always exist.
4. Behaviors and traits must maintain modular stateful + functional combo.
5. Object and effects blueprint references must be preserved.
6. Variants must maintain unique defaults but follow parentType grouping.
7. Generated code must be compatible with Neon Playground architecture and scalable for future games.


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
