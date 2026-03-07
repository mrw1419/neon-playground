──────────────────────────────
NEW ENTITY BLUEPRINT PROMPT 2.20.2026
──────────────────────────────

Use this prompt to plan and scaffold any new entity for the cosmic playground. Reference the modular, extensible patterns established for planets, overlays, visuals, and variants.

---
ENTITY NAME: [Your Entity Name Here]

1. IDENTITY & METADATA
- Description: [What is this entity?]
- Tags: [core, unique, interactive, etc.]
- Base Appearance: [Describe core look, theme keys, overlays]
- Visual Variants: [List possible visual/structural variants]
- Visual Strategy: [How does it use color tokens/themes?]

2. BASE ATTRIBUTES
- Core Stats: [mass, size, durability, energy, drag, etc.]
- Alignment: [Neutral, hostile, friendly, etc.]
- Add-ons / Upgrade Compatibility: [List modular add-ons, overlays, upgrades]

3. PARENT TYPE (if applicable)
- ParentType: [Reference or define a parent type for shared logic/stats]
- Overlays: [List compatible overlays]
- Visuals: [List default/core visuals]
- Variants: [List or plan variants]

4. OVERLAYS & VISUALS
- Overlays: [What overlays can this entity use?]
- Visual Components: [What visuals does it compose?]
- Theme Keys: [Which NEON_THEMES or color tokens are supported?]

5. INTERACTIONS & EFFECTORS
- Placeable: [How is it placed?]
- Removable: [How is it removed?]
- Interact Tools: [Which tools affect it?]
- Effector Hooks: [Which effectors can it emit/absorb?]
- Engine Hooks: [Special engine behaviors?]

6. PHYSICS & MOVEMENT
- Physics Body: [Matter.Body type, dynamic/static]
- Collision: [Standard or custom?]
- Special Movement: [Orbit, group, decay, etc.]

7. EXTENSIBILITY & FUTURE-PROOFING
- Supports New Variants: [How can it be extended?]
- Behavior Extensions: [What traits or overlays can be added?]
- Visual Effects: [What reusable effects can be layered?]

8. REGISTRY & BLUEPRINT LINKS
- Parent Types: [Reference parent type registry]
- Overlays: [Reference overlays registry]
- Visuals: [Reference visuals registry]
- Variants: [Reference variants registry]

---
DATA SHEET CREATION INSTRUCTIONS
---
As part of your entity planning, create modular data sheets for:
- Parent Types (if applicable)
- Overlays
- Visuals
- Variants

Each entity should have its own subfolder in /Guidelines/Datasheets/Entity/ (e.g., /Planet/ for planets). Place all data sheets for that entity in its subfolder for clarity and modularity.

Each data sheet should:
- Use the hybrid block/YAML format for clarity and extensibility
- Reference NEON_THEMES or color tokens for themeability
- Include all relevant fields (tags, stats, hooks, compatible types, etc.)
- Cross-link to other registries for overlays, visuals, and variants
- Be placed in the appropriate /Guidelines/Datasheets/Entity/[EntityName]/ subfolder

Reference the Planet entity data sheets for structure and best practices. This ensures every new entity is modular, extensible, and ready for code integration.

---
Reference: See Planet entity data sheets and blueprints for examples of modular, extensible, and theme-aware design.
──────────────────────────────
