# Trail Effects Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
- Category: Reusable Visual Effects
- Group: Trail Effects
- Status: Core, reusable, composable

──────────────────────────────
EFFECTS IN THIS GROUP
──────────────────────────────
1. Comet / Asteroid Tail
2. Thruster Flames
3. Mouse / Cursor Sparkles
4. Afterimage / Ghost Motion

──────────────────────────────

1. Comet / Asteroid Tail (YAML/Block Registry)
──────────────────────────────
- id: comet_asteroid_tail
	type: trail-effect
	tags: [trail, particle, entity, modular]
	compatibleEntities: [Planet, Asteroid, Spaceship]
	themeKeys: [cyan, white, yellow, magenta]
	description: Persistent particle trail following entity; color, length, fade speed configurable; optional physics nudges on trail contact.
	crossLinks: [Trail Effects Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

──────────────────────────────

2. Thruster Flames (YAML/Block Registry)
──────────────────────────────
- id: thruster_flames
	type: trail-effect
	tags: [trail, movement, particle, modular]
	compatibleEntities: [Spaceship, Player]
	themeKeys: [orange, yellow, red, blue]
	description: Directional particle trail for movement; short burst or continuous; color/shape changes with speed or upgrade.
	crossLinks: [Trail Effects Data Sheet, SpaceshipEntity, RadialVisualsAndConfigs]

──────────────────────────────

3. Mouse / Cursor Sparkles (YAML/Block Registry)
──────────────────────────────
- id: mouse_cursor_sparkles
	type: trail-effect
	tags: [trail, input, particle, modular]
	compatibleEntities: [Player, UI]
	themeKeys: [magenta, cyan, yellow]
	description: Particle trail following player input; can trigger minor nudges or be visual-only.
	crossLinks: [Trail Effects Data Sheet, InteractToolsRegistry]

──────────────────────────────

4. Afterimage / Ghost Motion (YAML/Block Registry)
──────────────────────────────
- id: afterimage_ghost_motion
	type: trail-effect
	tags: [trail, afterimage, ghost, modular]
	compatibleEntities: [All]
	themeKeys: [white, blue, magenta]
	description: Semi-transparent fading trail for fast-moving objects; optional additive glow or blur.
	crossLinks: [Trail Effects Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

──────────────────────────────
NOTES
──────────────────────────────
- All trail effects are composable and can be layered
- Parameters should be exposed for tuning in the editor or via code
- Visuals should be performant and scalable for many entities
