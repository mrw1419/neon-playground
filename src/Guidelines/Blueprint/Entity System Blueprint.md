# Entity System Blueprint

## Overview
The entity system in Neon Playground is designed for modular, extensible management of all game objects (planets, effectors, tools, overlays, etc.). Entities are created, updated, and removed by the engine, and rendered via React components.

## Entity Lifecycle
- Entities extend BaseEntity and are managed by the engine.
- Entities can be spawned, updated, and removed using engine methods.
- Planets are a special entity type, spawned randomly at startup and reset as needed.

## Planet Spawning Logic
- Planets are spawned using hooks (useInitialRandomPlanets, usePlanetPlacement).
- Each planet gets a random position, colorTheme, overlays, and options.
- Old planets are removed before new ones are spawned to avoid duplicates.
- Registry maps entity types to their visual components for rendering.

## Overlays
- OverlayLayer renders overlays for entities, including info overlays and visual overlays.
- Info overlays are filtered to show only relevant entities (e.g., planets with infoOverlayEnabled).
- Visual overlays (craters, auras, etc.) are rendered by dedicated components using entity props and theme colors.

## Hooks & Modularity
- useInitialRandomPlanets: Handles random planet spawn at startup.
- usePlanetPlacement: Handles user-driven planet placement.
- useOverlayManager: Manages overlays and info overlays.
- Other hooks manage effectors, physics, and entity deletion.

## Best Practices
- Keep entity logic in entity.ts and baseentity.ts for maintainability.
- Use hooks for modular features and future expansion.
- Only remove planet entities when resetting planets; other entities may persist.
- Document custom rules, hooks, and wiring diagrams for onboarding and debugging.

## Reference
- See README.md for high-level architecture.
- See Blueprint/🧑‍⚕️ Playground Surgery.md and Guidelines/Wiring Diagrams.md for wiring diagrams and log key reference.

---
## Purpose
- Modularize entity management for scalability, testability, and architectural purity.
- Decouple entity logic from engine core, matching effectSystem pattern.

---
## Refactor Steps
1. **Create EntitySystem class**
   - Handles entity storage, creation, update, removal, queries.
   - API: addEntity, removeEntity, getEntities, update(dt), filterEntities, etc.

2. **Move entity array and related methods from WorldLayer to EntitySystem**
   - Remove direct entity management from WorldLayer.
   - WorldLayer holds a reference to EntitySystem.

3. **Update WorldLayer**
   - On each tick, call entitySystem.update(dt).
   - For entity queries, use entitySystem.getEntities().
   - For entity addition/removal, delegate to entitySystem.

4. **Update hooks and game layer**
   - Refactor hooks (useEntityManager, useEntityPlacement, etc.) to use entitySystem API.
   - Update any direct references to WorldLayer.entities.

5. **Testing and migration**
   - Add unit tests for EntitySystem methods.
   - Validate entity lifecycle, queries, and updates.
   - Migrate existing entity logic to new system.

---
## Impact Assessment
- **Time Estimate:** 2-4 hours for initial refactor, plus 1-2 hours for migration/testing.
- **Breakage Risk:** Moderate. All entity-related code (spawning, removal, hooks, queries) must be updated. Careful migration and testing required.
- **Benefits:**
  - Cleaner engine code
  - Easier future expansion (behaviors, AI, networking)
  - Consistent system architecture
  - Improved testability

---
## Migration Checklist
- [ ] EntitySystem class created
- [ ] WorldLayer refactored to use EntitySystem
- [ ] All hooks updated to use EntitySystem
- [ ] All entity queries and mutations migrated
- [ ] Unit tests added for EntitySystem
- [ ] Manual and automated tests pass

---
## Notes
- Refactor is optional for current scale, but recommended for future-proofing and architectural consistency.
- Can be done incrementally: start with storage/methods, then migrate hooks and game logic.
