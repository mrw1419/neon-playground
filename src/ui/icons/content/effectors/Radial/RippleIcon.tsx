
import React from 'react';
import { NEON_THEMES } from '../../../../../styles/neonThemes';

// Simple, clean neon ripple effect: 4 concentric rings, top-down view
export const RippleIcon: React.FC = () => {
  const themes = [
    NEON_THEMES.cyan,
    NEON_THEMES.magenta,
    NEON_THEMES.yellow,
    NEON_THEMES.acidGreen
  ];
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <defs>
        {themes.map((theme, i) => (
          <filter key={`ripple-neon-glow-${i}`} id={`ripple-neon-glow-${i}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.1" floodColor={theme.primary} floodOpacity="0.4" />
          </filter>
        ))}
      </defs>
      {/* Four concentric neon rings radiating from the center */}
      <circle cx="16" cy="16" r="6" stroke={themes[0].primary} strokeWidth="2.2" fill="none" filter="url(#ripple-neon-glow-0)" />
      <circle cx="16" cy="16" r="9.5" stroke={themes[1].primary} strokeWidth="1.7" fill="none" filter="url(#ripple-neon-glow-1)" />
      <circle cx="16" cy="16" r="13" stroke={themes[2].primary} strokeWidth="1.3" fill="none" filter="url(#ripple-neon-glow-2)" />
      <circle cx="16" cy="16" r="15.5" stroke={themes[3].primary} strokeWidth="1.1" fill="none" filter="url(#ripple-neon-glow-3)" />
    </svg>
  );
};
