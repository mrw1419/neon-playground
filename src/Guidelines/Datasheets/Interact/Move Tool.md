──────────────────────────────
MOVE TOOL DATA SHEET – 2.19.2026
──────────────────────────────

id: tool_move
type: manipulation
tags: [move, drag, entity, modular]
compatibleEntities: [All]
themeKeys: [cyan, yellow, magenta, white]
description: Click and drag entities to move them in the world; supports single or multi-select, snapping, and constraints.
crossLinks: [InteractToolsRegistry, PlanetEntity, RadialParentTypeRegistry, Undo Tool]
parameters:
	- selection: single | multi
	- snapping: grid | free
	- constraints: axis lock, boundaries (optional)
	- feedback: Visual cues for drag/move


CORE FUNCTIONALITY
──────────────────────────────
- Click and drag any movable entity (e.g., planet) to reposition it
- Supports single selection (MVP); future: multi-select
- Snaps to grid or free movement (configurable)
- Can be extended to support constraints (e.g., axis lock, boundaries)

INTERACTIONS
──────────────────────────────
- Works with all entities flagged as movable
- Integrates with entity registry and world state
- Can be triggered via UI (PlaygroundControlPanel) or direct interaction
- Emits events for start, move, and end of drag

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for multi-select, group move, or physics-based dragging
- Compatible with undo/redo system
- Future: add visual feedback, snapping, or advanced constraints

INTEGRATION NOTES
──────────────────────────────
- Registered in entity/tool registry for Playground
- Referenced by PlaygroundControlPanel and PlaygroundScene
- Follows guidelines in Interact.md and Universal Starter Prompt.md

REFERENCES
──────────────────────────────
- Interact.md
- Universal Starter Prompt.md
- PlaygroundControlPanel.tsx
- PlaygroundScene.tsx
- Start your engines.md
──────────────────────────────
