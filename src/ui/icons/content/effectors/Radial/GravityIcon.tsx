import React from 'react';
import { NEON_THEMES } from '../../../../../styles/neonThemes';

// Neon multi-color gravity icon: glowing rings, vibrant center, stylized gravity curve
export const GravityIcon: React.FC = () => {
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
          <filter key={`gravity-neon-glow-${i}`} id={`gravity-neon-glow-${i}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.1" floodColor={theme.primary} floodOpacity="0.4" />
          </filter>
        ))}
      </defs>
      {/* Outer neon rings */}
      <circle cx="16" cy="16" r="10" stroke={themes[0].primary} strokeWidth="2.2" fill="none" filter="url(#gravity-neon-glow-0)" />
      <circle cx="16" cy="16" r="13" stroke={themes[1].primary} strokeWidth="1.2" fill="none" filter="url(#gravity-neon-glow-1)" />
      {/* Central mass (gravity well) */}
      <circle cx="16" cy="16" r="4.2" fill={themes[2].primary} filter="url(#gravity-neon-glow-2)" opacity={0.92} />
      {/* Gravity curve (stylized orbit) */}
      <path d="M16 2 Q22 16 16 30 Q10 16 16 2" stroke={themes[3].primary} strokeWidth="1.5" fill="none" filter="url(#gravity-neon-glow-3)" />
      {/* Sparkle at the top and bottom of the curve */}
      <circle cx="16" cy="2.5" r="0.9" fill={themes[3].primary} opacity={0.92} filter="url(#gravity-neon-glow-3)" />
      <circle cx="16" cy="29.5" r="0.9" fill={themes[3].primary} opacity={0.92} filter="url(#gravity-neon-glow-3)" />
    </svg>
  );
};
