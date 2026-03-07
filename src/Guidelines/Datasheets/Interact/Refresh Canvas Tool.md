──────────────────────────────
REFRESH CANVAS TOOL DATA SHEET – 2.19.2026
──────────────────────────────

IDENTITY & METADATA
──────────────────────────────
Name: Refresh Canvas Tool
Unique ID: tool_refresh_canvas
Type: Control / Interact Tool
Category: Playground / Interactive Tools
Purpose: Reset the world to its initial state
Usage Scope: Playground Game, future games
Tags: User-Controlled, Modular, Core

CORE FUNCTIONALITY
──────────────────────────────
- Resets the world to its initial state
- Can optionally preserve entities or effectors (future)
- MVP: full reset

INTERACTIONS
──────────────────────────────
- Works with all entities and effectors in the world
- Integrates with entity registry and world state
- Can be triggered via UI (PlaygroundControlPanel) or hotkey
- Emits events for reset action

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for partial reset, selective preservation, or confirmation dialogs
- Compatible with Undo and Delete tools
- Future: add visual feedback, reset history UI

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
