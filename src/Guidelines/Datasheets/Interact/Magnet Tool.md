──────────────────────────────
MAGNET TOOL DATA SHEET – 2.19.2026
──────────────────────────────

id: tool_magnet
type: manipulation-physics
tags: [magnet, attraction, physics, modular]
compatibleEntities: [Planet, Asteroid, Spaceship, All]
themeKeys: [cyan, blue, yellow, white]
description: Pulls nearby entities toward a defined point; strength and radius adjustable; supports stacking and combos.
crossLinks: [InteractToolsRegistry, RadialVariantsAndTypes, EffectorSystem, Move Tool]
parameters:
	- strength: Pull force (adjustable)
	- radius: Area of effect (adjustable)
	- duration: Optional time limit
	- stackable: true/false
	- entityFilter: Types of entities affected
---
# Magnet / Attraction Point Tool Data Sheet

──────────────────────────────
FUNCTIONALITY OVERVIEW
──────────────────────────────
- Base Effect: Pulls nearby entities toward a defined point (magnet or attractor)
- User Action: Click or tap to place a magnet point; entities within a radius are pulled toward it
- Adjustable Parameters: Strength (pull force), Radius (area of effect), Duration (optional)
- Supported Entities: Any entity with mass/physics (planets, asteroids, etc.)
- Visual Feedback: Animated field/radius, entity motion toward point, optional field lines

──────────────────────────────
USER INTERACTIONS
──────────────────────────────
- Place: User clicks/taps to set a magnet point in the world
- Adjust: Drag to move the magnet; sliders for strength/radius (in control panel)
- Remove: Click/tap magnet again or use Delete Tool
- Stackable: Multiple magnets can be placed (if enabled)
- Combo: Can be used with Move, Undo, or Burst tools

──────────────────────────────
MODULARITY & EXTENSIBILITY
──────────────────────────────
- Configurable: Strength, radius, duration, and stacking can be tuned per game or user
- Extensible: Can be upgraded to attract only certain entity types, or to have time-based pulsing
- Integration: Works with effector system and physics engine; can trigger visual or audio effects
- Blueprint: Magnet is a plug-in tool, registered in the Interact Tool Registry

──────────────────────────────
INTEGRATION & REFERENCES
──────────────────────────────
- Engine: Requires access to entity registry, physics engine, and effector system
- UI: Control panel for adjusting parameters; visual indicator for active magnets
- Data Sheet: See _Interact.md (Tool 10)
- Related: Repulsion / Push Point Tool, Mini Black Hole / Vortex Tool, Radial Effector
- Blueprint: See 🎮Playground Game Blueprint.md, Effector System.md

──────────────────────────────
NOTES
──────────────────────────────
- Can be used for puzzles, creative play, or as a physics demonstration
- Optional: Magnet can attract only certain tags (e.g., only planets, only asteroids)
- Visuals should clearly indicate area of effect and active state
