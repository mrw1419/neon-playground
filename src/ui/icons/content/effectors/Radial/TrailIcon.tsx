import React from 'react';
import { NEON_THEMES } from '../../../../../styles/neonThemes';

// Neon multi-color sparkle trail
export const TrailIcon: React.FC = () => {
  const themes = [
    NEON_THEMES.cyan,
    NEON_THEMES.magenta,
    NEON_THEMES.yellow,
    NEON_THEMES.acidGreen,
    NEON_THEMES.purple
  ];
  // More sparkles: dots and a few star shapes
  const sparkles = [
    { cx: 6, cy: 26, r: 2.2, color: 0, type: 'dot' },
    { cx: 8, cy: 23, r: 0.9, color: 1, type: 'dot' },
    { cx: 10, cy: 20, r: 1.7, color: 2, type: 'star' },
    { cx: 12, cy: 17, r: 0.7, color: 3, type: 'dot' },
    { cx: 14, cy: 14, r: 1.3, color: 4, type: 'dot' },
    { cx: 15, cy: 12, r: 0.6, color: 0, type: 'dot' },
    { cx: 16, cy: 10, r: 1.1, color: 1, type: 'star' },
    { cx: 18, cy: 10, r: 0.8, color: 2, type: 'dot' },
    { cx: 20, cy: 12, r: 0.7, color: 3, type: 'dot' },
    { cx: 22, cy: 16, r: 1.5, color: 4, type: 'dot' },
    { cx: 23, cy: 19, r: 0.8, color: 0, type: 'dot' },
    { cx: 24, cy: 22, r: 0.7, color: 1, type: 'dot' },
    { cx: 26, cy: 26, r: 2.2, color: 2, type: 'star' },
  ];
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <defs>
        {themes.map((theme, i) => (
          <filter key={`trail-neon-glow-${i}`} id={`trail-neon-glow-${i}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor={theme.primary} floodOpacity="0.5" />
          </filter>
        ))}
      </defs>
      {/* Curved path for visual reference (faint neon) */}
      <path d="M6 26 Q16 6 26 26" stroke={themes[0].primary} strokeWidth="1.2" fill="none" opacity="0.18" />
      {/* Neon sparkles along the trail: dots and stars */}
      {sparkles.map((s, i) => (
        s.type === 'dot' ? (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={themes[s.color].primary}
            opacity={0.92}
            filter={`url(#trail-neon-glow-${s.color})`}
          />
        ) : (
          <g key={i}>
            <circle
              cx={s.cx}
              cy={s.cy}
              r={s.r * 1.1}
              fill={themes[s.color].primary}
              opacity={0.92}
              filter={`url(#trail-neon-glow-${s.color})`}
            />
            {/* Star sparkle: 4-pointed */}
            <g stroke={themes[s.color].primary} strokeWidth={0.9} strokeLinecap="round" filter={`url(#trail-neon-glow-${s.color})`}>
              <line x1={s.cx - s.r * 2} y1={s.cy} x2={s.cx + s.r * 2} y2={s.cy} />
              <line x1={s.cx} y1={s.cy - s.r * 2} x2={s.cx} y2={s.cy + s.r * 2} />
            </g>
          </g>
        )
      ))}
    </svg>
  );
};
