# Entity Wiring Diagrams 3.2.2026

## Purpose
Map out the flow of entity logic in Neon Playground, including how entities are created, managed, and rendered. Use this file to plan, troubleshoot, and document entity-related wiring and log keys.


- Show how hooks (useInitialRandomPlanets, usePlanetPlacement, useEntityManager) interact with entity logic.
- Add logs for entity creation, removal, rendering, and registry lookup.
- Cross-reference Physics Wiring Diagrams.md for how entity positions and velocities are updated by physics.

# Emoji [Filename] Reference

## 🪐 Emoji [Filename] Reference (Grouped)

### 🪝 Hooks
- 🌱 useInitialRandomPlanets.ts — Creates initial planet entities
    └─ 🟢 generateRandomPlanetVisuals.ts — Locks in all random visual properties (colorTheme, overlays, craters) at creation
- 🌍 usePlanetPlacement.ts — Handles planet placement logic
    └─ 🟢 generateRandomPlanetVisuals.ts — Used for new planets placed after game start
- 🧑‍💻 useEntityManager.ts — Manages entity lifecycle/state

### 🧩 Engine/Core
- 🛠️ startPlayground.tsx — Engine/context initialization
- 🧠 EngineContext.tsx — Provides engine via React context
- 🧩 PlaygroundScene.tsx — Scene logic, receives engine from context
- 🪐 PlaygroundScene.tsx — Scene logic, entity creation, engine loop
- 🧹 PlaygroundScene.tsx — Clears old entities
- ✨🪐 engine.ts — Spawns entities
- 🧩🪐 PlaygroundScene.tsx — Logs entities after spawn
- 🟢 engine.ts — Starts engine loop
- 🔄 engine.ts — Engine tick loop, updates entities

### 🖼️ Rendering
- 🔎 EntityLayer.tsx — Receives entities, logs keys
- 🖼️ EntityLayer.tsx — Renders entity visuals

### 🎨 Visuals/Overlays
- 🟣 PlanetVisual.tsx — Renders planet visuals
- 🟠 CratersOverlayVisual.tsx — Renders craters/overlays
- 🧩 OverlayLayer.tsx — Overlay logic, receives entities
- 🔎 OverlayLayer.tsx — Filters entities for overlays
- 🪐 EntityInfoOverlayVisual.tsx — Renders info overlays
- 🔍 EntityInfoOverlayVisual.tsx — Logs entity details for overlays
- 🚫 EntityInfoOverlayVisual.tsx — Logs when no overlays rendered

# --------------------
# 🪐 Grand Entity & Engine Flow (Updated for Effector Store Reactivity)
# --------------------

# Note: OverlayLayer and overlays (e.g., EntityInfoOverlayVisual) now use useUnit($entities) from Effector, not engine.getEntities(), for full reactivity.
# engine.getEntities() now returns a new array of shallow-copied entity objects every tick, ensuring overlays and visuals update in real time.
# All overlays and info panels are now fully reactive to Effector stores, not just EntityLayer.
# The flow for overlays is: setEntities → $entities → OverlayLayer → EntityInfoOverlayVisual.
# This pattern applies to all overlays and future effectors: always use Effector stores for state, and ensure new references are returned for reactivity.
#
# Gravity and all effectors (burst, ripple, trail, gravity, etc.) are handled by the physics engine and effector system. All entity types with physics bodies are supported. Gravity is applied every tick by the physics engine, and effectors (including ripple) are processed by the effector system and applied to entities as appropriate. Logs for gravity, ripple, and other effectors should appear in the physics and effector logs, confirming their effect on entities.

[🛠️ startPlayground.tsx] // Engine is initialized and provided via context
    ↓
[🧠 EngineContext.tsx] // useEngineContext grabs engine from React context
    ↓
[🧩 PlaygroundScene.tsx] // Engine received from context, logs engine object
    ↓
🌱 useInitialRandomPlanets.ts // useInitialRandomPlanets hook creates initial planet entities
    └─ 🟢 generateRandomPlanetVisuals.ts // Generates and locks in all random visual properties (colorTheme, overlays, craters) for each planet at creation
    ↓
🌍 usePlanetPlacement.ts // usePlanetPlacement hook (if used) manages planet placement logic
    └─ 🟢 generateRandomPlanetVisuals.ts // Also used here for new planets placed after game start
    ↓
[🧑‍💻 useEntityManager.ts] // useEntityManager hook (if used) manages entity lifecycle and state
    ↓
[🧹 PlaygroundScene.tsx] // Old planet entities cleared from engine
    ↓
[✨🪐 engine.ts] // engine.spawnEntity called for each new planet
    ↓
[🧩🪐 PlaygroundScene.tsx] // Entities after spawn logged for diagnostics
    ↓
[🟢 engine.ts] // engine.startLoop called, engine tick loop begins
    ↓
[🔄 engine.ts] // Each tick: engine updates entities, physics, visuals
    ↓
[🟦 entityStore.ts] // setEntities called: Effector entity store updated with latest entities (new array/objects)
    ↓
[👁️ OverlayLayer.tsx] // OverlayLayer and overlays subscribe to $entities (fully reactive)
    ↓
[🪐 EntityInfoOverlayVisual.tsx] // Info overlays rendered with updated position (fully reactive)
    ↓
[🔎 EntityLayer.tsx] // EntityLayer subscribes to entity store, logs keys
    ↓
[🖼️ EntityLayer.tsx] // EntityLayer renders visuals for each entity



# --------------------
# 🪐 Entity Rendering Pipeline > Planet
# --------------------

# Context: This pipeline details the step-by-step flow for rendering a planet entity, from EntityLayer mounting, registry lookup, and passing props, down to the visual overlays and effects. Each step includes the filename and a brief comment for clarity.


[🪐 EntityLayer.tsx] // Mounted: EntityLayer component is loaded and ready to render entities
    ↓
[🧑‍💻 useEntityManager.ts] // useEntityManager hook (if used) manages entity state for rendering
    ↓
[🪐 EntityLayer.tsx] // Rendering. Entities: EntityLayer asks the engine for the current list of entities to show
    ↓
[🪐 EntityLayer.tsx] // Entity: Each entity is checked and logged before rendering
    ↓
[🪐 EntityLayer.tsx] // Registry entry for type: Look up the right visual component for each entity type (planet, colin, etc.)
    ↓
🪐 EntityLayer.tsx // Rendering PlanetVisual with props: Pass colorTheme, overlays, craters, and position to PlanetVisual (all locked in at entity creation)
    ↓
🟣 PlanetVisual.tsx
    // Mounted with props: PlanetVisual component is loaded with the given props
    // Render for planet: PlanetVisual draws the planet using the props (colorTheme, radius, overlays, craters, etc.)
    // No randomization: All visual properties are persistent, set at entity creation
    // Rendering crater overlays with theme: If overlays like craters are needed, draws them using theme colors and locked-in crater data
    ↓
[🟠 CratersOverlayVisual.tsx] // Rendered with props: CratersOverlayVisual draws the craters on the planet using the given props

# --------------------

# 🟣 Visual Details & Effects > Planet
# --------------------

# Context: This section focuses on the visual effects and overlays for planet entities, showing how PlanetVisual and CratersOverlayVisual coordinate to render detailed features like craters and highlights. Each step includes the filename and a brief comment for clarity.

[🟣 PlanetVisual Rendering crater overlays with theme]
    ↓   // PlanetVisual decides if overlays like craters should be drawn, and picks the right theme colors.
[🟠 CratersOverlayVisual Rendered with props]
    ↓   // CratersOverlayVisual draws each crater using the props (color, position, radius, etc.).
[🟠 CratersOverlayVisual Rendered crescent highlight]
    // If enabled, CratersOverlayVisual adds a crescent highlight for extra visual detail.

// You can add more steps here for other effects (auras, cracks, effector visuals, etc.) as your game grows.

# --------------------

# 🧩 Entity Overlay & Info Overlay Flow (Updated)
# --------------------

# Note: OverlayLayer now uses useUnit($entities) for overlays, not engine.getEntities().
# All overlays and info panels are fully reactive to Effector stores and update in real time as entities move or change.

[🧩 OverlayLayer Entities from $entities]
    ↓   // OverlayLayer gets the current entities from the Effector store ($entities).
[🧩 OverlayLayer All entities]
    ↓   // Logs all entities so we can see what's available for overlays.
[🔎 OverlayLayer Filtered entities for info overlay]
    ↓   // Filters entities to find just the planets that should show info overlays.
    ├─→ [🪐 EntityInfoOverlayVisual Rendering overlay. Entities]
    │       ↓   // If there are entities to show, EntityInfoOverlayVisual renders overlays for them.
    │   [🔍 EntityInfoOverlayVisual Entity #i]
    │       // For each entity, logs its details before rendering the overlay box.
    │
    └─→ [🚫 EntityInfoOverlayVisual No entities to display overlay for]
            // If there are no entities to show overlays for, logs that nothing will be rendered.

---

# Burst Effector/Physics/Overlay Wiring (2026)

```mermaid
flowchart TD
    subgraph UI
      A[PlaygroundControlPanel.tsx<br/>TabCard click] --> B[setSelectedEffect]
      B --> C[PlaygroundScene.tsx<br/>selectedEffect prop]
      C --> D[PlaygroundCanvas.tsx<br/>pointerDown]
      D --> E[useRadialEffector.ts<br/>triggerEffector]
    end
    E --> F[effectStore.ts<br/>addEffect]
    F --> G[EffectorVisuals<br/>(Burst, Ripple, Trail, Gravity)]
    E --> H[effectorSystem.ts<br/>enqueueBurst]
    H --> I[engine.ts<br/>engine tick]
    I --> J[physicsEngine.ts<br/>applyRadialImpulse]
    J --> K[entityStore.ts<br/>setEntities]
    K --> L[EntityLayer.tsx<br/>render entities]
    subgraph Overlays
      F --> M[OverlayLayer.tsx<br/>useUnit($effects)]
      M --> N[EffectorPreviewOverlay]
      M --> O[EffectorInfoOverlayVisual]
    end
    K --> M
    style F fill:#ffecb3
    style H fill:#b3e5fc
    style J fill:#c8e6c9
    style K fill:#ffe0b2
    style L fill:#d1c4e9
    style M fill:#f8bbd0
    style N fill:#f8bbd0
    style O fill:#f8bbd0
```

