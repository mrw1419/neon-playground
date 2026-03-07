# Neon Playground – Game Architecture Map (Revised 2.23.26)

> This map reflects the current workspace structure. Comments are included for clarity. If a file or folder is missing, create as needed. Guidelines subfolders are not detailed here.

# React Key Guidance

- Always generate React keys using only the entity's unique ID, e.g. key={entity.id}. This guarantees stable rendering and prevents unnecessary re-mounts.
- Avoid using array indices or random values in keys unless absolutely necessary.
- Ensure PlaygroundScene and EffectContextProvider pass stable unique keys through to overlays and error boundaries, using only the entity ID pattern.

// This guidance supersedes previous recommendations to use combined ID and index keys.

can you read through the folder/files in this folder and update as needed. please keep the comments solid so anyone or thing who reads this can grasp what everything is all about. make sure to include any that arent currently listed

src/
├── engine/
│   ├── effectorSystem.ts         # Handles effector logic (e.g., applying radial, burst, or other effectors to entities)
│   ├── effectSystem.ts           # Manages effects (visual, audio, gameplay) and their application to entities
│   ├── engine.ts                 # Main engine logic: orchestrates update loop, systems, and entity management
│   ├── entity.ts                 # Base logic for all entities (shared properties, lifecycle, etc.)
│   ├── physicsEngine.ts          # Physics calculations: movement, collisions, forces, etc.
│   ├── renderer.ts               # Rendering logic: draws entities, backgrounds, overlays, and effects
│   ├── ENGINE_DECOUPLING_CHECKLIST.md # Code review checklist for engine boundaries and decoupling (see onboarding)
│   ├── README.md                 # Engine boundaries, allowed dependencies, onboarding
│   ├── __tests__/
│   │   └── engineBoundaries.test.ts # Unit test to verify no forbidden (UI/content/tool) imports in engine modules
│   └── entities/
│       └── BaseEntity.ts         # Base entity class: foundation for all game objects/entities
│   # (No physics/, effectors/, world/, or rendering/ subfolders yet)
├── content/
│   ├── worldbackgrounds/
│   │   └── Stars.tsx             # Neon starfield background
│   ├── entity/
│   │   ├── colin/                        # Colin entity module
│   │   │   ├── ColinEntity.ts            # Logic and data for the Colin entity
│   │   │   └── ColinVisual.ts            # Visual representation for Colin entity
│   │   ├── planet/                       # Planet entity module (main planet logic)
│   │   │   ├── ParentTypes/              # Definitions for planet parent types (e.g., rocky, gas giant)
│   │   │   │   ├── Rocky.ts              # Rocky planet parent type definition
│   │   │   │   └── index.ts              # Entry point for parent types
│   │   │   ├── PlanetEntity.ts           # Main planet entity class (core logic and data)
│   │   │   ├── PlanetRegistry.ts         # Registry for all planet types and variants
│   │   │   ├── index.ts                  # Entry point for the planet module
│   │   │   ├── overlays/                 # Overlay visuals for planets (currently empty)
│   │   │   ├── variants/                 # Planet variant definitions (e.g., Earth, Mars)
│   │   │   │   ├── Earth.ts              # Earth planet variant logic/data
│   │   │   │   └── index.ts              # Entry point for variants
│   │   │   └── weightedRandomPlanet.ts   # Weighted random planet generator (for procedural planet selection)
│   │   └── ...others                     # Other entities (expand as needed)
│   ├── effector/
│   │   └── radial/                       # Radial effector types and visuals (all burst visuals now live in effects/radialeffector)
│   │       ├── BurstType.ts              # Type definitions for burst effectors (shape, power, etc.)
│   │       ├── GravityType.ts            # Type definitions for gravity effectors (fields, pull, etc.)
│   │       ├── NudgeType.ts              # Type definitions for nudge effectors (impulse, push, etc.)
│   │       ├── RadialEffectorRegistry.ts # Registry for all radial effector types (centralized lookup/creation)
│   │       ├── RippleType.ts             # Type definitions for ripple effectors (wave, pulse, etc.)
│   │       └── RippleVisual.tsx          # (Deprecated) Use effects/radialeffector/RippleEffectorVisual.tsx for modular visuals
│   ├── effects/
│   │   ├── planetvisuals/                       # Visual overlays and effects for planets
│   │   │   ├── CracksOverlayVisual.tsx          # Visual overlay for planet cracks
│   │   │   ├── CratersOverlayVisual.tsx         # Visual overlay for planet craters
│   │   │   ├── index.ts                        # Entry point for planet visuals
│   │   │   ├── PlanetAura.tsx                  # Visual effect for planet aura/glow
│   │   │   ├── PlanetBase.tsx                  # Base visual for planets (core appearance)
│   │   │   ├── README.md                       # Documentation for planet visuals
│   │   │   └── RockyOverlayVisual.tsx          # Visual overlay for rocky planet surfaces
│   │   ├── radialeffector/                     # CANONICAL effect visuals for radial effectors (animation only, no overlays)
│   │   │   ├── BurstEffectorVisual.tsx         # Sole burst effect visual (animated burst, no overlays)
│   │   │   ├── GlowEffect.tsx                  # Visual effect for glowing radial effectors
│   │   │   ├── index.ts                        # Entry point for radial effector visuals
│   │   │   ├── OverlayEffect.tsx               # Shared overlay effect for radial effectors ******
│   │   │   ├── README.md                       # Documentation for radial effector visuals
│   │   │   └── RippleEffectorVisual.tsx        # Visual for ripple-type radial effectors
│   │   ├── infoOverlay/                            # Canonical overlays for diagnostics/info (never for animation)
│   │   │   ├── effectorInfoOverlay/                # Effector overlays (diagnostics/info only)
│   │   │   │   ├── EffectorInfoOverlayVisual.tsx   # Sole overlay for effector info (type, position, radius, power, cooldown, etc.)
│   │   │   │   ├── EffectorInfoOverlayVisual.md    # Documentation for effector overlay visuals
│   │   │   ├── entityInfoOverlay/                  # Entity overlays (diagnostics/info only)
│   │   │   │   ├── EntityInfoOverlayVisual.tsx     # React component for entity overlay visuals
│   │   │   │   ├── EntityInfoOverlayVisual.md      # Documentation for entity overlay visuals
│   │   ├── infoOverlay/  
│   │   │   ├── PlanetPreviewOverlay.tsx     # Planet preview overlay component (shows planet placement preview)
│   │   │   ├── PlaygroundControlPanel.tsx   # Control panel UI (main playground controls)
│   │   │   ├── PlaygroundCanvas.tsx         # Main canvas for rendering playground visuals, entity overlays, and interactive effects
│   │   │   ├── DevOverlay.tsx               # Dev overlay for engine tick and effect queue debugging (development only)
│   │   │   ├── EffectorPreviewOverlay.tsx   # Overlay for effector previews (visualizes effector placement/effects) ****** lets move forward with this.
│   │   │   ├── ToolPreviewOverlay.tsx       # Overlay for tool previews (shows tool effect preview)
│   │   │   └── ColinPreviewOverlay.tsx      # Overlay for Colin entity preview (shows Colin placement preview)
│   │   └── ...others                           # Other effects (expand as needed) (recommended for scalable, type-specific visuals)
│   ├── interact/
│   │   ├── move/                                # Move interaction tool module
│   │   │   ├── MoveOverlay.ts                   # Visual overlay for move tool (shows move area/feedback)
│   │   │   ├── MoveTool.ts                      # Logic for move tool (handles entity movement)
│   │   │   ├── MoveVisual.tsx                   # React component for move tool visuals
│   │   │   └── index.ts                         # Entry point for move tool module
│   │   ├── preview/                             # Preview interaction tool module
│   │   │   ├── PlacementPreview.md              # Documentation for placement preview logic/UI
│   │   │   ├── PreviewTool.ts                   # Logic for preview tool (handles entity placement preview)
│   │   │   └── index.ts                         # Entry point for preview tool module
│   │   ├── delete/                              # Delete interaction tool module
│   │   │   ├── DeleteTool.ts                    # Logic for delete tool (handles entity deletion)
│   │   │   ├── DeleteVisual.tsx                 # React component for delete tool visuals
│   │   │   ├── DeleteTool.md                    # Documentation for delete tool logic/UI
│   │   └── ...others                            # Other interaction tools (expand as needed)
│   ├── registry.ts               # Central registry for entities, effectors, and tools (game layer only; engine/content must not import)
│   └── README.md                 # Registry boundaries, onboarding, extensibility
├── game/
│   ├── playground/
│   │   ├── main.tsx                     # Entry for playground.html
│   │   ├── PlaygroundControlPanel.tsx   # Depreciated UI control panel
│   │   ├── PlaygroundScene.tsx          # Main playground scene
│   │   ├── components/                  # Playground components
│   │   │   ├── BurstOverlay.tsx             #  Overlay visual to display effector information such as type, position, radius, power, cooldown, etc. - depreciate
│   │   │   ├── PlanetPreviewOverlay.tsx     # Planet preview overlay component (shows planet placement preview)
│   │   │   ├── PlaygroundControlPanel.tsx   # Control panel UI (main playground controls)
│   │   │   ├── PlaygroundCanvas.tsx         # Main canvas for rendering playground visuals, entity overlays, and interactive effects
│   │   │   ├── DevOverlay.tsx               # Dev overlay for engine tick and effect queue debugging (development only)
│   │   │   ├── EffectorPreviewOverlay.tsx   # Overlay for effector previews (visualizes effector placement/effects) ****** lets move forward with this.
│   │   │   ├── ToolPreviewOverlay.tsx       # Overlay for tool previews (shows tool effect preview)
│   │   │   ├── ColinPreviewOverlay.tsx      # Overlay for Colin entity preview (shows Colin placement preview)
│   │   ├── tools/                          # Playground tool handlers
│   │   │   ├── DeleteToolHandler.ts         # Handler for delete tool actions in playground
│   │   │   ├── hooks/
│   │   │   │   ├── physics/
│   │   │   │   │   ├── useBurst.ts
│   │   │   │   │   ├── usePhysics.ts
│   │   │   │   ├── effects/
│   │   │   │   │   ├── useEffects.ts
│   │   │   │   ├── engine/
│   │   │   │   │   ├── useEngine.ts
│   │   │   │   ├── entity/
│   │   │   │   │   ├── useEntityManager.ts
│   │   │   │   ├── preview/
│   │   │   │   │   ├── usePreview.ts
│   │   │   │   ├── placement/
│   │   │   │   │   ├── useEntityPlacement.ts
│   │   │   │   │   ├── usePlanetPlacement.ts
│   │   │   │   │   ├── useColin.ts
│   │   │   │   ├── deletion/
│   │   │   │   │   ├── useEntityDeletion.ts
│   │   │   │   ├── overlays/
│   │   │   │   │   ├── useOverlayManager.ts
│   │   │   │   ├── toolSelection/
│   │   │   │   │   ├── useToolSelection.ts
│   │   │   │   ├── utils/
│   │   │   │   │   ├── useHoldToGrow.ts
│   │   │   │   │   ├── pointerUtils.ts
│   │   │   │   │   └── ...other utils
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── useEntityPlacement.test.ts
│   │   │   │   │   ├── usePlanetPlacement.test.ts
│   │   │   │   │   ├── useColin.test.ts
│   │   │   │   │   ├── useEntityDeletion.test.ts
│   │   │   │   │   ├── useOverlayManager.test.ts
│   │   │   │   │   ├── useToolSelection.test.ts
│   │   │   │   │   └── ...other hook tests
│   │   │   │   ├── index.ts                # Barrel export for all hooks
│   │   │   │   ├── README.md               # Documentation for hooks, onboarding, unified pointer abstraction
│   ├── context/
│   │   ├── EffectContext.tsx            # Effect context provider (engine state only)
│   │   ├── EngineContext.tsx            # Engine context provider (engine state only)
│   │   ├── README.md                    # Onboarding notes, context isolation pattern, code review checklist
│   ├── registry/
│   │   └── ToolRegistry.ts              # Tool registry
│   ├── utils/
    │   ├── random.ts
    │   ├── color.ts
    │   ├── index.ts                  # Barrel export for all utility modules
    │   ├── README.md                 # Utility boundaries, onboarding, checklist
    │   ├── math.ts
    │   ├── physicsHelpers.ts
    │   └── __tests__/
    │       └── utils.test.ts         # Unit tests for all utility modules
    │   │   ├── README.md                    # Onboarding notes, context isolation pattern, code review checklist
│   ├── spaceshipGame/                   # Spaceship game logic
│   ├── asteroidGame/                    # Asteroid game logic
│   └── ...others                        # Other games
├── ui/
│   ├── audio/                                 # Audio components (future expansion)
│   ├── components/                            # UI components
│   │   ├── PowerSlider.tsx                    # Neon-styled slider
│   │   ├── TabCard.tsx                        # Tab card UI
│   │   ├── TabCardSlider.tsx                  # Tab card with slider
│   │   ├── UniversalButton.tsx                # Neon button
│   │   ├── Utilities.tsx                      # Shared utilities
│   │   ├── Tabs/                              # Tab UI components
│   │   │   ├── TabPanel.tsx                   # Tab panel component
│   │   │   ├── Tab.tsx                        # Tab component
│   │   │   ├── TabsList.tsx                   # Tabs list component
│   │   │   └── Tabs.tsx                       # Main tabs component
│   ├── debug/                                 # Debug UI
│   │   ├── EntityDebugOverlay.tsx             # Overlay for entity debugging
│   ├── icons/                                 # Icon components
│   │   ├── UndoIcon.tsx                       # Undo icon
│   │   ├── content/                           # Icon content (subfolders for effectors, interact, entity, etc.)
│   │   │   ├── effectors/                     # Effector icons (BurstIcon, RippleIcon, GravityIcon, etc.)
│   │   │   ├── interact/                      # Interaction tool icons (MoveIcon, UndoIcon, etc.)
│   │   │   ├── entity/                        # Entity icons (ColinIcon, PlanetIcon, etc.)
│   └── ...others                              # Other UI components (expand as needed)
├── styles/
│   ├── colors.ts                            # Neon color palettes (main color tokens)
│   ├── fonts.css                            # Font styles (typography and font-face)
│   ├── glows.ts                             # Glow presets (neon glow effects)
│   ├── neonThemes.ts                        # Neon theme tokens (theme definitions)
│   ├── tokens.ts                            # Shared tokens (spacing, sizing, etc.)
│   └── sharedPrimitives/                    # Shared style primitives
│       └── clickableSurface.ts              # Primitive for clickable surfaces (button, card, etc.)
├── app.tsx                                  # App root (mounts PlaygroundScene)
├── main.tsx                                 # Entry for index.html (mounts App)
├── game/playground/main.tsx                 # Entry for playground scene (mounts PlaygroundScene)
├── game/playground/PlaygroundScene.tsx      # Main playground scene component
├── game/playground/PlaygroundControlPanel_DELTE.tsx # Deprecated playground control panel (to be deleted)
├── game/playground/startPlayground.tsx      # Playground startup logic
├── index.html                               # Main HTML entry
├── package.json                             # Project dependencies
├── tsconfig.json                            # TypeScript config
├── tsconfig.node.json                       # Node TypeScript config
├── vite.config.ts                           # Vite config
└── README.md                                # Project documentation

Guidelines/                             # Reference docs, blueprints, datasheets, starters
    # See subfolders for game design, vision, entity blueprints, datasheets, starter prompts, etc.
    # No need to drill down here for architecture map.