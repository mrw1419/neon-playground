
---
id: tool_clone
type: manipulation-gameplay
tags: [clone, split, entity, modular]
compatibleEntities: [All]
themeKeys: [cyan, yellow, magenta, white]
description: Duplicates or divides selected entities into multiple parts; supports clone count, split pattern, and swarm behaviors.
crossLinks: [InteractToolsRegistry, Move Tool, Magnet Tool, Spawner Tool]
parameters:
	- cloneCount: Number of clones to create
	- splitPattern: halves | quarters | custom
	- cloneProperties: Inherit or override entity stats
	- swarmBehavior: Enable/disable (optional)
---

──────────────────────────────
FUNCTIONALITY OVERVIEW
──────────────────────────────
- Base Effect: Duplicates or divides selected entities into multiple parts
- User Action: Select entity and activate tool to clone or split
- Adjustable Parameters: Number of clones, split pattern, clone properties
- Supported Entities: Any entity (planets, asteroids, etc.)
- Visual Feedback: Clone animation, split effect, optional highlight

──────────────────────────────
USER INTERACTIONS
──────────────────────────────
- Clone: Select entity and click to duplicate
- Split: Select entity and choose split option (e.g., halves, quarters)
- Adjust: Control panel for number of clones or split pattern
- Remove: Use Delete Tool to remove clones
- Combo: Can be used with Move, Magnet, or Spawner tools

──────────────────────────────
MODULARITY & EXTENSIBILITY
──────────────────────────────
- Configurable: Clone count, split pattern, clone properties
- Extensible: Can add swarm behaviors, chain reactions, or special clone effects
- Integration: Works with entity registry and world engine
- Blueprint: Clone/Split is a plug-in tool, registered in the Interact Tool Registry

──────────────────────────────
INTEGRATION & REFERENCES
──────────────────────────────
- Engine: Requires access to entity registry and world engine
- UI: Control panel for clone/split options; visual indicator for clones
- Data Sheet: See _Interact.md (Tool 16)
- Related: Spawner Tool, Randomizer Tool, Repulse Tool
- Blueprint: See 🎮Playground Game Blueprint.md, Game Architecture.md

──────────────────────────────
NOTES
──────────────────────────────
- Useful for creative play, testing, or gameplay variety
- Optional: Clones can inherit or randomize properties
- Visuals should clearly indicate original vs. clones
