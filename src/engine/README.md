# Engine Layer – Boundaries & Allowed Dependencies

The engine layer is strictly decoupled from UI, content, and game orchestration. It is responsible only for simulation, physics, entity management, and system orchestration.

## Allowed Imports
- Other engine modules (e.g., BaseEntity, physicsEngine, effectSystem)
- TypeScript/JavaScript standard libraries
- Third-party libraries for simulation/physics (e.g., matter-js types only)

## Forbidden Imports
- No React imports
- No UI/component imports
- No content imports (entities, visuals, overlays, registry, etc.)
- No game orchestration or tool logic
- No registry access
- No circular dependencies with content or game layers

## Responsibilities
- Entity lifecycle and simulation
- Physics and effect systems
- Tick/update loop
- System orchestration

## Code Review Checklist
- [ ] No forbidden imports (see above)
- [ ] No UI, content, or registry logic
- [ ] No tool/game orchestration logic
- [ ] All dependencies are engine-only or standard libraries
- [ ] Unit tests verify engine modules are decoupled

## Onboarding Note
If you need to extend the engine, ensure all new code follows these boundaries. Document any new dependencies or exceptions in this README.

## Additional Guardrails & Onboarding
- See ENGINE_DECOUPLING_CHECKLIST.md for the full code review checklist and onboarding steps for engine boundaries.
- Unit tests for forbidden imports and decoupling are in __tests__/engineBoundaries.test.ts.
- Lint rules are enforced via .eslintrc.engine.cjs and npm run lint:engine.
