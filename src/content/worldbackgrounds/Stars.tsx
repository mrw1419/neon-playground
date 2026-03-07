// src/content/background/WorldBackground.tsx
import React, { useEffect, useRef } from "react"
import {
  CYAN, MAGENTA, PURPLE, RED, ACID_GREEN, ORANGE, YELLOW,
  PLANET_NEON_COLORS
} from "../../styles/colors"

const Stars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return; // Only run once
    initRef.current = true;

    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Generate random stars with neon colors, size, and pulse
    const neonColors = PLANET_NEON_COLORS || [CYAN, MAGENTA, PURPLE, ACID_GREEN, RED, YELLOW, ORANGE];
    const stars = Array.from({ length: 120 }, () => {
      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      const baseRadius = Math.random() * 1.2 + 0.6; // 0.6 - 1.8
      const pulse = Math.random() < 0.35; // 35% pulse
      const pulseSpeed = Math.random() * 0.04 + 0.01; // 0.01 - 0.05
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color,
        baseRadius,
        radius: baseRadius,
        brightness: Math.random() * 0.5 + 0.5,
        pulse,
        pulseSpeed,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    // Animation loop for stars
    let frame = 0;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.brightness;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 8 + star.radius * 8;
        ctx.fill();
        ctx.restore();
      });
    }
    function animate() {
      draw();
      frame++;
      requestAnimationFrame(animate);
    }
    animate();
  }, [])

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          display: "block",
        }}
      />
    </div>
  )
}

export { Stars }
