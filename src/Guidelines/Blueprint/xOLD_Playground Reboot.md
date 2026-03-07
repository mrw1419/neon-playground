─────────────────────────────────────────────
NEON PLAYGROUND – PLAYGROUND FULL DEBUG & REWIRING BLUEPRINT
─────────────────────────────────────────────


# ==================================================
SHORT LIST
==================================================

CORE PRINCIPLE:
A blank screen means something threw during render,
returned undefined, or failed to mount.

We are not guessing.
We are narrowing the possibility space.

--------------------------------------------------
STEP 0 – TURN ON HARD TRUTH MODE
--------------------------------------------------

[ ] Open browser DevTools
[ ] Enable "Pause on exceptions"
[ ] Capture the FIRST error thrown (not the 10 after it)

If nothing shows, check:
[ ] Network tab for failed JS bundle
[ ] 404 on main bundle
[ ] MIME type errors

--------------------------------------------------
STEP 1 – STAR IMPORT / EXPORT CHECK
--------------------------------------------------

Look for:

    import * as Something from "./file"
    export * from "./file"

Verify:

[ ] Does the target file use default export?
[ ] Are we mixing default + named exports incorrectly?
[ ] Are we calling an object like a function?
Wrong:
    import * as useThing from "./useThing"
    useThing()   <-- this will explode

Wrong:
    export default useThing
    export * from "./useThing"
    // nothing actually gets exported

Confirm:
[ ] If default export → import without braces
[ ] If named export → import with braces
[ ] No phantom exports

--------------------------------------------------
STEP 2 – ROOT COMPONENT RETURN CHECK
--------------------------------------------------

[ ] Does App() return JSX?
[ ] Did we accidentally remove the return?
[ ] Did we early-return null?
[ ] Did we forget parentheses around JSX?

--------------------------------------------------
STEP 3 – HOOK RULE VIOLATIONS
--------------------------------------------------

Hooks must:
- Be called at top level
- Be called in same order every render


[ ] Hooks inside loops
[ ] Hooks inside nested functions
[ ] Hooks after early return

Illegal pattern:
    if (condition) {
        useEffect(...)
    }

--------------------------------------------------
STEP 4 – CUSTOM HOOK SAFETY AUDIT
--------------------------------------------------


[ ] Does it assume context exists?
[ ] Does it return expected shape?

Example failure:
    const { user } = useAuth()
    // but AuthProvider not mounted

--------------------------------------------------
STEP 5 – WINDOW / DOCUMENT / LOCALSTORAGE ACCESS
--------------------------------------------------

If using SSR (Next.js etc):

[ ] Are we accessing window during render?
[ ] Are we touching localStorage outside useEffect?
[ ] Are we reading document at top level?

Correct pattern:
    useEffect(() => {
    }, [])
Never:
    const x = localStorage.getItem("x")  <-- outside effect

--------------------------------------------------
STEP 6 – INFINITE EFFECT LOOP CHECK
--------------------------------------------------

Check all useEffect dependencies:

[ ] Are we setting state inside effect?
[ ] Is that state in dependency array?
[ ] Are we depending on inline objects?
[ ] Are functions wrapped in useCallback?

Bad:
    useEffect(() => {
        setValue(obj)
    }, [obj])  // if obj recreated each render → infinite loop

--------------------------------------------------
--------------------------------------------------
[ ] Any incorrect relative paths?
[ ] Any circular dependencies?
[ ] Any file renamed but import not updated?
[ ] Case-sensitive filename mismatch (especially on Linux)

--------------------------------------------------
STEP 8 – COMMENT OUT BISECTION METHOD
--------------------------------------------------

Binary search the tree:

[ ] Comment out half the JSX in App
[ ] If screen renders → problem in removed half
[ ] Repeat until isolated

For hooks:
[ ] Comment out custom hooks one by one
[ ] Re-enable slowly
[ ] Identify the one that kills render

STEP 9 – ERROR BOUNDARY TEST

Temporarily wrap root:

[ ] Add simple ErrorBoundary
[ ] Log error.message visibly
[ ] Confirm if error is swallowed

--------------------------------------------------
STEP 10 – ENVIRONMENT VARIABLES
--------------------------------------------------

[ ] Any missing process.env vars?
[ ] Are they prefixed correctly? (VITE_, NEXT_PUBLIC_, etc)
[ ] Are we assuming env exists?

Undefined env values can break render silently.

--------------------------------------------------
STEP 11 – BUILD SYSTEM CHECK
--------------------------------------------------
[ ] Stop server completely
[ ] Delete package-lock.json or pnpm-lock
[ ] Reinstall dependencies
[ ] Clear build cache (.next, dist, build)

--------------------------------------------------
STEP 12 – STRICT MODE DOUBLE RENDER CONFUSION
--------------------------------------------------

If React StrictMode enabled:

[ ] Are effects written assuming single mount?
[ ] Is state reset logic safe on double invoke?

StrictMode can expose unsafe patterns.

STEP 13 – NETWORK / API FAILURES

[ ] Are we awaiting API call during render?
[ ] Is component suspending incorrectly?
[ ] Any unhandled promise rejection?

Never:
    const data = fetch("/api")  // during render

--------------------------------------------------
STEP 14 – VERIFY ENTRY POINT
--------------------------------------------------

[ ] Is index.tsx mounting correct component?
[ ] Is createRoot targeting correct DOM element?
[ ] Does index.html have correct div id?

# ==================================================
FULL LIST
==================================================

// PHASE 0 – IMPORT/EXPORT SANITY CHECK
// ------------------------------------------------------------
[ ] Audit all imports/exports for default vs named vs * (star) usage
[ ] Replace any invalid require() with ES imports
[ ] Check barrel files (index.ts) for proper re-exports
[ ] Ensure PlaygroundScene.tsx is default export where used
[ ] Ensure core tools (MoveTool, UndoTool) are default exports
[ ] Confirm static imports for PlanetEntity, PlanetVisual, etc., to prevent tree-shaking

// ------------------------------------------------------------
// PHASE 1 – CLEANUP & CONTEXT
// ------------------------------------------------------------
[ ] Ensure PlaygroundScene.tsx is minimal: composition root only
[ ] Wrap children in PlaygroundErrorBoundary
[ ] Import EngineContext and EffectContext from src/game/context/
[ ] Remove direct content/entity imports from PlaygroundScene
[ ] Confirm canvasRef exists
[ ] Verify control panel UI restored; tool selection works

// ------------------------------------------------------------
// ------------------------------------------------------------
[ ] Step physics engine each animation frame (requestAnimationFrame)
[ ] Log engine tick to verify context wiring
[ ] Do not attach entity classes or visuals here; engine is decoupled

// ------------------------------------------------------------
// PHASE 3 – EFFECT SYSTEM INITIALIZATION
// ------------------------------------------------------------
[ ] Initialize effector system via EffectContext / engine.effectSystem
[ ] Log effect queue and tick to confirm lifecycle
[ ] Confirm RadialEffectorVisual is registered exactly once
[ ] Add visual regression test placeholders for effectors

// PHASE 4 – SPAWN INITIAL ENTITIES (SANDBOX LAYOUT)
[ ] Spawn N random planets on load
[ ] Center + orbit offsets for layout
[ ] Assign radius, colorTheme, overlays via getWeightedRandomPlanet()
[ ] Attach planets using engine.spawnEntity(entityConfig)
[ ] Verify gravity, collisions, burst tool interaction
[ ] Optional: attach preview overlays for debugging

// ------------------------------------------------------------
// PHASE 5 – ENTITY PLACEMENT HOOKS
// ------------------------------------------------------------
[ ] useEntityPlacement / usePlanetPlacement hooks configured
[ ] Hooks must only call engine public API; no direct class imports
[ ] Generic enough to handle planets, Colin, or other entities
[ ] Document hook in hooks/README.md
[ ] Placeholder integration for future behaviors

// ------------------------------------------------------------
// ------------------------------------------------------------
[ ] useEntityDeletion hook calls engine.removeEntity(id)
[ ] Hooks fully orchestrate UI → engine actions
[ ] Confirm all triggers (click, hold, shortcut) fire correctly
[ ] Set up minimal test files for hooks (API boundary / purity)
[ ] Validate hooks do not mutate engine state directly

// ------------------------------------------------------------
// PHASE 7 – OVERLAY HOOKS
// ------------------------------------------------------------
[ ] useOverlayManager handles:
    • EntityPreviewOverlay
    • EntityInfoOverlay
[ ] Show overlays only when tab/tool matches
[ ] Hide preview on mouse leave
[ ] Hook integrated in PlaygroundScene or relevant layer

// PHASE 8 – LAYERED COMPONENTS (RENDER ONLY)
[ ] PlaygroundCanvas – renders EntityLayer + EffectLayer + OverlayLayer
[ ] EntityLayer – iterate engine.getEntities(), resolve visuals via registry
[ ] EffectLayer – render canonical RadialEffectorVisual via registry
[ ] OverlayLayer – mouse previews & info panels
[ ] ControlPanel – handles tool selection & tab card state
[ ] DebugPanel – optional, read-only engine state

// ------------------------------------------------------------
// PHASE 9 – ENTITY INTERACTION SEQUENCE
// ------------------------------------------------------------
[ ] Mouse move updates:
    • PreviewPos for current tab/tool
    • DraggedEntity positions if Move tool active
    • Colin target position if tool active
[ ] Mouse click behavior:
    • Burst tab → radial impulse
    • Colin tab → spawn Colin entity
[ ] Hold-to-grow logic for planet preview
[ ] Reset preview radius after placement

// ------------------------------------------------------------
// PHASE 10 – PREVIEW & INFO OVERLAYS
// ------------------------------------------------------------
[ ] EntityPreviewOverlay → placement preview for planets/Colin
[ ] EntityInfoOverlay → optional debug/info panel
[ ] Overlays respect mouse position, tab, and tool selection

// ------------------------------------------------------------
// PHASE 11 – SANDBOX CONFIRMATION
// ------------------------------------------------------------
[ ] Initial planets render correctly
[ ] Physics effects (gravity, burst) apply
[ ] Manual planet placement works
[ ] Move tool drag works on entities
[ ] Colin spawns and follows mouse (placeholder logic)
[ ] Overlays respond to mouse/tool
[ ] Document debug observations

// ------------------------------------------------------------
// PHASE 12 – FUTURE BEHAVIOR SYSTEM INTEGRATION
// ------------------------------------------------------------
[ ] Placeholder hooks/UI for:
    • FollowMouseBehavior
    • OrbitBehavior
    • WanderBehavior
[ ] Plan behaviors in engine.spawnEntity(config.behaviors)
[ ] Verify sandbox works fully before behaviors attached
[ ] Maintain modularity for other games

// ------------------------------------------------------------
// PHASE 13 – REGISTRY & CANONICAL VISUALS
// ------------------------------------------------------------
[ ] Every entity resolved via registry (do not pass plain objects)
[ ] Visuals are canonical; only one RadialEffectorVisual
[ ] Registry entries include metadata, variants, upgrades
[ ] Static imports for entities and visuals to prevent tree-shaking
[ ] Document registration & rendering flow

// ------------------------------------------------------------
// PHASE 14 – HOOK INTEGRATION CHECKLIST
// ------------------------------------------------------------
[ ] Ensure hooks are pure orchestration-only
[ ] Hooks placed in correct domain folder (placement, deletion, overlay, tool)
[ ] Hooks do not import entity classes
[ ] Corresponding tests verify API boundaries and purity
[ ] Hooks integrated in PlaygroundScene or layers
[ ] Documented in hooks/README.md

// ------------------------------------------------------------
// PHASE 15 – ENGINE & RENDERING CHECKS
// ------------------------------------------------------------
[ ] Canvas renders engine visuals correctly
[ ] UI overlays appear on top
[ ] PlaygroundCanvas receives engine updates
[ ] Verify multi-layer z-index
[ ] Confirm optional DebugPanel shows engine state

// ------------------------------------------------------------
// PHASE 16 – EFFECTOR MODULARITY & TESTING
// ------------------------------------------------------------
[ ] Each effector (Burst, Ripple, Nudge, Gravity, Trail) triggers physics correctly
[ ] Effector visuals live in content/effector/
[ ] Test base, entity-specific, and upgrade variants
[ ] Regression tests and prop shape validation added

// ------------------------------------------------------------
// PHASE 17 – TOOL MODULARITY & TESTING
// ------------------------------------------------------------
[ ] Each tool (Undo, Move, Reset, Launch) integrated with engine & UI
[ ] Registry & blueprint entry exists
[ ] Parameters, triggers, and state verified
[ ] Optional test files for API/interaction

// ------------------------------------------------------------
// PHASE 18 – UI & CONTROL PANEL CHECKS
// ------------------------------------------------------------
[ ] Buttons, sliders, tabs wired to hooks correctly
[ ] Tab state reflects active tool
[ ] ControlPanel triggers placement, deletion, preview overlays
[ ] Confirm keyboard, mouse, and touch input support

// ------------------------------------------------------------
// PHASE 19 – DEBUG & ERROR HANDLING
// ------------------------------------------------------------
[ ] PlaygroundErrorBoundary wraps children
[ ] Catch and log runtime errors
[ ] Verify hook and engine errors are surfaced
[ ] Check for missing or undefined imports
[ ] Validate optional null checks in canvas, ctx, or entities

// ------------------------------------------------------------
// PHASE 20 – DOCUMENTATION & AI USAGE NOTES
// ------------------------------------------------------------
[ ] Blueprint steps are deterministic
[ ] Hooks & overlays marked clearly as optional/future
[ ] AI can use blueprint to generate hooks, layers, wiring
[ ] Sandbox is canonical testbed
[ ] Maintain modularity for other games

// ------------------------------------------------------------
// PHASE 21 – FINAL CROSS-CHECK
// ------------------------------------------------------------
[ ] Confirm all imports/exports, static and barrel files
[ ] Verify all hooks are pure and integrated
[ ] Registry resolves canonical visuals for all entities
[ ] Engine, scene, visuals, and UI properly separated
[ ] Test dev build (npm run dev) and production build (npm run build)
[ ] Restart dev server after clearing cache (.vite/dist/build)
[ ] Verify black screen resolved; overlays, physics, and interactions visible
─────────────────────────────────────────────
