import React from "react"

interface BurstProps {
  planets: {
    id: string
    x: number
    y: number
  }[]
  strength: number
  onUpdate: (newPlanets: { id: string; x: number; y: number }[]) => void
}

const Burst: React.FC<BurstProps> = ({ planets, strength, onUpdate }) => {
  const applyBurst = () => {
    const movedPlanets = planets.map((planet) => {
      // Random angle
      const angle = Math.random() * 2 * Math.PI
      const dx = Math.cos(angle) * strength
      const dy = Math.sin(angle) * strength
      return { ...planet, x: planet.x + dx, y: planet.y + dy }
    })
    onUpdate(movedPlanets)
  }

  return (
    <button
      onClick={applyBurst}
      style={{
        position: "absolute",
        left: 150,
        bottom: 20,
        padding: "0.5rem 1rem",
        backgroundColor: "#e67e22",
        border: "none",
        borderRadius: "8px",
        color: "#fff",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      Apply Burst
    </button>
  )
}

export default Burst
