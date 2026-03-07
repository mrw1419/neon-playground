──────────────────────────────
REUSABLE VISUAL EFFECTS – 2.18.2026
──────────────────────────────


1. TRAIL EFFECTS (YAML/Block Registry)
──────────────────────────────
- id: comet_asteroid_tail
  type: trail-effect
  tags: [trail, particle, entity, modular]
  compatibleEntities: [Planet, Asteroid, Spaceship]
  themeKeys: [cyan, white, yellow, magenta]
  description: Persistent particle trail following entity; color, length, fade speed configurable; optional physics nudges on trail contact.
  crossLinks: [Trail Effects Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

- id: thruster_flames
  type: trail-effect
  tags: [trail, movement, particle, modular]
  compatibleEntities: [Spaceship, Player]
  themeKeys: [orange, yellow, red, blue]
  description: Directional particle trail for movement; short burst or continuous; color/shape changes with speed or upgrade.
  crossLinks: [Trail Effects Data Sheet, SpaceshipEntity, RadialVisualsAndConfigs]

- id: mouse_cursor_sparkles
  type: trail-effect
  tags: [trail, input, particle, modular]
  compatibleEntities: [Player, UI]
  themeKeys: [magenta, cyan, yellow]
  description: Particle trail following player input; can trigger minor nudges or be visual-only.
  crossLinks: [Trail Effects Data Sheet, InteractToolsRegistry]

- id: afterimage_ghost_motion
  type: trail-effect
  tags: [trail, afterimage, ghost, modular]
  compatibleEntities: [All]
  themeKeys: [white, blue, magenta]
  description: Semi-transparent fading trail for fast-moving objects; optional additive glow or blur.
  crossLinks: [Trail Effects Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]


2. IMPACT & CONTACT EFFECTS (YAML/Block Registry)
──────────────────────────────
- id: collision_sparks
  type: impact-effect
  tags: [impact, spark, collision, modular]
  compatibleEntities: [Planet, Asteroid, Spaceship, Projectile]
  themeKeys: [yellow, orange, white]
  description: Quick flash or burst of particles on entity contact; reusable for bullets, ships, asteroids, etc.
  crossLinks: [Impact Effects Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

- id: debris_shards
  type: impact-effect
  tags: [impact, debris, destruction, modular]
  compatibleEntities: [All]
  themeKeys: [gray, brown, white]
  description: Spawned on destruction or collision; scalable per entity or effect size.
  crossLinks: [Impact Effects Data Sheet, PlanetVisuals]

- id: splash_ripple_particles
  type: impact-effect
  tags: [impact, ripple, splash, modular]
  compatibleEntities: [Planet, Water, RippleEffector]
  themeKeys: [blue, cyan, white]
  description: Visual-only “water-like” waves for ripple effect; can animate entities in place if needed.
  crossLinks: [Impact Effects Data Sheet, RadialVariantsAndTypes, RadialVisualsAndConfigs]


3. AMBIENT & COSMETIC EFFECTS (YAML/Block Registry)
──────────────────────────────
- id: glow_aura_layers
  type: ambient-effect
  tags: [ambient, aura, glow, modular]
  compatibleEntities: [Planet, Spaceship, Effect]
  themeKeys: [cyan, magenta, yellow, white]
  description: Persistent color halo around entity or effect; can pulse or intensify with ability charge.
  crossLinks: [Ambient Effects Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

- id: light_flares
  type: ambient-effect
  tags: [ambient, flare, light, modular]
  compatibleEntities: [All]
  themeKeys: [yellow, white, orange]
  description: Lens flare or spark flash for dramatic events; scalable by intensity or size.
  crossLinks: [Ambient Effects Data Sheet, PlanetVisuals]

- id: particle_storms
  type: ambient-effect
  tags: [ambient, particle, storm, modular]
  compatibleEntities: [All]
  themeKeys: [white, blue, magenta, yellow]
  description: Confetti, dust, space dust, star showers; can overlay entire scene or follow entities.
  crossLinks: [Ambient Effects Data Sheet, PlanetVisuals]


4. COMPOSABLE VISUAL MODIFIERS (YAML/Block Registry)
──────────────────────────────
- id: color_shifts_pulses
  type: visual-modifier
  tags: [modifier, color, pulse, modular]
  compatibleEntities: [All]
  themeKeys: [magenta, cyan, yellow, white]
  description: Modulate hue, brightness, or saturation over time; can indicate power-ups, stages, or status effects.
  crossLinks: [Visual Modifiers Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

- id: scaling_stretch_animation
  type: visual-modifier
  tags: [modifier, scale, stretch, modular]
  compatibleEntities: [All]
  themeKeys: [yellow, orange, blue]
  description: Temporarily stretch or squash visuals for impact; works with particles, entity sprites, or effectors.
  crossLinks: [Visual Modifiers Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

- id: rotation_spin_layers
  type: visual-modifier
  tags: [modifier, rotation, spin, modular]
  compatibleEntities: [All]
  themeKeys: [cyan, magenta, yellow]
  description: Apply rotation to particle or overlay visuals; great for shields, vortexes, or spinning effects.
  crossLinks: [Visual Modifiers Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]

- id: opacity_fade_transitions
  type: visual-modifier
  tags: [modifier, opacity, fade, modular]
  compatibleEntities: [All]
  themeKeys: [white, blue, magenta]
  description: Smooth in/out of effects, trails, or overlays; can be reused for death bursts or spawning.
  crossLinks: [Visual Modifiers Data Sheet, PlanetVisuals, RadialVisualsAndConfigs]
