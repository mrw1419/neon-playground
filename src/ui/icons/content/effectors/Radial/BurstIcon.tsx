import React from 'react';

import { NEON_THEMES } from '../../../../../styles/neonThemes';

// Multi-color neon burst with separated sparkles
export const BurstIcon: React.FC = () => {
  const themes = [
    NEON_THEMES.yellow,
    NEON_THEMES.cyan,
    NEON_THEMES.magenta,
    NEON_THEMES.acidGreen,
    NEON_THEMES.purple
  ];
  // Firework/explosion-style radiating sparkles
  const sparkles = [
    // Main cardinal directions (longest)
    { x1: 16, y1: 16, x2: 16, y2: 3, color: 0 },
    { x1: 16, y1: 16, x2: 16, y2: 29, color: 1 },
    { x1: 16, y1: 16, x2: 3, y2: 16, color: 2 },
    { x1: 16, y1: 16, x2: 29, y2: 16, color: 3 },
    // Diagonals (medium)
    { x1: 16, y1: 16, x2: 6, y2: 6, color: 4 },
    { x1: 16, y1: 16, x2: 26, y2: 6, color: 0 },
    { x1: 16, y1: 16, x2: 6, y2: 26, color: 1 },
    { x1: 16, y1: 16, x2: 26, y2: 26, color: 2 },
    // Between cardinal and diagonal (shorter)
    { x1: 16, y1: 16, x2: 16, y2: 8, color: 3 },
    { x1: 16, y1: 16, x2: 16, y2: 24, color: 4 },
    { x1: 16, y1: 16, x2: 8, y2: 16, color: 0 },
    { x1: 16, y1: 16, x2: 24, y2: 16, color: 1 },
    { x1: 16, y1: 16, x2: 10, y2: 10, color: 2 },
    { x1: 16, y1: 16, x2: 22, y2: 10, color: 3 },
    { x1: 16, y1: 16, x2: 10, y2: 22, color: 4 },
    { x1: 16, y1: 16, x2: 22, y2: 22, color: 0 },
  ];
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <defs>
        {themes.map((theme, i) => (
          <React.Fragment key={`theme-defs-${i}`}>
            <radialGradient key={`burst-glow-${i}`} id={`burst-glow-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.10" />
              <stop offset="70%" stopColor={theme.primary} stopOpacity="0.18" />
              <stop offset="100%" stopColor={theme.primary} stopOpacity="0.05" />
            </radialGradient>
            <filter key={`burst-neon-glow-${i}`} id={`burst-neon-glow-${i}`} x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="0" stdDeviation="0.7" floodColor={theme.primary} floodOpacity="0.3" />
            </filter>
          </React.Fragment>
        ))}
      </defs>
      {/* No background circles for a cleaner fireworks look */}
      {/* Multi-color firework burst sparkles */}
      {sparkles.map((s, i) => (
        <g key={i}>
          <line
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={themes[s.color].primary}
            strokeWidth={2.6}
            strokeLinecap="round"
            filter={`url(#burst-neon-glow-${s.color})`}
          />
          {/* Add a sparkle dot at the end */}
          <circle
            cx={s.x2}
            cy={s.y2}
            r={i % 2 === 0 ? 2.1 : 1.3}
            fill={themes[s.color].primary}
            opacity={0.85}
            filter={`url(#burst-neon-glow-${s.color})`}
          />
        </g>
      ))}
      {/* No white highlight ring for a pure fireworks look */}
    </svg>
  );
};
