──────────────────────────────
DELETE TOOL DATA SHEET – 2.19.2026
──────────────────────────────


---
id: tool_delete
type: manipulation
tags: [delete, remove, entity, modular]
compatibleEntities: [All]
themeKeys: [red, gray, white]
description: Removes selected entity or effector from the world; can optionally delete groups or child entities.
crossLinks: [InteractToolsRegistry, Move Tool, Undo Tool]
parameters:
	- groupDelete: true/false (optional)
	- confirmation: true/false (optional)
---

CORE FUNCTIONALITY
──────────────────────────────
- Removes the selected entity or effector from the world
- Can optionally delete groups or child entities (future)
- MVP: single-entity delete

INTERACTIONS
──────────────────────────────
- Works with all entities and effectors flagged as deletable
- Integrates with entity registry and world state
- Can be triggered via UI (PlaygroundControlPanel) or direct interaction
- Emits events for delete action

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for group delete, undo integration, or confirmation dialogs
- Compatible with Move and Undo tools
- Future: add visual feedback, delete history UI

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
