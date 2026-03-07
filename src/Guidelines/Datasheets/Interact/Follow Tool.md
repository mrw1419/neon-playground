──────────────────────────────
FOLLOW TOOL DATA SHEET – 2.19.2026
──────────────────────────────


---
id: tool_follow
type: manipulation
tags: [follow, pointer, entity, modular]
compatibleEntities: [All]
themeKeys: [cyan, yellow, magenta, white]
description: Makes an entity follow the cursor or fingerpress; supports lag, spring, or momentum behavior.
crossLinks: [InteractToolsRegistry, Move Tool, Paintbrush Tool]
parameters:
	- followMode: direct | lag | spring | momentum
	- groupFollow: true/false (optional)
---

CORE FUNCTIONALITY
──────────────────────────────
- Makes selected entity follow the pointer or touch input
- Optional lag, spring, or momentum behavior (future)
- MVP: direct follow

INTERACTIONS
──────────────────────────────
- Works with all entities flagged as followable
- Integrates with entity registry and world state
- Can be triggered via UI or direct interaction
- Emits events for follow start, update, and stop

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for group follow, path following, or advanced physics
- Compatible with Move and Paintbrush tools
- Future: add follow modes, constraints, or visual feedback

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
