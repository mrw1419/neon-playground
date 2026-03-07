─────────────────────────────────────────────
NEON PLAYGROUND – MOTHER OF ALL REWIRING BLUEPRINT
Architecture-Aligned • Detangle-Informed • Registry-Driven • Sandbox-Centric
─────────────────────────────────────────────

PURPOSE
-------
The Playground is the canonical sandbox test game.
It validates:
- Engine modularity
- Registry integrity
- Hook orchestration purity
- Layer rendering separation
- Overlay architecture
- Future behavior system integration

If it works here, it is safe to reuse in other games.

The Playground is NOT a dumping ground.
It is a controlled integration laboratory.


═════════════════════════════════════════════
PHASE 0 – ARCHITECTURAL INTEGRITY CHECK
═════════════════════════════════════════════


--- DOMAIN BOUNDARIES ---
[X] Engine knows only physics, entities, systems, tick loop (never React/content/registry/tool logic)
[X] Content knows only entity/effect classes and visuals (never game/engine mutation logic)
[X] Game orchestrates via hooks and renders layers (only layer importing registry)
[X] Registry is single source of truth for content types

--- STRUCTURE & FILES ---
[X] All referenced folders/files exist: overlays/, variants/, ParentTypes/, registry.ts, etc.
      → Action: Check folder/file structure against Game Architecture Map
[X] Documentation files (README.md) are present and up-to-date in major folders
      → Action: Review and update README.md in engine, content, game, registry

--- OVERLAY SEPARATION ---
[X] Clear separation between overlays: visual effects, info overlays, preview overlays
      → Action: Confirm overlays/ folders and barrel exports (index.ts) for each overlay type

--- REGISTRY ANCHORING ---
[X] Centralized registry files for each major content type (entities, effectors, planets, etc.)
[X] All canonical registry files are statically imported at startup
      → Action: Review imports in game layer and registry.ts
[X] Only one canonical RadialEffectorVisual is registered
      → Action: Check registry and effect visuals for duplicates

--- LAYER ENFORCEMENT ---
[X] Engine layer has no React/content/registry/tool imports
[X] Content layer has no game/engine mutation logic
[X] Game layer is the ONLY layer importing registry

--- LESSON ---
Architecture violations compound silently. Fix boundaries before wiring features.


═════════════════════════════════════════════
PHASE 1 – PLAYGROUND AS COMPOSITION ROOT
═════════════════════════════════════════════

File: src/game/playground/PlaygroundScene.tsx

[X] PlaygroundScene is composition root only
[X] No entity classes imported
[X] No content visuals imported
[X] No direct engine mutation logic inside component body

[X] Confirm overlays are separated: visual effects ≠ info overlays, preview overlays ≠ info overlays
[X] Confirm registry is statically imported and used as single source of truth
[X] Confirm README.md is present and describes boundaries for PlaygroundScene

[X] Wrap children with:
      <EngineContext.Provider>
      <EffectContext.Provider>

[X] Implement and add PlaygroundErrorBoundary around children

[X] Confirm canvasRef exists (rendering surface anchor)

[X] Log engine tick + effect queue during development (via DevOverlay component)

Lesson:
PlaygroundScene wires systems together.
It does NOT implement systems.


═════════════════════════════════════════════
PHASE 2 – ENGINE & EFFECT INITIALIZATION
═════════════════════════════════════════════

[X] Initialize engine through EngineContext
[X] Start requestAnimationFrame loop
[X] Step physics engine every frame
[X] Initialize effectSystem via EffectContext
[X] Verify engine tick increments
[X] Verify effect queue updates when burst triggered

[X] Confirm engine layer has no React/content/registry/tool imports
[X] Confirm content layer has no game/engine mutation logic
[X] Confirm effectSystem is statically anchored and documented

[X] DO NOT:
      - Attach visuals here
      - Instantiate entity classes directly
      - Reference registry here

Lesson:
Engine runs independently of React.
React observes it.


═════════════════════════════════════════════
PHASE 3 – REGISTRY-DRIVEN ENTITY SPAWNING
═════════════════════════════════════════════

Registry location:
src/content/registry.ts


[X] Confirm registry structure:
[X] registry.entityTypes[type].class
[X] registry.entityTypes[type].visual
[X] registry.effectorTypes[type].visual

[X] Confirm registry file exists and is up-to-date
[X] Confirm all entity/effect types are statically imported
[X] Confirm only one canonical RadialEffectorVisual is registered
[X] Confirm overlays and visual boundaries are documented

[X] Review registry onboarding documentation (README.md, comments, datasheets)

[X] NEVER pass plain objects to engine.spawnEntity
[X] Always use canonical class from registry
[X] Example:
      const PlanetClass = registry.entityTypes.planet.class;
      const planet = new PlanetClass(config);
      engine.spawnEntity("planet", planet);

[X] Validate all entities spawned via canonical classes
[X] Add test or code review step to ensure no direct object construction

[X] Add integration test for registry lookups (e.g., src/content/__tests__/registry.test.ts)
[X] Test that all registry entries are valid and statically imported

Lesson:
Registry is law.
All entity construction flows through it.


═════════════════════════════════════════════
PHASE 4 – INITIAL SANDBOX LAYOUT
═════════════════════════════════════════════


[X] On game load:
[X] Spawn N random planets
[X] Use weighted planet generator utility (see src/content/entity/planet/weightedRandomPlanet.ts)
[X] Assign planet properties:
[X] position (center + offsets)
[X] radius
[X] colorTheme
[X] mass
[X] Validate planet properties after spawn
[X] Attach to engine using registry-driven class instantiation
[X] Example:
      const PlanetClass = registry.entityTypes.planet.class;
      const planet = new PlanetClass(config);
      engine.spawnEntity("planet", planet);
[X] Confirm:
[X] Gravity works
[X] Collisions work
[X] Burst effector affects entities
[X] Add automated test for gravity/collision/burst effects (e.g., in src/game/playground/__tests__/)
[X] DO NOT:
[X] Add orbit behavior yet
[X] Add follow behavior yet

Lesson:
Sandbox proves physics before behaviors exist.


═════════════════════════════════════════════
PHASE 5 – HOOK ORCHESTRATION LAYER
═════════════════════════════════════════════

[X] All hooks live in src/game/playground/hooks/
[X] Review hook onboarding documentation (README.md, comments, code examples)
[X] useToolSelection
[X] useEntityPlacement (generic)
[X] useColin
[X] useEntityDeletion
[X] useOverlayManager
[X] No simulation math inside hook
[X] No entity instantiation inside hook
[X] No registry logic inside hook
[X] Only calls engine.spawnEntity/removeEntity/etc.
[X] Never mutate simulation directly (e.g., do not modify entity properties or engine state outside public API)
[X] Example allowed: engine.spawnEntity('planet', planet)
[X] Example disallowed: planet.position.x = 100
[X] Add code review or automated test to enforce hook purity (e.g., lint rule or test case)
      Example allowed: engine.spawnEntity('planet', planet)
      Example disallowed: planet.position.x = 100
[X] Abstract input handling in hooks to support both mouse and touch events
      - [X] Audit all playground hooks for input handling logic
      - [ ] Refactor hooks to use unified pointer abstraction (mouse/touch)
            - [X] Refactor hooks to use unified pointer abstraction (mouse/touch)
                - [x] useBurst /hooks/physics/
                - [x] useEffects /hooks/effects/
                - [x] useEngine /hooks/engine/
                - [x] useEntityManager /entity/
                - [x] usePhysics /hooks/physics/
                - [x] usePreview /preview/
                - [X] useEntityPlacement
                - [x] usePlanetPlacement
                - [X] useColin
                - [x] useEntityDeletion
                - [x] useOverlayManager
                - [x] useToolSelection
[X] Barrel file for the hooks
[X] Create README file for the hooks utilities and the hooks folder. Included useful future hook utilities.
[X] Validate integration in PlaygroundScene and layer components. Including control panel.
[FUTURE] Add code review and automated tests to enforce hook purity and verify hook input handling (mouse/touch)

Lesson:
Hooks coordinate.
Engine simulates.

- Hooks must remain pure: no simulation math, entity instantiation, or registry logic inside hooks.
- All input handling (mouse/touch) should be abstracted for extensibility and device compatibility.
- Barrel file imports simplify onboarding and maintenance as hook count grows.
- Automated tests and code review enforce architectural boundaries and functional correctness.
- Documentation and onboarding are essential for maintainability and future extensibility.


═════════════════════════════════════════════
PHASE 6 – LAYERED RENDERING SYSTEM
═════════════════════════════════════════════

Location:
src/game/playground/components/


Layers render only.
No mutation allowed.

Expanded Checklist:
[X] All layers are stateless, pure render components
[X] Registry is the only source for visual resolution in EntityLayer/EffectLayer
[X] No mutation or side effects in any layer
[X] OverlayLayer renders overlays only, does not manage state
[X] PlaygroundCanvas is the sole engine render anchor

[X] PlaygroundCanvas (engine render surface anchor)

[X] EntityLayer
      - Iterates engine.getEntities()
      - Resolves visual via registry
      - Renders visual component only

[X] EffectLayer
      - Iterates active effects
      - Uses canonical RadialEffectorVisual
      - No duplicate radial visuals registered

[X] OverlayLayer
      - Renders EntityInfoOverlayVisual
      - Renders EffectorInfoOverlayVisual
      - Renders preview overlays
      - Pure UI only

[X] ControlPanel
      - Tool selection only
      - No engine mutation

[ ] Ensure rendering layers handle both mouse and touch input for overlays and canvas interactions
    [X] Audit all layer components (EntityLayer, EffectLayer, OverlayLayer, PlaygroundCanvas) for input handling.
[X] Identify where overlays and canvas interactions currently use mouse events.
      [X] Refactor input logic to use unified pointer abstraction (mouse/touch) via shared utilities (e.g., pointerUtils).
      [X] Ensure overlays respond to both mouse and touch events for preview, info, and placement actions.
      [FUTURE] Add or update automated tests to verify overlays and canvas interactions work with both input types.
      [X] Document input handling patterns in the layer/component README for onboarding and maintainability.

Lesson:
Layers project state.
They do not create it.


═════════════════════════════════════════════
PHASE 7 – PREVIEW & INFO OVERLAYS
═════════════════════════════════════════════

Folder target:
src/content/effects/infoOverlay/


[X] Move info overlays into canonical folder (src/content/effects/infoOverlay/)
[X] Create barrel exports (index.ts)

Preview overlays:
      - PlacementPreviewTool (modular logic exists)
      - Explicit visual components for Planet, Colin, Effector, Tool overlays recommended for extensibility
      - Mouse leave/hide logic will be handled by behavior system (future step)
      - Overlay visibility tied to tool activity (handled by behavior system)

Info overlays:
      - EntityInfoOverlayVisual and EffectorInfoOverlayVisual are pre-ready for behavior system integration (stateless, pure, props-driven)
      - If behavior system requires additional props or state, revisit overlays for extension

Checklist:
[X] Preview overlays follow cursor only
[X] Info overlays display diagnostics only
[X] No engine mutation in any overlay
[X] Show overlays only when tool active (handled by behavior system)
[X] Preview overlays are wired to live hook state (position, radius, active, tool/entity/effector selection)
[X] OverlayLayer dynamically resolves overlays via registry for extensibility
[X] Remove placeholder demo values from OverlayLayer; use real state from hooks
[X] Previews hide and placement is disabled when the pointer is over the control panel

Overlay Checklist Additions:
[X] Confirm each preview overlay is mapped to its corresponding tabCard/tool in PlaygroundControlPanel
[~] Document overlay-to-tool mapping in playground/components/README.md for clarity (in progress)
[X] Ensure overlays are stateless, pure, and only visible when their tool/tabCard is active
[ ] If generic overlays are adopted, update registry and checklist to reflect new structure (future)

Note: Info overlays are ready for behavior system integration. Preview overlays will require explicit visual components and mouse leave logic as behavior system is implemented.

Rules:
[X] Preview overlays follow cursor/touch only
[X] Info overlays display diagnostics only
[X] No engine mutation in any overlay
[FUTURE] Hide preview on mouse leave (future/behavior system)
[X] Show overlays only when tool active (handled by behavior system)

[X] Add touch event support for overlays (preview/info overlays respond to touch as well as mouse)
      [X] Audit preview and info overlay components (e.g., PlacementPreviewTool, EntityInfoOverlayVisual, EffectorInfoOverlayVisual) for input event handling.
      [X] Identify where overlays currently respond to mouse events.
      [X] Refactor overlay input logic to use unified pointer abstraction (mouse/touch) via shared utilities (pointerUtils).
      [X] Ensure overlays update and hide/show correctly for both mouse and touch events.
      [FUTURE] Add or update automated tests to verify overlays respond to both input types.
      [X] Document overlay input handling patterns in overlay/component README for onboarding and maintainability.

Lesson:
Preview = intention.
Info = observation.
Never mix them.


═════════════════════════════════════════════
PHASE 8 – INTERACTION SEQUENCE
═════════════════════════════════════════════



Pointer/Touch Move:
[X] Update preview position (mouse/touch) – handled via unified pointer abstraction in hooks
[X] Update drag position (Move tool, mouse/touch) – handled via hooks and pointerUtils
[X] Update Colin target (placeholder logic only, mouse/touch) – handled via hooks

Pointer/Touch Click/Tap:
[X] Planet tab → spawn planet (mouse/touch) – handled via hooks
[X] Burst tab → apply radial impulse (mouse/touch) – handled via hooks
[X] Delete tool → remove entity (mouse/touch) – handled via hooks
[X] Colin tab → spawn colin entity (mouse/touch) – handled via hooks

[~] Implement hold-to-grow preview (mouse/touch) – planned for future behavior system
[~] Reset preview after placement (mouse/touch) – planned for future behavior system
[X] Add touch event support for placement actions (planet, burst, move, delete, Colin) – handled via unified pointer abstraction

Notes:
- All input handling is abstracted via pointerUtils and hooks for extensibility.
- Overlay components are display-only; hooks manage input and state.
- Hold-to-grow and preview reset logic will be integrated with the behavior system.
- Automated tests for input handling are planned for future.

Lesson:
Input triggers hooks.
Hooks trigger engine.
Engine updates.
Layers render.
Hold-to-grow preview: A new overlay is as simple as creating the component and registering it.


═════════════════════════════════════════════
PHASE 9 – BEHAVIOR SYSTEM INTEGRATION (FUTURE)
═════════════════════════════════════════════

Behavior blueprints:
/src/Guidelines/Blueprint/Behavior System
- FollowMouseBehavior
- OrbitBehavior
- FollowTargetBehavior
- WanderBehavior

[ ] Confirm sandbox works WITHOUT behaviors first
[ ] Design behaviors to support touch input (e.g., FollowTouchBehavior)

Future pattern:
engine.spawnEntity(type, {
    behaviors: [FollowMouseBehavior]
})

[ ] Behavior system lives in engine
[ ] Behavior definitions do not import React
[ ] Visuals remain registry-driven

Lesson:
Behaviors enhance entities.
They do not define architecture.


═════════════════════════════════════════════
PHASE 10 – SANDBOX VALIDATION CHECK
═════════════════════════════════════════════

[ ] Initial planets render
[ ] Physics interactions work
[ ] Burst affects entities
[ ] Manual placement works
[ ] Delete tool works
[ ] Move tool drag works
[ ] Preview overlays respond correctly
[ ] Info overlays show diagnostics
[ ] No React key warnings
[ ] No cross-layer import violations
[ ] Test overlays and placement actions on touch devices


Lesson:
A working sandbox is proof of modularity.


═════════════════════════════════════════════
CORE ARCHITECTURAL LAWS (NON-NEGOTIABLE)
═════════════════════════════════════════════

1. Engine never imports React or content.
2. Content never imports game.
3. Only game layer imports registry.
4. Only one canonical radial effector visual.
5. Hooks orchestrate, never simulate.
6. Layers render, never mutate.
7. Registry constructs all entities.
8. Playground is modular testbed for future games.

Break these, and spaghetti returns.


─────────────────────────────────────────────
END OF BLUEPRINT
─────────────────────────────────────────────
