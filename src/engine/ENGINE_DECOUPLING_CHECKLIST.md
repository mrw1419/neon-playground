// Engine Decoupling Code Review Checklist
// Use this checklist for every PR or commit that touches engine modules.

- [ ] No React imports in engine modules
- [ ] No content imports (src/content/)
- [ ] No UI references (src/ui/)
- [ ] No tool logic or imports (src/game/interact/ or similar)
- [ ] No registry access (src/content/registry)
- [ ] Engine only knows about entities, systems, physics, and tick loop
- [ ] All engine modules are covered by unit tests for boundaries
- [ ] Lint rules for forbidden imports are passing
- [ ] No circular dependencies between engine/content/game
- [ ] All new engine code is documented in src/engine/README.md
- [ ] Checklist is updated as boundaries evolve

// Place this file in src/engine/ and reference in onboarding docs.
