─────────────────────────────────────────────
NEON PLAYGROUND – SURGICAL BLACK SCREEN DEBUG PLAN 2.27.2026
─────────────────────────────────────────────
PURPOSE:
Debug black screen in PlaygroundScene, ensure all entities, effectors, tools, overlays, hooks, and canvas render correctly.

─────────────────────────────────────────────
[ ]Steps completed so far (2026 surgical rewiring):
─────────────────────────────────────────────
1. Audited and fixed all import/export statements (PHASE 0)
2. Unplugged PlaygroundScene, removed all non-essential components
3. Verified minimal render with PlaygroundCanvas and Stars
4. Added PlaygroundControlPanel, confirmed UI renders
5. Created and integrated PlaygroundErrorBoundary for robust error handling
6. Rewired PlaygroundScene to manage activeTab state and pass it to PlaygroundControlPanel
7. Verified tab selection works and UI updates correctly

─────────────────────────────────────────────
[ ]Rewiring steps
─────────────────────────────────────────────

[ ] Add DevOverlay (for engine tick/effect queue debug).
[ ] Add EntityLayer (for entity rendering).
[ ] Add EffectLayer (for effect visuals).
[ ] Add OverlayLayer (for overlays).
[ ] Add PlaygroundControlPanel (for UI controls).

PREREQUISITES:
• Ensure Node.js, npm, and TypeScript are up to date.
• Clear previous builds (npm run clean/build or rm -rf dist).
• Console open for errors only.
• Vite dev server ready.

─────────────────────────────────────────────
[ ] PHASE 0 – STAR IMPORT/EXPORT CHECK
─────────────────────────────────────────────
• Scan all files for `import * as` or `export * from`.
• Replace with explicit imports/exports.
• Common culprits: PlanetRegistry.ts, effectorSystem.ts, startPlayground.tsx.
• Save, stop server, clear cache, restart.

─────────────────────────────────────────────
PHASE 1 – ENGINE SANITY CHECK
─────────────────────────────────────────────
[x] effectorSystem.ts – only logic; no visuals/UI.
[x] effectSystem.ts – unify naming; ensure engine imports only logic.
[x] engine.ts – orchestrates update loop; verify entity lifecycle hooks.
[x] physicsEngine.ts – pure physics; no UI imports.
[x] renderer.ts – decoupled; canvas references correct.
[x] BaseEntity.ts – confirm all entities extend this.
[x] __tests__/engineBoundaries.test.ts – add missing hook/entity coverage.

─────────────────────────────────────────────
PHASE 2 – CONTENT LAYER MINIMAL SETUP
─────────────────────────────────────────────

Round 2
2a. [X] PlaygroundCanvas.tsx – ensure canvas component renders first.
2b. [X] worldbackgrounds/Stars.tsx – mount stars background only.
2c. [X] Verify static import of all content/planet/ and effectors in registry.
2d. [X] entity/planet/ParentTypes/ – confirm all types (Rocky, GasGiant, Ice, Lava).
2e. [X] overlays/ – empty overlays folder okay for now; canonical overlays live in effects/infoOverlay.
2f. [X] variants/ – check Earth, Mars, others; ensure registry points to index.ts.
2g. [X] effects/planetvisuals – confirm PlanetBase.tsx, PlanetAura.tsx, CratersOverlayVisual.tsx, CracksOverlayVisual.tsx.
2h. [X] effects/radialeffector – only BurstEffectorVisual.tsx canonical; remove deprecated RippleVisual.tsx.
2i. [X] infoOverlay – consolidate all overlays: PlanetPreviewOverlay, EffectorPreviewOverlay, ToolPreviewOverlay, ColinPreviewOverlay.
2j. [X] interact/ – confirm all tools exist; hooks properly separated.

─────────────────────────────────────────────
PHASE 3 – GAME LAYER MINIMAL
─────────────────────────────────────────────
3b. [X] main.tsx – mounts PlaygroundScene only.
3c. [X] startPlayground.tsx – verify static imports of planets, visuals, effectors.
3d. [X] DevOverlay.tsx – mount for debug ticks and effect queue visualization.

─────────────────────────────────────────────
PHASE 4 – UI & STYLES CHECK
─────────────────────────────────────────────
[X] ui/components/ – verify sliders, tabs, buttons; neon theme consistency.
[X] debug/EntityDebugOverlay.tsx – mount for entity rendering sanity.
[X] icons/ – check entity, effectors, interact icons; names match registry.
[X] styles/ – check colors.ts, neonThemes.ts, glows.ts, tokens.ts, clickableSurface.ts.

─────────────────────────────────────────────
PHASE 5 – HOOKS SANITY
─────────────────────────────────────────────
[X] hooks/physics – useBurst.ts, usePhysics.ts
[X] hooks/effects – useEffects.ts
[X] hooks/engine – useEngine.ts
[X] hooks/entity – useEntityManager.ts
[X] hooks/preview – usePreview.ts
[X] hooks/placement – useEntityPlacement.ts, usePlanetPlacement.ts, useColin.ts
[X] hooks/deletion – useEntityDeletion.ts
[X] hooks/overlays – useOverlayManager.ts
[X] hooks/toolSelection – useToolSelection.ts
[X] hooks/utils – useHoldToGrow.ts, pointerUtils.ts
[X] __tests__/ – test add tests for all new hooks.
[X] debug hooks.

─────────────────────────────────────────────
PHASE 6 – INITIAL RENDER
─────────────────────────────────────────────
[X] Bare PlaygroundScene with Stars background.
[X] Confirm canvas renders (2a).
[X] Check for errors; fix null refs.

─────────────────────────────────────────────
PHASE 7 – CONTROL PANEL
─────────────────────────────────────────────
[X] Mount main playground control panel.
[X] No tools or effectors yet.
[X] Ensure panel renders correctly.

─────────────────────────────────────────────
PHASE 8 – ENGINE LOOP
─────────────────────────────────────────────
[ ] Initialize engine.ts loop (start/stop/update functions)
[ ] Trigger loop on PlaygroundScene mount
[ ] Implement tick scheduling (requestAnimationFrame/setInterval)
[ ] Expose and increment engine.tick property for DevOverlay
[ ] Make tick rate configurable (e.g., 60fps)
[ ] Update all entities/effectors on each tick
    [ ] Add Entity system - see blueprint
[ ] Confirm entity lifecycle hooks (spawn/update/destroy)
[ ] Integrate physicsEngine.ts in tick
[ ] Validate entity positions/velocities update
[ ] Integrate effectSystem.ts logic in tick
[ ] Confirm effectors process queues and update visuals
[ ] Trigger renderer.ts to redraw canvas after logic updates
[ ] Log engine loop errors only if critical
[ ] Mount DevOverlay to show tick count/effect queue
[ ] Add pause/resume controls for engine loop
[ ] Ensure only stars are visible at this phase

─────────────────────────────────────────────
PHASE 9 – RANDOM PLANETS
─────────────────────────────────────────────
[ ] Mount PlanetEntity instances.
[ ] Use weightedRandomPlanet.ts to place.
[ ] Verify PlanetVisuals render correctly.
[ ] Ensure random position and non-overlapping placement for planets.
[ ] Confirm PlanetEntity options (colorTheme, overlays) are randomized.
[ ] Validate engine.ts draws planets using correct visual logic.
[ ] Confirm registry.ts wires PlanetEntity and PlanetVisual correctly.
[ ] Test with multiple random planets for edge cases (overlap, color, overlays).
[ ] Document any required hooks or context for planet mounting.
[ ] Registry static imports prevent tree-shaking issues.

# steps for placing a planet

## Planet Placement Checklist
References:
- [🎛️ Control Panel Wiring Diagram](../Wiring Diagrams/🎛️Control%20Panel%20Wiring%20Diagram.md)
- [Post Detangle - Playground Blueprint](./Post%20Detangle%20-%20Playground%20Blueprint.md)

- [ ] User clicks the Planet tab card in PlaygroundControlPanel
- [ ] setSelectedObject('Planet') is called; PlaygroundScene receives selectedObject prop
- [ ] PlaygroundCanvas listens for pointerDown, pointerMove, pointerUp events
- [ ] On pointerDown, useHoldToGrow starts the grow preview (preview overlay appears at pointer)
- [ ] On pointerMove, useHoldToGrow updates preview position (overlay follows pointer)
- [ ] On pointerUp, useHoldToGrow stops and triggers usePlanetPlacement to spawn the planet
- [ ] OverlayLayer displays the animated planet preview (grows if held, static if clicked)
- [ ] EntityLayer renders the new planet at the chosen position and size
- [ ] Placed planet is assigned random visual properties (colorTheme, overlays, craters, etc.) unless custom ones are provided
- [ ] Placed planet is added to the entity store and interacts with physics/other entities
- [ ] At playground start, useInitialRandomPlanets spawns 3 random planets
- [ ] Test both click-to-place (default size) and hold-to-grow (increases radius) behaviors
- [ ] Confirm preview overlay and grow animation work for both mouse and touch
- [ ] Confirm overlays and hooks (useHoldToGrow, usePlanetPlacement, usePreview, useOverlayManager) are wired up and working
- [ ] Document any edge cases (e.g., overlapping planets, placement limits)

─────────────────────────────────────────────
Create a Reactive Store for Entities (Effector)
─────────────────────────────────────────────

[X] Install Effector:

[X] Create the entity store:
    - In a new file (e.g., `src/game/state/entityStore.ts`):
      ```js
      import { createStore, createEvent } from 'effector';
      export const setEntities = createEvent();
      export const $entities = createStore([]).on(setEntities, (_, entities) => entities);
      ```

[X] Update the engine tick to sync entities:
    - After each physics tick and entity update, call `setEntities(updatedEntities)` with the latest array.
    - This ensures the store always reflects the current state of all entities.

[X] Update EntityLayer and related React components:
    - Use Effector’s `useStore($entities)` hook to subscribe to the entity list.
    - Render entities based on the store, not a local or engine array.


[X] Enable undo/redo/history (recommended):
        [X] In your entityStore.ts, added a history stack
        [X] After each tick or entity-changing action, call setEntities as before (history will update automatically).
        [X] Updated EntityLayer to use $history (or $history.present) if you want to show the current state from history.

[Future] Integrate with effectors, tools, and overlays:
    - Use the same pattern for effectors and other game state.
    - All state changes should flow through Effector events/stores for consistency and debugging.
    - Domain you want to start with (effectors, overlays, interact/tools),

─────────────────────────────────────────────
[X] implementing persistent, modular planet visuals and data
─────────────────────────────────────────────

[X] File: PlanetEntity.ts
    Add fields for all visual properties (colorTheme, overlays, craters, etc.) to the planet entity definition.
    Ensure these are set at creation and never randomized in the visual layer.
[X] File: useInitialRandomPlanets.ts
    When generating starter planets, use a utility to generate and assign all visual properties (colorTheme, overlays, craters, etc.) to each entity.
[X] File: usePlanetPlacement.ts
    When placing new planets, use the same utility to assign visual properties, unless custom ones are provided.
[X] File: PlanetVisual.tsx
    Refactor to use only the visual properties passed in via props (from the entity).
    Remove all randomization from the render logic.
[X] (Optional) File: src/content/entity/planet/generateRandomPlanetVisuals.ts
    Create a utility function to generate random visual properties for a planet, used by both placement hooks.

In your rendering (EntityLayer or wherever you use PlanetVisual), pass craters={entity.craters} and colorTheme={entity.colorTheme}.
Ensure you are not re-creating planet entities on every tick or render—entities should persist in the store/engine.

7. Document the Effector Entity Store & Wiring:
    - The entity store ($entities, $history) is the single source of truth for all entity state in the game layer.
    - Engine updates entity positions/velocities after each tick, then calls setEntities to update the store.
    - EntityLayer and all visuals subscribe to the store using useStore($entities) or useStore($history) for live reactivity.
    - Undo/redo/history is managed by $history, allowing time travel and state restoration.
    - No extra stores are needed for basic planet movement—just the entity store and its integration with the engine and rendering layer.
    - For onboarding: Point new contributors to src/game/state/entityStore.ts and the wiring diagrams in Guidelines/Wiring Diagrams/ for a clear overview.
    - In wiring diagrams, show:
        - Engine tick → setEntities → $entities/$history → EntityLayer → PlanetVisual
        - (Optional) Undo/redo: UI → undo/redo events → $history → EntityLayer
    - This pattern keeps state modular, testable, and ready for future expansion (effectors, overlays, tools).

8. Test: spawn is good for now you can call undo() and redo() programmatically to test state changesundo/redo to verify state changes.

─────────────────────────────────────────────


─────────────────────────────────────────────
PHASE 10 – PHYSICS
─────────────────────────────────────────────
[ ] Audit physicsEngine.ts and confirm it is imported and enabled in engine.ts.
[ ] Add logs to physicsEngine.ts for troubleshooting only if needed (e.g., entity position, velocity, collision checks, force application).
[ ] Map out physics wiring in a new Guidelines/Wiring Diagrams/Physics Wiring Diagrams.md file (show how entities, engine, and physics interact).
[ ] Remove or comment out non-essential logs (keep only critical error or debug logs as needed for context).
[ ] Confirm gravity, collisions, and forces work on planets (check before/after physics tick for each entity).
[ ] Test physics hooks: usePhysics, useEntityManager (add logs for hook calls and state changes only if needed).
[ ] Validate entity positions and velocities update correctly after each tick.
[ ] Document any custom rules, edge cases, or troubleshooting steps in this file and in the new physics wiring diagram.
[ ] Add unit tests for physics logic and hooks if missing.

─────────────────────────────────────────────
PHASE 11 – BURST EFFECTOR
─────────────────────────────────────────────

### PHASE 11 – BURST EFFECTOR (Refined)

- [x] Audit grandvision and post detangle blueprints for burst effector requirements
- [x] Audit existing files and update this checklist as needed
- [x] Add Burst tab to PlaygroundControlPanel (TabCard for Burst)
- [x] Wire up Burst tab selection to activate burst effector mode
- [x] Mount EffectorPreviewOverlay for burst effector (shows preview on pointer)
- [x] Mount BurstEffectorVisual for burst effect rendering
- [X] Show burst preview at mouse cursor (EffectorPreviewOverlay follows pointer)

[X] Registry Setup:
    Add entries for trail and gravity (with their new placeholder visuals) to your effectorTypes in /content/registry.ts.
    Ensure each effectorType (burst, trail, ripple, gravity) points to the correct visual, previewOverlay, and infoOverlay (all can share EffectorPreviewOverlay and EffectorInfoOverlayVisual).

[X] TabCard/Control Panel:
    We already have TabCards for each effector from the registry in the UI,
    plugged in new effectors from the registry.

[X] Effect Triggering:
    Refactor your effect triggering logic (e.g., useBurst, useRipple, useGravity) to use a generic triggerEffector function/hook that looks up the config and visual from the registry by key.
    This makes it easy to add new effectors—just update the registry.

[X] Upstream file updates:
    patch PlaygroundCanvas to use a dynamic, registry-driven effect trigger
    generate and integrate useRadialEffector hook 

[X] Overlay/Info Sharing:
    All effectors (burst, ripple, trail, gravity, and future types) share the same EffectorPreviewOverlay and EffectorInfoOverlayVisual for overlays and info. This is enforced via the central registry: each effectorType entry points to these shared overlay components. As long as their props remain generic, new effectors can be added with no extra overlay wiring—just a registry entry. This ensures overlays and info panels are fully extensible and consistent for all effectors.

# After playground scene check


[ ] Debug why burst effects are not being added to (or removed from) the effectStore—verify that useRadialEffector is dispatching effects and that the effectStore is updating.
    [X] Implement effect cleanup: After a burst effect is visualized (or after a timeout), call removeEffect with the effect’s id to remove it from the effectStore.
    [X] Ensure the OverlayLayer and any effect visuals use the $effects store reactively, so overlays disappear when effects are removed.
    [X] Optionally, add a short timeout (e.g., 500ms–1s) after adding a burst effect to auto-remove it, or remove it after the engine/effectSystem processes it
[X] Ensure that the effect queue (effectStore) is rendered in the DevOverlay or wherever it’s meant to be visible.
[X] Implement effect consumption/cleanup logic so overlays disappear after the effect is processed.
[X] Integrate burst effect logic with the engine/effectSystem so that bursts apply force to entities and trigger visible/physical responses.
[X] Ensure burst effects are added to and removed from the effect queue (effectStore) correctly.
[X] Ensure info overlays for burst disappear after effect is processed (effect cleanup).
[X] Allow multiple bursts at different positions (spawn a burst on each click).

[X] Add a cooldown state (timestamp or boolean) for each effector type in the effector store = effect duration (from registry)
[X] When an effector is triggered, check if it’s on cooldown. If not, trigger and set the cooldown timer.
[X] Block triggering (and update the preview visual to indicate cooldown) if the cooldown is active.
[ ] Update the EffectorPreviewOverlay to be 1/3 the size and slowly grow back to the original isze.


Fix effector visuals so they appear at the effect position when triggered.
Once visuals work, wire up the physics logic for each effector.
Enhance the debug layer to show effect application events and entity responses (e.g., highlight affected planets, show force vectors, etc.).



[ ] Integrate burst effector with engine/effectSystem so that bursts apply force to planets/entities.
[ ] Ensure burst effect triggers correct physics reaction (planets/entities move in response).
[ ] Add logs for burst effector activation, effect application, and entity response (if needed).
[ ] Update wiring diagrams and docs for burst effector flow activation, effect application, and entity response (if needed).


**Notes:**
- All state changes (preview, effect trigger, burst instances) should flow through Effector stores for consistency and debugging.
- BurstEffectorVisual should render all active burst effects from the effectStore.
- EffectorPreviewOverlay should update position on pointerMove and show when Burst is selected.
- Info overlay is optional but recommended for debugging and onboarding.
[ ] Update wiring diagrams and docs for burst effector flow

─────────────────────────────────────────────
Delete console logs on these pages (EngineContext & Entity layer) if they’re not needed in our current phase

# updating effectors physics steps

## Effector Physics Debug & Update Checklist
References: 
  
- [💥 Physics Wiring Diagrams](../Wiring Diagrams/💥Physics%20Wiring%20Diagrams.md)
- [🎛️ Control Panel Wiring Diagram](../Wiring Diagrams/🎛️Control%20Panel%20Wiring%20Diagram.md)
- [Entity System Blueprint](./Entity%20System%20Blueprint.md)
- [Post Detangle - Playground Blueprint](./Post%20Detangle%20-%20Playground%20Blueprint.md)
- [ ] Review current effect application logic for ripple and gravity in physicsEngine.ts and useRadialEffector.ts
- [ ] Confirm effect radius is used (not just direct overlap) for entity selection
- [ ] For Ripple:
    - [ ] Implement gentle outward nudge (not burst)
    - [ ] Add vertical oscillation (bobbing) as wave passes (e.g., sine wave based on distance/time)
    - [ ] Add brief freeze/slowdown of movement as wave passes
    - [ ] Ensure effect is visible for all entities within the wavefront
- [ ] For Gravity:
    - [ ] Apply inward force vector toward effect center for all entities within radius
    - [ ] Use distance-based falloff for force strength (optional, for realism)
- [ ] Add debug logs for:
    - [ ] Effect center, radius, and type each tick
    - [ ] Which entities are affected and how (force, oscillation, etc.)
    - [ ] Entity position/velocity before and after effect
- [ ] Test ripple and gravity effectors in the playground:
    - [ ] Ripple: Entities bob and freeze as wave passes, not just move away
    - [ ] Gravity: Entities are pulled inward, not pushed away
- [ ] Update visual overlays (if needed) to show effect radius and affected entities
- [ ] Document any new edge cases or custom rules in the wiring diagrams

─────────────────────────────────────────────
PHASE 12 – PLACE BURST TOOL
─────────────────────────────────────────────
[ ] Enable tool placement for Burst.
[ ] Test interactions; check DevOverlay.
[ ] Confirm no deprecated overlays being used.

─────────────────────────────────────────────
PHASE 13 – MOVE TOOL
─────────────────────────────────────────────
[ ] Mount MoveTool and MoveVisual.
[ ] Hooks: useToolSelection, useOverlayManager.
[ ] Test move actions on planets.

─────────────────────────────────────────────
PHASE 14 – COLIN ENTITY
─────────────────────────────────────────────
[ ] Mount ColinEntity and ColinVisual.
[ ] Test placement; hooks: useColin, useEntityPlacement.

─────────────────────────────────────────────
PHASE 15 – DELETE TOOL
─────────────────────────────────────────────
[ ] Mount DeleteTool and DeleteVisual.
[ ] Hooks: useEntityDeletion.
[ ] Confirm entity removal works.

─────────────────────────────────────────────
PHASE 16 – UNDO TOOL
─────────────────────────────────────────────
[ ] Mount UndoTool; verify undo/redo stack.
[ ] Hooks: useToolSelection, useOverlayManager.

─────────────────────────────────────────────
PHASE 17 – ADDITIONAL EFFECTORS
─────────────────────────────────────────────
[ ] Gravity, Ripple, Trail, Nudge.
[ ] Verify visuals, physics, hooks integration.
[ ] Confirm overlays for each effector.

─────────────────────────────────────────────

## Visuals update Checklist
References: 
  
- [Post Detangle - Playground Blueprint](./Post%20Detangle%20-%20Playground%20Blueprint.md)
- [💥 Physics Wiring Diagrams](../Wiring Diagrams/💥Physics%20Wiring%20Diagrams.md)
- [Entity System Blueprint](./Entity%20System%20Blueprint.md)

### Effector & Entity Visuals Update Checklist

- [ ] Audit current effector/entity visuals:
    - [ ] List all effectors (burst, ripple, gravity, trail, nudge, etc.) and their visual files (e.g., BurstEffectorVisual.tsx)
    - [ ] List all entity visuals (PlanetVisual, ColinVisual, etc.)
    - [ ] Note which are SVG, React, or Canvas-based

- [ ] Decide visual approach for each effector/entity:
    - [ ] For simple shapes (rings, circles, sparkles): use SVG/React
    - [ ] For complex/animated effects (waves, spirals, particles): use Canvas or WebGL (PixiJS/Three.js)
    - [ ] Document which visuals will be animated and how (CSS, JS, Canvas, or WebGL)

- [ ] Refactor visuals for modularity and animation:
    - [ ] Ensure each visual is a standalone React component (SVG or Canvas)
    - [ ] For SVG: use absolutely positioned SVG in a wrapper div, animate with React state or CSS
    - [ ] For Canvas/WebGL: create a Canvas component, render using JS animation loop or library
    - [ ] Expose props for position, radius, color, animation state, etc.

- [ ] Add animation to effectors:
    - [ ] Burst: Animate ring expansion/fade (SVG or Canvas)
    - [ ] Ripple: Animate wavefront (expanding ring, bobbing effect)
    - [ ] Gravity: Animate spiral or inward pull (arrows, particles)
    - [ ] Trail/Nudge: Animate sparkles, lines, or motion blur
    - [ ] Use requestAnimationFrame or React state for timing

- [ ] Integrate visuals with effectStore/entityStore:
    - [ ] Visuals should reactively update based on effect/entity state
    - [ ] Use Effector's useStore hook to subscribe to effect/entity changes
    - [ ] Ensure visuals disappear/animate out when effect ends

- [ ] Add debug overlays (optional):
    - [ ] Show effect radius, affected entities, force vectors
    - [ ] Toggle debug overlays from DevOverlay or control panel

- [ ] Test all visuals in the playground:
    - [ ] Trigger each effector and confirm correct animation/position
    - [ ] Confirm visuals scale and animate smoothly
    - [ ] Check for performance issues (especially with Canvas/WebGL)

- [ ] Document visual architecture:
    - [ ] Note which files/components handle which visuals
    - [ ] Add comments and diagrams as needed
    - [ ] Update blueprints/wiring diagrams if architecture changes

─────────────────────────────────────────────
PHASE 19 – HOOK TESTING
─────────────────────────────────────────────
[ ] Run unit tests for all hooks.
[ ] Add coverage for any missing hook files.

─────────────────────────────────────────────
PHASE 20 – OVERLAY CONSOLIDATION
─────────────────────────────────────────────
[ ] Merge duplicate overlay folders/infoOverlay.
[ ] Confirm all preview overlays are canonical: PlanetPreviewOverlay, EffectorPreviewOverlay, ToolPreviewOverlay, ColinPreviewOverlay.

─────────────────────────────────────────────
PHASE 21 – FINAL SANITY CHECK
─────────────────────────────────────────────
[ ] Console free of import/export/star errors (no unnecessary logs).
[ ] All static imports confirmed.
[ ] DevOverlay shows correct engine ticks and effect queue.
[ ] All hooks tested.
[ ] All entity/effect/tool visuals render correctly.
[ ] Canvas displays complete playground scene.
─────────────────────────────────────────────

GET IT LIVE

---

## Get Neon Playground onto github - espcially to be able to play it in the browser. it is a published page in Git. 
https://github.com/mrw1419/neon-playground.git


## First-Time Git & GitHub Setup (macOS, Xcode Tools)

- [ ] 1. Install Git (if not already installed)
    - Open Terminal and run: `xcode-select --install`
    - If you see "command line tools are already installed," you’re good! If not, follow the prompts to install.

- [ ] 2. Set up Git (first time only)
    - In Terminal, run:
        - `git config --global user.name "Your Name"`
        - `git config --global user.email "your@email.com"`

- [ ] 3. Generate an SSH key for GitHub (recommended)
    - In Terminal, run: `ssh-keygen -t ed25519 -C "your@email.com"`
    - Press Enter to accept all defaults.
    - Then run: `cat ~/.ssh/id_ed25519.pub` and copy the output.
    - Go to https://github.com/settings/keys → "New SSH key" → paste and save.

- [ ] 4. Initialize Git in your project (if not already a repo)
    - In Terminal, cd to your project folder, then run:
        - `git init`
        - `git add .`
        - `git commit -m "Initial commit"`

- [ ] 5. Add the remote GitHub repository
    - For SSH (recommended):
        - `git remote add origin git@github.com:mrw1419/neon-playground.git`
    - Or for HTTPS:
        - `git remote add origin https://github.com/mrw1419/neon-playground.git`

- [ ] 6. Push your code to GitHub
    - `git branch -M main`
    - `git push -u origin main`
- [ ] 7. Enable GitHub Pages
    - On GitHub: Settings → Pages → set source to `main` branch and `/root` or `/docs` (depending on your build output)
    - Save and wait for the link to appear

**Tips for first-time git users:**
- If you get stuck, run `git status` to see what’s going on.
- If you get a message about "divergent branches" or "pull first", ask for help before running `git pull` (it can create merge conflicts).
- If you need to update your code after the first push: `git add .`, `git commit -m "Describe your change"`, then `git push`.
- If you see permission errors, double-check your SSH key setup or try HTTPS instead of SSH.

Let me know if you want help with any step or want to walk through the SSH key setup!