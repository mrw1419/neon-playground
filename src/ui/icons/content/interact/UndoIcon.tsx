import React from "react";
import { NEON_THEMES } from '../../../../styles/neonThemes';

// Picked magenta for a vibrant neon look
export const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const theme = NEON_THEMES.magenta;
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <defs>
        <radialGradient id="undo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="70%" stopColor={theme.primary} stopOpacity="0.18" />
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0.05" />
        </radialGradient>
        <filter id="undo-neon-glow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="0" stdDeviation="0.7" floodColor={theme.primary} floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Subtle neon background glow */}
      <circle cx="16" cy="16" r="15" fill="url(#undo-glow)" filter="url(#undo-neon-glow)" />
      {/* Larger neon undo arrow */}
      <g stroke={theme.primary} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" filter="url(#undo-neon-glow)">
        <path d="M7 16h12a8 8 0 1 1-8 8" fill="none" />
        <polyline points="14 25 7 16 14 7" fill="none" />
      </g>
      {/* White highlight for extra neon effect */}
      <g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
        <path d="M9.5 16h9a6 6 0 1 1-6 6" fill="none" />
      </g>
    </svg>
  );
};
