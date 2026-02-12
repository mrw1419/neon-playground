Neon Playground – Grand Vision & Instructions 2.12.26

1. Project Scope
- Cosmic playground + space-themed mini-games.
- Playground = core universe builder; all objects & effects are reusable.
- Mini-games (Colin, Spaceship, Asteroid) wrap Playground objects with their own rules.
- Visual style: neon, volumetric glow, cosmic mood, tactile sci-fi objects, glassmorphic/holographic UI.
- React components only; graphics are code-based vectors, no images.

2. Core Principles
- Modular: each object/effect is its own component; share across games.
- Physics-driven: Matter.js-based engine for gravity, collisions, motion.
- Interactive: user can place objects, trigger effects, and watch them respond.
- Reusable UI: Radix UI for controls + custom neon elements.
- Session-aware: track scores, progress, placement modes for continuity.

3. Objects & Effects
- Objects: Planet, Star, Nebula, Comet, Asteroid, Spaceship, Satellite, UFO, Colin (delete tool/game entity).
- Effects: Burst, Trail, Ripple, Gravity; can modify object behavior or purely visual.
- Lifecycle & interaction rules are central; objects respond to physics & user input.

4. UI & Controls
- PersistentUI: menus, account controls, global overlays.
- Game-specific control panels: PlaygroundControlPanel, ColinControlPanel, etc.
- Radix-wrapped components (Dropdowns, Sliders, Tabs, Tooltips) for consistent theme.
- Reusable elements (buttons, tabs) for rapid iteration.

5. Workflow Guidelines
- Reference this grand vision at start of each session.
- Maintain modularity & clear comments.
- Ensure accessibility: scalable text, color contrast, keyboard + touch support.
- End-of-session wrap-up: what was done, code changes, architecture updates, next tasks.

6. Future-Facing Notes
- Playground is the central “engine” for all mini-games.
- Physics engine integration allows emergent interactions.
- Objects and effects should always be reusable, extendable, and theme-consistent.
- Radix UI provides flexibility and clean styling without locking the engine.
