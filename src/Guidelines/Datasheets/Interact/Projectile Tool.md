# Projectile Creator Tool Data Sheet

──────────────────────────────

---
id: tool_projectile
type: interactive-physics
tags: [projectile, creator, physics, modular]
compatibleEntities: [All]
themeKeys: [yellow, orange, blue, white]
description: Fires projectiles, lasers, or effectors from a point or entity; supports direction, velocity, and trail effects.
crossLinks: [InteractToolsRegistry, Magnet Tool, Repulse Tool, Paintbrush Tool, Trail Effects Data Sheet]
parameters:
	- projectileType: laser | effector | custom
	- direction: Adjustable
	- velocity: Adjustable
	- trailEffect: true/false (optional)
---

──────────────────────────────
FUNCTIONALITY OVERVIEW
──────────────────────────────
- Base Effect: Fires projectiles, lasers, or effectors from a point or entity
- User Action: Click/tap to set direction and fire; drag to adjust angle or velocity
- Adjustable Parameters: Projectile type, direction, velocity, optional trail effects
- Supported Entities: Any entity that can emit projectiles (planets, spaceships, etc.)
- Visual Feedback: Projectile animation, trail effects, impact visuals

──────────────────────────────
USER INTERACTIONS
──────────────────────────────
- Fire: User clicks/taps to set direction and fire projectile
- Adjust: Control panel for projectile type, velocity, and effects
- Remove: Use Delete Tool to remove projectiles
- Combo: Can be used with Magnet, Repulse, or Paint tools

──────────────────────────────
MODULARITY & EXTENSIBILITY
──────────────────────────────
- Configurable: Projectile type, velocity, direction, and effects
- Extensible: Can be upgraded to fire effectors, chain reactions, or special projectiles
- Integration: Works with entity registry, physics engine, and effector system
- Blueprint: Projectile Creator is a plug-in tool, registered in the Interact Tool Registry

──────────────────────────────
INTEGRATION & REFERENCES
──────────────────────────────
- Engine: Requires access to entity registry, physics engine, and effector system
- UI: Control panel for adjusting parameters; visual indicator for active projectiles
- Data Sheet: See _Interact.md (Tool 13)
- Related: Spawner Tool, Magnet Tool, Repulse Tool
- Blueprint: See 🎮Playground Game Blueprint.md, Effector System.md

──────────────────────────────
NOTES
──────────────────────────────
- Can be used for gameplay, testing, or creative effects
- Optional: Projectiles can have custom trails, effects, or interactions
- Visuals should clearly indicate projectile path and impact
