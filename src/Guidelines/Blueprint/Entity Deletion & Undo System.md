# Entity Deletion & Undo System – Action Plan

Stopped at the delete tabCard because of patchwork playground file. Will resume this work after the playground has been detangled.

## Context
Entity removal (deletion) will be supported for all entities via a Delete tool/card or dedicated delete button (e.g., for Colin), as well as through automatic triggers (such as moving outside the viewport or special interactions like black holes). In the Playground game, deletion is only enabled for entities, but the system is designed to be globally reusable and configurable per game (can be enabled/disabled for effectors or other types as needed).
UndoTool enables users to reverse their most recent actions—placement, deletion, or move—for all entities (not effectors) in the Playground game. Note: actions that result from Colin eating objects cannot be undone. The undo/redo system is global and extensible, and can be configured to support additional object types or actions in other games.
    - <span>{Objects on canvas: ${entityCount}}</span>
    - This is shown inside a fixed-height utilities wrapper for panel consistency.
    - The value comes from the entityCount prop, which is passed in from the parent component.
    - The display logic is identical for both tabs, ensuring users always see the current count.

---

## MVP Requirements

- Support entity deletion via Colin (Aka Delete) tabCard in the playground control panel, or automatic triggers (viewport exit, special interactions).
- UndoTool reverses most recent placement, deletion, or move for all entities (not effectors); Colin eating actions are not undoable.
- Action history tracks last 11 user actions for undo/redo.
- Control panel and Interact tab include Delete and Undo tabCards; entityCount updates after deletion/undo.
- UI provides clear feedback when undo/redo is not possible (e.g., empty history) will be triggered by a modal? and should we make a universal modal component? See UI Component Starter
- Visual feedback for successful undo/redo and deletion actions.
- Robust error handling for undo/redo (e.g., missing/deleted entities).
- Manual QA checklist: verify undo/redo after rapid add/delete cycles, test all entity types, test error states.
- Keyboard accessibility for undo/redo and delete actions.
- All requirements above are covered by unit and integration tests.

---

## Future Plans & Optimizations

- Support compound/batch actions (multi-entity selection and deletion, group undo).
- Handle entity dependencies (parent/child, linked objects) in undo/redo and deletion.
- Define behavior for entity recreation with same ID (should undo restore original or new?).
- Address action history with permanently removed/invalidated entities.
- Audio feedback for actions (optional).
- Persistence: serialize/restore action history and undo/redo state for save/load or session persistence.
- Configurable: reset or persist undo/redo history on game/module switch.
- Memory management for large/long-running sessions (prune old history, handle thousands of entities).
- Debounce or batch undo/redo for rapid user input.
- Screen reader support and ARIA labels for all actions.
- Onboarding/tooltips for undo/redo and delete features.
- Hooks or extension points for plugins/mods to add custom undoable actions or deletion logic.
- API for external modules to register new action types.

## Next Steps & Checkable Tasks

# 1. Research & Preparation
- Before implementing or updating entity logic, be sure to read through the relevant datasheets in [Datasheets/](../../Guidelines/Datasheets/):
    - [Planet](../../Guidelines/Datasheets/Entity/Planet.md)
    - [Colin](../../Guidelines/Datasheets/Entity/Colin.md)
    - [Effects](../../Guidelines/Datasheets/Effects/)
These documents cover formatting, properties, behaviors, and design notes essential for consistency and understanding.
- We will start our work on Colin using the [Universalstarterprompt](../../Guidelines/Starters/✏️Universal%20Starter%20Prompt.md) in the Guidelines/Starters folder and the [Object to Entity Blueprint](../../Guidelines/Blueprint/Object%20to%20Entity%20Blueprint.md) in /Blueprints.
- See /styles for colors, tokens, glows, and themes.

# 2. Entity Integration & UI
- [X] Finalize [ColinEntity.ts](../../content/entity/colin/ColinEntity.ts) and [ColinVisual.tsx](../../content/entity/colin/ColinVisual.tsx) integration so Colin can be placed on the canvas like other entities.
    - [X] Plan of Attack for Colin Integration:
        X. Review and adapt the SpaceWorm (Colin) visual and animation code to fit the modular entity/component structure (preserving animated segments, head, mouth, teeth, eyes, and chomp effect).
        X. Refactor ColinVisual to accept props for position, state, and engine-driven updates, so it can be managed by the engine/physics system like other entities.
        X. Implement ColinEntity logic to support physics, placement, and interactions as required by playground rules (e.g., follow mouse, chomp, undulate, but allow for future extensibility).
        X. Ensure ColinEntity is registered in the entity registry and can be instantiated via the control panel or game logic.
        X. Integrate ColinVisual with ColinEntity, ensuring state and animation are synchronized with entity data and engine updates.
        start with the overlay logic, placement handler, handle click-to-place for ColinEntity or full integration
        X. Test Colin placement, rendering, and interaction in the playground scene, confirming it behaves as a managed entity.
            engine's render method only draws entities with parentType === 'Rocky' or constructor.name === 'PlanetEntity' on the canvas. This seems very specific for the engine. Do we need to make sure every entitiy is added to the engine after we make it?
            In summary: Yes, always add entities to the engine, but use React for visuals unless/until the engine's canvas renderer is made more generic.
            To ensure overlays and React keys work, each ColinEntity instance in the engine should have a unique id property (e.g., a counter or UUID)
            Render any entity with a toReactVisual method using that method.
            Fallback to the old logic for legacy/unknown types.
            entity.constructor?.name === 'PlanetEntity' (renders a planet visual)
            entity.constructor?.name === 'ColinEntity' (explicitly returns null, so Colin is never rendered visually)
            ensure the entity list is always up-to-date and rendered independently of the control panel tab state, so entities always appear on load and after placement, regardless of which tab is active.
            ColinEntity now exposes position and radius at the top level, just like PlanetEntity. This allows the global overlay system in PlaygroundScene to display Colin's overlay info correctly.   
            All high-frequency diagnostic logs have been removed from PlaygroundScene
        X. Document any Colin-specific props, hooks, or engine integration points for future games or interactions.
        X. Ensure all code follows the Registry & Blueprint pattern for cross-game reusability.
- [X] Add UI logic to allow users to select and place Colin from the Interact tab > Colin tabCard.
    X. Locate the Interact tab and TabCard logic:
     - Find where the Interact tab and its tab cards are defined (likely in the control panel or a related component, e.g., PlaygroundControlPanel, Tabs, or a similar file).

    X. Add a Colin TabCard:
     - Create a new TabCard for Colin if it doesn’t exist.
     - Use the same pattern as other entity tab cards (like Planet or Move).
     - The Colin TabCard should be visible in the Interact tab.

    X. Implement selection logic:
     - When the Colin TabCard is clicked, set the current tool or selection state to “Colin.”
     - This may involve updating a selectedTool or selectedEntityType state in the control panel or context.

    X Handle placement logic:
            1. Colin follows the cursor after placement:
             - ColinEntity already has a setMouseTarget method and logic to follow a mouse position.
             - You need to update Colin’s mouse target on mouse move (and touch move for mobile).

            2. Support for touch devices:
             - Listen for touch events (touchmove) and update Colin’s mouse target accordingly.

            X. Only one Colin at a time:
             - On Colin placement:
                 • If a Colin already exists, update its position to the new placement and set its mouse/touch target to follow the cursor.
                 • If no Colin exists, spawn a new one as usual.
                Only allow one Colin entity at a time.

            X. Remove Colin when switching TabCard:
             - When selectedInteract changes from "Colin" to something else, remove Colin from the engine/entities.

    X. Update visuals and overlays


**Summary:**
X Colin only appears when the Colin TabCard is selected.
X Only one Colin at a time.
X Colin is removed when switching away from the Colin tool.

    X. Test the flow:
     - Select Colin from the Interact tab.
     - Click on the canvas to place Colin.
     - Verify Colin appears and behaves as expected.
     - Confirm overlays and diagnostics update as expected.

# 3. Deletion, Undo/Redo, and Action History
- [ ] Implement flexible entity deletion logic in PlaygroundScene:
    - Support deleting any entity (not just Colin) via the comet (Delete tabCard)
    - viewport exit, or special interactions (e.g., black holes).
    - Ensure deletion logic is extensible for future entity types and removal triggers.
    - Remember we did tool logic into src/game/playground/tools/ for delete. We'll move move tool later on.
    Test delete tool workflow and validate entity deletion
- [ ] Ensure Colin can be delete items using the new flexible deletion logic (Delete tool/card, viewport exit, or special interactions), and that Colin's actions are tracked in the undo/redo system.
- [ ] Integrate UndoTool: track and reverse the last action (placement, deletion, move) for all entities.
- [ ] Maintain an action history array (last 8–16 actions) for undo/redo, supporting all entity types and actions.
- [ ] Test that Colin’s placement, deletion, and undo/redo actions are tracked in the action history system.
- [ ] Update control panel and Interact tab to include Delete and Undo tools/cards, reflecting the current set of supported actions.
    - When adding the Undo TabCard, reference the [UndoTool datasheet](../../Guidelines/Datasheets/Interact/UndoTool.md) for requirements and structure. Emulate the MoveTool’s implementation pattern for consistency (see [MoveTool.ts](../../content/interact/move/MoveTool.ts)).
- [ ] Ensure entityCount updates after any entity is added, deleted, or restored via undo.

# 4. System Architecture & Documentation
- **Reusable Undo/Redo & Action History System (Extensible for All Entities)**:
    - Abstract undo/redo and action history logic into a reusable hook or module, fully decoupled from PlaygroundScene and entity-specific logic.
        - Implement undo/redo and action history logic as a global, reusable hook or module in /content/effect, fully decoupled from PlaygroundScene and entity-specific logic.
            - Will need the main tsx file, a visual file for this visual effect (see content/effects/entityOverlay for basic visual look for MVP)
            - Will need a .md guidelines file created in the folder.
        - Design this system for multi-game support: ensure APIs, action types, and state management are generic and extensible so the same module can be imported and used across different games in the Neon suite (not just Playground).
    - Use generic action types and payloads to support all current and future entity types and actions (placement, deletion, move, property edit, special removals).
    - Track all entity state changes for undo/redo, including removals by tools, viewport exit, or special effects (e.g., black holes).
    - Add robust error handling and validation (e.g., prevent undo if history is empty, handle deleted or missing entities gracefully).
    - Make the system extensible for redo, multi-step undo, batch actions, and new removal triggers.
    - Document API and integration steps for adding new entity types, removal methods, and custom actions.
    - Provide unit and integration tests for action history and undo/redo logic, covering all supported entity types and removal scenarios.
    - Optimize for performance with large numbers of entities and frequent actions (efficient history management).
    - Allow configurable history length per game/module.
    - Allow for future use case of showing next planned steps (say if they're fighting a boss and it'll show the turns of the players and the boss)
    - Allow for future use case where player can change the order of the history - maybe some time control game functionality?
- [ ] Document the new system and logic in the Blueprint, including extensibility for new entity types and removal methods.

**reusable (global) modules and components **

1. Action History & Undo/Redo System (Global)
    Purpose: Tracks entity actions (placement, deletion, move, etc.) and enables undo/redo.
    Location:
    /src/content/effects/actionHistory/
    useActionHistory.ts (hook or module)
    ActionHistoryManager.ts (class or utility)
    ActionHistoryVisual.tsx - establish MVP visual - take visual queues from the /content/effects/entity and effector overlays reference other datasheets for inspiration
    ActionHistory.md (guidelines/documentation) - squeeze as much creative juice as you can for future ideas for multi-game use
    Extensible: Designed for all games, not just Playground.
X. Delete Tool (Global)
    Purpose: Handles entity deletion via tool/card, viewport exit, or special interactions.
    Location:
    /src/content/interact/delete/
    DeleteTool.ts (logic)
    DeleteVisual.tsx - establish MVP visual - ask if you need guidance on look/feel/color, etc.
    DeleteTool.md (guidelines)
    Trigger: In Playground, Colin card acts as Delete tool; other games can use different triggers.
3. Undo Tool (Global)
    Purpose: Enables undo/redo for entity actions.
    Location:
    /src/content/interact/undo/
    UndoTool.ts (logic)
    UndoVisual.tsx (optional visual/overlay)
    UndoTool.md (guidelines) - squeeze as much creative juice as you can for future ideas for multi-game use. reference other datasheets for inspiration
    Pattern: Emulate MoveTool structure for consistency.
4. Entity Overlay Visuals (Global)
    Purpose: Visual feedback for entity state, deletion, undo/redo actions.
    Location:
    entityOverlay
    Already exists; extend as needed for new feedback types - yes please!
5. Registry/Factory Pattern (Global)
    Purpose: Data-driven registration of entities, tools, and actions for automation and extensibility.  reference other datasheets for inspiration
    Location:
    registry
    EntityRegistry.ts
    ToolRegistry.ts
    ActionRegistry.ts (optional)
6. Guidelines & Documentation
    Purpose: Document APIs, integration steps, extensibility.
    Location:
    Blueprint
    Datasheets
    /src/content/effects/actionHistory/ActionHistory.md
    /src/content/interact/delete/DeleteTool.md
    /src/content/interact/undo/UndoTool.md




# Lessons Learned: Colin Entity Integration (2026-02-23)

## Additional Lessons from 2026-02-23 Session

- **Tab and Card Selection Logic:** The playground uses a coordinated state system for tab and card selection, ensuring only one tool or card is active at a time. Helper setters and shared state manage which tool/entity/effect is active, and side effects (like Colin's appearance) are tied to this logic.

- **Manual Integration for New Tools/Entities:** Adding a new effector, entity, or interact tool currently requires manual updates to the selection logic, UI, and any special placement/removal logic. This gives fine control but can be refactored to a registry/factory pattern for future automation.

- **Event Handler Conflicts:** Placement bugs can arise from overlapping or conflicting event handlers (e.g., onClick vs. onMouseUp). Relying on a single, well-defined handler for entity placement prevents duplicate or missed placements.

- **Unique IDs for React Keys:** Ensuring all entities (including Colin) have unique ids is critical for React keying and overlay diagnostics. This prevents duplicate key warnings and ensures overlays and visuals update correctly.

- **Robust Placement/Removal Patterns:** Colin is now spawned only when the Interact tab and Colin tool are both active, and is removed when leaving the tab or switching tools. This pattern ensures predictable, user-driven entity management and can be reused for other singleton or special entities.

- **Debug Log Hygiene:** All high-frequency or redundant debug logs should be removed after stabilization to keep the console clean and focused on real issues.

- **Documentation and Blueprint Updates:** All new patterns, lessons, and architectural decisions should be documented in the blueprint and guidelines to ensure future contributors understand the rationale and can extend the system consistently.


## Key Steps & Insights

- **Blueprint-Driven Development:** Followed project blueprints and best practices for modular, extensible entity creation and integration.
- **File Structure:** Placed ColinEntity.ts and ColinVisual.tsx in their own folder under content/entity/colin/ for clarity and modularity.
- **Entity Registration:** Registered and spawned ColinEntity via PlaygroundScene, using dynamic import for extensibility.
- **Unique Ids:** Ensured each ColinEntity instance has a unique id for React keying and overlay diagnostics.
- **Type, Position, Radius:** Exposed type, position, and radius as top-level properties on ColinEntity for overlays and diagnostics.
- **Visual Decoupling:** Used a toReactVisual method on ColinEntity to render its visual, keeping rendering logic modular and future-proof.
- **Overlay System:** Overlays are rendered globally in PlaygroundScene, not in the entity file; Colin overlays appear when type/position/radius are present.
- **Single Colin Spawn:** Patched PlaygroundScene to check for an existing Colin before spawning, ensuring only one Colin is present at a time.
- **Mouse-Follow Logic:** Implemented a global mousemove listener in PlaygroundScene that calls setMouseTarget on Colin, enabling smooth mouse-follow behavior.
- **Update Loop Integration:** Fixed a critical bug by ensuring engine.update(dt) is called every frame, so Colin and all entities update and animate as intended.
- **Debug Log Hygiene:** Removed excessive debug logs from Colin and PlaygroundScene for a clean console and easier debugging.
- **Rendering Bugs:** Fixed issues where Colin was not rendered due to legacy logic filtering by constructor name; switched to a modular rendering approach for all entities.
- **Cache & Dev Server:** When encountering persistent issues, stopped the dev server, cleared .vite/dist/build caches, and restarted to ensure all changes were applied.
- **Debugging Approach:** Used diagnostic logs, unique keys, and overlays to trace rendering and entity state issues.
- **No Overlay in Entity File:** Confirmed that EntityOverlayVisual is not imported or used in ColinEntity.ts; overlays are managed globally.

## Additional Lessons (2026-02-23)
  
**Head Rotation & Facing Direction:**
- Add an `angle` property to the entity to track the facing direction (in radians).
- In the entity's `update` method, calculate the angle to the target (e.g., mouse) using `Math.atan2` and update the property each frame.
- Pass the angle to the visual component (e.g., via `toReactVisual`) so the head or main visual can rotate to face the target.
- In the visual component, use an SVG `<g transform="rotate(...)" />` to rotate the head or relevant part based on the angle prop.
- This pattern is reusable for any entity that needs to face a target (mouse, another entity, etc.).

**Entity Design for Mouse-Follow/Rotation:**
- Design entities with extensibility in mind: expose both position and angle, and keep movement/rotation logic in the entity, not the scene.
- The scene/game mode should only be responsible for passing the target (e.g., mouse position) to the entity, not for calculating movement or rotation.
- This separation makes it easy to reuse the same entity logic in other games or scenes with different input sources.

**Colin Example:**
- ColinEntity was already designed with a segmented body and a clear head segment, making it easy to add rotation.
- By updating the head's angle in the entity and passing it to the visual, Colin's head now smoothly rotates to follow the mouse.
- **Update Loop Is Critical:** Colin's movement and all entity logic depend on engine.update(dt) being called every frame. Missing this call will break all entity behaviors.
- **Preventing Duplicates:** Always check for an existing entity before spawning unique/singleton entities like Colin to avoid duplicates.
- **Mouse-Follow Pattern:** For mouse-following entities, use a global event listener and a setMouseTarget method on the entity for clean separation of concerns.
- **Debug Log Hygiene:** Remove or comment out diagnostic logs once the feature is stable to keep the console clean and focused on real issues.


## Troubleshooting Checklist

- If Colin or overlays do not appear:
  - Ensure ColinEntity exposes type, position, and radius at the top level.
  - Confirm only one Colin is spawned for clarity.
  - Check that overlays are rendered globally in PlaygroundScene.
  - Restart the dev server and clear caches if changes are not reflected.
  - Use unique ids for all entities to avoid React key issues.

# Effector Store-Driven Deletion & Undo System (2026)

Entity deletion, undo/redo, and action history are now managed via Effector stores ($entities, $history) for robust, real-time updates and debugging.

- All entity state changes (add, delete, move, undo, redo) flow through Effector events/stores.
- The UI, overlays, and visuals subscribe to these stores using useUnit for instant feedback and reactivity.
- Deletion is performed by updating the Effector store (removing the entity from $entities and pushing the new state to $history).
- Undo/redo is managed by $history, supporting time travel and state restoration for all entity actions.
- Action history is part of the Effector store, supporting robust undo/redo and extensibility for new action types.
- Overlays and entity visuals are fully reactive to Effector stores, not engine state directly.
- All deletion triggers (tool, viewport exit, special interactions) use the same store-driven pattern.

## Future Steps to Complete & Expand

- [ ] Refactor all entity deletion, undo, and redo logic to use Effector stores exclusively (no direct engine mutations).
- [ ] Ensure all overlays, visuals, and UI components subscribe to $entities/$history for real-time updates.
- [ ] Expand action history to support batch actions, multi-entity selection, and group undo/redo.
- [ ] Add serialization/persistence for undo/redo history to support save/load and session restore.
- [ ] Make the system extensible for new entity types, effectors, and custom actions (e.g., property edits, special removals).
- [ ] Optimize for performance with large entity counts and frequent actions (efficient history management).
- [ ] Add hooks or extension points for plugins/mods to register new undoable actions or deletion logic.
- [ ] Document API and integration steps for adding new entity types, removal methods, and custom actions.
- [ ] Provide unit and integration tests for all supported entity types and removal scenarios.
- [ ] Ensure accessibility (keyboard, screen reader, ARIA labels) for all undo/redo and delete actions.
- [ ] Add onboarding/tooltips for undo/redo and delete features.
- [ ] Integrate with the registry/factory pattern for fully data-driven expansion.

## Expansion for Comic Playground of Games

- Design the Effector store-driven deletion and undo system as a global, reusable module for all Neon games (not just Playground).
- Use generic action types and payloads to support all current and future entity types and actions across games.
- Allow configurable history length and persistence per game/module.
- Support cross-game object portability and undo/redo for shared entities.
- Enable plugin-style dynamic module loading for custom undo/redo logic in future games.
- Plan for future use cases: time control, action reordering, AI-driven undo/redo, and collaborative editing.



