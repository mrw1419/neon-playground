import React, { useState, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $selectedEffector, setSelectedEffector } from './state/effectorStore';
import { useEngineContext } from '../context/EngineContext';
import { PlaygroundCanvas } from './components/PlaygroundCanvas';
import { Stars } from '../../content/worldbackgrounds/Stars';
import { PlaygroundControlPanel } from './components/PlaygroundControlPanel';
import { DevOverlay } from './components/DevOverlay';
import { useInitialRandomPlanets } from './hooks/placement/useInitialRandomPlanets';
import { BaseEntity } from '../../engine/entities/BaseEntity';
import { setEntities } from '../state/entityStore';


import { EntityLayer } from './components/EntityLayer';
import { OverlayLayer } from './components/OverlayLayer';
import { EffectLayer } from './components/EffectLayer';
import { BurstEffectorVisual } from '../../content/effects/radialeffector/BurstEffectorVisual';

interface PlaygroundSceneProps {
  effectorSystem: any;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

export default function PlaygroundScene({ effectorSystem, canvasRef }: PlaygroundSceneProps) {
  const engine = useEngineContext();
  console.log('🧩 [PlaygroundScene] Engine from context:', engine);
  const planets = useInitialRandomPlanets(3);
  // Use BaseEntity's unique ID generator
  // Place 3 random planets on mount, clearing old planets first
  useEffect(() => {
    // Gravity setup omitted: engine.physicsEngine is private
    if (engine && typeof engine.getEntities === 'function' && typeof engine.spawnEntity === 'function' && typeof engine.removeEntity === 'function') {
      // Remove existing planets (generic: type === 'Planet')
      const existingPlanets = engine.getEntities().filter((e: any) => e.type === 'Planet');
      existingPlanets.forEach((planet: any) => engine.removeEntity(planet));
      // Diagnostic: Log planets array before spawning
      console.log('🪐 [PlaygroundScene] Planets array before spawn:', planets);
      // Spawn new planets with sequential IDs, skipping duplicates
      planets.forEach((planet: any, idx: number) => {
        // Assign unique ID using a simple string (since BaseEntity is abstract)
        planet.id = `planet-${Date.now()}-${idx}`;
        const duplicate = engine.getEntities().some((e: any) => e.id === planet.id);
        if (!duplicate) {
          engine.spawnEntity(planet);
        } else {
          console.log('🛑 PlaygroundScene Planet already exists, skipping spawn', planet.id);
        }
      });
      // Log entities after spawn for diagnostics
      console.log('🧩🪐 [PlaygroundScene] Entities after spawn:', engine.getEntities());
      // Update Effector store for reactivity
      setEntities(engine.getEntities());
    }
  }, [engine, planets]);
  // Start engine loop and sync Effector store with engine entities every frame
  useEffect(() => {
    let animationFrameId: number;
    if (engine && typeof engine.startLoop === 'function') {
      engine.startLoop();
      // Sync Effector store with engine entities every frame
      const syncEntities = () => {
        setEntities(engine.getEntities());
        animationFrameId = requestAnimationFrame(syncEntities);
      };
      animationFrameId = requestAnimationFrame(syncEntities);
    }
    return () => {
      if (engine && typeof engine.stopLoop === 'function') {
        engine.stopLoop();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [engine]);
  // Tab state: 'effects', 'objects', 'interact'
  const [activeTab, setActiveTab] = useState<string>('effects');
  // Card selections
  // Use effector store for selected effect
  const selectedEffect = useUnit($selectedEffector);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [selectedInteract, setSelectedInteract] = useState<string | null>(null);
  // Power slider value
  const [powerValue, setPowerValue] = useState(1.0);
  // Entity count (updated on entityTick)
  const entityCount = engine && typeof engine.getEntities === 'function' ? engine.getEntities().length : 0;
  // Track if pointer is over the control panel
  const [pointerOverPanel, setPointerOverPanel] = useState(false);

  // Undo handler (stub)
  const handleUndo = () => {
    // Implement undo logic here
  };

  return (
    <>
      <PlaygroundCanvas
        engine={engine}
        canvasRef={canvasRef}
        selectedObject={selectedObject ?? undefined}
        activeTab={activeTab}
        selectedEffect={selectedEffect ?? undefined}
        effectorSystem={effectorSystem}
      />
      <EntityLayer />
      {/* EffectLayer renders all effector visuals at their effect positions */}
      <EffectLayer />
      {/* OverlayLayer overlays entities, but should not cover the control panel */}
      <OverlayLayer
        selectedEffect={selectedEffect}
        selectedObject={selectedObject}
        selectedInteract={selectedInteract}
        powerValue={powerValue}
        activeTab={activeTab}
        pointerOverPanel={pointerOverPanel}
      />
      <Stars />
      <DevOverlay engine={engine} />
      <PlaygroundControlPanel
        selectedEffect={selectedEffect}
        setSelectedEffect={(effect: string) => setSelectedEffector(effect)}
        selectedObject={selectedObject}
        setSelectedObject={(object: string) => setSelectedObject(object)}
        selectedInteract={selectedInteract}
        setSelectedInteract={(interact: string) => setSelectedInteract(interact)}
        powerValue={powerValue}
        setPowerValue={setPowerValue}
        onUndo={handleUndo}
        entityCount={entityCount}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        setPointerOverPanel={setPointerOverPanel}
      />
    </>
  );
}