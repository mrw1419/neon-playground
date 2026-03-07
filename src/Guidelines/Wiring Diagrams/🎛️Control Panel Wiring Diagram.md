# 💥 Control Panel Wiring Diagrams

# --------------------
# Emoji [Filename] Reference (Grouped)
# --------------------

// --- UI & State ---
🎛️ [PlaygroundControlPanel.tsx] — Control panel UI, tab selection, event handlers
🖱️ [PlaygroundControlPanel.tsx] — onClick handlers for tab/effect/object selection
🎯 [PlaygroundControlPanel.tsx] — setSelectedEffect handler
🟢 [PlaygroundControlPanel.tsx] — setSelectedObject handler
🎮 [PlaygroundScene.tsx] — Main game scene, state management, prop passing
🖼️ [PlaygroundCanvas.tsx] — Canvas for pointer events
🟦 [entityStore.ts] — Entity state update
🧩 [EntityLayer.tsx] — Entity rendering
🟣 [PlaygroundControlPanel.tsx] — Planet TabCard (legacy/planet flow)
🌱 [useHoldToGrow.ts] — Hold-to-grow preview logic
🪐 [usePlanetPlacement.ts] — Planet placement logic

// --- Overlay & Info ---
👁️ [OverlayLayer.tsx] — Renders overlays and previews
👓 [EffectorPreviewOverlay.tsx] — Shared preview overlay for all radial effectors
🧾 [EffectorInfoOverlayVisual.tsx] — Canonical overlay for displaying effector diagnostics/info

// --- Effectors & Visuals ---
🧰 [useRadialEffector.ts] — Generic hook for all radial effectors (registry-driven, replaces useBurst/useRipple/etc)
💥 [useBurst.ts] — (deprecated, replaced by 🧰)
✨ [BurstEffectorVisual.tsx] — Burst effect rendering
🌀 [RippleEffectorVisual.tsx] — Ripple effect rendering
🟫 [TrailEffectorVisual.tsx] — Trail effect rendering
🧲 [GravityEffectorVisual.tsx] — Gravity effect rendering

// --- Stores & Registry ---
🟧 [effectStore.ts] — Effector store for all active/animated effects (bursts, ripples, overlays, etc.)
🟪 [effectorStore.ts] — Store for effector tool state (selected effector, preview, settings, etc.)
🗃️ [registry.ts] — Central registry for all effectors, visuals, overlays, configs
🗂️ [RadialEffectorRegistry.ts] — Registry/config for all radial effectors (burst, ripple, trail, gravity, etc.)
⚡ [effectSystem.ts, engine.ts] — Effect application logic


# --------------------
# Control Panel Wiring - Basic Flow
# --------------------

🖱️ [PlaygroundControlPanel.tsx] user interaction (click, change, tab, pointer)
    ↓
🟢 [PlaygroundControlPanel.tsx] handler fired (onClick/onChange/onTabChange)
    ↓
🔄 [PlaygroundControlPanel.tsx] state setter called (setSelectedEffect/setSelectedObject/setSelectedInteract/setActiveTab/setPointerOverPanel)
    ↓
🟢 [PlaygroundScene.tsx] state updated
    ↓
🟢 [PlaygroundScene.tsx] re-rendered
    ↓
🟢 [PlaygroundControlPanel.tsx] reflects new state


# --------------------
# Radial Effector Wiring Flow (Registry-Driven, Extensible)
# --------------------

[🎛️ PlaygroundControlPanel.tsx] loops over effectorTypes in [registry.ts] (burst, ripple, trail, gravity, ...)
    ↓
[🖱️ PlaygroundControlPanel.tsx] TabCard onClick (Effector selected)
    ↓
[🎯 PlaygroundControlPanel.tsx] setSelectedEffect('burst' | 'ripple' | 'trail' | 'gravity' | ...)
    ↓
[🎮 PlaygroundScene.tsx] selectedEffect prop
    ↓
    ├─ [👁️ OverlayLayer.tsx] uses useUnit($entities) and useUnit($effectorPreview) for overlays (fully reactive)
    │     ↓
    │   [EffectorPreviewOverlay] (shared preview overlay for all radial effectors)
    │
    └─ [🖼️ PlaygroundCanvas.tsx] pointerDown/pointerUp
        ↓
    [🧰 useRadialEffector.ts] (generic, registry-driven effect trigger for all effectors)
        ↓
    [🟧 effectStore.ts] add effect instance (Effector store, supports multiple effects)
        ↓
    [✨ BurstEffectorVisual.tsx / RippleEffectorVisual.tsx / TrailEffectorVisual.tsx / GravityEffectorVisual.tsx]
        (renders effect(s) based on type, reads from effectStore, visual from registry)
        ↓
    [⚡ effectorSystem.ts, engine.ts] applies effect logic (physics, etc.)
        ↓
    [🟦 entityStore.ts] (entity state update if needed)
        ↓
    [🧩 EntityLayer.tsx] (entity rendering, fully reactive)

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

---

# Registry/Config Note (NEW)

- [registry.ts] is the single source of truth for all effector types, visuals, overlays, and configs used in the game layer and UI.
- [RadialEffectorRegistry.ts] can be looped or referenced by [registry.ts] to provide scaling tiers, base configs, and variant data for all radial effectors (burst, ripple, trail, gravity, etc.).
- Adding a new radial effector is as simple as updating the registry and providing a visual/config.

---

# Overlay Reactivity Note (NEW)

- OverlayLayer.tsx now uses useUnit($entities) and other Effector stores for overlays and info panels.
- engine.getEntities() now returns a new array of shallow-copied entity objects every tick, ensuring overlays and visuals update in real time.
- All overlays (e.g., EntityInfoOverlayVisual) are fully reactive to entity state and follow moving entities without lag.
- This pattern applies to all future overlays and effectors: always use Effector stores for state, and ensure new references are returned for reactivity.

---

# --------------------
# Planet Placing Wiring Flow
# --------------------

# Context: This section maps the full wiring for placing a planet, from UI selection to entity creation and rendering. Each step uses the emoji [Filename] context format for clarity.

[🟣 PlaygroundControlPanel.tsx] Planet TabCard
    ↓
[🖱️ PlaygroundControlPanel.tsx] onClick (Planet selected)
    ↓
[🟢 PlaygroundControlPanel.tsx] setSelectedObject('Planet')
    ↓
[🎮 PlaygroundScene.tsx] selectedObject prop
    ↓
[🖼️ PlaygroundCanvas.tsx] pointerDown / pointerMove / pointerUp
    ↓
    ├─ [🌱 useHoldToGrow.ts] pointerDown → start (preview grows)
    │     ↓
    │   [👁️ OverlayLayer.tsx] (preview grows)
    │
    ├─ [🌱 useHoldToGrow.ts] pointerMove → update (preview moves)
    │     ↓
    │   [👁️ OverlayLayer.tsx] (preview moves)
    │
    └─ [🌱 useHoldToGrow.ts] pointerUp → stop
          ↓
      [🪐 usePlanetPlacement.ts] (spawn planet)
          ↓
      [🧩 EntityLayer.tsx] (planet rendered)

---

