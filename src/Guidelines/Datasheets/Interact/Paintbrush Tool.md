──────────────────────────────
PAINTBRUSH TOOL DATA SHEET – 2.19.2026
──────────────────────────────


---
id: tool_paintbrush
type: interactive-visual
tags: [paintbrush, trail, particle, modular]
compatibleEntities: [All]
themeKeys: [cyan, yellow, magenta, white]
description: Draw particle trails or influence entities visually/indirectly; supports different brush types and effects.
crossLinks: [InteractToolsRegistry, Paint Bucket Tool, Trail Effects Data Sheet]
parameters:
	- brushType: default | custom | physics
	- color: Selectable
	- brushSize: Adjustable
	- effectPreset: Optional
---

CORE FUNCTIONALITY
──────────────────────────────
- Draws particle trails or visual effects on the world canvas
- Can influence entities indirectly (e.g., create runways, barriers)
- MVP: freeform drawing with default effect

INTERACTIONS
──────────────────────────────
- Works with all visual layers/entities that accept paintbrush input
- Integrates with world state and visual registry
- Can be triggered via UI or direct pointer interaction
- Emits events for paint/draw actions

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for different brush types, effects, or physics interactions
- Compatible with other visual and interact tools
- Future: add color selection, brush size, or effect presets

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
