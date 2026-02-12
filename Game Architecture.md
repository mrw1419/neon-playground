Neon Playground – High-Level Site Architecture 2.12.26

src/
 ├─ core/                     # Engine & physics
 │  ├─ Entity.ts               # Base class/interface
 │  ├─ EntityManager.ts        # Tracks active entities, update loop
 │  ├─ PhysicsWorld.ts         # Gravity, collisions, forces
 │  ├─ EffectSystem.ts         # Global/temporary effects
 │  └─ GameMode.ts             # Abstract rules & lifecycle hooks

 ├─ components/
 │  ├─ World/                  # Canvas & world state
 │  │  ├─ World.tsx
 │  │  ├─ WorldBackground.tsx
 │  │  └─ sessionState.ts
 │  │
 │  ├─ objects/                # Persistent objects
 │  │  ├─ Planet.tsx
 │  │  ├─ Star.tsx
 │  │  ├─ Nebula.tsx
 │  │  └─ ...others
 │  │
 │  ├─ effects/                # Temporary or modifying effects
 │  │  ├─ Burst.tsx
 │  │  ├─ Trail.tsx
 │  │  └─ ...
 │  │
 │  ├─ ui/                     # Game UI
 │  │  ├─ PersistentUI.tsx
 │  │  ├─ PlaygroundControlPanel.tsx
 │  │  ├─ ColinControlPanel.tsx
 │  │  ├─ radix/               # Radix-wrapped components
 │  │  ├─ elements/            # Custom reusable components
 │  │  └─ icons/               # Code-generated object/effect icons
 │  │
 │  ├─ audio/
 │  │  └─ AudioManager.tsx
 │  │
 │  └─ debug/
 │     └─ VisualDebugger.tsx

 ├─ styles/                    # Design tokens & constants
 ├─ utils/                     # Helpers & constants
 └─ games/                     # Mini-game wrappers
