// This file serves as the entry point for the Neon Playground application, rendering the main App component which includes the game canvas and control panel. It also sets up error handling and a loading state for better user experience during initialization.

// src/app.tsx
import React from "react";
import "./styles/fonts.css";
import ReactDOM from "react-dom/client";
import PlaygroundScene from "./game/playground/PlaygroundScene";
import { initializeEffectorSystem } from "./engine/initializeEffectSystem";
import { initializeEngine } from "./engine/engine";

const App = () => {
  const [mounted, setMounted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      console.log("✓ App component mounted");
      setMounted(true);
    } catch (err: any) {
      console.error("Error in App:", err);
      setError(err?.message || "Unknown error");
    }
  }, []);

  if (error) {
    return (
      <div style={{ color: "#0ff", padding: "20px", fontFamily: "monospace", background: "#000" }}>
        <h2>Error: {error}</h2>
        <p>Check console for details</p>
      </div>
    );
  }

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // Minimal engine/effectorSystem setup for PlaygroundScene
  const engine = React.useMemo(() => initializeEngine({ gravity: { x: 0, y: 0 } }), []);
  const effectorSystem = React.useMemo(() => initializeEffectorSystem(engine.getPhysicsEngine()), [engine]);
  engine.setEffectorSystem?.(effectorSystem);
  return (
    <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      {mounted && <PlaygroundScene effectorSystem={effectorSystem} canvasRef={canvasRef} />}
      {!mounted && (
        <div style={{ color: "#0ff", padding: "20px", fontFamily: "monospace" }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default App;

