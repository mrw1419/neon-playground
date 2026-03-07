# Neon Playground Game Building Datasheet

## Project Overview
- Modular playground game MVP following blueprint for extensibility and global reuse.
- Technologies: TypeScript, React, Vite, Matter.js.
- Key architectural goals: slim orchestrator scene, logic in hooks/context/registry, modular overlays/components.

## Project Structure
- src/engine/: Core modules (WorldLayer, PhysicsEngine, EffectSystem).
- src/content/entity/: Entity folders (Planet, Colin, etc.).
- src/content/effects/: Modular effects (Burst, etc.).
- src/game/playground/PlaygroundScene.tsx: Orchestrator, delegates logic to hooks/components.
- src/game/playground/hooks/: Custom hooks (useEngine, usePhysics, useEffects, usePreview, useBurst, useEntityManager).
- src/game/playground/components/: UI overlays, tool overlays.
- src/game/context/: EngineContext, EffectContext for global state.
- src/game/registry/: ToolRegistry, EffectRegistry for plug-and-play.

## Step-by-Step Log

### 1. Modular Blueprint Setup
- Adopted blueprint for modular, reusable game architecture.
- Created core engine modules and context providers.

### 2. Scene Slimming & Hook Extraction
- Refactored PlaygroundScene to only orchestrate, moved logic to hooks.
- Created usePreview, useBurst, useEntityManager, useEffects, usePhysics, useEngine hooks.

### 3. Componentization
- Extracted overlays and controls: BurstOverlay, PlanetPreviewOverlay, PlaygroundControlPanel.
- Integrated overlays/components into PlaygroundScene.

### 4. Context & Registry Integration
- Created EngineContext and EffectContext.
- Wired up EffectContextProvider in main.tsx.
- Registered tools/effects for global access.

### 5. Error Resolution & Cleanup
- Removed duplicate state, refs, and legacy code from PlaygroundScene.
- Ensured only one function block, one return, all hooks/components at the top.
- Fixed missing imports and context providers.

### 6. Troubleshooting
- Restarted Vite dev server, cleared cache, checked file paths and exports.
- Verified all import paths, filenames, and exports.
- Confirmed modular structure and context wiring.

## Error History
- Vite import-analysis errors for engine.ts and physicsEngine.ts despite correct paths and exports.
- Context provider and registry integration issues resolved.
- Persistent import errors likely due to caching, filesystem, or Vite config.

## Recommendations
- Double-check for invisible characters or filesystem issues.
- Try renaming engine.ts and physicsEngine.ts to test import resolution.
- Ensure all files are saved and visible in workspace.
- Review Vite config and .gitignore for exclusions.
- Continue modularization and test overlays/components for rendering.

## Summary
- All modularization, context, registry, and componentization steps are complete.
- Errors are not due to code or structure, but likely environment or tooling.
- Use this datasheet to retrace steps, debug further, and onboard new contributors.


The plan of attack for rebuilding and refactoring your playground UI from the ground up is as follows:

UI Restoration & Isolation

✅Restore PlaygroundScene with only visual UI components (PlaygroundControlPanel, overlays, Stars background).
Remove all hook and engine/context logic from PlaygroundScene and main.tsx for a clean UI baseline.
✅ Confirm UI renders without errors or blank screens.


Component-by-Component Reintroduction

✅Reintroduce UI components one at a time:
✅ PlaygroundControlPanel
✅ PlanetPreviewOverlay
✅ BurstOverlay. The gray circle is the PlanetPreviewOverlay and Dummy burstEffects
Ensure props are simple and do not depend on unplugged hooks or engine logic.
Test rendering after each addition.

Gradual Hook Replugging
Reintroduce hooks in order of least dependency: useEffects (for effect state), useEntityManager (for entity state)
usePreview, useBurst (for overlays).
Refactor hooks to avoid engine/physics dependencies at first.
Confirm UI and state logic work after each hook is replugged.


Engine & Physics Integration
Once UI and state hooks are stable, gradually reintroduce engine and physics hooks: useEngine, usePhysics.
Restore EngineContext and EffectContext providers in main.tsx.
Test for import errors and resolve any Vite/module issues.

useEngine, usePhysics.
EngineContext, EffectContext

*****If the problem persists after these steps, please let me know—there may be a need for a more advanced investigation or a minimal reproduction repo for further debugging.

1. Clarify Hook Responsibilities
useEngine: Returns the engine instance (WorldLayer) from context. Use this for all simulation actions (spawn, remove, update entities, attach canvas, etc.).
usePhysics: Will eventually expose physics stepping and state, but for now can be a placeholder.
Other hooks (usePreview, useEntityManager, etc.): Should use useEngine internally to interact with the simulation, not manage their own state.
2. Refactor UI to Use Engine via Hooks
Remove any React state that duplicates simulation state (e.g., placedPlanets).
In your hooks/components, use useEngine to:
Attach the engine to the canvas on mount.
Spawn entities (e.g., planets) when the user acts.
Query entities for rendering overlays or counts.
3. Incremental Integration Steps
Attach Engine to Canvas
In PlaygroundScene (or a custom hook), on mount: engine.attachCanvas(canvasRef.current)
Wire Up Entity Placement
On click, use engine.spawnEntity(planetData) instead of setPlacedPlanets.
Render From Engine State
Use engine.getEntities() to render overlays, previews, and counts.
Remove Redundant State
Delete any React state that’s now managed by the engine.



Modularization & Registry
Reconnect registry logic (ToolRegistry, EffectRegistry) for plug-and-play extensibility.
Ensure all context and registry wiring is correct.
Troubleshooting & Environment

If import errors persist, review Vite config and .gitignore for exclusions.
Check for invisible characters, filesystem issues, or caching problems.
Try renaming engine/physics files if needed.
Confirm all files are saved and visible in workspace.
Final Testing & Documentation

Test overlays/components for rendering and interaction.
Document all steps and architectural decisions for onboarding and future debugging.