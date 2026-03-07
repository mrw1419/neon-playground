# Neon Playground

## Overview
Neon Playground is a modular, engine-driven sandbox for rendering interactive entities (like planets) and overlays. It uses a custom engine, React components, and hooks to manage entity lifecycles, visuals, and overlays.

## Engine & Entity System
- The engine manages all entities (planets, effectors, tools, etc.) and their lifecycles.
- Entities are created using BaseEntity and extended in entity.ts and planet-specific files.
- Planets are spawned randomly at startup using hooks (e.g., useInitialRandomPlanets) and can be reset or randomized.
- EntityLayer renders entities by looking up their visual components in the registry.

## Planet Spawning
- Planets are spawned with random position, colorTheme, and overlays.
- Old planets are removed before new ones are spawned to avoid duplicates.
- PlanetEntity options (colorTheme, overlays, etc.) are randomized for variety.

## Overlays
- OverlayLayer renders overlays for entities, including info overlays and visual overlays (craters, auras, etc.).
- Info overlays are filtered to show only relevant entities (e.g., planets with infoOverlayEnabled).
- Visual overlays are rendered by components like CratersOverlayVisual, using theme colors and entity props.

## Hooks
- useInitialRandomPlanets: Spawns random planets at startup.
- usePlanetPlacement: Handles user-driven planet placement.
- useOverlayManager: Manages overlays and info overlays.
- Other hooks manage effectors, physics, and entity deletion.

## Debugging & Logging
- Emoji log keys are used throughout for traceability (see Blueprint/🧑‍⚕️ Playground Surgery.md for log key reference).
- Wiring diagrams document the flow of entity spawning, rendering, and overlays for onboarding and debugging.

## Best Practices
- Keep entity logic in entity.ts and baseentity.ts; use hooks for modular features.
- Only remove planet entities when resetting planets; other entities may persist.
- Document custom rules, hooks, and wiring diagrams for future maintainability.

## Getting Started
1. Run `npm install` to install dependencies.
2. Start the dev server with `npm run dev`.
3. Open PlaygroundScene to see random planets and overlays in action.
4. Use the control panel and overlays to interact with entities.

## Reference
- For detailed wiring diagrams and log keys, see Blueprint/🧑‍⚕️ Playground Surgery.md and Guidelines/Wiring Diagrams.md.
- For entity system details, see Blueprint/Entity System Blueprint.md.