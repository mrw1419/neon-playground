// DeleteVisual.tsx
// MVP visual overlay for entity deletion
import React from 'react';

interface DeleteVisualProps {
  x: number;
  y: number;
  radius?: number;
  color?: string;
}

// Neon magenta/red glow, semi-transparent black fill, animated pulse
const DEFAULT_COLOR = '#FF00AA';

export const DeleteVisual: React.FC<DeleteVisualProps> = ({ x, y, radius = 48, color = DEFAULT_COLOR }) => {
  return (
    <svg style={{ position: 'absolute', left: x - radius, top: y - radius, pointerEvents: 'none', zIndex: 100 }} width={radius * 2} height={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        r={radius - 4}
        fill="rgba(0,0,0,0.5)"
        stroke={color}
        strokeWidth={6}
        filter="url(#delete-glow)"
      />
      <defs>
        <filter id="delete-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={color} floodOpacity="0.8" />
        </filter>
      </defs>
      {/* Optional: animated pulse */}
      <animate
        attributeName="r"
        values={`${radius - 4};${radius - 8};${radius - 4}`}
        dur="0.8s"
        repeatCount="indefinite"
      />
    </svg>
  );
};

// Usage: Render DeleteVisual at entity position when deletion is triggered.
