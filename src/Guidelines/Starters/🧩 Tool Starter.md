Universal Tool Starter 2.17.2026
────────────────────────────────────────────
<Tool Name>

This starter is used to create both:
- A registry entry (for cataloging all tools)
- A blueprint (detailed plan for implementation)

Use this template to brainstorm, then add to the Tool Registry and create a Tool Blueprint for building.

🔹 Identity
  - id: "[unique ID]"
  - name: "[Human-readable name]"
  - type: "[undo / redo / move / reset / launch / ...]"
  - tags: ["utility", "user-action", "global", "contextual"]

🔹 Purpose & Scope
  - description: "[What does this interact tool do? What is its intended use case?]"
  - scope: "[global / per-object / per-group / per-session]"
  - triggers: ["UI button", "keyboard shortcut", "context menu", ...]

🔹 Parameters & State
  - parameters: { key: value, ... }  # e.g., { maxUndo: 10, targetType: "object" }
  - maintainsState: true/false
  - stateDescription: "[If true, what state does it track?]"

🔹 Behaviors & Effects
  - action: "[What happens when triggered?]"
  - undoable: true/false
  - affects: ["objects", "effects", "groups", "engine", ...]
  - sideEffects: ["UI feedback", "animation", "sound", ...]

🔹 Lifecycle & State
  - isEnabled: true/false
  - isDisabled: false/true
  - hooks: ["onTrigger", "onUndo", "onRedo", ...]
  - triggers: ["userAction", "systemEvent", ...]

🔹 Integration & Modularity
  - linkedObjectBlueprint: "[ObjectBlueprint id]"
  - linkedEffectsBlueprint: "[EffectsBlueprint id]"
  - engineIntegration: Connects to src/engine/interactSystem.ts or relevant engine modules.
  - contentIntegration: Interact tools live in src/content/interact/ as separate files (e.g., UndoTool.ts, MoveTool.ts).
  - registry: Update Interact Registry as new tools or behaviors are added.

🔹 Recommended Guidance for Core Interact Tools
  - UndoTool:
      # Tracks last 10 actions, supports undo/redo, integrates with engine and UI
  - MoveTool:
      # Allows moving objects, respects group logic, integrates with engine
  - ResetTool:
      # Resets playground state, integrates with engine and UI
  - Future Tools:
      # Follow same blueprint
      # Define type, parameters, behaviors, and integration
      # Avoid subclassing unless tool fundamentally changes

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
