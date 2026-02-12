import React, { useMemo, useState, useEffect, useRef } from "react"
import { PLANET_RANDOM_COLORS, CRACKED_ICE, CRACKED_EVIL } from "../../styles/colors"

interface PlanetProps {
  id: string
  x: number
  y: number
  type?: string
}

const PLANET_TYPES = [
  "Rocky",
  "Gas",
  "Gas Giant",
  "Ring Planet",
  "Cracked Ice Planet",
  "Cracked Evil Planet",
]

const Planet: React.FC<PlanetProps> = ({ id, x, y, type }) => {
  const planetType = type || PLANET_TYPES[Math.floor(Math.random() * PLANET_TYPES.length)]

  const { gradient, textColor, ring } = useMemo(() => {
    if (planetType === "Cracked Ice Planet") return { gradient: `radial-gradient(circle, ${CRACKED_ICE}, #81d4fa)`, textColor: "#000", ring: false }
    if (planetType === "Cracked Evil Planet") return { gradient: `radial-gradient(circle, ${CRACKED_EVIL}, #b71c1c)`, textColor: "#fff", ring: false }
    const randomColor = PLANET_RANDOM_COLORS[Math.floor(Math.random() * PLANET_RANDOM_COLORS.length)]
    return { gradient: `radial-gradient(circle, ${randomColor}, ${randomColor}33)`, textColor: "#fff", ring: planetType === "Ring Planet" }
  }, [planetType])

  const [size, setSize] = useState(60)
  const growingRef = useRef(false)
  const growthIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const MAX_SIZE = 120

  // Grow 1 notch per second
  useEffect(() => {
    if (growingRef.current) {
      growthIntervalRef.current = setInterval(() => {
        setSize(prev => Math.min(prev + 15, MAX_SIZE))
      }, 1000)
    } else {
      if (growthIntervalRef.current) clearInterval(growthIntervalRef.current)
    }
    return () => growthIntervalRef.current && clearInterval(growthIntervalRef.current)
  }, [growingRef.current])

  return (
    <div
      onMouseDown={() => (growingRef.current = true)}
      onMouseUp={() => (growingRef.current = false)}
      onMouseLeave={() => (growingRef.current = false)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: textColor,
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: 12,
        textShadow: `0 0 5px ${textColor}`,
        transition: "width 0.2s ease, height 0.2s ease",
        cursor: "pointer",
      }}
    >
      {planetType}
      {ring && (
        <div
          style={{
            position: "absolute",
            width: size + 20,
            height: 10,
            border: `2px solid ${textColor}`,
            borderRadius: "50%",
            top: size / 2 - 5,
            left: -10,
            transform: "rotate(20deg)",
          }}
        />
      )}
    </div>
  )
}

export default Planet