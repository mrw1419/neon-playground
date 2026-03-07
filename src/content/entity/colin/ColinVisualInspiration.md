import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion/react";

interface SpaceWormProps {
  onPositionUpdate: (x: number, y: number) => void;
  isChomping: boolean;
}

interface Segment {
  x: number;
  y: number;
}

const HEAD_SIZE = 44;
const SEGMENT_COUNT = 16;
const SEGMENT_SPACING = 12;
const BODY_START_SIZE = 34;
const BODY_END_SIZE = 6;

export function SpaceWorm({ onPositionUpdate, isChomping }: SpaceWormProps) {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [angle, setAngle] = useState(0);
  const posRef = useRef({ x: -200, y: -200 });
  const segmentsRef = useRef<Segment[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);

  // Initialize segments
  useEffect(() => {
    const initial: Segment[] = Array.from({ length: SEGMENT_COUNT }, () => ({
      x: -200,
      y: -200,
    }));
    segmentsRef.current = initial;
    setSegments(initial);
  }, []);

  // Track mouse
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const prevX = posRef.current.x;
      const prevY = posRef.current.y;
      posRef.current = { x: e.clientX, y: e.clientY };
      onPositionUpdate(e.clientX, e.clientY);

      // Calculate facing angle
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        setAngle(Math.atan2(dy, dx));
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [onPositionUpdate]);

  // Animate body segments following head
  useEffect(() => {
    const tick = () => {
      timeRef.current += 0.08;
      const head = posRef.current;
      const segs = segmentsRef.current;

      if (segs.length === 0) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      // First segment follows head
      const leader = { x: head.x, y: head.y };
      for (let i = 0; i < segs.length; i++) {
        const target = i === 0 ? leader : segs[i - 1];
        const dx = target.x - segs[i].x;
        const dy = target.y - segs[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Undulation offset
        const wave = Math.sin(timeRef.current + i * 0.5) * 4;
        const perpAngle = Math.atan2(dy, dx) + Math.PI / 2;

        if (dist > SEGMENT_SPACING) {
          const ratio = SEGMENT_SPACING / dist;
          segs[i].x = target.x - dx * ratio + Math.cos(perpAngle) * wave;
          segs[i].y = target.y - dy * ratio + Math.sin(perpAngle) * wave;
        } else {
          segs[i].x += Math.cos(perpAngle) * wave * 0.3;
          segs[i].y += Math.sin(perpAngle) * wave * 0.3;
        }
      }

      setSegments([...segs]);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 99 }}>
      {/* Body segments (render back to front) */}
      {[...segments].reverse().map((seg, revIdx) => {
        const i = segments.length - 1 - revIdx;
        const t = i / Math.max(1, segments.length - 1);
        const size = BODY_START_SIZE - (BODY_END_SIZE * t);
        const opacity = 0.9 - 0.4 * t;

        // Alternating segment colors for that segmented worm look
        const isEven = i % 2 === 0;
        const baseColor = isEven ? "rgba(180,0,40,0.85)" : "rgba(140,0,30,0.85)";
        const glowColor = isEven ? "rgba(255,0,50,0.3)" : "rgba(255,0,50,0.2)";

        return (
          <div
            key={`seg-${i}`}
            className="absolute rounded-full"
            style={{
              left: seg.x - size / 2,
              top: seg.y - size / 2,
              width: size,
              height: size,
              opacity,
              background: `radial-gradient(circle at 40% 35%, ${baseColor}, rgba(60,0,15,0.9))`,
              border: `1px solid rgba(255,30,60,0.25)`,
              boxShadow: `0 0 ${8 + (1 - t) * 8}px ${glowColor}, inset 0 0 ${4 + (1 - t) * 4}px rgba(255,30,60,0.4)`
            }}
          />
        );
      })}

      {/* Worm head */}
      <div
        className="absolute"
        style={{
          left: posRef.current.x - HEAD_SIZE / 2,
          top: posRef.current.y - HEAD_SIZE / 2,
          width: HEAD_SIZE,
          height: HEAD_SIZE,
          transform: `rotate(${angle}rad)`,
        }}
      >
        {/* Head body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 35%, rgba(200,0,50,0.95), rgba(80,0,20,0.95))`,
            border: `1.5px solid rgba(255,40,70,0.4)`,
            boxShadow: `0 0 10px rgba(255,0,50,0.4), 0 0 40px rgba(255,0,50,0.15), inset 0 0 8px rgba(255,0,50,0.4)`
          }}
        />

        {/* Mouth (front of head - right side when angle=0) */}
        <div
          className="absolute"
          style={{
            right: -4,
            top: "50%",
            transform: "translateY(-50%)",
            width: 22,
            height: isChomping ? 14 : 20,
            transition: "height 0.1s ease",
          }}
        >
          {/* Mouth opening */}
          <div
            className="absolute inset-0 rounded-r-full overflow-hidden"
            style={{
              border: "1px solid rgba(255,40,70,0.4)",
              background: `radial-gradient(circle at 30% 50%, rgba(20,0,5,0.98), rgba(60,0,15,0.95))`,
              borderLeft: "none",
              boxShadow: "inset 0 10px rgba(255,0,30,0.3)",
            }}
          >
            {/* Throat glow */}
            <div
              className="absolute rounded-full"
              style={{
                left: 2,
                top: "50%",
                transform: "translateY(-50%)",
                width: 6,
                height: 6,
                background: "rgba(255,0,50,0.6)",
                boxShadow: "0 0 3px rgba(255,0,50,0.8)"
              }}
            />
          </div>

          {/* Top teeth */}
          <svg
            className="absolute"
            style={{ top: -2, right: 2, width: 18, height: 6 }}
            viewBox="0 0 18 6"
          >
            <polygon points="0,6 3,0 6,6" fill="rgba(255,200,200,0.9)" />
            <polygon points="6,6 9,0 12,6" fill="rgba(255,200,200,0.9)" />
            <polygon points="12,6 15,0 18,6" fill="rgba(255,200,200,0.9)" />
          </svg>

          {/* Bottom teeth */}
          <svg
            className="absolute"
            style={{ bottom: 2, right: 2, width: 18, height: 6 }}
            viewBox="0 0 18 6"
          >
            <polygon points="0,0 3,6 6,0" fill="rgba(255,200,200,0.9)" />
            <polygon points="6,0 9,6 12,0" fill="rgba(255,200,200,0.9)" />
            <polygon points="12,0 15,6 18,0" fill="rgba(255,200,200,0.9)" />
          </svg>
        </div>

        {/* Eyes */}
        <div
          className="absolute"
          style={{
            left: "55%",
            top: "18%",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ff4466, #cc0033)",
            boxShadow: "0 0 6px #ff0044, 0 0 12px rgba(255,0,68,0.5)",
          }}
        >
          {/* Pupil */}
          <div
            className="absolute"
            style={{
              right: 1,
              top: "50%",
              transform: "translateY(-50%)",
              width: 3,
              height: 4,
              borderRadius: "50%",
              background: "#000",
            }}
          />
        </div>

        <div
          className="absolute"
          style={{
            left: "55%",
            bottom: "18%",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ff4466, #cc0033)",
            boxShadow: "0 0 6px #ff0044, 0 0 12px rgba(255,0,68,0.5)",
          }}
        >
          {/* Pupil */}
          <div
            className="absolute"
            style={{
              right: 1,
              top: "50%",
              transform: "translateY(-50%)",
              width: 3,
              height: 4,
              borderRadius: "50%",
              background: "#000",
            }}
          />
        </div>

        {/* Subtle texture ridges on head */}
        {[0.25, 0.45, 0.65].map((t) => (
          <div
            key={t}
            className="absolute rounded-full"
            style={{
              left: `${t * 100}%`,
              top: "15%",
              bottom: "15%",
              width: 1.5,
              background: "rgba(255,60,90,0.15)",
            }}
          />
        ))}

        {/* Chomp effect */}
        <AnimatePresence>
          {isChomping && (
            <motion.div
              className="absolute rounded-full"
              style={{
                left: posRef.current.x + Math.cos(angle) * 20 - 15,
                top: posRef.current.y + Math.sin(angle) * 20 - 15,
                width: 30,
                height: 30,
                border: "2px solid rgba(255,0,50,0.6)",
                boxShadow: "0 0 15px rgba(255,0,50,0.4)",
              }}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}