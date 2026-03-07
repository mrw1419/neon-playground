# Game Context README

This directory contains context providers for the Neon Playground game engine.

## Boundaries
- Context files must NOT import from src/content/ or entity classes.
- Context may reference engine types only.

## Usage Patterns
- Use TypeScript interfaces for context values to enforce strict boundaries and clarity.
- Context providers should propagate engine/effect state only.
- Consumers must access engine types, not content/entity logic.
- When importing context hooks in playground components, use '../../context/EngineContext' and '../../context/EffectContext' for correct paths.

## Code Review Checklist
[X] No imports from src/content/ or entity classes
[X] Only engine types referenced
[X] Context values defined via TypeScript interfaces
[X] Unit tests verify correct value propagation and isolation

## Isolation Pattern
- Engine → Context → Hooks → Layers → Content Visuals

## Onboarding Notes

Welcome to the Neon Playground game context layer!

## Onboarding & Boundaries
- See Blueprint/🎮 Playground detangling.md for the full execution plan and checklist.
- Context files (EngineContext, EffectContext) must NOT import from src/content/ or entity classes—engine types only.
- All entity/effect logic lives in hooks and layers, not in context or PlaygroundScene.
- Engine → Context → Hooks → Layers → Content Visuals is strictly enforced.
- Code review checklist and onboarding are in this README and the detangling blueprint.
- Unit tests verify correct value propagation and isolation.

### Contributor Tips
- Use hooks for orchestration, layers for rendering.
- Document context usage patterns and boundaries.
- Add unit tests for context providers.
- Log engine tick + effect queue for quick verification.
- Review all context consumers for boundary compliance.

---
