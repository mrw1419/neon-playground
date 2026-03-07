

Neon Playground Game Blueprint 2.23.2026
─────────────────────────────────────────────

# ─────────────────────────────────────────────
# Folder / File Architecture
# ─────────────────────────────

src/
├── engine/
│   ├── engine.ts           # Core engine logic, entity management, physics integration
│   ├── physicsEngine.ts    # Matter.js wrapper, physics step, boundary logic
│   ├── renderer.ts         # (Optional) Custom rendering loop for visuals
│   ├── entity.ts           # BaseEntity class, lifecycle hooks
│   ├── entityFactory.ts    # Entity creation, upgrades
│   ├── effectorSystem.ts   # Core effector logic
│   └── utils.ts            # Math, random, collision helpers

├── content/
│   ├── entity/
│   │   ├── colin/
│   │   │   ├── ColinEntity.ts
│   │   │   └── ColinVisual.tsx
│   │   ├── planet/
│   │   │   ├── PlanetEntity.ts
│   │   │   ├── PlanetTypes.ts
│   │   │   ├── PlanetVisual.tsx
│   │   │   ├── variants/
│   │   │   └── overlays/
│   │   └── ...other entity folders

│   ├── effectors/
│   │   ├── Burst/
│   │   │   ├── BurstType.ts
│   │   │   ├── BurstVisual.tsx
│   │   ├── Gravity/
│   │   │   ├── GravityType.ts
│   │   │   ├── GravityVisual.tsx
│   │   ├── Ripple/
│   │   │   ├── RippleType.ts
│   │   │   ├── RippleVisual.tsx
│   │   ├── Nudge/
│   │   │   ├── NudgeType.ts
│   │   │   ├── NudgeVisual.tsx
│   │   └── ...other effector folders

│   └── interact/
│       ├── move/
│       │   ├── MoveTool.ts
│       │   ├── MoveVisual.tsx
│       ├── undo/
│       │   ├── UndoTool.ts
│       │   ├── UndoVisual.tsx
│       └── ...other tool folders

├── game/
│   ├── playground/
│   │   ├── startPlayground.ts      # Orchestrates engine, entities, effectors, tools
│   │   ├── PlaygroundScene.tsx     # Main scene logic, entity placement, UI integration
│   │   ├── PlaygroundControlPanel.tsx #unstable version and should get deleted
│   │   ├── components/
│   │   └── hooks/
│   ├── spaceshipGame/
│   ├── asteroidGame/
│   └── ...other game folders

├── ui/
│   ├── components/
│   ├── audio/
│   ├── icons/
│   └── debug/

├── styles/
│   ├── colors.ts
│   ├── glows.ts
│   ├── fonts.css
│   ├── neonThemes.ts
│   └── sharedPrimitives/

├── main.tsx                # Entry point for all games
├── app.tsx                 # Mounts the game scene
├── index.html              # Only HTML file
├── package.json
├── tsconfig.json
├── vite.config.ts


# ─────────────────────────────────────────────
# Neon Playground Game – Key Principles & Implementation
# ─────────────────────────────


## Architecture & Structure


   - All physics and entity logic is in `engine/` (core, reusable, no game-specific logic or visuals)
   - All engine modules (e.g., engine, physicsEngine) must export their public classes, types, and functions using `export` in TypeScript.
         - This ensures that game and content layers (like the playground game) can import and use these APIs to create, configure, and interact with physics bodies and entities.
         - Entities and effectors become interactable in the playground game by importing these exported engine/physicsEngine APIs, registering them via the registry/blueprint pattern, and instantiating their physics bodies through the engine layer.
         - If a game or content file cannot access a class or function from engine/physicsEngine, check that it is exported from its module.
   - Visuals and variants are in `content/entity/` and `content/effectors/`
   - Tools are in `content/interact/` (type + optional visual)
   - `PlaygroundScene.tsx` is the main orchestrator for the playground game
   - All entities with physics properties (e.g., position, radius) spawn with physics bodies and stick in place unless moved or affected by effectors.
         - This enables effectors like burst to interact with any entity type, not just planets.
   - All entities in the playground now have the ability to display EntityOverlayVisual overlays, providing real-time info and diagnostics for physics, status, and extensibility (see entityOverlay/EntityOverlayVisual).
   - Gravity is disabled in playground; boundary logic keeps planets in viewport
   - Burst tool and overlays are fully integrated
   - Debug overlays and logs are minimized for clean console
   - Standardized folder pattern: ParentType → Variants → Visual (entities & effectors)
   - Registry + Blueprint pattern enforced for all entities, effectors, and tools
   - Tools are simple: type + optional visual
   - Old Playground hooks removed; only keep truly reusable hooks

## Entry Points & Orchestration

- Single HTML entry: `index.html` → mounts `main.tsx`
- Single entry point per game module: `startPlayground.ts` (or future games)
- Scene modules orchestrate engine, entities, effectors, tools, and UI
- Lifecycle: `start → run → stop` explicitly defined; `stopPlayground()` cleans up

## React Integration & Context

- Use React context providers (EngineContext, EffectContext) to supply engine/effect state
- Wrap PlaygroundScene in EngineContext.Provider and EffectContextProvider
- Use hooks (`useEngineContext`, `useEffectContext`) inside scene/components
- Pass only required props (e.g., `canvasRef`) to PlaygroundScene

## Visuals & UI

 - On game load, planets are randomly placed on the canvas, each with randomized position and properties, to encourage playful exploration and emergent behaviors.
 - The planet preview uses the PlanetVisual component, showing the exact shape, color, and overlays of the planet that will be placed, wrapped in a high-contrast, accessible overlay for visibility.
 - All entities in the playground display EntityOverlayVisual overlays for real-time info and physics diagnostics.
 - All effectors in the playground display EffectorOverlayVisual overlays for real-time stats, tuning, and extensibility (see effectorOverlay/EffectorOverlayVisual).

## Code Quality & Maintenance

- Provide a cleanup function (stopPlayground) to unmount the root and stop the engine
- Use explicit start/run/stop phases for game modules
- Always use ES module imports (never `require`) in browser/React code
- Rename files to `.tsx` if using JSX
- Ensure context providers are imported and wrapped correctly
- Use error boundaries or console logs for debugging
- Organize folders by ParentType → Variants → Visual for entities/effectors
- Use barrel exports (`index.ts`) for icons/components

## Development & Troubleshooting

- If encountering persistent errors:
	- Delete `node_modules` and run `npm install` again
	- Clear Vite’s cache (`.vite`, `dist`)
	- Restart dev server (`npm run dev`)


## Component & Logic Patterns

### Adding New Effectors, Entities, or Interact Tools

Currently, each time you add a new effector, entity (object), or interact tool, you must manually integrate it into the selection logic and any related side effects:

- Add the new item to the relevant tab’s card list in the UI.
- Update helper setters or selection state if the new tool requires special handling (e.g., only one active at a time, or clearing other selections).
- If the new tool/entity/effector has unique spawn, preview, or removal logic (like Colin), update or add the corresponding React effects or handlers in `PlaygroundScene.tsx`.

This approach gives fine-grained control, but requires manual updates for each new tool or entity. For future scalability, consider refactoring to a more data-driven or registry-based system (see below), where new tools/entities register themselves and the UI/logic adapts automatically.

**Future Automation:**
- Implementing a registry/factory pattern for entities, effectors, and tools will allow for data-driven expansion and reduce manual integration work. New items could self-register and be picked up by the UI and orchestration logic automatically.


- Split large components into custom hooks (e.g., `useEngine`, `useColin`, `usePlanetPlacement`) for clarity and reusability
- Keep UI, engine, and entity logic separate
- Use specific types for state and refs (define interfaces for positions, entities, etc.)
- Avoid `any` for entity filtering; use proper type guards
- Abstract mouse event logic for extensibility (e.g., map of handlers by selected object/interact)
- Consider debouncing or throttling mouse move events for performance
- Stop the engine’s animation loop and detach the canvas/clean up resources as needed
- Handle window resize events to update the canvas size attribute for proper rendering
- Define constants (e.g., `minRadius`, `maxRadius`, `growRate`) at the top or in a config for easier tuning
- Implement undo/redo for improved usability
- Add unit tests for custom hooks and logic, and integration tests for the component

## Debug Messages Turned Off (2026-02-23)

**1. [PhysicsEngine] Gravity after init:**
    - File: src/engine/physicsEngine.ts (constructor)
    - Purpose: Logged gravity values (x, y, scale) after engine initialization. Used to verify gravity was disabled for the playground game.

**2. [PhysicsEngine] Gravity each step:**
    - File: src/engine/physicsEngine.ts (step method)
    - Purpose: Logged gravity values (x, y, scale) on every physics step. Used for ongoing diagnostics of gravity state during simulation.

**3. useEffectContext called:**
    - File: src/game/context/EffectContext.tsx (useEffectContext hook)
    - Purpose: Logged whenever the useEffectContext hook was called, printing the current effect context object. Used to debug context propagation.

These logs were removed to keep the console clean and improve performance. If you need to re-enable them for future debugging, refer to the respective files and lines above.



# ─────────────────────────────────────────────
# Purpose & Vision
# ─────────────────────────────

The **Neon Playground Game** is a cyberpunk-themed, interactive animation canvas designed to spark creativity and fun. It serves as a sandbox where users can freely pull in objects and effects, experiment, and play—making it a core universe builder and creative playground. This is one of many games in the Neon suite, all of which share a common pool of objects and effects for maximum reusability and cross-game synergy.

The Playground Game is not just a demo or testbed, but a fully-featured creative tool that encourages exploration, playful interaction, and emergent behaviors. Its design and controls are optimized for intuitive, joyful experimentation.

---

Poisitoned bottom and center of the viewport, is a control panel that is a 3 tabbed component.
The control panel acts as the main interface for adding objects and applying interactive effects.
The control panel is collapsible.

The background of the playground should use WorldBackgrounds/Stars.tsx (modular, themeable) – with potential to override or swap variants for future states.

Control Panel Overview
Control panel component could become a global component, but for now let's keep it in the playground game.

Note: The Objects tab is now the default active tab when visiting the game, making object placement immediately accessible.

o990-gv-## Control Panel Tabs & TabCard Instructional Guidance

The Playground Control Panel is organized into three main tabs, each providing a set of interactive cards (TabCards) that represent creative actions or tools. The following guidance captures the intent and evergreen purpose of each tab and its cards, so future updates to UI text or features remain aligned with the core experience:

### Effects Tab
- Each card in this tab represents a unique visual or physical effect that can be applied to the canvas. For MVP, only the four core radial effectors are included: Burst, Ripple, Gravity, and Nudge (see [Burst.md](../Datasheets/Effector/Radial/Burst.md), [Ripple.md](../Datasheets/Effector/Radial/Ripple.md), [Gravity.md](../Datasheets/Effector/Radial/Gravity.md), [Nudge.md](../Datasheets/Effector/Radial/Nudge.md)).
- Selecting an effect enables the user to trigger that effect through direct interaction with the canvas (such as clicking, dragging, or holding).
- A power or intensity control (slider) allows users to adjust the strength or magnitude of the currently selected effect.

### Objects Tab
- Cards in this tab represent different sci-fi or cosmic objects that can be placed into the playground (e.g., planets, stars, nebulae, spaceships, satellites).
- For MVP, only planets are implemented (see weightedRandomPlanet, PlanetEntity, modular overlays/visuals).
- Selecting an object enables placement or creation of that object on the canvas, often with additional behaviors (such as holding to grow, or triggering a lifecycle event).
- The interface displays the current count of objects on the canvas, helping users track and manage their creations.


### Interact Tab
- This tab provides tools and actions for manipulating, moving, or removing objects already on the canvas (e.g., move, undo, launch, destroy, special interactions like Colin the space worm). For MVP, only the Move tool is implemented and fully cross-linked (see [_Interact.md](../Datasheets/Interact/_Interact.md), Move Tool.md, src/content/interact/move/).
- Each card represents a distinct interaction mode or tool, allowing users to select how they want to engage with existing objects.
- The object count is also shown here for consistency and feedback.
- **Extensibility Note:** Future TabCards may include features like "Swap Background" to allow users to change the playground's visual theme or environment on the fly.

# Planet Placement & Preview System

- Planet placement is interactive and animated:
    - Hold-to-grow mechanic: When placing a planet, holding the mouse increases the preview radius in smooth increments (36 → 48 → 60 → 72 → 84).
    - The preview overlay is a semi-transparent black circle with a magenta glow, matching the planet TabCard theme.
    - Preview radius starts at 36 and grows in 4 increments while mouse is held.
    - Mouse down/up listeners are added to the canvas for placement.
    - Timer or animation frame increases previewRadius smoothly while mouse is held.
    - On mouse up, the planet entity is spawned with the grown radius and selected color.
    - Placed planet entity inherits preview's final size, color, and overlays (visual matches preview at placement).
    - Lively animation(s) for cosmic interaction: glow, scale, or ripple effect during growth.
    - The preview overlay is visible under the cursor before placement, providing accessible feedback.
    - The control panel updates the object count after each placement.
    - Placement logic avoids placing planets over the control panel area.
    - Visual feedback (highlight, animation) is provided when a planet is placed.

# Effector Visual Preview System

- Effector preview overlays are now supported for Burst, Ripple, Gravity, and Trail effectors:
    - The preview overlay is a clone of the planet preview, but uses neon cyan for Burst and is extensible for other effectors.
    - No grow effect for effector previews; radius remains constant.
    - The overlay is semi-transparent black with a neon cyan glow for Burst.
    - The preview overlay is extensible for future effectors (trail, ripple, gravity) with customizable color and visual style.
    - The preview overlay appears under the cursor when an effector is selected, providing accessible feedback before activation.
    - The system is designed for easy addition of new effectors and their unique preview visuals.


# Interact Visual Preview System

- Interact preview overlays are now supported for tools like MoveTool:
    - The preview overlay is a semi-transparent black circle with a neon red glow, matching the Interact tab theme.
    - The overlay radius is fixed at 24, providing clear feedback for interaction range.
    - The overlay appears under the cursor when a tool (e.g., MoveTool) is selected, before interaction begins.
    - Designed for extensibility: future interact tools (Undo, Launch, Destroy) can easily add their own preview overlays with custom colors and visuals.
    - The system is decoupled from effector and planet overlays, ensuring clarity and maintainability.
    - Accessible feedback: overlays are high-contrast and visible, supporting intuitive interaction.
    - Overlay logic is centralized in the playground scene for easy orchestration and future expansion.

# ─────────────────────────────────────────────
# Current Point
# ─────────────────────────────

- Physics engine (Matter.js) fully integrated and working.
- Planets spawn with physics bodies, zero velocity, and stick in place unless burst or moved by effects.
- Gravity is disabled in the playground game rules, not in the core engine. The engine is generic and ready for future games—other games can set their own gravity as needed. The playground game forces gravity to zero for its scene, so planets stay in place. This keeps the engine flexible and modular for all game modes.
- Screen boundary collision logic prevents planets from leaving the viewport and avoids the control panel area.
- Burst tool works: clicking bursts planets around the scene.
- Debug overlays and logs are minimized; console is clean except for diagnostic logs.
- All major architecture and orchestration patterns are enforced (single entry, context providers, decoupled visuals/logic).
- UI and control panel are stable
- Dev server and cache management steps completed.
- All lessons above should be applied to future game modules for consistency and scalability.

# ─────────────────────────────────────────────
# Next Steps & Future-Proofing (Checkable)
# ─────────────────────────────

- [X] Enable planet placement by selecting the Planet TabCard in the Objects tab and clicking the canvas. Show a preview of the planet under the mouse cursor.
   - [X] After placement, the planet should have a physics body and stick in place unless moved or affected by effects.
       [X] Hold-to-grow planet placement (interactive, animated)
    - [X] Added preview visual for effectors
   - [X] PlanetPreview visual - semi-transparent planet under the cursor before placement.
   - [ ] The control panel should update the object count after each placement.
   - [X] Placement should not interfere with the control panel area (avoid placing planets over UI).
- [X] Added overlays to entities and effectors to visually display their stats
- [X] Create and add  Delete system
- [ ] Create and add Colin & Delete system
- [ ] Tools confirmed: MoveTool & UndoTool remain simple (type + optional visual)
      - [ ] Import and instantiate the MoveTool class in PlaygroundScene.
         Add UI logic to select the Move tool from the Interact tab.
         Add mouse event handlers for drag-and-drop: on mouse down, check if Move tool is active and an entity is under the cursor, then call MoveTool.onStartDrag; on mouse move, call MoveTool.onDrag; on mouse up, call MoveTool.onEndDrag.
         Optionally, render MoveVisual or MoveOverlay for feedback.
- [ ] Test lifecycle cleanup with stopPlayground()
- [ ] Add tests for registries, factories, and orchestration logic
- [ ] Polish planet visuals (add debug marker or border if needed)
- [ ] Tune burst effect visuals and physics for more satisfying feedback
- [ ] Expand entity types and visuals (add overlays, variants, etc.)
- [ ] Add new effectors/tools (Ripple, Nudge, Gravity) and implement their physics logic
- [ ] Refactor and document blueprint patterns for future scalability
- [ ] Maintain clear documentation and blueprint patterns for new features
- [ ] Optional: Design plugin/module support for dynamic feature loading
- [ ] Optional: Cursours
- [ ] Optional: break apart playground scence into smaller chunks
 - [ ] Break apart PlaygroundScene.tsx into smaller chunks for maintainability and scalability:
     - Extract custom hooks for state, effects, and handlers (e.g., usePlanetPlacement, useColin, useOverlayManager)
     - Decompose UI into smaller components (ControlPanel, OverlayLayer, EntityLayer, EffectLayer, DebugPanel)
     - Move utility functions to a utils file
     - Use registry/data-driven patterns for entities/effectors/tools
     - Isolate context logic into separate provider files

 - [ ] Sync TabCardSlider left/right button color themes to match the current tab's theme (Effects/Object/Interact)
 - [ ] Modify Colin's EntityOverlayVisual so it attaches to Colin and follows the mouse cursor, rather than sticking to his spawn point
# ─────────────────────────────────────────────
# Future Ideas & Enhancements
**PlaygroundScene Decomposition Plan:**
To improve maintainability and scalability, consider:
    - Extracting custom hooks for logic
    - Splitting UI into smaller components
    - Moving helpers/utilities to dedicated files
    - Using registry/config files for data-driven expansion
    - Organizing context providers separately


**Global Overlay Refactor:**
- Migrate all effect visuals and overlays to a unified, extensible overlay system for consistency, maintainability, and easier expansion.
- Untie "cosmic spaghetti" by:
    - Consolidating visuals and overlays into a single system.
    - Removing duplicate/local overlays in playground/components.
    - Ensuring all effectors/entities use the same overlay/visual pattern.
    - Centralizing overlay logic for diagnostics, stats, extensibility.
    - Refactoring preview overlays, effect overlays, and diagnostics overlays to be modular and data-driven.

**Overlay Types & File References:**

1. **Preview Overlays** (placement/preview under mouse):
    - [EffectorPreviewOverlay.tsx](../../game/playground/components/EffectorPreviewOverlay.tsx)
    - [PlanetPreviewOverlay.tsx](../../game/playground/components/PlanetPreviewOverlay.tsx)
    - [ColinPreviewOverlay.tsx](../../game/playground/components/ColinPreviewOverlay.tsx)

2. **Effect Visuals** (main effect area, post-activation):
    - [BurstOverlay.tsx](../../game/playground/components/BurstOverlay.tsx) *(current burst effect visual)*
    - [BurstVisual.tsx](../../content/effectors/Burst/BurstVisual.tsx) *(minimal burst SVG visual, not currently used)*
    - [RippleVisual.tsx](../../content/effector/radial/RippleVisual.tsx)
    - [GravityVisual.tsx](../../content/effectors/Gravity/GravityVisual.tsx)
    - [NudgeVisual.tsx](../../content/effectors/Nudge/NudgeVisual.tsx)

3. **Diagnostics/Info Overlays** (real-time stats, x/y/radius, etc.):
    - [EntityOverlayVisual.tsx](../../content/effects/entityOverlay/EntityOverlayVisual.tsx)
    - [EffectorOverlayVisual.tsx](../../content/effects/effectorOverlay/EffectorOverlayVisual.tsx)

**Migration Steps:**
- Review all overlays and visuals in playground/components and content/effectors/entityOverlay/effectorOverlay.
- Refactor to use global overlays for all effectors/entities.
- Remove local overlays once global system is in place.
- Ensure all overlays are modular, extensible, and data-driven.

**Overlay Types Clarification:**
- Preview Overlay: Shown under the mouse before activation (e.g., EffectorPreviewOverlay), provides visual feedback for placement or effect preview.
- Effect Overlay: Shown during or after effect activation (e.g., BurstOverlay, EffectorOverlayVisual), displays the actual effect area, stats, or diagnostics.

# ─────────────────────────────

**Ensure all entity instances (especially planets) have unique ids**: for React key props, regardless of variant/type. Variant diversity is for gameplay and visuals; unique ids prevent React duplicate key warnings. Review entity creation logic and registry patterns as new variants are added.
The following features and improvements are recommended for future versions of the Playground Game and its control panel/engine:

**Touch, Trackpad, and Keyboard Support**: Add support for planet placement and growth interactions using touch gestures, trackpad events, and keyboard controls. Ensure accessibility and usability across devices (mobile, tablet, desktop).

- **User Onboarding & Help**: Quickstart guide, tooltips, or onboarding overlay for new users; contextual help for each tab or action.
- **Customization & Settings**: User-customizable controls, color themes, effect parameters; save/load playground states or user presets.
- **Undo/Redo History**: Expand undo to a full action history with redo and step-through.
- **Advanced Object Interactions**: Grouping, multi-select, linking objects; object property editing (mass, color, behaviors).
- **Export/Share**: Export scenes as images, animations, or shareable links; import/export playground setups.
- **Accessibility**: Keyboard navigation, ARIA labels, and screen reader support.
- **Performance & Responsiveness**: Dynamic scaling for large numbers of objects; mobile/touch support and responsive layout. Prioritize robust physics and engine optimizations to prevent lag or crashes as the canvas grows busy.
- **Audio & Feedback**: Sound effects or music for actions and effects; visual feedback for actions.
- **Easter Eggs & Surprises**: Hidden interactions, rare objects, or playful surprises.
- **Analytics & Telemetry (Optional)**: Track usage patterns to inform improvements (with user consent).
- **Swap Background TabCard**: Add a TabCard to the Interact tab that allows users to swap the playground background or theme dynamically.
- **Remove canvas restraints p**:- so it extends past the control panel and covers the entire viewport, allowing for more creative freedom and larger play areas.
- When an entity moves outside the viewport boundaries, it is automatically removed (deleted) from the game.
- This enables dynamic, open-ended gameplay and prevents clutter from off-screen objects.
- Consider adding visual feedback or animation when entities are deleted for improved user experience.
- Make boundary logic configurable for future modes (e.g., infinite canvas, wrap-around, or soft boundaries).

These ideas are not required for the current version, but are intended to inspire future development and ensure the Playground Game remains engaging, accessible, and innovative.

# ─────────────────────────────────────────────
# [Referenced Files & Notes]
# ─────────────────────────────



**Engine Architecture:**
- [engine.ts](../../engine/engine.ts)
- [physicsEngine.ts](../../engine/physicsEngine.ts)
- [renderer.ts](../../engine/renderer.ts)
- [entity.ts](../../engine/entity.ts)
- [entityFactory.ts](../../engine/entityFactory.ts)
- [effectorSystem.ts](../../engine/effectorSystem.ts)
- [utils.ts](../../engine/utils.ts)

**Entities:**
    - [ColinEntity.ts](../../content/entity/colin/ColinEntity.ts)
    - [ColinVisual.tsx](../../content/entity/colin/ColinVisual.tsx)
    - [PlanetEntity.ts](../../content/entity/planet/PlanetEntity.ts)
    - [PlanetTypes.ts](../../content/entity/planet/PlanetTypes.ts)
    - [PlanetVisual.tsx](../../content/entity/planet/PlanetVisual.tsx)
    - [variants/](../../content/entity/planet/variants/)
    - [overlays/](../../content/entity/planet/overlays/)

**Effectors:**
    - [BurstType.ts](../../content/effectors/Burst/BurstType.ts)
    - [BurstVisual.tsx](../../content/effectors/Burst/BurstVisual.tsx)
    - [GravityType.ts](../../content/effectors/Gravity/GravityType.ts)
    - [GravityVisual.tsx](../../content/effectors/Gravity/GravityVisual.tsx)
    - [RippleType.ts](../../content/effectors/Ripple/RippleType.ts)
    - [RippleVisual.tsx](../../content/effectors/Ripple/RippleVisual.tsx)
    - [NudgeType.ts](../../content/effectors/Nudge/NudgeType.ts)
    - [NudgeVisual.tsx](../../content/effectors/Nudge/NudgeVisual.tsx)

**Tools:**
    - [MoveTool.ts](../../content/interact/move/MoveTool.ts)
    - [MoveVisual.tsx](../../content/interact/move/MoveVisual.tsx)
    - [UndoTool.ts](../../content/interact/undo/UndoTool.ts)
    - [UndoVisual.tsx](../../content/interact/undo/UndoVisual.tsx)

**Game Orchestration:**
    - [startPlayground.ts](../../game/playground/startPlayground.ts)
    - [PlaygroundScene.tsx](../../game/playground/PlaygroundScene.tsx)
    - [PlaygroundControlPanel.tsx](../../game/playground/PlaygroundControlPanel.tsx) *(unstable, slated for deletion)*
    - [components/](../../game/playground/components/)
    - [hooks/](../../game/playground/hooks/)

**UI & Styles:**
- [components/](../../ui/components/)
- [audio/](../../ui/audio/)
- [icons/](../../ui/icons/)
- [debug/](../../ui/debug/)
- [colors.ts](../../styles/colors.ts)
- [glows.ts](../../styles/glows.ts)
- [fonts.css](../../styles/fonts.css)
- [neonThemes.ts](../../styles/neonThemes.ts)
- [sharedPrimitives/](../../styles/sharedPrimitives/)

**Entry & Config:**
- [main.tsx](../../main.tsx)
- [app.tsx](../../app.tsx)
- [index.html](../../index.html)
- [package.json](../../package.json)
- [tsconfig.json](../../tsconfig.json)
- [vite.config.ts](../../vite.config.ts)

**Guidelines & Notes:**
- [Game Architecture.md](../Game%20Architecture.md)
- [Grand Vision & Instructions.md](../Grand%20Vision%20&%20Instructions.md)
- [Engine Architecture Constitution](../Datasheets/Engine/_Engine%20Architecture.md)

**Blueprints & Starters:**
- [Playground Game Blueprint.md](./Playground%20Game%20Blueprint.md)
- [Start your engines.md](./Start%20your%20engines.md)
- [🧩Physics Starter.md](../Starters/🧩Physics%20Starter.md)

**Other:**
- [spaceshipGame/](../../game/spaceshipGame/)
- [asteroidGame/](../../game/asteroidGame/)


