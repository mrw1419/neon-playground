import React from 'react';
import { useHoldToGrow } from '../hooks/preview/useHoldToGrow';
import { usePlanetPlacement } from '../hooks/placement/usePlanetPlacement';
import { useRadialEffector } from '../hooks/physics/useRadialEffector';
import { setEffectorPreview } from '../state/effectorStore';

interface PlaygroundCanvasProps {
  engine?: any;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  selectedObject?: string | null;
  activeTab?: string;
  selectedEffect?: string | null;
  effectorSystem?: any;
}

export function PlaygroundCanvas({ engine, canvasRef: externalRef, selectedObject, activeTab, selectedEffect, effectorSystem }: PlaygroundCanvasProps) {
  const canvasRef = externalRef || React.useRef<HTMLCanvasElement>(null);
  const { state: growState, start, update, stop } = useHoldToGrow();
  const placePlanet = usePlanetPlacement(engine);
  const triggerEffector = useRadialEffector(engine, effectorSystem);
  React.useEffect(() => {
    if (canvasRef.current && engine) {
      engine.attachCanvas(canvasRef.current);
      engine.render();
    }
  }, [engine, canvasRef]);

  // Pointer event handlers for hold-to-grow placement
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTab === 'objects' && selectedObject === 'Planet') {
      start(e.nativeEvent);
    } else if (activeTab === 'effects' && selectedEffect) {
      // Registry-driven: trigger any effector from registry
      const effectorKey = selectedEffect.toLowerCase();
      const pointer = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
      // Optionally, you could look up default config from registry.effectorTypes[effectorKey] if needed
      triggerEffector(effectorKey, { position: pointer, radius: 60, power: 1.0 }, e.nativeEvent);
    }
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (growState.active) {
      update(e.nativeEvent);
    }
    // For effector preview: update preview position in store
    if (activeTab === 'effects' && selectedEffect) {
      setEffectorPreview({ position: { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY }, radius: 60 });
    } else {
      setEffectorPreview({ position: null });
    }
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (growState.active && growState.pos) {
      stop();
      // Place planet at preview position and radius
      placePlanet({ position: growState.pos, radius: growState.radius }, e.nativeEvent);
    }
    // No-op for effectors (single click)
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
}
