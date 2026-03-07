──────────────────────────────
UNIVERSAL GAME EFFECTORS – 2.18.2026
──────────────────────────────

1. RADIAL EFFECTORS
──────────────────────────────
Burst:
  - Radial shockwave / explosion
  - Pushes or damages entities
  - Sizes XS → XXL
  - Optional: background change, screen-clear
Ripple / Wave:
  - Radial slowing or freezing effect
  - Crowd control, path creation
  - Variants: directional slice, ripple mine
Gravity / Black Hole:
  - Pulls entities inward
  - Spiraling motion optional at high strength
  - Can remove entities at max strength

2. LINEAR & DIRECTIONAL EFFECTORS
──────────────────────────────
Laser Beams:
  - Straight-line damage or effect
  - Optional piercing or bounce variants
Shock Lances:
  - Energy arcs / lightning in a line
  - Instant or traveling projectiles
Directional Ripples / Sonar Slices:
  - Focused wave in single direction
  - Nudge or freeze entities

3. TRAILS & MOVEMENT EFFECTORS
──────────────────────────────
Comet / Particle Trails:
  - Persistent visual effects following entity movement
  - Optional minor nudges to objects/entities
Momentum / Dash Boost:
  - Temporary speed effect
  - Can trigger small push on collisions
Afterimage / Ghost Trail:
  - Visual echo of movement for style or gameplay feedback

4. INTERACTION / IMPACT EFFECTORS
──────────────────────────────
Collision Sparks:
  - Impact visuals / minor force applied on hit
Explosion Debris:
  - Fragments that react physically in the world
Projectile Impact Waves:
  - Secondary radial effects from missiles or objects
Push / Pull Pads:
  - Temporary fields that move entities passing through
Sticky / Slow Zones:
  - Traps or environment effects slowing entities

5. AMBIENCE & COSMETIC EFFECTORS
──────────────────────────────
Background Shifts:
  - Color or visual theme changes for dramatic events
Particle Storms:
  - Confetti, sparks, star showers, or space dust
Glow / Aura Effects:
  - Persistent glow indicating power or hazard
Light Flares / Lens Effects:
  - Highlighting big events (supernova, boss attacks)
Sound-Linked Visuals:
  - Synced particle pulses or waves tied to sound cues

6. GAMEPLAY-TRIGGERED EFFECTORS
──────────────────────────────
Death Bursts:
  - Triggered on entity destruction
  - Small → massive scale depending on entity
Spawn Effects:
  - Visuals and minor physics upon new entity spawn
Ability Overcharge / Supersonic Effects:
  - Temporary state-based effects
  - Invincibility, extra force, screen-wide visuals
Environment Triggers:
  - Collapsing objects, timed traps, auto-activated devices

  ──────────────────────────────
  PLAN OF ATTACK: CREATING NEW EFFECTOR DATA SHEETS
  ──────────────────────────────

  To ensure all effectors are modular, extensible, theme-aware, and future-proof, follow this process for every new effector system:

  1. Visuals & Configs Registry
    - Standardize all effector visuals/configs in a YAML/block format.
    - Include: id, type, tags, component, themeKeys, compatibleEntities, description, crossLinks.

  2. Overlays/Modifiers Registry
    - If effectors have overlays or modifiers (e.g., visual overlays, effect stacking), create a registry for these using the same format.

  3. Variants & Types Registry
    - Refactor each effector data sheet to use the YAML/block format.
    - List all possible variants, themeKeys, compatibleEntities, triggers, upgradeability, and cross-links.
    - Include a baseSize/scale reference if relevant.

  4. Parent Type & Registry
    - Create or update a parent type/registry sheet for the effector family.
    - List all child effectors, shared logic, and extensibility hooks.

  5. Engine Modules Registry
    - Refactor engine module data sheets (e.g., PhysicsEngine, EffectorSystem) to the same format.
    - Include: id, type, tags, compatibleEntities, hooks, crossLinks.

  6. Interact Tools Registry
    - Refactor interact tool data sheets (Move, Undo, Paintbrush, etc.) to the same format.
    - List all possible tools, themeKeys, compatibleEntities, triggers, and cross-links.

  7. Entity Sheets (Top Level)
    - Ensure all entities reference effectors, overlays, visuals, and tools by registry name.
    - Include all possible options, themeKeys, compatibleTypes, and cross-links.

  8. Cross-Linking & Navigation
    - At the end of each sheet, add a “Cross-links” section referencing related registries and sheets.

  9. Modular Subfolders
    - Place each type of data sheet in its own subfolder (e.g., /Radial/, /Burst/, /Engine/, /Interact/).

  10. Document the Standard
    - Create a “Data Sheet Guidelines” doc summarizing the format and requirements for all new sheets.

  This plan ensures every new effector system is consistent, extensible, and ready for future expansion across all games and content.
