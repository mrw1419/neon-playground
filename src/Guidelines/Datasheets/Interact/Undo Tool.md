──────────────────────────────
UNDO TOOL DATA SHEET – 2.19.2026
──────────────────────────────


---
id: tool_undo
type: utility-control
tags: [undo, history, utility, modular]
compatibleEntities: [All]
themeKeys: [gray, blue, white]
description: Reverts the last action or sequence of actions performed by the user; supports multi-level undo and redo.
crossLinks: [InteractToolsRegistry, Redo Tool, Move Tool, Clone Tool]
parameters:
	- undoLevels: Adjustable (number of steps)
	- redoSupport: true/false
---
Usage Scope: Playground Game (MVP), future games
Tags: User-Controlled, Modular, Core, MVP

CORE FUNCTIONALITY
──────────────────────────────
- Reverts the most recent action (placement, move, burst, etc.)
- Stack-based undo; configurable depth (MVP: single-step)
- Can be extended to support redo

INTERACTIONS
──────────────────────────────
- Works with all entity and effector actions tracked in history
- Integrates with entity registry and world state
- Can be triggered via UI (PlaygroundControlPanel) or hotkey
- Emits events for undo action

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for multi-step undo, redo, or selective undo
- Compatible with Move Tool and other interact tools
- Future: add visual feedback, undo history UI

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
