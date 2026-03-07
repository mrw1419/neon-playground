──────────────────────────────
LAUNCHER / SLINGSHOT TOOL DATA SHEET – 2.19.2026
──────────────────────────────


---
id: tool_launcher
type: manipulation-physics
tags: [launcher, slingshot, projectile, modular]
compatibleEntities: [All]
themeKeys: [yellow, orange, blue, white]
description: Pick an object and propel it with force; configurable strength, angle, and projectile type.
crossLinks: [InteractToolsRegistry, Move Tool, Undo Tool, RadialVariantsAndTypes]
parameters:
	- strength: Adjustable force
	- angle: Launch direction
	- projectileType: Entity or effect
	- multiLaunch: true/false (optional)
---

CORE FUNCTIONALITY
──────────────────────────────
- Allows user to select an entity and launch it by dragging and releasing (slingshot mechanic)
- Configurable strength, angle, and projectile type
- MVP: single-entity launch with adjustable force

INTERACTIONS
──────────────────────────────
- Works with all entities flagged as launchable
- Integrates with entity registry and world state
- Can be triggered via UI (PlaygroundControlPanel) or direct drag interaction
- Emits events for launch start, drag, and release

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for multi-entity launch, trajectory preview, or special effects
- Compatible with Undo, Move, and other interact tools
- Future: add visual feedback, slow-motion, or combo launches

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
