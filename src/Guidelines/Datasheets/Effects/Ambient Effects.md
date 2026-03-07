# Ambient & Cosmetic Effects Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
- Category: Reusable Visual Effects
- Group: Ambient & Cosmetic Effects
- Status: Core, reusable, composable

──────────────────────────────
EFFECTS IN THIS GROUP
──────────────────────────────
1. Glow / Aura Layers
2. Light Flares
3. Particle Storms

──────────────────────────────

1. Glow / Aura Layers (YAML/Block Registry)
──────────────────────────────
- id: glow_aura_layers
	type: ambient-effect
	tags: [ambient, aura, glow, modular]
	compatibleEntities: [Planet, Spaceship, Effect]
	themeKeys: [cyan, magenta, yellow, white]
	description: Persistent color halo around entity or effect; can pulse or intensify with ability charge.
	crossLinks: [Ambient Effects Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

──────────────────────────────

2. Light Flares (YAML/Block Registry)
──────────────────────────────
- id: light_flares
	type: ambient-effect
	tags: [ambient, flare, light, modular]
	compatibleEntities: [All]
	themeKeys: [yellow, white, orange]
	description: Lens flare or spark flash for dramatic events; scalable by intensity or size.
	crossLinks: [Ambient Effects Data Sheet, PlanetVisuals]

──────────────────────────────

3. Particle Storms (YAML/Block Registry)
──────────────────────────────
- id: particle_storms
	type: ambient-effect
	tags: [ambient, particle, storm, modular]
	compatibleEntities: [All]
	themeKeys: [white, blue, magenta, yellow]
	description: Confetti, dust, space dust, star showers; can overlay entire scene or follow entities.
	crossLinks: [Ambient Effects Data Sheet, PlanetVisuals]

──────────────────────────────
NOTES
──────────────────────────────
- All ambient/cosmetic effects are composable and can be layered
- Parameters should be exposed for tuning in the editor or via code
- Visuals should be performant and scalable for many simultaneous effects
