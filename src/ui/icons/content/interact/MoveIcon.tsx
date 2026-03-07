
import React from "react";
import { NEON_THEMES } from '../../../../styles/neonThemes';

// Picked acid green for a vibrant neon look
export const MoveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const theme = NEON_THEMES.acidGreen;
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <defs>
        <radialGradient id="move-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="70%" stopColor={theme.primary} stopOpacity="0.7" />
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0.15" />
        </radialGradient>
        <filter id="move-neon-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor={theme.primary} floodOpacity="0.7" />
          <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={theme.primary} floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Neon background glow, fits within bounds */}
      <circle cx="16" cy="16" r="15" fill="url(#move-glow)" filter="url(#move-neon-glow)" />
      {/* Neon move arrows, fill more of the space */}
      <g stroke={theme.primary} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" filter="url(#move-neon-glow)">
        <line x1="16" y1="3" x2="16" y2="29" />
        <line x1="3" y1="16" x2="29" y2="16" />
        <polyline points="10 8 16 3 22 8" />
        <polyline points="10 24 16 29 22 24" />
        <polyline points="8 10 3 16 8 22" />
        <polyline points="24 10 29 16 24 22" />
      </g>
      {/* White highlight for extra neon effect */}
      <g stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45">
        <line x1="16" y1="7" x2="16" y2="25" />
        <line x1="7" y1="16" x2="25" y2="16" />
      </g>
    </svg>
  );
};
