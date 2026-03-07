# Impact & Contact Effects Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
- Category: Reusable Visual Effects
- Group: Impact & Contact Effects
- Status: Core, reusable, composable

──────────────────────────────
EFFECTS IN THIS GROUP
──────────────────────────────
1. Collision Sparks
2. Debris Shards
3. Splash / Ripple Particles

──────────────────────────────

1. Collision Sparks (YAML/Block Registry)
──────────────────────────────
- id: collision_sparks
	type: impact-effect
	tags: [impact, spark, collision, modular]
	compatibleEntities: [Planet, Asteroid, Spaceship, Projectile]
	themeKeys: [yellow, orange, white]
	description: Quick flash or burst of particles on entity contact; reusable for bullets, ships, asteroids, etc.
	crossLinks: [Impact Effects Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

──────────────────────────────

2. Debris Shards (YAML/Block Registry)
──────────────────────────────
- id: debris_shards
	type: impact-effect
	tags: [impact, debris, destruction, modular]
	compatibleEntities: [All]
	themeKeys: [gray, brown, white]
	description: Spawned on destruction or collision; scalable per entity or effect size.
	crossLinks: [Impact Effects Data Sheet, PlanetVisuals]

──────────────────────────────

3. Splash / Ripple Particles (YAML/Block Registry)
──────────────────────────────
- id: splash_ripple_particles
	type: impact-effect
	tags: [impact, ripple, splash, modular]
	compatibleEntities: [Planet, Water, RippleEffector]
	themeKeys: [blue, cyan, white]
	description: Visual-only “water-like” waves for ripple effect; can animate entities in place if needed.
	crossLinks: [Impact Effects Data Sheet, RadialVariantsAndTypes, RadialVisualsAndConfigs]

──────────────────────────────
NOTES
──────────────────────────────
- All impact/contact effects are composable and can be layered
- Parameters should be exposed for tuning in the editor or via code
- Visuals should be performant and scalable for many simultaneous events
