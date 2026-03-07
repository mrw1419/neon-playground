---
id: tool_preview
name: Placement Preview Tool
type: utility-preview
tags: [preview, placement, ghost, modular, extensible]
compatibleEntities: [Planet, Star, Comet, Asteroid, Satellite, Custom]
themeKeys: [white, neon, semiTransparent]
description: |
  Provides a modular, reusable preview overlay for placing entities (planets, stars, etc.) in the playground. Handles ghosted visuals, live radius/size feedback, and future extensibility for all placeable objects/tools.
crossLinks: [InteractToolsRegistry, Move Tool, Entity Blueprints, UI Components]
parameters:
  - type: string (entity type)
  - pos: { x, y } (preview position)
  - radius: number (preview radius/size)
  - active: boolean (preview active state)
  - theme: string (visual style)
---
