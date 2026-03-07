# things to keep for commands
npm run dev
npm run build

Stop the dev server completely.
Delete the .vite (or dist, build, or similar) cache folders if present.
Start the dev server again (npm run dev).

pkill -f vite
rm -rf .vite dist build
npm install
npm run dev

pkill -f vite && rm -rf .vite dist build && npm install && npm run dev

pkill -f vite || pkill -f node || pkill -f npm || pkill -f yarn
rm -rf .vite dist build


Restart the dev server
- Dev server and cache management steps completed.

Stop the dev server.
Delete node_modules, .vite, dist, build, and vite cache folders.
Run npm install to reinstall dependencies.
Restart the dev server.

# Import issues
 Do you need to revise folder file paths? Check that it can export.

can you add some things to the console so we can see where the infooverlay is failing to render? use emojis to they stand out in console02

# blank black screen
[Error] SyntaxError: Importing binding name 'default' cannot be resolved by star export entries.
check your main.tsx and app.tsx for issues
can you check and then add more logs so we can trace this unplugged cosmic wire to its sorce?

# Earth ID
ix: Always generate React keys using only the entity's unique ID, e.g. key={entity.id}. This guarantees stable rendering and prevents unnecessary re-mounts. Avoid using array indices or random values in keys unless absolutely necessary.
  Ensure PlaygroundScene, EffectContextProvider, overlays, and error boundaries pass stable unique keys using only the entity ID pattern. All entity IDs must be globally unique and never hardcoded or reused.
  If you see duplicate key warnings, audit entity creation and engine logic to guarantee unique IDs for every entity instance. Use console logs to trace entity IDs during creation and rendering.

add it as guidance to this file and update the /Guidelines/Game Architecture

// <UniversalButton theme="red" onClick={onUndo} style={{ fontFamily: TOKENS.FONT_FAMILY, fontWeight: TOKENS.FONT_WEIGHT_BOLD }}>
//   Undo
// </UniversalButton>

last one! lets move on to usePreview /preview/ hook to Refactor  to use unified pointer abstraction (mouse/touch)

# testing hooks
You’ll know if a test passes or fails by running your test suite (typically with a command like npm test or yarn test). The test runner will display results in the terminal: passing tests are usually marked with green checkmarks, and failing tests with red Xs or error messages. The output will show which tests failed, why, and where in the code.




start with the implementation of the useHoldToGrow hook


# OLD registry
// src/content/registry.ts
// Central registry for entities, effectors, and tools
// Only visuals and classes are registered here. Engine never imports this file.

import { PlanetEntity } from './entity/planet/PlanetEntity';
import { PlanetVisual } from './entity/planet/PlanetVisual';
import { ColinEntity } from './entity/colin/ColinEntity';
import { ColinVisual } from './entity/colin/ColinVisual';
import { BurstEffectorVisual } from './effects/radialeffector/BurstEffectorVisual';
import { RippleEffectorVisual } from './effects/radialeffector/RippleEffectorVisual'; // Canonical visual for ripple
import {
  PlanetPreviewOverlay,
  EffectorPreviewOverlay,
  ColinPreviewOverlay,
  ToolPreviewOverlay
} from './effects/previewOverlay';
// Placeholder imports for future visuals:
// import { GravityEffectorVisual } from './effects/radialeffector/GravityEffectorVisual';
// import { NudgeEffectorVisual } from './effects/radialeffector/NudgeEffectorVisual';
// Add other effectors and visuals as needed

export const registry = {
  entityTypes: {
    planet: { class: PlanetEntity, visual: PlanetVisual, previewOverlay: PlanetPreviewOverlay },
    colin: { class: ColinEntity, visual: ColinVisual, previewOverlay: ColinPreviewOverlay },
  },
  effectorTypes: {
    burst: {
      visual: BurstEffectorVisual, // Canonical visual for burst effector
      previewOverlay: EffectorPreviewOverlay,
      // See Datasheets/Effector/Radial/Burst for config and extensibility
    },
    ripple: {
      visual: RippleEffectorVisual, // Canonical visual for ripple effector
      previewOverlay: EffectorPreviewOverlay,
      // See Datasheets/Effector/Radial/Ripple for config and extensibility
    },
    gravity: {
      visual: undefined, // Placeholder for future gravity effector visual
      previewOverlay: EffectorPreviewOverlay,
      // See Datasheets/Effector/Radial/Gravity for config and extensibility
    },
    nudge: {
      visual: undefined, // Optional, for future soft burst/nudge variant
      previewOverlay: EffectorPreviewOverlay,
      // See Datasheets/Effector/Radial/Nudge for config and extensibility
    },
  },
  toolTypes: {
    interact: {
      previewOverlay: ToolPreviewOverlay,
    },
  },
};

// Visuals are modular and extensible for new variants and VFX overlays.
// Reference the data sheets for onboarding and cross-linking.
// NOTE: Only the game layer should import this registry. Engine and content must not import from game.
// This ensures clean separation and prevents circular dependencies.

# VITE Tests
How to Initiate These Tests
Test Framework:

Your project likely uses Vitest (based on the registry.test.ts file). Vitest is similar to Jest and is great for unit and integration testing.
Running Tests:

Open a terminal in your project directory.
Run the following command to execute all tests:
If you want to run a specific test file, use:
Debugging Tests:

Use the --ui flag to open the Vitest UI for a better debugging experience:
This opens a browser-based interface where you can see test results, errors, and logs.

# OLD PLAYGROUND SCENE BEFORE 3.1.2026 surgery
import React from 'react';
import { useEngineContext } from '../context/EngineContext';
import { PlaygroundCanvas } from './components/PlaygroundCanvas';
import { Stars } from '../../content/worldbackgrounds/Stars';
import { PlaygroundControlPanel } from './components/PlaygroundControlPanel';
import PlaygroundErrorBoundary from './components/PlaygroundErrorBoundary';
import { EntityLayer } from './components/EntityLayer';
import { DevOverlay } from './components/DevOverlay';
import { OverlayLayer } from './components/OverlayLayer';
import { EffectLayer } from './components/EffectLayer';

export default function PlaygroundScene({ effectorSystem = null }: { effectorSystem?: any }) {
  const engine = useEngineContext();
  const [activeTab, setActiveTab] = React.useState<string>("effects");
  const [selectedEffect, setSelectedEffect] = React.useState<string | null>(null);
  const [selectedObject, setSelectedObject] = React.useState<string | null>(null);
  const [selectedInteract, setSelectedInteract] = React.useState<string | null>(null);
  const [powerValue, setPowerValue] = React.useState<number>(1.0);
  const [pointerOverPanel, setPointerOverPanel] = React.useState<boolean>(false);
  const [entitiesChanged, setEntitiesChanged] = React.useState(0);
  // const planetsRef = React.useRef(useInitialRandomPlanets(3)); // Commented out to disable random planet generation
  // const planets = planetsRef.current;

  React.useEffect(() => {
    console.log('🧠 [PlaygroundScene] useEngineContext called');
    console.log('⚡ [physicsEngine] Tick start');
    // Clear existing entities to prevent duplicates
    if (engine && typeof engine.clearEntities === 'function') {
      engine.clearEntities();
    }
    // Spawn initial planets
    // if (engine && planets && Array.isArray(planets)) {
    //   planets.forEach(planet => {
    //     if (typeof engine.spawnEntity === 'function') {
    //       engine.spawnEntity(planet);
    //     }
    //   });
    // }
    setEntitiesChanged(c => c + 1);
    // Start engine tick loop for physics and entity updates
    if (engine && typeof engine.startLoop === 'function') {
      engine.startLoop();
    }
    // Wire up React state update at 60fps to sync UI with engine
    let animationFrameId: number;
    const tick = () => {
      setEntitiesChanged(c => c + 1);
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);
    // Stop engine loop and animation frame on unmount
    return () => {
      if (engine && typeof engine.stopLoop === 'function') {
        engine.stopLoop();
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <PlaygroundErrorBoundary>
      <React.Fragment>
        <PlaygroundCanvas engine={engine} />
        <Stars />
        <EntityLayer key={entitiesChanged} />
        <EffectLayer />
		<DevOverlay engine={engine} effectorSystem={effectorSystem} />
        <OverlayLayer
          key={entitiesChanged}
          selectedEffect={activeTab === 'effects' ? selectedEffect : null}
          selectedObject={activeTab === 'objects' ? selectedObject : null}
          selectedInteract={activeTab === 'interact' ? selectedInteract : null}
          powerValue={powerValue}
          activeTab={activeTab}
          pointerOverPanel={pointerOverPanel}
		  effectorSystem={effectorSystem} // Explicitly passing effectorSystem
        />
        <PlaygroundControlPanel
          selectedEffect={selectedEffect}
          setSelectedEffect={setSelectedEffect}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          selectedInteract={selectedInteract}
          setSelectedInteract={setSelectedInteract}
          entityCount={engine && typeof engine.getEntityCount === 'function' ? engine.getEntityCount() : 0}
          powerValue={powerValue}
          setPowerValue={setPowerValue}
          onUndo={() => {}}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          setPointerOverPanel={setPointerOverPanel}
        />
      </React.Fragment>
    </PlaygroundErrorBoundary>
  );
}
# END OLD PLAYGROUND SCENE BEFORE 3.1.2026 surgery


# OLD Control Panel Freshly added EFFECTOR and EFFECTS stores 3.1.2026 surgery
import React, { useEffect, useState } from "react";
import { setSelectedEffector } from '../state/effectorStore';
import { StarIcon, SpaceshipIcon, NebulaIcon, ColinIcon, CometIcon, AsteroidIcon, PlanetIcon, UFOIcon, SatelliteIcon }from "../../../ui/icons/content/entity";
import { BurstIcon, RippleIcon, TrailIcon, GravityIcon } from "../../../ui/icons/content/effectors/Radial";
import { MoveIcon, UndoIcon } from "../../../ui/icons/content/interact";
import { PowerSlider } from "../../../ui/components/PowerSlider";
import { TabCard } from "../../../ui/components/TabCard";
import { TabCardSlider } from "../../../ui/components/TabCardSlider";
import { Tabs } from "../../../ui/components/Tabs/Tabs";
import { TOKENS } from "../../../styles/tokens";

export interface PlaygroundControlPanelProps {
	selectedEffect: string | null;
	setSelectedEffect: (effect: string) => void;
	selectedObject: string | null;
	setSelectedObject: (object: string) => void;
	selectedInteract: string | null;
	setSelectedInteract: (interact: string) => void;
	powerValue: number;
	setPowerValue: (value: number) => void;
	onUndo: () => void;
	entityCount: number;
	return (
		<div
			style={{
				position: "fixed",
				left: "50%",
				bottom: 0,
				transform: "translateX(-50%)",
				width: "100%",
				maxWidth: 992,
				zIndex: 9999,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				background: TOKENS.CONTROL_PANEL_BG,
				borderRadius: 0,
				boxShadow: "0 0 32px 8px rgba(0,255,255,0.12)",
				padding: `0`,
				minHeight: 120,
				backdropFilter: "blur(16px)",
				WebkitBackdropFilter: "blur(16px)",
				justifyContent: "flex-end",
				pointerEvents: "auto",
			}}
			onMouseEnter={() => setPointerOverPanel && setPointerOverPanel(true)}
			onMouseLeave={() => setPointerOverPanel && setPointerOverPanel(false)}
			onTouchStart={() => setPointerOverPanel && setPointerOverPanel(true)}
			onTouchEnd={() => setPointerOverPanel && setPointerOverPanel(false)}
		>
			<div id="playground-tabs-container" style={{ width: "100%", display: "flex", justifyContent: "center", pointerEvents: "auto" }}>
				<Tabs
					layout="horizontal"
					showIcons={false}
					activeTab={activeTab}
					onTabChange={onTabChange}
					tabs={[
						{
							key: "effects",
							label: "Effects",
							icon: <BurstIcon />, 
							onClick: () => setSelectedEffector(null), // Deselect effector on tab change
						},
					]}
				/>
			</div>
		</div>
		const handleKeyDown = (e: KeyboardEvent) => {
			if (["Tab", "ArrowLeft", "ArrowRight"].includes(e.key)) {
				setFocusVisible(true);
			}
		};
		const handleMouseDown = () => setFocusVisible(false);
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("mousedown", handleMouseDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);

	 return (
		 <div
			 style={{
				 position: "fixed",
				 left: "50%",
				 bottom: 0,
				 transform: "translateX(-50%)",
				 width: "100%",
				 maxWidth: 992,
				 zIndex: 9999,
				 display: "flex",
				 flexDirection: "column",
				 alignItems: "center",
				 background: TOKENS.CONTROL_PANEL_BG,
				 borderRadius: 0,
				 boxShadow: "0 0 32px 8px rgba(0,255,255,0.12)",
				 padding: `0`,
				 minHeight: 120,
				 backdropFilter: "blur(16px)",
				 WebkitBackdropFilter: "blur(16px)",
				 justifyContent: "flex-end",
				 pointerEvents: "auto",
			 }}
			 onMouseEnter={() => setPointerOverPanel && setPointerOverPanel(true)}
			 onMouseLeave={() => setPointerOverPanel && setPointerOverPanel(false)}
			 onTouchStart={() => setPointerOverPanel && setPointerOverPanel(true)}
			 onTouchEnd={() => setPointerOverPanel && setPointerOverPanel(false)}
		 >
			 <div id="playground-tabs-container" style={{ width: "100%", display: "flex", justifyContent: "center", pointerEvents: "auto" }}>
				 <Tabs
					 layout="horizontal"
					 showIcons={false}
					 activeTab={activeTab}
					 onTabChange={onTabChange}
					 tabs={[
						 {
							 key: "effects",
							 label: "Effects",
							 icon: <BurstIcon />,
							 content: (
								 <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
									 <p style={{ fontSize: '0.85rem', color: '#F5F5F7', fontFamily: TOKENS.FONT_FAMILY, margin: '12px 0 8px 0', textAlign: 'center', letterSpacing: '.2px' }}>
										 {selectedEffect ? effectInstructions[selectedEffect] : "Pick an effect, then press anywhere on the canvas to use it."}
									 </p>
									 <TabCardSlider ariaLabel="Effects row">
										 <TabCard key="burst" icon={<BurstIcon />} title="Burst" titleAllCaps theme="cyan" instruction={effectInstructions.Burst} selected={selectedEffect === "Burst"} onClick={() => setSelectedEffect("Burst")} />
										 {/* Restore additional effect TabCards from xOLD */}
										<TabCard key="trail" icon={<TrailIcon />} title="Trail" titleAllCaps theme="cyan" instruction={effectInstructions.Trail} selected={selectedEffect === "Trail"} onClick={() => setSelectedEffect("Trail")} />
										<TabCard key="ripple" icon={<RippleIcon />} title="Ripple" titleAllCaps theme="cyan" instruction={effectInstructions.Ripple} selected={selectedEffect === "Ripple"} onClick={() => setSelectedEffect("Ripple")} />
										<TabCard key="gravity" icon={<GravityIcon />} title="Gravity" titleAllCaps theme="cyan" instruction={effectInstructions.Gravity} selected={selectedEffect === "Gravity"} onClick={() => setSelectedEffect("Gravity")} />
									 </TabCardSlider>
									<div style={{ width: '100%', maxWidth: '26.125rem', minWidth: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 48, minHeight: 48 }}>
										<PowerSlider label="Power" value={powerValue} onChange={setPowerValue} min={0.2} max={3.0} step={0.1} layout="horizontal" />
									</div>
								 </div>
							 ),
							 theme: "cyan",
						 },
						 {
							 key: "objects",
							 label: "Objects",
							 icon: <PlanetIcon />,
							 content: (
								 <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
									 <p style={{ fontSize: '0.85rem', color: '#F5F5F7', fontFamily: TOKENS.FONT_FAMILY, margin: '12px 0 8px 0', textAlign: 'center', letterSpacing: '.2px' }}>
										 {selectedObject ? objectInstructions[selectedObject] : "Pick an object, then press anywhere on the canvas to place it."}
									 </p>
									 <TabCardSlider ariaLabel="Objects row">
										 <TabCard key="planet" icon={<PlanetIcon />} title="Planet" titleAllCaps theme="magenta" instruction={objectInstructions.Planet} selected={selectedObject === "Planet"} onClick={() => setSelectedObject("Planet")} />
										 {/* Restore additional object TabCards from xOLD */}
										 <TabCard key="star" icon={<StarIcon />} title="Star" titleAllCaps theme="magenta" instruction={objectInstructions.Star} selected={selectedObject === "Star"} onClick={() => setSelectedObject("Star")} />
										 <TabCard key="nebula" icon={<NebulaIcon />} title="Nebula" titleAllCaps theme="magenta" instruction={objectInstructions.Nebula} selected={selectedObject === "Nebula"} onClick={() => setSelectedObject("Nebula")} />
										 <TabCard key="spaceship" icon={<SpaceshipIcon />} title="Spaceship" titleAllCaps theme="magenta" instruction={objectInstructions.Spaceship} selected={selectedObject === "Spaceship"} onClick={() => setSelectedObject("Spaceship")} />
										 <TabCard key="satellite" icon={<SatelliteIcon />} title="Satellite" titleAllCaps theme="magenta" instruction={objectInstructions.Satellite} selected={selectedObject === "Satellite"} onClick={() => setSelectedObject("Satellite")} />
									 </TabCardSlider>
									 <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 48, minHeight: 48 }}>
										 <span style={{ fontSize: '0.85rem', color: '#F5F5F7', fontFamily: TOKENS.FONT_FAMILY, margin: '0', textAlign: 'center', letterSpacing: '.2px', fontWeight: TOKENS.FONT_WEIGHT_BOLD }}>
											 {`Objects on canvas: ${entityCount}`}
										 </span>
									 </div>
								 </div>
							 ),
							 theme: "magenta",
						 },
						 {
							 key: "interact",
							 label: "Interact",
							 icon: <MoveIcon />,
							 content: (
								 <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
									 <p style={{ fontSize: '0.85rem', color: '#F5F5F7', fontFamily: TOKENS.FONT_FAMILY, margin: '12px 0 8px 0', textAlign: 'center', letterSpacing: '.2px' }}>
										 {selectedInteract ? interactInstructions[selectedInteract] : "Pick a tool, then press anywhere on the canvas to use it."}
									 </p>
									 <TabCardSlider ariaLabel="Interact row">
										 <TabCard key="move" icon={<MoveIcon />} title="Move" titleAllCaps theme="red" instruction={interactInstructions.Move} selected={selectedInteract === "Move"} onClick={() => setSelectedInteract("Move")} />
										 {/* Restore additional interact TabCards from xOLD */}
										 <TabCard key="undo" icon={<UndoIcon />} title="Undo" titleAllCaps theme="red" instruction={interactInstructions.Undo} selected={selectedInteract === "Undo"} onClick={() => { setSelectedInteract("Undo"); onUndo(); }} />
										 <TabCard key="comet" icon={<CometIcon />} title="Comet" titleAllCaps theme="red" instruction={interactInstructions.Comet} selected={selectedInteract === "Comet"} onClick={() => setSelectedInteract("Comet")} />
										 <TabCard key="asteroid" icon={<AsteroidIcon />} title="Asteroid" titleAllCaps theme="red" instruction={interactInstructions.Asteroid} selected={selectedInteract === "Asteroid"} onClick={() => setSelectedInteract("Asteroid")} />
										 <TabCard key="ufo" icon={<UFOIcon />} title="UFO" titleAllCaps theme="red" instruction={interactInstructions.UFO} selected={selectedInteract === "UFO"} onClick={() => setSelectedInteract("UFO")} />
										 <TabCard key="colin" icon={<ColinIcon />} title="Colin" titleAllCaps theme="red" instruction={interactInstructions.Colin} selected={selectedInteract === "Colin"} onClick={() => setSelectedInteract("Colin")} />
									 </TabCardSlider>
									 <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 48, minHeight: 48 }}>
                    <span style={{ fontSize: '0.85rem', color: '#F5F5F7', fontFamily: TOKENS.FONT_FAMILY, margin: '0', textAlign: 'center', letterSpacing: '.2px', fontWeight: TOKENS.FONT_WEIGHT_BOLD }}>
											 {`Objects on canvas: ${entityCount}`}
										 </span>
									 </div>
								 </div>
							 ),
							 theme: "red",
						 },
					 ]}
				 />
			 </div>
		 </div>
	);
});

