# DeleteTool Datasheet

## Purpose
A global, reusable tool for deleting entities in any Neon game. Supports manual deletion (via UI), automatic triggers (viewport exit, special interactions), and extensible rules for future entity types and removal scenarios.

## Features
- Manual deletion via Delete tool/card (UI trigger)
- Automatic deletion on viewport exit, black hole, or custom triggers
- Extensible for new entity types, triggers, and rules
- Integrates with action history and undo/redo systems
- Visual feedback for deletion (overlay, animation, sound)
- Robust error handling (cannot delete protected entities, etc.)
- Configurable per game/module (e.g., restrict to certain types, allow batch deletion)
- Keyboard accessibility and screen reader support
- Hooks for plugins/mods to add custom deletion logic

## API
- `canDelete(entity: any): boolean` — Checks if entity is eligible for deletion
- `deleteEntity(entity: any, entities: any[]): any[]` — Removes entity from list
- `handleTrigger(trigger: 'manual' | 'viewportExit' | 'special', entity: any, entities: any[]): any[]` — Handles deletion based on trigger
- Extensible options: allowedTypes, triggers, custom rules

## Visuals & Feedback
- DeleteVisual.tsx: Overlay or animation for deletion
- Optional: Sound effect, modal confirmation, undo snackbar
- Reference: EntityInfoOverlayVisual, EffectorInfoOverlayVisual for style inspiration

## Future Ideas (Multi-Game Use)
- Batch/compound deletion (multi-select, group delete)
- Deletion with dependencies (parent/child, linked objects)
- Custom triggers (timed deletion, environmental hazards, scripted events)
- Deletion history for undo/redo, analytics, and replay
- Dynamic rules: e.g., only delete entities with certain properties, or based on game state
- Plugin API: allow mods to register new deletion triggers or protected entity types
- Visual themes: deletion overlays adapt to game theme (neon, cosmic, fantasy, etc.)
- Audio feedback: customizable sound effects per game/module
- Accessibility: ARIA labels, keyboard shortcuts, screen reader support
- Onboarding: tooltips, help overlays for new users
- Persistence: deletion actions tracked for save/load, session replay

## Integration
- Import DeleteTool in game scenes (e.g., PlaygroundScene)
- Use DeleteTool for all entity removal logic (manual, automatic, special)
- Connect to action history for undo/redo
- Extend DeleteVisual for custom feedback

## References
- MoveTool, UndoTool datasheets
- EntityInfoOverlayVisual, EffectorInfoOverlayVisual
- Playground Game Blueprint
- Universal Starter Prompt

---

*Designed for maximum flexibility, extensibility, and creative gameplay across all Neon games.*
