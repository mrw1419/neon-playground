// ColinVisual.tsx
// Classic variant SVG visual for Colin the space worm

import React from 'react';
import { EVIL, EVIL_DARK, EVIL_LIGHT } from '../../../styles/colors';

export interface ColinVisualProps {
  segments: { x: number; y: number; r: number }[];
  angle?: number;
  isChomping?: boolean;
  overlay?: React.ReactNode;
  color?: string;
  eyeColor?: string;
  mouthColor?: string;
  teethColor?: string;
  alternating?: boolean;
}


export const ColinVisual: React.FC<ColinVisualProps> = ({
  segments,
  angle = 0,
  isChomping = false,
  overlay,
  color = EVIL,
  eyeColor = EVIL_LIGHT,
  mouthColor = EVIL_DARK,
  teethColor = '#fff',
  alternating = true,
}) => {
  if (!segments || segments.length === 0) return null;
  // Find bounding box for all segments
  const xs = segments.map(s => s.x);
  const ys = segments.map(s => s.y);
  const minX = Math.min(...xs) - 40;
  const maxX = Math.max(...xs) + 40;
  const minY = Math.min(...ys) - 40;
  const maxY = Math.max(...ys) + 40;
  const width = maxX - minX;
  const height = maxY - minY;
  // Offset all segments to local SVG space
  const offsetSegments = segments.map(s => ({ x: s.x - minX, y: s.y - minY, r: s.r }));
  const head = offsetSegments[0];
  const segs = offsetSegments.slice(1);
  return (
    <svg style={{ position: 'absolute', left: minX, top: minY, pointerEvents: 'none', zIndex: 10 }} width={width} height={height}>
      {/* Body segments */}
      {segs.map((seg, i) => {
        const t = i / Math.max(1, segs.length - 1);
        const fill = alternating && i % 2 === 0 ? color : EVIL_DARK;
        const opacity = 0.9 - 0.4 * t;
        return (
          <circle
            key={`seg-${i}`}
            cx={seg.x}
            cy={seg.y}
            r={seg.r}
            fill={fill}
            opacity={opacity}
            stroke={EVIL_LIGHT}
            strokeWidth={1.5}
            filter="url(#colin-glow)"
          />
        );
      })}
      {/* Head */}
      <g transform={`translate(${head.x},${head.y}) rotate(${(angle * 180) / Math.PI})`}>
        <circle r={head.r} fill={color} stroke={EVIL_LIGHT} strokeWidth={2} filter="url(#colin-glow)" />
        {/* Eyes */}
        <ellipse cx={head.r * 0.3} cy={-head.r * 0.25} rx={head.r * 0.18} ry={head.r * 0.22} fill={eyeColor} />
        <ellipse cx={head.r * 0.3} cy={head.r * 0.25} rx={head.r * 0.18} ry={head.r * 0.22} fill={eyeColor} />
        {/* Mouth */}
        <ellipse
          cx={head.r * 0.7}
          cy={0}
          rx={head.r * 0.32}
          ry={isChomping ? head.r * 0.18 : head.r * 0.28}
          fill={mouthColor}
          stroke={EVIL_DARK}
          strokeWidth={1}
        />
        {/* Teeth */}
        <rect x={head.r * 0.85} y={-head.r * 0.08} width={head.r * 0.08} height={head.r * 0.16} fill={teethColor} rx={2} />
        <rect x={head.r * 0.85} y={head.r * 0.08} width={head.r * 0.08} height={head.r * 0.16} fill={teethColor} rx={2} />
        {/* Overlay (diagnostics, status, etc.) */}
        {overlay && <g>{overlay}</g>}
      </g>
      {/* Glow filter */}
      <defs>
        <filter id="colin-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};
