──────────────────────────────
CHANGE WORLD BACKGROUND TOOL DATA SHEET – 2.19.2026
──────────────────────────────

id: tool_background
type: control-visual
tags: [background, visual, world, modular]
compatibleEntities: [All]
themeKeys: [space, neon, cosmic, dark, light]
description: Switches world background visuals; works with dynamic effects, can be triggered via UI or direct interaction.
crossLinks: [InteractToolsRegistry, WorldBackgrounds, PlaygroundControlPanel, RadialVisualsAndConfigs]
parameters:
	- backgrounds: List of available backgrounds/themes
	- transition: Animated, instant, or event-driven
	- feedback: Visual or audio cues (optional)


CORE FUNCTIONALITY
──────────────────────────────
- Switches the world background to a different visual or theme
- Works with dynamic effects (e.g., bursts, universe-scale events)
- MVP: select from a set of backgrounds

INTERACTIONS
──────────────────────────────
- Works with all background visual modules
- Integrates with world state and visual registry
- Can be triggered via UI (PlaygroundControlPanel) or direct interaction
- Emits events for background change

MODULARITY & EXTENSIBILITY
──────────────────────────────
- Designed as a plug-and-play tool in /content/interact/
- Can be extended for animated transitions, random backgrounds, or event-driven changes
- Compatible with other visual and interact tools
- Future: add visual feedback, background history UI

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
