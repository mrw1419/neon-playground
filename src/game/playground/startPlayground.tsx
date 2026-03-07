// startPlayground.ts
// Orchestrates engine, entities, effectors, tools, and UI for Playground

import React from "react";
import { createRoot } from "react-dom/client";
import { initializeEngine } from '../../engine/engine';
import { createEntities } from '../../content/entity/planet/PlanetEntity'; // Example, expand as needed
import PlaygroundScene from './PlaygroundScene';
import { initializeEffectorSystem } from '../../engine/initializeEffectSystem';
import { PlaygroundControlPanel } from './components/PlaygroundControlPanel';
import { EngineContext } from '../context/EngineContext';
import { EffectContextProvider } from '../context/EffectContext';

// Main orchestrator function
export function startPlayground() {
  // 1. Initialize engine
  const engine = initializeEngine();
  console.log('🛠️ [startPlayground.tsx] Engine initialized:', engine);
  if (typeof engine.getEntities === 'function') {
    console.log('🛠️ [startPlayground.tsx] Initial entities:', engine.getEntities());
  }
  // 2. Create canvas ref
  // 2.5. Initialize effector system with the engine's physicsEngine
  const effectorSystem = initializeEffectorSystem(engine.getPhysicsEngine());
  engine.setEffectorSystem?.(effectorSystem);
  const canvasRef = React.createRef<HTMLCanvasElement>();

  // 3. Effect state logic
  const effectRegistry = {};
  let effects: any[] = [];
  const triggerEffect = (effectData: any) => {
    effects.push(effectData);
  };
  const removeEffect = (id: string | number) => {
    effects = effects.filter((e: any) => e.id !== id);
  };
  const getEffectRegistry = () => effectRegistry;
  const effectContextValue = {
    effects,
    triggerEffect,
    removeEffect,
    getEffectRegistry,
    getEffectors: () => [], // TODO: implement if needed
  };

  // 4. Mount PlaygroundScene with contexts
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <EngineContext.Provider value={engine}>
        <EffectContextProvider value={effectContextValue}>
          <PlaygroundScene effectorSystem={effectorSystem} canvasRef={canvasRef} />
        </EffectContextProvider>
      </EngineContext.Provider>
    </React.StrictMode>
  );

  // 5. Return cleanup function
  return function stopPlayground() {
    root.unmount();
  };
}
