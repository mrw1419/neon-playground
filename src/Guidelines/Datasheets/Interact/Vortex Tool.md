# Mini Black Hole / Vortex Tool Data Sheet

──────────────────────────────

---
id: tool_vortex
type: manipulation-physics
tags: [vortex, force, physics, modular]
compatibleEntities: [planets, asteroids, all-physics]
themeKeys: [blue, purple, white]
description: Applies a swirling or vortex force to entities, pulling them in a spiral toward a point or entity. Adjustable strength, radius, and duration.
crossLinks: [InteractToolsRegistry, Magnet Tool, Repulse Tool, Mini Black Hole Tool, Physics Engine Data Sheet]
parameters:
	- vortexStrength: Adjustable
	- areaOfEffect: Adjustable
	- duration: Optional
	- spiralDirection: clockwise | counterclockwise
---

──────────────────────────────
FUNCTIONALITY OVERVIEW
──────────────────────────────

──────────────────────────────
USER INTERACTIONS
──────────────────────────────
- Place: User clicks/taps to set a vortex in the world
- Adjust: Control panel for strength, radius, and spiral/twist
- Remove: Click/tap vortex again or use Delete Tool
- Combo: Can be used with Magnet, Repulse, or Ripple tools

──────────────────────────────
MODULARITY & EXTENSIBILITY
──────────────────────────────
- Configurable: Strength, radius, spiral/twist, duration
- Extensible: Can add entity removal, chain reactions, or special vortex effects
- Integration: Works with effector system and physics engine
- Blueprint: Vortex is a plug-in tool, registered in the Interact Tool Registry

──────────────────────────────
INTEGRATION & REFERENCES
──────────────────────────────
- Engine: Requires access to entity registry, physics engine, and effector system
- UI: Control panel for vortex parameters; visual indicator for active vortexes
- Data Sheet: See _Interact.md (Tool 18)
- Related: Magnet Tool, Repulse Tool, Ripple Tool
- Blueprint: See 🎮Playground Game Blueprint.md, Effector System.md

──────────────────────────────
NOTES
──────────────────────────────
- Useful for creative play, puzzles, or as a physics demonstration
- Optional: Vortex can remove entities at high strength
- Visuals should clearly indicate area of effect and spiral motion
