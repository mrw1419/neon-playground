CONFIG_REGISTRY 2.11.2026
│
├─ CONSTANTS
│   ├─ WORLD_LIMITS
│   ├─ PHYSICS_STEP
│   ├─ MAX_ENTITIES
│   ├─ LAYER_ORDER
│   └─ INPUT_THRESHOLDS
│
├─ TOKENS
│   ├─ COLORS: { CYAN, MAGENTA, PURPLE, ACID_GREEN, RED, ORANGE, YELLOW, BROWN, TAN, MOON_GRAY, DARK_GRAY, CRACKED_ICE, CRACKED_EVIL }
│   ├─ GLOW_LEVELS: { low, medium, high }
│   ├─ TYPOGRAPHY_SCALE: { small, base, large, xlarge }
│   ├─ SPACING_SCALE: { xs, sm, md, lg, xl }
│   └─ MOTION_DURATIONS: { short, medium, long }
│
├─ BASE_PARAMS
│   ├─ PLANET_BASE: { size, color, growthRate }
│   ├─ STAR_BASE: { size, intensity }
│   ├─ NEBULA_BASE: { opacity, swir }
│   ├─ COMET_BASE: { speed, trailLength }
│   ├─ ASTEROID_BASE: { size, speed }
│   ├─ SPACESHIP_BASE: { speed, health }
│   ├─ SATELLITE_BASE: { speed, orbitRadius }
│   ├─ UFO_BASE: { speed, beamPower }
│   ├─ COLIN_BASE: { health, shield }
│   ├─ BURST_BASE: { power, radius }
│   ├─ TRAIL_BASE: { length, fade }
│   ├─ RIPPLE_BASE: { siz, duration }
│   └─ GRAVITY_BASE: { strength, radius }
│
├─ GAME_CONFIGS
│   ├─ PLAYGROUND_CONFIG: { maxPlanets, allowBurst }
│   ├─ COLIN_GAME_CONFIG: { maxEnemies, upgrades }
│   ├─ SPACESHIP_GAME_CONFIG: { maxShips, fuelLimit }
│   └─ ASTEROID_GAME_CONFIG: { maxAsteroids, spawnRate }
│
└─ RUNTIME_STATE
    ├─ SCORE
    ├─ HEALTH
    ├─ LEVEL
    ├─ TIMER
    ├─ ACTIVE_EFFECTS
    └─ ENTITY_COUNT

Constants  = physics laws
Tokens     = visual language
Base Params = default behavior
Game Config = rule overrides
Runtime     = what’s happening right now

