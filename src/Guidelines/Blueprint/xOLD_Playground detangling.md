
─────────────────────────────────────────────
PLAYGROUND DETANGLING – ARCHITECTURE-ALIGNED EXECUTION PLAN
─────────────────────────────────────────────

PHASE 0 – LOCK VISUAL AUTHORITY (DO FIRST)

1. [X] Identify canonical RadialEffectorVisual.
   Criteria:
   - Pure visual (no engine mutation)
   - Receives all data via props
   - No tool logic inside
   - No registry awareness

2. [X] Canonical separation:
• BurstEffectorVisual.tsx (src/content/effects/radialeffector/) is the only component responsible for the animated burst effect when the user clicks the canvas.
• EffectorInfoOverlayVisual.tsx (src/content/effects/effectorInfoOverlay/) is used exclusively for displaying effector diagnostics/info (type, position, radius, power, cooldown, etc.).

- [X] Remove all usage/imports of BurstOverlay.tsx and BurstVisual.tsx from playground scene/components.
- [X] Ensure burst effect triggers only BurstEffectorVisual.tsx for animation.
- [X] Use EffectorInfoOverlayVisual.tsx only for overlaying stats/info, not for effect visuals.
- [X] Update registry and effect rendering logic to reference only BurstEffectorVisual.tsx for burst visuals.
- [X] Add code comments and documentation to clarify this separation and prevent future mixing of overlays/effect visuals.
- [X] Renamed info overlay visuals
      ├── effects/
      │   │   ├── effectorInfoOverlay/                    # Overlay visual to display effector information such as type, position, radius, power, cooldown, etc.
      │   │   │   ├── EffectorInfoOverlayVisual.tsx       # React component for effector overlay visuals
      │   │   │   ├── EffectorInfoOverlayVisual.md        # Documentation for effector overlay visuals
      │   │   ├── entityInfoOverlay/                      # Overlay visual to display entity information such as type, position, radius, velocity, etc.
      │   │   │   ├── EntityInfoOverlayVisual.tsx         # React component for entity overlay visuals
      │   │   │   ├── EntityInfoOverlayVisual.md          # Documentation for entity overlay visuals



3. [X] Remove all imports of legacy version.
  Remove any usage of BurstOverlay.tsx and BurstVisual.tsx from the playground scene and components—these are now redundant or deprecated.
  Ensure that when a burst effect is triggered (e.g., on canvas click), only BurstEffectorVisual.tsx is rendered for the animation.
  Use EffectorInfoOverlayVisual.tsx only for overlaying stats/info, not for effect visuals.
  Update the registry and all effect rendering logic to reference only BurstEffectorVisual.tsx for burst visuals.
  Document this separation in your architecture and code comments, so future contributors don’t mix overlays and effect visuals.

4. [X] Add header comment in canonical file:
   "This is the sole radial effector visual. Engine drives behavior."

Feedback & Suggestions:
• Consider adding a visual test suite for RadialEffectorVisual to ensure prop-driven rendering remains stable as features expand.
• Document prop types and expected data shape in the canonical file for easier onboarding and future refactoring.
• Use Storybook or similar tool for visual regression testing if visuals become more complex.
• Add a checklist for visual migration to help contributors avoid legacy imports.

5. [X] Final Spaghetti Check: Unique IDs and Overlay Boundaries

  [X] Fix: Always generate React keys using both the entity's unique ID and its array index, e.g. key={`${entity.id}-${i}`}. This guarantees uniqueness even for repeated IDs (such as 'earth').
    Ensure PlaygroundScene and EffectContextProvider pass unique keys through to overlays and error boundaries, using the combined ID and index pattern.

  [X] Fix: missing key warning for BurstIcon and other UI components rendered in TabCardSlider

      How to avoid:
      • Always provide a unique key prop for every child in a list or map, including fragments and nested elements. For icons/components rendered in TabCardSlider, use the array index or a unique identifier (e.g., key={i} or key={`${id}-${i}`} ).
      • For custom icon components like BurstIcon, ensure all mapped elements (such as fragments, gradients, filters, or SVG groups) also receive a unique key prop.
      • Import React at the top of every file that uses JSX or React.Fragment.
      • Review new UI components for list rendering and add key props as part of code review.
      • If you see a React key warning, check all map/Children.map calls and fragments for missing keys.
      • Document this pattern in component guidelines and onboarding docs to prevent recurrence.


 
─────────────────────────────────────────────
PHASE 1 – CONTEXT ISOLATION (GAME LAYER ONLY)
─────────────────────────────────────────────

src/game/context/

Checklist:

1. Move context files to src/game/context/
  - [X] EngineContext.tsx
  - [X] EffectContext.tsx

2. Enforce strict boundaries:
  - [X] Context must NOT import from src/content/
  - [X] Context must NOT import entity classes
  - [X] Context may reference engine types only

3. Refactor PlaygroundScene as composition root:
    - [X]PlaygroundScene_xOLD.tsx remains a valuable resource:
      • Use it for implementation ideas and reference patterns from the original build.
      • Review it one last time before calling the detangle complete, to ensure no important logic or features are lost.
      • The new PlaygroundScene should be clean and aligned with the current architecture, but the old file is a great source for inspiration and validation.
  - [X] Refactor PlaygroundScene as composition root:
      - [X] Wrap PlaygroundScene in EngineContext.Provider
      - [X] Wrap PlaygroundScene in EffectContext.Provider
      - [X] Ensure all hooks (e.g., usePlanetPlacement, useColin, useEntityDeletion, useOverlayManager, useToolSelection) access engine/effect context only
      - [X] Move all entity/effect logic to hooks and layers, not directly in PlaygroundScene
      - [X] Create and use EntityLayer for entity visuals
      - [X] Create and use EffectLayer for effector visuals
      - [X] Create and use OverlayLayer for overlays (EntityInfoOverlayVisual, EffectorInfoOverlayVisual)
      - [X] Ensure ControlPanel and DebugPanel are pure UI, not mutating engine/content
          - game/playground/components/playgroundconrolpanel
          - Debug panel - effects/ffectorInfoOverlay/ and effects/entityInfoOverlay/
      - [X] Confirm Engine → Context → Hooks → Layers → Content Visuals flow is strictly followed
      - [X] Remove all legacy simulation/entity logic from PlaygroundScene; ensure only context providers, layers, and pure UI remain.

4. Best practices & extra context:
  - [X] Use TypeScript interfaces for context values to enforce strict boundaries and clarity (EffectContext)
  - [X] Add unit tests for context providers to verify correct value propagation and isolation from content/entity logic
  - [X] Document context usage patterns and boundaries in a README within src/game/context/
  - [X] Log engine tick + effect queue in PlaygroundScene for quick verification
  - [X] Add a lint rule or code review checklist to prevent accidental imports from content/entity classes
  - [X] Review all context consumers to ensure they only access engine types, not content/entity logic
  - [Future] Consider using React.memo or similar optimization for context consumers if performance is a concern

5. Onboarding & maintainability:
  - [X] Add onboarding notes and code review checklist to src/game/context/README.md
  - [X] Document context isolation pattern for future contributors


─────────────────────────────────────────────
PHASE 2 – HOOKS (GAME ORCHESTRATION LAYER)
─────────────────────────────────────────────

Checklist:
  - [X] usePlanetPlacement implemented, pure (engine only)
  - [X] useColin implemented, pure (engine only)
  - [X] useEntityDeletion implemented, pure (engine only)
  - [X] useOverlayManager implemented, pure UI state only
  - [X] useToolSelection implemented, pure UI state only
  - [X] Add custom hook tests for API boundaries
  - [X] Document hook responsibilities and boundaries in src/game/playground/hooks/README.md
  - [X] Split hooks by domain for clarity (placement, deletion, overlays, tool selection)
  - [X] Use TypeScript generics for hooks that orchestrate similar logic across entity types
  - [X] Add a code review checklist for hook purity and API boundaries
  - [X] Integrate hooks into the playground scene
  - [X] Implement automatic entity deletion for out-of-bounds entities in EntityLayer or a dedicated BoundarySystem
        File: src/game/playground/systems/BoundarySystem.ts
        Call BoundarySystem.ts from EntityLayer.tsx for boundary-based entity deletion.
        Logic: Iterate entities, check bounds, call engine.removeEntity(id)
        Document: README.md, checklist in 🎮 Playground detangling.md, and src/Guidelines/Datasheets/Engine/BoundarySystem.md
        BoundarySystem datasheet:
        - Captures current essence, API, and integration points
        - Includes a section for future uses and expansion ideas (e.g., teleport, world wrapping, triggers, cosmic universe game variants)
        - See src/Guidelines/Datasheets/Engine/BoundarySystem.md for details


Hooks live in:

src/game/playground/hooks/

Hooks orchestrate engine calls.
Hooks do NOT implement simulation logic.

usePlanetPlacement
→ Calls engine.spawnEntity(type, config)
→ Does NOT construct entity class directly

useColin
→ Calls engine.spawnEntity("colin")

useEntityDeletion
→ Calls engine.removeEntity(id)

useOverlayManager
→ Pure UI state only

useToolSelection
→ Sets active tool enum only

Feedback & Suggestions:
• Add custom hook tests to ensure hooks only call engine public APIs and never import entity classes.
• Document hook responsibilities and boundaries in src/game/playground/hooks/README.md.
• Consider splitting hooks by domain (placement, deletion, overlays, tool selection) for clarity.
• Use TypeScript generics for hooks that orchestrate similar logic across entity types.
• Add a code review checklist for hook purity and API boundaries.
• updating imports or documentation


Hooks README:
src/game/playground/hooks/README.md
  - Documents hook responsibilities, boundaries, and API test requirements
  - Every new hook must have a corresponding test file
  - Review checklist and onboarding guidance for contributors
  
─────────────────────────────────────────────
PHASE 3 – LAYERED COMPONENTS (RENDER ONLY)
─────────────────────────────────────────────

src/game/playground/components/

PHASE 3 – LAYERED COMPONENTS (RENDER ONLY) Checklist

- []PlaygroundScene_xOLD.tsx remains a valuable resource:
  • Use it for implementation ideas and reference patterns from the original build.
  • Review it one last time before calling the detangle complete, to ensure no important logic or features are lost.
  • The new PlaygroundScene should be clean and aligned with the current architecture, but the old file is a great source for inspiration and validation.
- [x] Move all layered components to src/game/playground/components/
- [X] EntityLayer:
  - [X] Iterates engine.entities
  - [X] Resolves visual via registry
  - [X] Renders visual component only (no mutation)
- [ ] EffectLayer:
  - [x] Iterates effectSystem active effects
  - [x] Uses canonical RadialEffectorVisual (src/content/effectors/Radial/RadialEffectorVisual.tsx)
  - [x] Uses RippleEffectorVisual for reusable radial VFX (e.g., small burst, laser gun, etc.)
    • RadialEffectorVisual is the canonical visual for radial effector rendering.
    • RippleEffectorVisual is separated for flexible VFX use across other radial effects.
  - [x] refine registry & documentation
  - [Future] Add visuals for gravity and nudge,
 [X] OverlayLayer:
   - [X] Pure UI (no engine mutation)
     • OverlayLayer renders EntityInfoOverlayVisual and EffectorInfoOverlayVisual for overlays.
     • No engine or content mutation occurs; overlays are prop-driven and context-isolated.
     • Defensive checks ensure overlays only render when entities/effects are present.
     • PlaygroundScene_xOLD.tsx remains a valuable resource for reference patterns.
- [X] ControlPanel:
   - [X] Manages tool state only (no engine/content mutation)
   - [X] Reads engine state (no mutation)
 [Future] DebugPanel:
   - Reads engine state (no mutation)
      - React.memo has been applied to EntityLayer, EffectLayer, OverlayLayer, and PlaygroundControlPanel for performance optimization
 [X] Use prop types and registry lookups to keep visuals extensible and maintainable

─────────────────────────────────────────────
PHASE 4 – UTILITIES
─────────────────────────────────────────────

src/game/utils/

PHASE 4 – UTILITIES CHECKLIST

- [X] Create src/game/utils/ folder for pure helpers
- [X] Add math.ts, physicsHelpers.ts, color.ts, random.ts utility files
- [X] Add README.md with onboarding, checklist, and contribution guidelines
- [X] Add index.ts for barrel exports
- [X] Add __tests__/ folder and utils.test.ts for unit tests
- [X] Ensure all utilities are pure (no world/engine mutation)
- [X] Add code review checklist to README.md
- [Future] Add new utilities by domain as needed
- [Future] Extend tests and barrel export for new utilities

# Utility Discovery & Refactoring Guidance
- [Future] Review PlaygroundScene_xOLD.tsx for reusable logic or patterns before writing new utilities
- [Future] Consult Game Architecture Map (src/Guidelines/Game Architecture.md) to identify domains and files that may benefit from utilities
- [Future] Refactor any duplicated or ad-hoc logic into src/game/utils/ as pure helpers

Onboarding Note: Many math, physics, color, and random helpers may originate in PlaygroundScene_xOLD.tsx or be scattered in the codebase. Always check both the old scene and the architecture map before creating new utilities to avoid duplication and maximize reuse.

Feedback & Suggestions:
• Utilities must be stateless and side-effect free
• All helpers must be covered by unit tests
• Document input/output and edge cases in README or code comments
• Use barrel export (index.ts) for easy imports
• Review checklist in README.md before merging new utilities


─────────────────────────────────────────────
PHASE 5 – CONTENT REGISTRY INTEGRATION
─────────────────────────────────────────────
- []PlaygroundScene_xOLD.tsx remains a valuable resource
src/content/
  entity/
    planet/
      PlanetEntity.ts
      PlanetTypes.ts
      PlanetVisual.tsx
    colin/
      ColinEntity.ts
      ColinVisual.tsx
      ColinTypes.ts

  effectors/
    Burst/
    Ripple/
    Gravity/
    Radial/
      RadialEffectorVisual.tsx

  interact/
    UndoTool.ts
    MoveTool.ts
    ResetTool.ts

Registry location:
src/content/registry.ts

PHASE 5 – CONTENT REGISTRY INTEGRATION CHECKLIST

- [X] Create/maintain src/content/registry.ts as the single source of truth for entity and effector visuals/classes
- [X] Register all canonical entity types (planet, colin, etc.) with both class and visual in registry.ts
- [X] Register all canonical effector types (burst, ripple, etc.) with visual in registry.ts
- [Future] Add future effector visuals (gravity, nudge, etc.) as they are implemented
- [X] Use TypeScript types/interfaces for registry entries to enforce structure and onboarding clarity
- [X] Document registry shape, usage, and onboarding in src/content/registry.ts and src/content/README.md
- [X] Reference data sheets for each effector/entity type for onboarding and extensibility
- [X] Ensure only the game layer imports the registry (never engine/content)
- [Future] Add integration tests for registry lookups to ensure correct registration and resolution (test more)
- [Future] Use barrel exports (index.ts) for registry and shared visuals for easier imports (add more as we go)
- [Future] Code review checklist to prevent engine/content/game cross-import violations:
  - [] Engine must never import from content, game, or registry
  - [] Content must never import from game or registry
  - [] Game layer is the only layer allowed to import registry
  - [] No circular dependencies between engine/content/game
  - [] All imports must follow the domain-driven boundaries
  - [] Add onboarding note and checklist to src/content/README.md and src/game/context/README.md

Feedback & Suggestions:
- Visuals and registry entries should be modular and extensible for new variants and overlays.
- Update documentation and registry entries as new visuals or entity/effect types are added.
- Cross-link registry entries to their data sheets for onboarding and future-proofing.


─────────────────────────────────────────────
PHASE 6 – ENGINE DECOUPLING CHECKPOINT
─────────────────────────────────────────────


Checklist:
  - [X] Audit src/engine/ for forbidden imports:
    - [X] No React imports
    - [X] No content imports
    - [X] No UI references
    - [X] No tool logic
    - [X] No registry access
  - [X] Document engine boundaries and allowed dependencies in src/engine/README.md
  - [X] Add a lint rule or static analysis script to detect forbidden imports in src/engine/
  - [X] Add unit tests for engine modules to verify no UI/content/tool logic leaks
  - [X] Add a code review checklist for engine decoupling (see src/engine/ENGINE_DECOUPLING_CHECKLIST.md)

Engine knows only:
- Entities (BaseEntity)
- Systems
- Physics
- Tick loop

─────────────────────────────────────────────
PHASE 7 – Rebuild the control panel
─────────────────────────────────────────────
Checklist for Rebuilding PlaygroundControlPanel:

- [X] Review this detangling file and architectural requirements for the control panel (pure UI, no engine/content mutation, manages tool state only)
- [X] Reference xOLD_PlaygroundControlPanel.tsx for implementation ideas and to ensure no important features are lost
- [X] Clear out the current PlaygroundControlPanel.tsx file (remove all code except the bare export)
- [X] Scaffold a new functional component for PlaygroundControlPanel.tsx
- [X] Rebuild the tabs and tab content structure (Effects, Objects, Interact) using the new architecture
 [x] Implement prop-driven state for selected effect/object/interact, power value, and callbacks
 [x] Use only UI components and icons from the /ui and /styles folders (no engine or content logic)
 [x] Ensure all mapped elements (TabCard, TabCardSlider, etc.) have unique React keys
 [x] Add instructional text and utilities (PowerSlider, entity count, etc.) as in the xOLD version
 [x] Test keyboard navigation and focus-visible styling
 [x] Export PlaygroundControlPanel as a memoized component
- [ ] Verify the rebuilt control panel matches architectural boundaries and UI requirements
      [] Powerslider not clickable


Reinstate the fixed panel styling and blur effects (background, borderRadius, boxShadow, etc.)
The Interact tab icon should be SpaceshipIcon, not MoveIcon - ignore
Use font family and weight for instructional and utility text should use TOKENS.
Focus-visible keyboard navigation logic is not present - reinstate
Export is not default (minor, but for parity) - make it right according to our new architecture
Utility section height should be enforced for all tabs - reinstate

Refer to xOLD_PlaygroundControlPanel.tsx for any missing logic or UI details during the rebuild.


─────────────────────────────────────────────
PHASE 8 – Get the playground game running
─────────────────────────────────────────────

- [X] Ensure all dependencies are installed (`npm install`)
- [X] Clean build/dist/vite cache if needed (done)
- [ ] Start the dev server (`npm run dev`)
- [ ] Open the playground entry point (game/playground/main.tsx or index.html)
- [ ] Verify the game loads, engine runs, and UI is interactive
- [ ] Check browser console for errors or warnings
- [ ] Confirm architectural boundaries are respected at runtime
- [ ] Review PlaygroundScene_xOLD.tsx for any missing logic or features to rewire
- [ ] List and implement any remaining rewiring tasks from PlaygroundScene_xOLD.tsx


─────────────────────────────────────────────
PHASE 9 – DETANGLE PREVIEW OVERLAYS
─────────────────────────────────────────────

ITEM 1:
effectorInfoOverlay/ & entityInfoOverlay/
- [ ] Move into new folder /content/effects/infoOverlay - will we have other info overlay types/variations in the future?
- [ ] Update any imports, etc. that will get tangled due to the new folder creationa and file movement
- [ ] Create barrel exports (index.ts) for preview overlays and info overlays once finalized/shared

ITEM 2:
I have preview overlays that are by the cursor to let the user visually see where they'll be placing entities, effectors, and tools.
This is my current list. I may come up with unique ones for each type in the playground. I'm considering using these for multiple games.
/game/playground
EffectorPreviewOverlay
ColinPreviewOverlay
PlanetPreviewOverlay
ToolPreviewOverlay


─────────────────────────────────────────────
PHASE 10 – DELETE DEPRECIATED THINGS
─────────────────────────────────────────────

/game/playgroundBurstOverlay


─────────────────────────────────────────────
PHASE 10 – Integrate behavior system
─────────────────────────────────────────────

- see /Guidelines/Blueprint/Behavior System
- in there are 4 blueprints:
  Behavior System Blueprint
  Follow Mouse Behavior
  Follow Target Behavior
  Orbit Behavior
  Wander Behavior

─────────────────────────────────────────────
PHASE X – FUTURES SANDBOX (OPTIONAL BUT SAFE)
─────────────────────────────────────────────

If adding experimental modules:

Create:

src/futures/

Rules:
- Futures can import from engine
- Futures can import from content
- Engine never imports from futures
- Content never imports from futures

Feedback & Suggestions:
• Document the purpose and rules for futures in src/futures/README.md.
• Add a code review checklist to ensure futures remain sandboxed and do not become structural dependencies.
• Consider using TypeScript namespaces or folder conventions to clearly mark futures as experimental.

─────────────────────────────────────────────
RADIAL EFFECTOR FINAL STATE
─────────────────────────────────────────────

Behavior → src/engine/effectorSystem.ts
Visual → src/content/effectors/Radial/RadialEffectorVisual.tsx
Rendering → EffectLayer via registry

There must be exactly ONE radial visual registered.

Feedback & Suggestions:
• Add visual regression tests and prop shape validation for RadialEffectorVisual to prevent drift.
• Document the registration and rendering flow for radial visuals in the registry and EffectLayer.
• Add a checklist for contributors to ensure only one canonical visual is registered.

# things to keep for commands
npm run dev
npm run build
    Stop the dev server completely.
    Delete the .vite (or dist, build, or similar) cache folders if present.
    Start the dev server again (npm run dev).
Restart the dev server
- Dev server and cache management steps completed.

─────────────────────────────────────────────
HOOK INTEGRATION GUIDANCE
─────────────────────────────────────────────

When to integrate hooks into PlaygroundScene or components:

• Integrate hooks when you need to orchestrate entity/effect actions, overlays, or tool selection from UI events or game logic.
• Use hooks in PlaygroundScene to:
    - Spawn entities (placement hooks)
    - Delete entities (deletion hooks)
    - Manage overlays (overlay hooks)
    - Handle tool selection (tool hooks)
• Use hooks in layer components (EntityLayer, EffectLayer, OverlayLayer) to project game state and trigger engine/effect actions.
• Always import hooks from their domain folders (e.g., placement/useColin).
• Ensure hooks are only used for orchestrating engine/effect calls, not for simulation logic or direct entity manipulation.
• Add a checklist item for every new feature: “Integrate relevant hooks in PlaygroundScene or layer components.”
• Document hook integration points in src/game/playground/hooks/README.md for onboarding.

// Example: Generic entity placement hook
// src/game/playground/hooks/placement/useEntityPlacement.ts
// This hook can be used for any entity type (planet, colin, etc.)

export function useEntityPlacement<TConfig>(engine: any) {
  return (entityType: string, config: TConfig) => {
    engine.spawnEntity(entityType, config);
  };
}

// Usage:
// const placePlanet = useEntityPlacement<PlanetConfig>(engine);
// placePlanet('planet', planetConfig);
// const placeColin = useEntityPlacement<ColinConfig>(engine);
// placeColin('colin', colinConfig);

// This pattern can be applied to other hooks (deletion, overlays, etc.) for maximum flexibility and maintainability.

─────────────────────────────────────────────
HOOK CODE REVIEW CHECKLIST
─────────────────────────────────────────────

- Is the hook pure and orchestration-only (no simulation logic)?
- Does the hook avoid importing or instantiating entity classes directly?
- Does the hook only call public engine/effect context APIs?
- Is the hook placed in the correct domain folder (placement, deletion, overlays, tool selection)?
- Is the hook generic and reusable for multiple entity types (if applicable)?
- Is there a corresponding test file verifying API boundaries and purity?
- Is the hook integrated in PlaygroundScene or layer components as needed?
- Does the hook maintain architectural separation and context isolation?
- Are all imports and references updated to match the domain split?
- Is the hook documented in src/game/playground/hooks/README.md?

─────────────────────────────────────────────
ENGINE RENDERING – CANVAS COMPONENT GUIDANCE
─────────────────────────────────────────────

For engine-driven visuals (physics, entity shapes, debug rendering), use a dedicated child canvas component (e.g., PlaygroundCanvas):

• The canvas is attached to the engine and handles all low-level rendering.
• UI overlays, info panels, and entity visuals are React components layered above the canvas.
• PlaygroundScene orchestrates context, hooks, and layers, while PlaygroundCanvas handles engine integration.
• This separation keeps the architecture modular, avoids overcrowding, and matches domain boundaries.

To add new features (effects, tools, overlays), use hooks and context in PlaygroundScene, and let the engine render to the canvas as needed.

This pattern ensures maintainability, extensibility, and architectural fidelity.

─────────────────────────────────────────────
SPAWNING ENTITIES – REGISTRY-DRIVEN GUIDANCE
─────────────────────────────────────────────

When spawning entities (such as planets), always use the canonical entity class from the registry:

• Do NOT pass plain objects to engine.spawnEntity or entity placement hooks.
• Use the registry to resolve the correct class, e.g.:
  const PlanetEntity = registry.entityTypes.planet.class;
  const planet = new PlanetEntity(config);
  placeEntity('planet', planet);

This ensures architectural fidelity, extensibility, and correct rendering. The registry is the single source of truth for entity classes and visuals. Hooks orchestrate placement, but entity construction must use the registry.

If you see missing visuals or overlays, check that entities are constructed using their canonical class, not as plain objects.

This pattern prevents spaghetti wiring and maintains domain boundaries as outlined in this file.