──────────────────────────────
PAINT BUCKET TOOL DATA SHEET – 2.19.2026
──────────────────────────────


---
id: tool_paintbucket
type: interactive-visual
tags: [paintbucket, color, swap, modular]
compatibleEntities: [All]
themeKeys: [cyan, yellow, magenta, white]
description: Change colors or skins of entities; can target single or multiple entities.
crossLinks: [InteractToolsRegistry, Paintbrush Tool, PlanetVisuals]
parameters:
	- colorPalette: List of available colors
	- multiSelect: true/false (optional)
	- undoable: true/false (optional)
---

CORE FUNCTIONALITY
──────────────────────────────
- Changes the color or skin of selected entities
- Can target single or multiple entities (future)
- MVP: single-entity color swap

INTERACTIONS
──────────────────────────────
- Works with all entities that support color/skin changes
- Integrates with entity registry and world state
- Can be triggered via UI or direct interaction
- Emits events for color/skin change

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for multi-entity selection, color palettes, or skin packs
- Compatible with other visual and interact tools
- Future: add undo/redo, color history, or randomization

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
