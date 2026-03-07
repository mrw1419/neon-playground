
---
id: tool_repulse
type: manipulation-physics
tags: [repulse, force, physics, modular]
compatibleEntities: [planets, asteroids, all-physics]
themeKeys: [blue, white, purple]
description: Applies a repulsive force to entities or projectiles, pushing them away from a point or entity. Adjustable strength, radius, and duration. Stackable and extensible.
crossLinks: [InteractToolsRegistry, Magnet Tool, Mini Black Hole Tool, Radial Effector, Physics Engine Data Sheet]
parameters:
	- forceStrength: Adjustable
	- areaOfEffect: Adjustable
	- duration: Optional
	- falloff: linear | radial | custom
	- entityFilter: Optional (tags)
---
