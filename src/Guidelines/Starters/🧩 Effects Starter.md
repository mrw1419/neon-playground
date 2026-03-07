
Universal Effects Starter 2.17.2026
────────────────────────────────────────────
<Effect Name>

This starter is used to create both:
- A registry entry (for cataloging all effects)
- A blueprint (detailed plan for implementation)

Use this template to brainstorm, then add to the Effects Registry and create an Effects Blueprint for building.

🔹 Identity
  - id: "[unique ID]"
  - name: "[Human-readable name]"
  - type: "[burst / gravity / ripple / trail / ...]"
  - tags: ["visual", "gameplay", "stackable", ...]

🔹 Purpose & Scope
  - description: "[What does this effect do? What is its intended use case?]"
  - scope: "[global / per-object / per-group / per-session]"
  - triggers: ["UI button", "event", "timer", ...]

🔹 Parameters & State
  - parameters: { key: value, ... }  # e.g., { power: 1.0, duration: 500, color: "#fff" }
  - maintainsState: true/false
  - stateDescription: "[If true, what state does it track?]"

🔹 Behaviors & Interactions
  - action: "[What happens when applied?]"
  - stackable: true/false
  - maxStacks: [number or null]
  - interactsWith: ["objects", "groups", "other effects", ...]
  - exclusions: ["Colin", ...]  # List of objects/effects this effect does not interact with
  - sideEffects: ["UI feedback", "animation", "sound", ...]

🔹 Extensibility & Integration
  - reusable: true/false
  - dependencies: ["engine", "UI", "specific object types", ...]
  - integrationNotes: "[How to integrate with other systems or games?]"

🔹 Example Usage
  - scenario: "[Describe a typical use case or flow]"
  - codeReference: "[Link to implementation or usage example]"

🔹 Architecture Map Reference
  - engineLayer: "src/engine/"  # Core systems: effect system, entity, renderer, etc.
  - contentLayer: "src/content/"  # Game-specific effects, objects, and their registries
  - uiLayer: "src/ui/"  # UI components, effect controls, etc.
  - guidelines: "src/Guidelines/"  # Blueprints, registries, and design docs
  - notes: "[Add any cross-layer integration notes or links to architecture diagrams]"

🔹 Engine & Content Integration
  - engineIntegration: Effect should connect to src/engine/effectSystem.ts and respect engine contracts (state, events, stacking).
  - contentIntegration: Effects should live in src/content/effects/ as separate files (e.g., BurstEffect.ts, GravityEffect.ts).
  - registry: Update Effects Registry as new effects or behaviors are added.

🔹 Cross-Game Control & Extensibility
  - canBeEnabled: true/false
  - canBeDisabled: true/false
  - interactsWithObjects: true/false
  - interactsWithEffects: true/false
  - canBeControlled: true/false
  - notes: "[Describe how effect can be toggled, controlled, or excluded in different games]"

─────────────────────────────
[AI Guidelines / Guardrails]
1. All fields must have default values or be explicitly marked optional.
2. Never remove hooks, parameter slots, or placeholders for state, integration, or extensibility.
3. Optional fields may remain blank, but placeholders for core modules must always exist.
4. Behaviors and effects must maintain modular stateful + functional combo.
5. Object and effects blueprint references must be preserved.
6. Variants must maintain unique defaults but follow parentType grouping.
7. Generated code must be compatible with Neon Playground architecture and scalable for future games.
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

