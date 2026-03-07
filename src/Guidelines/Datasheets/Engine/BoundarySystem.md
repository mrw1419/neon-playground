# BoundarySystem Datasheet

## Essence
BoundarySystem is responsible for managing entity behavior at world boundaries. Its primary function is automatic entity deletion for out-of-bounds entities, but it is designed for extensibility across multiple games and boundary-related mechanics.

## API
- `runBoundaryCheck(engine, boundary)`
  - Iterates engine.entities
  - Checks each entity's position against boundary limits
  - Calls engine.removeEntity(id) for out-of-bounds entities
- `Boundary` interface: `{ xMin, xMax, yMin, yMax }`

## Integration Points
- Called from EntityLayer.tsx (recommended) or PlaygroundScene.tsx
- Works with any engine that exposes `entities` and `removeEntity`
- Decoupled from UI and React

## Future Uses & Expansion Ideas
- Teleport entities to opposite edge (world wrapping)
- Trigger special effects or events when entities cross boundaries
- Boundary-based scoring, penalties, or achievements
- Dynamic boundaries (moving, shrinking, expanding)
- Cosmic universe variants: portals, wormholes, edge-of-space triggers
- Use for effector boundaries, effect zones, or spatial triggers
- Sandbox for experimental boundary mechanics in new games

## Example Usage
```ts
import { runBoundaryCheck, Boundary } from './BoundarySystem';

const boundary: Boundary = { xMin: 0, xMax: 1000, yMin: 0, yMax: 800 };
runBoundaryCheck(engine, boundary);
```

## Notes
- Designed for maximum reusability and future-proofing
- Documented in src/game/systems/boundary/README.md, detangling checklist, and this datasheet
- BoundarySystem now lives in src/game/systems/boundary/ for universal use across all games
- As features expand, add submodules to src/game/systems/boundary/
- Avoid placing in /content/systems, since boundary logic is engine/game layer, not content
- Starting with a folder structure prevents future import refactors
