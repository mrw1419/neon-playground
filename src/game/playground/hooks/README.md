# Neon Playground Game Hooks

## Domain Split
Hooks are now organized by domain for clarity and maintainability:
- placement/: Entity placement hooks (e.g., usePlanetPlacement, useColin)
- deletion/: Entity deletion hooks (e.g., useEntityDeletion)
- overlays/: Overlay management hooks (e.g., useOverlayManager)
- toolSelection/: Tool selection hooks (e.g., useToolSelection)
- physics/: Physics hooks (e.g., useBurst, usePhysics)
- effects/: Effect hooks (e.g., useEffects)
- engine/: Engine hooks (e.g., useEngine)
- entity/: Entity management hooks (e.g., useEntityManager)
- preview/: Preview overlay hooks (e.g., usePreview)

## Unified Pointer Abstraction
All hooks support unified pointer abstraction, handling both mouse and touch input via the `pointerUtils.ts` utility. This ensures cross-device compatibility and simplifies input logic.

### Usage Example
```ts
import { useEntityPlacement } from './hooks';

const placeEntity = useEntityPlacement(engine);
placeEntity(config, mouseEvent); // Mouse
placeEntity(config, touchEvent); // Touch
```

## Available Hooks
- useEntityPlacement
- usePlanetPlacement
- useColin
- useEntityDeletion
- useBurst
- useEffects
- useEngine
- useEntityManager
- usePhysics
- usePreview
- useOverlayManager
- useToolSelection

## Barrel File
All hooks are exported from `index.ts` for easy imports:
```ts
import { useEntityPlacement, useBurst } from './hooks';
```

## Future Utilities (planned)
- **Keyboard event abstraction**: For shortcuts and accessibility
- **Debounce/throttle functions**: For performance on rapid pointer/keyboard events
- **State synchronization helpers**: Sync UI state with engine or registry
- **Entity hit-testing**: Detect which entity is under a pointer
- **Drag-and-drop helpers**: For moving entities/tools
- **Overlay positioning logic**: Responsive overlays
- **Validation utilities**: Check entity configs or tool states
- **Undo/redo stack management**: For tool actions
- **Context provider helpers**: Access engine/effect contexts
- **Animation frame helpers**: Smooth updates outside React’s render cycle

## Best Practices
- Hooks are pure, stateless, and orchestrate only via engine/effect public APIs
- Never mutate simulation directly inside hooks
- Use pointer abstraction for all input handling
- Keep domain boundaries clear: placement, deletion, overlays, effects, physics, tool selection

## Testing
Automated tests for hooks are recommended, especially for input handling (mouse/touch). See blueprint for future test plans.

## Contributing
See architectural blueprint for guidelines. Extend hooks and utilities as needed, following domain-driven and registry-driven patterns.
