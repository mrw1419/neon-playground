─────────────────────────────────────────────
Neon Playground – Project Grand Vision & Instructions 2.17.2026 (Updated for Effectors)
─────────────────────────────────────────────

## How to Use This Document
This file is your living reference for the project’s vision, architecture, and workflow. It now incorporates:
- Registry & Blueprint workflow for all entities
- Modular, extensible entity design (objects, effectors, tools, physics)
- Starter prompts and onboarding flow
- Cross-references to all key guidelines

---

### 1. Project Scope & Workflow
──────────────────────────────
- Build a cosmic playground and a series of space-themed mini-games.
- Playground is the **core universe builder**:
    - All objects, effectors, upgrades, and physics modules are created here.
    - Playground objects and effectors are reusable across all games.
- Mini-games (Colin, Spaceship, Asteroid, Hungry Space Worm, UFO, etc.):
    - Use playground objects as building blocks.
    - Apply **game-specific rules, interactions, and UI**.
- **Registry & Blueprint Workflow:**
    - Every new entity (object, effector, tool, physics module) starts with a Starter prompt (see Guidelines/Starters).
    - Complete the prompt to generate:
        - A Registry entry (cataloging, metadata, and variants)
        - A Blueprint file (detailed implementation plan)
    - See also: Universal Starter, Object Starter, Effector Starter, Tool Starter, Physics Starter.
- Visual Style:
    - Neon, volumetric glow, cosmic depth, tactile sci-fi objects.
    - Glassmorphic/holographic shimmer for UI elements.
    - Use React components exclusively; **graphics are vector/code-generated**, avoiding image files.
- Physics:
    - Powered by **Matter.js**, handling gravity, collisions, orbits, and effector-triggered interactions.
    - Objects have modular **traits** and **upgrades** that can modify physics and interactions.
- Effectors:
    - Burst, Nudge, Ripple, Gravity, Trail, and future effectors.
    - Can be upgraded or visually customized per object type.
    - Fully modular, stage-aware, and integrated into entity lifecycles.

---

### 2. Architecture & Folder Conventions
──────────────────────────────
### Engine Layer (src/engine/)
- Core, game-agnostic systems: physicsEngine.ts, entity.ts, effectorSystem.ts (formally effectSystem.ts), renderer.ts
- Handles physics, entity lifecycle, effector application, and rendering
- No game-specific or UI logic

### Content Layer (src/content/)
- Game-specific and entity-specific logic, types, and visuals
- Organized by domain (planets, colin, spaceship, worldbackgrounds, etc.)
- Each entity type (e.g., planet, colin) typically includes:
    - <EntityName>Entity.ts – Logic/physics for the entity
    - <EntityName>Types.ts – Types, variants, and metadata
    - <EntityName>Visual.tsx – Visuals and rendering
    - Helpers/utilities as needed (e.g., weightedRandomPlanet.ts)
- Effectors have both logic (engine/content) and visuals (content/effector/EffectorVisual.tsx)
- Tools/interact live in content/interact/ as separate files (e.g., UndoTool.ts, MoveTool.ts)

### Game Layer (src/game/)
- Contains folders for each game (asteroidGame, colinGame, spaceshipGame, playground, etc.)
- Each game folder includes:
    - main.tsx – Game entry point and scene logic
    - <Game>ControlPanel.tsx – Game-specific UI controls
    - <Game>Scene.tsx – Scene logic and entity management
    - Additional files for rules, scoring, or AI as needed

### UI Layer (src/ui/)
- Reusable UI components: components/, icons/, audio/, debug/
- Components for buttons, sliders, tabs, etc.
- Icons for objects, effectors, and interactions (organized by domain)
- Game-specific control panels live in src/game/<game>/

### Styles (src/styles/)
- Centralized color, glow, theme, and primitive definitions
- Shared tokens and primitives for consistent look and feel

### Guidelines (src/Guidelines/)
- Documentation, site architecture, Datasheets, Universal Starter Prompt, etc.
- See this folder for onboarding, architecture, and entity creation guidance

### Example: Planets Entity Structure
src/content/entity/planets/
|-- PlanetEntity.ts         # Logic/physics for planets
|-- PlanetTypes.ts          # Types, variants, and metadata
|-- PlanetVisual.tsx        # Visuals and rendering
|-- weightedRandomPlanet.ts # Helpers/utilities

### Example: Effectors Structure
src/content/effector/
|-- BurstVisual.tsx         # Visuals for Burst effector
|-- RippleVisual.tsx        # Visuals for Ripple effector
src/engine/effectorSystem.ts # Core effector logic

### Example: Tools/Interact Structure
src/content/interact/
|-- UndoTool.ts             # Undo tool logic
|-- MoveTool.ts             # Move tool logic

### Example: Colin Entity Structure
src/content/entity/colin/
|-- ColinEntity.ts          # Logic/physics for Colin
|-- ColinVisual.tsx         # Visuals and rendering

### Example: World Backgrounds
src/content/worldbackgrounds/
|-- Stars.tsx               # Visuals for star backgrounds

---

### 3. Coding Guidelines
──────────────────────────────
- Maintain **modularity**: entities (objects, effectors, tools, physics modules) are reusable and extensible across all games.
- All entities must follow the Registry + Blueprint pattern for future-proofing.
- Use Starter prompts (see Guidelines/Starters/Universal Starter Prompt of UI Component Starter) for all new entities.
- **Comments**: medium-well style; concise but clear.
- **Accessibility**: scalable text, color contrast, keyboard support.
- **Responsive**: support mouse, trackpad, and touch.
- **Effectors & entities** must correctly interact (Gravity, Ripple, Burst, etc.).
- **Session state**: track entity states, upgrades, and effector progress for continuity.
- All physics handled via Matter.js and traits + effectorModifiers.
- Avoid hardcoded UI or gameplay logic in engine or world layers.

---

### 4. Gameplay, Entity, Effector & Tool Guidance
──────────────────────────────
#### Note on Dual-Role Entities (Entity as Object & Tool)
Some entities may serve as both objects and tools, depending on their use in gameplay. For example:
- **Colin**: Primarily an entity with object-like traits (physics, visuals, upgrades), but can also act as a tool (triggering actions, interacting with other entities).
- **Asteroid**: Can be a placeable entity (object), but also used as a tool (e.g., launching, triggering effectors).
When designing such entities:
- Create both a registry entry and blueprint for each role (object and tool) as needed.
- Ensure logic, parameters, and behaviors are modular and reusable.
- Cross-reference the relevant blueprints and registries for clarity.

#### Entities (formerly Objects)
- Entities are the core interactive elements in the Playground and mini-games. They may represent objects, tools, effectors, or hybrids.
- Each entity should have:
    - Registry entry (type, variant, metadata, tags)
    - Blueprint file (detailed plan: parameters, behaviors, upgrades, integration)
    - Logic/physics module (e.g., PlanetEntity.ts)
    - Visual module (e.g., PlanetVisual.tsx)
    - Types/variants module (e.g., PlanetTypes.ts)
- Entities can be placed, upgraded, and interact with effectors, tools, and other entities.
- Upgrades modify stats, visuals, and effector interactions.
- See Universal Starter and Entity/Object Starter for detailed prompts and required fields.

#### Effectors
- Effectors are modular actions or phenomena that trigger physics events and visual feedback.
- Each effector should have:
    - Registry entry (type, variant, metadata, tags)
    - Blueprint file (parameters, triggers, exclusions, integration)
    - Logic/physics module (engine/content, e.g., effectorSystem.ts)
    - Visual module (in /content/effector/, e.g., BurstVisual.tsx, RippleVisual.tsx)
- Effectors can be triggered by tools, objects, or game events, and interact with physics and visuals.
- Visuals for effectors must live in /content/effecto/ for modularity and future-proofing (not in engine).
- See Effector Starter for detailed prompts and required fields.

#### Interact Tools (Undo, Move, Reset, Launch, etc.)
- Interact tools are modular user actions that affect objects, effectors, groups, or the engine.
- Each tool should have:
    - Registry entry (type, name, parameters, tags)
    - Blueprint file (purpose, scope, behaviors, integration)
    - Clear definition of triggers (UI button, keyboard shortcut, context menu, etc.)
    - Parameters and state (e.g., maxUndo, maintainsState, targetType)
    - Behaviors and effectors (action, undoable, side effects, hooks)
    - Integration points (engine, content, registry)
- Tools live in `src/content/interact/` as separate files (e.g., UndoTool.ts, MoveTool.ts).
- Core tools include UndoTool, MoveTool, ResetTool, and future tools following the same blueprint.
- See the Tool Starter in Guidelines/Starters for detailed prompts and required fields.

#### Example Lifecycles & Modularity
- Entities (examples):
    - Planet: place, grow, react to effectors, apply upgrades (rings, lava, ice)
    - Star: heats, swells, supernova
    - Nebula: pulse, spiral, collapse into black hole
    - Comet: launch, slingshot, ping-pong behavior
    - Asteroid: launch & destroy
    - Spaceship: maneuverable, applies upgrades (weapons, shields), reacts to effectors
- Effectors:
    - Burst: particle explosion with physics force, visual variants per entity type
    - Nudge: drag or push entities interactively
    - Ripple: shockwave or oscillation effect
    - Gravity: localized vortex pull
    - Trail: continuous nudge or visual path effect
- Tools:
    - UndoTool: tracks last N actions, supports undo/redo, integrates with engine and UI
    - MoveTool: allows moving entities, respects group logic, integrates with engine
    - ResetTool: resets playground state, integrates with engine and UI

- Playground Entities:
    - Serve as a **sandbox** for testing physics, upgrades, effectors, and tools.
    - Mini-games leverage these as core building blocks with their own rules.
- Effector Modularity:
    - Each effector can have **base version**, **entity-specific variation**, and **upgrade variants**.
    - Visuals are separate from physics to allow reuse and flexible overlays.
- **Entities, Types, Variations, Visuals:**
    - Each entity (object, effector, tool, physics) should have:
        - Registry entry (type, variant, metadata)
        - Blueprint file (implementation plan)
        - Visual and logic modules separated
    - See src/content/planets and src/content/effectors for model structures.

---

### 5. Reusable Elements
──────────────────────────────
- UI icons: `components/ui/icons/`
- Buttons, sliders, tabs: `components/ui/components/`
- Constants: `utils/constants/entities.ts`, `effectors.ts`, `ui.ts`, `audio.ts`
- Shared helpers: physics, random, collisions, interactions, storage
- Styles: `styles/colors.ts`, `styles/glows.ts`, `neonThemes.ts`, `styles/shadows.ts`, `styles/zindex.ts`, `styles/spacing.ts`, `styles/fonts.css`, `styles/animations.ts`
- **Starters & Blueprints:**
    - All new entities should be created using the appropriate Starter prompt (see Guidelines/Starters).
    - Registry and Blueprint files are required for each new entity.

---

### 6. Future-Proofing
──────────────────────────────
- New entities (objects, effectors, tools, or upgrades) must follow the **modular Registry + Blueprint + physics + visual strategy pattern**.
- Always separate engine, scene, visuals, and UI responsibilities.
- Maintain upgrade slots and effectorModifier hooks for entity scalability.
- Physics and visuals must remain decoupled; overlays layer atop base models.
- Code architecture must be **consistent**, readable, and reusable across games.
- All entities must be designed for extensibility and future games.
─────────────────────────────────────────────

# Get the system rady to publis online.

Here are the main build errors preventing dist from being created:

Incorrect import/export:
src/app.tsx: PlaygroundScene should be imported as default, not named.
src/content/interact/move/index.ts: MoveTool should be default export.
Using require in React code:
BurstVisual.tsx and BurstEffectorVisual.tsx: require is not valid in browser/React. Use ES imports instead.
TypeScript isolatedModules:
src/content/entity/planet/index.ts: Use export type for types when isolatedModules is enabled.
Possible null errors:
src/content/worldbackgrounds/Stars.tsx: ctx and canvas may be null, add null checks.

You must statically import your planet entity and visual files (e.g., PlanetEntity.ts, PlanetVisual.tsx) in your main registry or orchestrator (such as startPlayground.ts or a registry file).
The file confirms that using only dynamic imports or registry patterns without static imports can cause Vite to tree-shake those files out, resulting in them missing from your dist folder and Netlify deployment.
The solution is to add explicit import statements for those files in your main entry or registry file.
patch your PlaygroundScene.tsx to make the planet rendering logic more robust?
to render planet visuals for all entities that are instances of PlanetEntity or have type === 'planet', making the check robust against minification or bundling issues.