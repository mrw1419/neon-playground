────────────────────────────────────────────
UNIVERSAL ENTITY STARTER PROMPT – MODULAR + TOOLTIPS 2.26.2026 (Behavior-Ready)
────────────────────────────────────────────
Purpose:
Defines any entity, effector, effect, tool, physics module, or behavior for Playground or future games.
Provides baseline defaults, modular options, lifecycles, add-ons, and integration hooks.
Includes high-level tooltips for guidance when answering True/False/Hybrid.

────────────────────────────────────────────
1. IDENTITY & METADATA
────────────────────────────────────────────
Type (select one):
  ☐ Entity
  ☐ Effector
  ☐ Effect
  ☐ Tool
  ☐ Physics Module
  ☐ Behavior
Name: _______________________
Unique ID: __________________
Variant (optional): __________
Parent Type (optional): _______
Behavior Bucket (for engine behaviors): ☐ Follow ☐ Wander ☐ Orbit ☐ Reactive ☐ PhysicsAware ☐ Custom
Tags: ☐ Mechanical ☐ Organic ☐ Enemy ☐ Collectible ☐ Visual ☐ Utility ☐ Rare
Alignment: ☐ Good ☐ Evil
Theme Keys / Color Tokens: __________________

────────────────────────────────────────────
2. CORE STATS / ATTRIBUTES
────────────────────────────────────────────
For Entities:
  Mass: ______
  Radius: ______
  Durability: ______
  Energy: ______
  Drag: ______
  Faction / Alignment: ______
For Effectors/Effects:
  Power: ______
  Duration: ______
  Color / Visual Style: ______
  Stackable: ☐ True ☐ False ☐ Hybrid
For Tools:
  maxUndo: ______
  targetType: ______
  maintainsState: ☐ True ☐ False ☐ Hybrid
For Physics Modules:
  Type: ______
  Scope: ______
  Affected Entities: ______
  Parameters: ______
For Behaviors:
  Update Frequency: ☐ Every Tick ☐ Interval(ms): ______
  Requires Physics Info: ☐ True ☐ False ☐ Hybrid
  Requires Entity Context: ☐ True ☐ False ☐ Hybrid
  Parameters / Config: __________________________
  Attachable To: ☐ Entities ☐ Effectors ☐ Effects ☐ Tools ☐ Physics Modules

────────────────────────────────────────────
3. TRAITS & BEHAVIORS
────────────────────────────────────────────
☐ ExplodesOnDestroy ☐ MagneticCoreTrait ☐ RegeneratesShield ☐ RadialAttractionBehavior
☐ BounceBehavior ☐ DecayBehavior ☐ TrailEffectBehavior ☐ EvolutionBehavior
☐ Orbiting / Grouping ☐ FollowMouseBehavior ☐ CustomBehavior: _______
☐ BehaviorRegistry Registered: ☐ True ☐ False ☐ Hybrid

────────────────────────────────────────────
4. LIFECYCLE & STATE
────────────────────────────────────────────
Track age / maxAge: ☐ True ☐ False ☐ Hybrid
Destroyed / Sleeping State: ☐ True ☐ False ☐ Hybrid
Hooks / Triggers:
  ☐ onCollision ☐ onUpdate ☐ onBehaviorTick ☐ onDestroy ☐ onUpgradeSlotFilled ☐ onUpgradeRemoved
  ☐ time-based ☐ massThreshold ☐ Lifecycle Effects (supernova, nebula growth): ☐ True ☐ False ☐ Hybrid
  ☐ Behavior-dependent state changes ☐ True ☐ False ☐ Hybrid

────────────────────────────────────────────
5. INTERACTIONS & EFFECTORS
────────────────────────────────────────────
Can be Placed: ☐ True ☐ False ☐ Hybrid
Can be Removed: ☐ True ☐ False ☐ Hybrid
Can be Moved / Controlled: ☐ True ☐ False ☐ Hybrid
Interacts with Entities: ☐ All ☐ Some ☐ None
Interacts with Effects / Effectors: ☐ All ☐ Some ☐ None
Behaviors Trigger on Interaction: ☐ True ☐ False ☐ Hybrid
Add-on / Upgrade Compatibility: ☐ True ☐ False ☐ Hybrid
Hierarchy / Priority Rules: __________________

────────────────────────────────────────────
6. UI & TRIGGERING
────────────────────────────────────────────
Trigger Types: ☐ TabCard ☐ Launcher Component ☐ Button / KeyPress / Custom ☐ Context Menu ☐ Other: _______
Continuous / Holdable Trigger: ☐ True ☐ False ☐ Hybrid
Visual / Feedback Overlay: ☐ True ☐ False ☐ Hybrid
Behavior Debug Overlay: ☐ True ☐ False ☐ Hybrid

────────────────────────────────────────────
7. EXTENSIBILITY & FUTURE-PROOFING
────────────────────────────────────────────
Supports New Variants: ☐ True ☐ False ☐ Hybrid
Supports New Behaviors / Effects: ☐ True ☐ False ☐ Hybrid
Attachable Behaviors Dynamically: ☐ True ☐ False ☐ Hybrid
Reusable Across Games: ☐ True ☐ False ☐ Hybrid
Notes / Future Hooks: ________________________

────────────────────────────────────────────
8. INTEGRATION & MODULARITY
────────────────────────────────────────────
Core Engine Logic: src/engine/ ☐ True ☐ False ☐ Hybrid
Engine Behavior Folder: src/engine/behaviors/ ☐ True ☐ False ☐ Hybrid
Game-specific Content: src/content/ ☐ True ☐ False ☐ Hybrid
UI Components: src/ui/ ☐ True ☐ False ☐ Hybrid
Registry / Blueprint Storage: src/Guidelines/ ☐ True ☐ False ☐ Hybrid
BehaviorRegistry Link: src/engine/behaviors/index.ts ☐ True ☐ False ☐ Hybrid
Data Sheets Folder: /Guidelines/Datasheets/Entity/[EntityName]/
Cross-links: overlays, visuals, variant registries
Dependencies: ____________________________
Interaction Hierarchy: ______________________

────────────────────────────────────────────
9. REFERENCE & BASELINE
────────────────────────────────────────────
Default Baseline Values: ☐ True ☐ False ☐ Hybrid
Include All Granular Options for Reference: ☐ True ☐ False ☐ Hybrid
Output Data Sheet with True/False/Hybrid States: ☐ True ☐ False ☐ Hybrid
Behavior Integration Example Included: ☐ True ☐ False ☐ Hybrid

────────────────────────────────────────────
NOTES / HIGH-LEVEL SEQUENCE
────────────────────────────────────────────
This is the modular workflow for building entities, effectors, effects, tools, physics modules, and behaviors from the start:
1. Define entity/effect/effector/tool/behavior in data sheet using the Universal Starter Prompt.
2. Generate baseline modular blueprint from the data sheet (no real engine files yet).
3. Implement behavior logic in engine/behaviors/ (tick, attachable, deterministic, WorldState-aware).
4. Add hooks for lifecycle, triggers, upgrades, interactions, and behavior ticks.
5. Prepare overlay, visual, and variant registries for modular cross-linking.
6. Confirm integration points: engine, BehaviorRegistry, scene, UI, registry paths.
7. Enable iterative expansion: future variants, new behaviors, cross-game reuse, effect scaling.
────────────────────────────────────────────
