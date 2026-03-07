# Composable Visual Modifiers Data Sheet

──────────────────────────────
IDENTITY & METADATA
──────────────────────────────
- Category: Reusable Visual Effects
- Group: Composable Visual Modifiers
- Status: Core, reusable, composable

──────────────────────────────
EFFECTS IN THIS GROUP
──────────────────────────────
1. Color Shifts / Pulses
2. Scaling / Stretch Animation
3. Rotation / Spin Layers
4. Opacity / Fade Transitions

──────────────────────────────

1. Color Shifts / Pulses (YAML/Block Registry)
──────────────────────────────
- id: color_shifts_pulses
	type: visual-modifier
	tags: [modifier, color, pulse, modular]
	compatibleEntities: [All]
	themeKeys: [magenta, cyan, yellow, white]
	description: Modulate hue, brightness, or saturation over time; can indicate power-ups, stages, or status effects.
	crossLinks: [Visual Modifiers Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

──────────────────────────────

2. Scaling / Stretch Animation (YAML/Block Registry)
──────────────────────────────
- id: scaling_stretch_animation
	type: visual-modifier
	tags: [modifier, scale, stretch, modular]
	compatibleEntities: [All]
	themeKeys: [yellow, orange, blue]
	description: Temporarily stretch or squash visuals for impact; works with particles, entity sprites, or effectors.
	crossLinks: [Visual Modifiers Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

──────────────────────────────

3. Rotation / Spin Layers (YAML/Block Registry)
──────────────────────────────
- id: rotation_spin_layers
	type: visual-modifier
	tags: [modifier, rotation, spin, modular]
	compatibleEntities: [All]
	themeKeys: [cyan, magenta, yellow]
	description: Apply rotation to particle or overlay visuals; great for shields, vortexes, or spinning effects.
	crossLinks: [Visual Modifiers Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

──────────────────────────────

4. Opacity / Fade Transitions (YAML/Block Registry)
──────────────────────────────
- id: opacity_fade_transitions
	type: visual-modifier
	tags: [modifier, opacity, fade, modular]
	compatibleEntities: [All]
	themeKeys: [white, blue, magenta]
	description: Smooth in/out of effects, trails, or overlays; can be reused for death bursts or spawning.
	crossLinks: [Visual Modifiers Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

──────────────────────────────
NOTES
──────────────────────────────
- All visual modifiers are composable and can be layered with other effects
- Parameters should be exposed for tuning in the editor or via code
- Designed for performance and flexibility across all entity types
