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
import { registry } from '../../../content/registry';
import * as RadialIcons from '../../../ui/icons/content/effectors/Radial';

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
}



const effectInstructions: Record<string, string> = {
	Burst: 'Click to create a burst effect.',
	Trail: 'Click and drag to create a trail.',
	Ripple: 'Click to create a ripple.',
	Gravity: 'Click to toggle gravity.',
};
const objectInstructions: Record<string, string> = {
	Planet: 'Click to place a planet.',
	Star: 'Click to place a star.',
	Nebula: 'Click to place a nebula.',
	Spaceship: 'Click to place a spaceship.',
	Satellite: 'Click to place a satellite.',
};
const interactInstructions: Record<string, string> = {
	Move: 'Click and drag to move objects.',
	Undo: 'Undo the last action.',
	Comet: 'Click to launch a comet.',
	Asteroid: 'Click to launch an asteroid.',
	UFO: 'Click to launch a UFO.',
	Colin: 'Click to launch Colin.',
};

const PlaygroundControlPanel: React.FC<PlaygroundControlPanelProps & {
	activeTab: string;
	onTabChange: (tab: string) => void;
	setPointerOverPanel: (over: boolean) => void;
}> = ({
	selectedEffect,
	setSelectedEffect,
	selectedObject,
	setSelectedObject,
	selectedInteract,
	setSelectedInteract,
	powerValue,
	setPowerValue,
	onUndo,
	entityCount,
	activeTab,
	onTabChange,
	setPointerOverPanel,
}) => {
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
			onMouseEnter={() => setPointerOverPanel(true)}
			onMouseLeave={() => setPointerOverPanel(false)}
			onTouchStart={() => setPointerOverPanel(true)}
			onTouchEnd={() => setPointerOverPanel(false)}
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
										{Object.keys(registry.effectorTypes).map((key) => {
											const title = key.charAt(0).toUpperCase() + key.slice(1);
											  const Icon = (RadialIcons as Record<string, React.FC | undefined>)[`${title}Icon`];
											return (
												<TabCard
													key={key}
													icon={Icon ? <Icon /> : undefined}
													title={title}
													titleAllCaps
													theme="cyan"
													instruction={effectInstructions[title] || ''}
													selected={selectedEffect === title}
													onClick={() => setSelectedEffect(title)}
												/>
											);
										})}
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
};

export { PlaygroundControlPanel };

