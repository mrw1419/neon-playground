import React from "react";
import { createRoot } from "react-dom/client";
import PlaygroundScene from "./PlaygroundScene";
import { initializeEffectorSystem } from '../../engine/initializeEffectSystem';
import { EngineContext } from "../context/EngineContext";
import { EffectContextProvider } from "../context/EffectContext";


import { initializeEngine } from '../../engine/engine';
import { WorldLayer } from '../../engine/engine';

function PlaygroundRoot() {
  const [engine] = React.useState<WorldLayer>(() => {
    const eng = initializeEngine({ gravity: { x: 0, y: 0 } });
    const effectorSystem = initializeEffectorSystem(eng.getPhysicsEngine());
    eng.setEffectorSystem?.(effectorSystem);
    console.log('🛠️ [main.tsx] Engine initialized:', eng);
    if (typeof eng.getEntities === 'function') {
      console.log('🛠️ [main.tsx] Initial entities:', eng.getEntities());
    }
    return eng;
  });
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Basic effect state logic for MVP (restored)
  const [effects, setEffects] = React.useState<any[]>([]);
  const effectRegistry = {};

  const triggerEffect = (effectData: any) => {
    setEffects((prev) => [...prev, effectData]);
  };
  const removeEffect = (id: string | number) => {
    setEffects((prev) => prev.filter((e) => e.id !== id));
  };
  const getEffectRegistry = () => effectRegistry;

  const effectContextValue = {
    effects,
    triggerEffect,
    removeEffect,
    getEffectRegistry,
    getEffectors: () => [], // Satisfy EffectContextValue interface
  };

  return (
    <EngineContext.Provider value={engine}>
      <EffectContextProvider value={effectContextValue}>
        <PlaygroundScene effectorSystem={engine['effectorSystem']} canvasRef={canvasRef} />
      </EffectContextProvider>
    </EngineContext.Provider>
  );
}

createRoot(document.getElementById("playground-root")!).render(
  <React.StrictMode>
    <PlaygroundRoot />
  </React.StrictMode>
);
