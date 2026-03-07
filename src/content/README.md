Radial Effector Visual Registry
--------------------------------

Each radial effector variant (burst, ripple, gravity, nudge) has its own visual component and registry entry:

- burst: BurstEffectorVisual
- ripple: RippleEffectorVisual
- gravity: GravityEffectorVisual (future)
- nudge: NudgeEffectorVisual (optional/future)

Visuals are modular and extensible for new variants and reusable VFX overlays.
Canonical visuals are defined per effector variant; reusable VFX overlays are registered in /effects/radialeffector.

For onboarding and extensibility, reference the data sheets for each effector type:
- Datasheets/Effector/Radial/Burst
- Datasheets/Effector/Radial/Ripple
- Datasheets/Effector/Radial/Gravity
- Datasheets/Effector/Radial/Nudge


## Registry Boundaries & Onboarding
- The registry (registry.ts) is the single source of truth for entity and effector visuals/classes.
- Only the game layer should import the registry. Engine and content must not import from game or registry.
- See the data sheets for onboarding and extensibility for each effector/entity type.
- For more, see README.md in this folder and the Game Architecture Map.

This structure guides extensibility and onboarding for new visuals and variants.
Gravity and Nudge visuals can be added as needed.
