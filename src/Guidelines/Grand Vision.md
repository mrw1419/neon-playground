─────────────────────────────────────────────
NEON PLAYGROUND – GRAND VISION 2.18.2026
(Publish-Ready • Registry-Backed • Tree-Shake Safe)
─────────────────────────────────────────────

SYSTEM IDENTITY

Neon Playground is a modular cosmic simulation engine and content system.
The Playground is the canonical sandbox.
Mini-games are rule layers built on top of sandbox entities.

Everything is registry-driven.
Everything is statically anchored.
Nothing relies on bundler luck.

If it is not statically reachable, it does not exist in production.
That is now law.

──────────────────────────────
ARCHITECTURAL PRINCIPLE UPDATE
──────────────────────────────

New governing constraint:

The Registry is not only metadata.
It is the static anchor that prevents tree-shaking removal.

Dynamic imports are allowed for lazy loading.
But canonical entities must always be statically imported once at startup.

This prevents Vite from erasing your universe.

If the bundler does not see it, it does not ship.

──────────────────────────────
PUBLISH STABILITY RULES
──────────────────────────────

1. DEFAULT EXPORT CONSISTENCY

Scenes:
- Must use default export.
- Must be imported as default.

Correct:
export default PlaygroundScene
import PlaygroundScene from "./PlaygroundScene"

Tools:
- Must default export their implementation from index.ts.
- No mixed named/default confusion.

Entities:
- Default export the entity class.
- Named export supporting utilities and helpers.

Types:
- Always named export.
- Never default export types.

Rule summary:
Scenes → default
Tools → default
Entity classes → default
Types → named
Helpers → named

No ambiguity.

──────────────────────────────
2. NO require() IN REACT OR CONTENT LAYER
──────────────────────────────

require() is not valid in browser bundling.

All visuals and modules must use static ES imports.

Correct:
import BurstVisual from "./BurstVisual"

Never:
const BurstVisual = require("./BurstVisual")

This ensures:
- Proper bundling
- Tree-shake awareness
- Production reliability

──────────────────────────────
3. TYPESCRIPT isolatedModules DISCIPLINE
──────────────────────────────

When isolatedModules is enabled, TypeScript compiles each file independently.

If exporting a type, you MUST mark it explicitly.

Correct:
export type { PlanetVariant }

Incorrect:
export { PlanetVariant }

This prevents compilation errors and phantom runtime artifacts.

──────────────────────────────
4. NULL SAFETY IN CANVAS CODE
──────────────────────────────

Canvas and context may be null at runtime.

Always guard:

if (!canvas) return
const ctx = canvas.getContext("2d")
if (!ctx) return

No assumptions.
Production builds are less forgiving than dev mode.

──────────────────────────────
5. STATIC ENTITY ANCHORING (CRITICAL)
──────────────────────────────

PlanetEntity.ts and PlanetVisual.tsx MUST be statically imported
inside your main registry or startup orchestrator.

Example: startPlayground.ts or registry.ts

import PlanetEntity from "@/content/entity/planet/PlanetEntity"
import PlanetVisual from "@/content/entity/planet/PlanetVisual"

Even if the registry dynamically references them later,
they must be statically reachable once.

If not, Vite may remove them from dist during tree-shaking.

Dynamic-only reference = risk of removal.
Static import once = guaranteed inclusion.

This rule applies to:
- Entities
- Effectors
- Tools
- Physics modules
- Canonical visuals

If it defines reality, it must be statically observed.

──────────────────────────────
6. ROBUST PLANET RENDERING RULE
──────────────────────────────

Do NOT rely on instanceof checks alone.
Minification and bundling can alter class identity boundaries.

Instead, rely on stable identity markers:

Option A:
entity.type === "planet"

Option B:
entity.registryId === "planet"

Option C (best):
entity.category === "entity" && entity.kind === "planet"

Your rendering layer should check stable data,
not fragile class references.

Correct pattern:

if (entity.type === "planet") {
  return <PlanetVisual entity={entity} />
}

This makes rendering resilient to:
- Bundler transforms
- Minification
- Cross-module boundaries

──────────────────────────────
7. REGISTRY AS SOURCE OF TRUTH
──────────────────────────────

Every entity must have:

- Static import anchor
- Registry entry
- Blueprint document
- Logic module
- Visual module
- Types module

The Registry must:
- Map string IDs to constructors
- Map string IDs to visuals
- Be statically initialized at startup

No magic string instantiation without registry mapping.

──────────────────────────────
8. PLAYGROUND AS CANONICAL SANDBOX
──────────────────────────────

The Playground is not a demo.
It is the integration test for:

- Physics
- Effectors
- Tools
- Upgrades
- Registry resolution
- Rendering pipeline

If something works in a mini-game but not in Playground,
the architecture is wrong.

The Playground defines truth.

──────────────────────────────
9. FINAL PUBLISH CHECKLIST
──────────────────────────────

Before deploying:

[ ] All scenes default export
[ ] All tools default export
[ ] No require() anywhere
[ ] All type exports use "export type"
[ ] All canvas usage null-checked
[ ] All canonical entities statically imported once
[ ] Registry statically constructed
[ ] Rendering checks use stable string identifiers
[ ] Engine layer contains zero UI logic
[ ] Content layer contains zero game-specific rules
[ ] Game layer contains zero engine mutations

If any box fails, do not ship.

──────────────────────────────
SYSTEM INTENT
──────────────────────────────

Neon Playground is not a collection of files.
It is a layered architecture:

Engine → deterministic systems
Content → reusable cosmic primitives
Registry → identity & instantiation authority
Game → rule overlays
UI → interaction surface

Bundlers are ruthless.
Production is honest.
Architecture must be explicit.

If the system is explicit, it scales.
If it is implicit, it breaks quietly.

And quiet breaks are the most dangerous kind.

──────────────────────────────
EFFECTOR STORE ARCHITECTURE (2026)
──────────────────────────────

Effector stores are the single source of truth for all entity, effect, overlay, and tool state in the game layer.

- $entities: Holds the current array of all entities. Updated after every engine tick with a new array of shallow-copied entity objects.
- $history: Manages undo/redo/history for entities. All entity-changing actions flow through this store for time travel and state restoration.
- effectStore: Holds all active effect instances (e.g., bursts, ripples) for rendering and logic.
- effectorStore: Tracks effector tool selection, preview state, and pointer overlays.

All state changes (entity positions, effectors, overlays, undo/redo) flow through Effector events/stores for robust reactivity and debugging.

OverlayLayer, EntityLayer, and all overlays/visuals subscribe to these stores using useUnit for real-time updates. No UI or overlay reads directly from engine state.

After each engine tick, the engine calls setEntities with a new array of shallow-copied entity objects, ensuring React/Effector reactivity for overlays and visuals.

Undo/redo is managed via $history, allowing time travel and state restoration for all entity state.

This pattern applies to all overlays, effectors, and tools: always use Effector stores for state, and ensure new references are returned for reactivity.

Registry-driven expansion now includes store wiring for new entities, effectors, and overlays. All new content must integrate with the Effector store pattern for full reactivity and debugging support.
