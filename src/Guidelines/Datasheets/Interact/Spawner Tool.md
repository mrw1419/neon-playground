# Spawner / Auto-Swarm Tool Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────

---
id: tool_spawner
type: utility-entity
tags: [spawner, entity, utility, modular]
compatibleEntities: [All]
themeKeys: [yellow, blue, white]
description: Spawns new entities into the world; supports adjustable entity type, quantity, and spawn location.
crossLinks: [InteractToolsRegistry, Clone Tool, Randomizer Tool, Planet Entity Data Sheet]
parameters:
	- entityType: planet | asteroid | custom
	- quantity: Adjustable
	- spawnLocation: point | area | random
---

──────────────────────────────
FUNCTIONALITY OVERVIEW
- Visual Feedback: Spawn animation, entity entry effect, optional spawn counter

──────────────────────────────
USER INTERACTIONS
──────────────────────────────
- Place: User clicks/taps to spawn entity/entities at pointer
- Adjust: Control panel for entity type, quantity, and rate
- Remove: Use Delete Tool to remove spawned entities
- Combo: Can be used with Move, Magnet, or Paint tools

──────────────────────────────
MODULARITY & EXTENSIBILITY
──────────────────────────────
- Configurable: Entity type, spawn rate, quantity, and spawn location
- Extensible: Can be upgraded to spawn swarms, waves, or patterns
- Integration: Works with entity registry and world engine; can trigger visual or audio effects
- Blueprint: Spawner is a plug-in tool, registered in the Interact Tool Registry

──────────────────────────────
INTEGRATION & REFERENCES
──────────────────────────────
- Engine: Requires access to entity registry and world engine
- UI: Control panel for adjusting parameters; visual indicator for active spawns
- Data Sheet: See _Interact.md (Tool 12)
- Related: Magnet Tool, Repulse Tool, Randomizer Tool
- Blueprint: See 🎮Playground Game Blueprint.md, Game Architecture.md

──────────────────────────────
NOTES
──────────────────────────────
- Can be used for creative play, testing, or gameplay scenarios
- Optional: Spawner can be limited to certain entity types or capped in quantity
- Visuals should clearly indicate spawn location and entity type
