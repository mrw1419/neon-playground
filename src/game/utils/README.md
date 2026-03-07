# Utilities README


This folder contains pure, reusable utility functions for the game layer. Utilities must:
- Be stateless and have no side effects
- Never mutate world or engine state
- Be covered by unit tests (see __tests__/utils.test.ts)
- Be organized by domain (math, color, physics, random, etc.)
- Be exported via the barrel file (index.ts)

## Checklist for Utility Functions
- [ ] Pure function (no side effects)
- [ ] No world/engine state mutation
- [ ] Unit test exists in __tests__/
- [ ] Documented input/output and edge cases
- [ ] Included in barrel export (index.ts)

## Example Files
- math.ts: Math helpers
- physicsHelpers.ts: Physics calculations
- color.ts: Color manipulation
- random.ts: Random number helpers

## Contribution Guidelines
- Add new utilities in a domain file (e.g., math.ts)
- Add/extend unit tests in __tests__/utils.test.ts
- Update index.ts for barrel export
- Update this README if new domains are added

## Onboarding Note
All utility modules are tested in __tests__/utils.test.ts and exported via index.ts. Review this README and the barrel file before adding new helpers.
