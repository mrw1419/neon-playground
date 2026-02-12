// src/components/World/World.tsx
import React, { useState, useRef, useEffect } from "react"
import Planet from "../objects/Planet"
import WorldBackground from "./WorldBackground"
import { PlanetType } from "../../utils/constants/objects"

// Planet interface for state
interface PlanetData {
  id: string
  x: number
  y: number
  type: PlanetType
  scale: number
}

// World component
const World: React.FC = () => {
  // All planets in the world
  const [planets, setPlanets] = useState<PlanetData[]>([])
  const [growingPlanetId, setGrowingPlanetId] = useState<string | null>(null)
  const requestRef = useRef<number>()

  // Burst effect power (controlled by slider)
  const [burstPower, setBurstPower] = useState(5)
  const [burstTrigger, setBurstTrigger] = useState(0)

  // Spawn a new random planet and start growing it
  const spawnAndStartGrowth = (e: React.MouseEvent) => {
    // If clicking on UI, don't spawn
    if ((e.target as HTMLElement).closest('.controls')) return;

    const planetTypes: PlanetType[] = [
      "rocky",
      "gas",
      "gasGiant",
      "ring",
      "crackedIce",
      "crackedEvil",
    ]
    const type = planetTypes[Math.floor(Math.random() * planetTypes.length)]
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now().toString()

    const newPlanet: PlanetData = {
      id,
      x,
      y,
      type,
      scale: 1
    }
    
    setPlanets(prev => [...prev, newPlanet])
    setGrowingPlanetId(id)
  }

  const stopGrowth = () => {
    setGrowingPlanetId(null)
  }

  // Growth loop
  useEffect(() => {
    const grow = () => {
      if (growingPlanetId !== null) {
        setPlanets((prev) =>
          prev.map((p) =>
            p.id === growingPlanetId ? { ...p, scale: p.scale + 0.05 } : p
          )
        )
        requestRef.current = requestAnimationFrame(grow)
      }
    }

    if (growingPlanetId !== null) {
      requestRef.current = requestAnimationFrame(grow)
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [growingPlanetId])

  // Apply burst effect
  const applyBurst = () => {
    setBurstTrigger(prev => prev + 1)
  }

  return (
    <div
      onMouseDown={spawnAndStartGrowth}
      onMouseUp={stopGrowth}
      onMouseLeave={stopGrowth}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
        cursor: "crosshair",
      }}
    >
      {/* Background layer */}
      <WorldBackground />

      {/* Render all planets */}
      {planets.map(planet => (
        <div
          key={planet.id}
          style={{
            position: "absolute",
            left: planet.x,
            top: planet.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <Planet
            id={planet.id}
            x={0}
            y={0}
            type={planet.type}
            scale={planet.scale}
            burstPower={burstPower}
            burstTrigger={burstTrigger}
          />
        </div>
      ))}

      {/* Control buttons */}
      <div 
        className="controls"
        style={{ position: "absolute", bottom: 20, left: 20, zIndex: 1000, display: "flex", alignItems: "center", gap: "10px" }}
      >
        <button
          style={{ padding: "8px 12px", cursor: "pointer", background: "#222", color: "#fff", border: "1px solid #0ff" }}
          onClick={applyBurst}
        >
          Burst
        </button>

        <input
          type="range"
          min={1}
          max={10}
          value={burstPower}
          onChange={e => setBurstPower(Number(e.target.value))}
          style={{ cursor: "pointer" }}
        />
        <div style={{ color: "#0ff", fontSize: "12px", fontFamily: "monospace" }}>
          Power: {burstPower} | Click & Hold to Grow
        </div>
      </div>
    </div>
  )
}

export default World
