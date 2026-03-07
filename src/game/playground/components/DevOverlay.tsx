import React from "react";
import { useUnit } from 'effector-react';
import { $effects } from '../state/effectStore';

/**
 * DevOverlay: Displays engine tick and effect queue for debugging during development.
 * Place this overlay above the canvas and layers in PlaygroundScene.
 */

export function DevOverlay({ engine }: { engine: any }) {
  const [tick, setTick] = React.useState(0);
  const effects = useUnit($effects);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTick(engine?.tick ?? 0);
    }, 500); // Update every 500ms
    return () => clearInterval(interval);
  }, [engine]);

  return (
    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.7)', color: '#0ff', padding: '8px 16px', borderRadius: 8, zIndex: 100 }}>
      <div><strong>Engine Tick:</strong> {tick}</div>
      <div><strong>Effect Queue:</strong> {effects.length}</div>
      <ul style={{ maxHeight: 120, overflowY: 'auto', fontSize: 12 }}>
        {effects.map((effect, idx) => (
          <li key={effect.id || idx}>{effect.type} @ ({Math.round(effect.position?.x ?? 0)}, {Math.round(effect.position?.y ?? 0)}) duration: n/a</li>
        ))}
      </ul>
    </div>
  );
}
