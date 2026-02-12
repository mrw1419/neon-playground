// src/components/World/WorldBackground.tsx
import React, { useEffect, useRef } from "react"

const WorldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    // Generate random stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      brightness: Math.random() * 0.8 + 0.2,
    }))

    // Draw stars
    const draw = () => {
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, width, height)

      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
        ctx.fill()
      })
    }

    draw()

    // Optional: animate twinkling
    const interval = setInterval(() => {
      stars.forEach((star) => {
        star.brightness += (Math.random() - 0.5) * 0.05
        if (star.brightness < 0.2) star.brightness = 0.2
        if (star.brightness > 1) star.brightness = 1
      })
      draw()
    }, 100)

    // Clean up
    return () => clearInterval(interval)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // behind planets
      }}
    />
  )
}

export default WorldBackground
