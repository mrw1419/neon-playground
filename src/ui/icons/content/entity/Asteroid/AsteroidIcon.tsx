import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const AsteroidIcon: React.FC = () => {
  const theme = NEON_THEMES.acidGreen;
  return (
    <svg width="32" height="32" viewBox="0 0 60 60" fill="none" style={{ transform: 'rotate(285.768deg)' }}>
      <defs>
        <filter id="asteroid-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={theme.primary} floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Asteroid outline with glow */}
      <path d="M30 5 L42 10 L52 20 L55 35 L48 48 L35 55 L20 52 L8 42 L5 28 L10 15 L22 8 Z"
        fill={theme.primary + '10'}
        stroke={theme.primary}
        strokeWidth="1"
        filter="url(#asteroid-glow)"
      />
      {/* Craters */}
      <circle cx="25" cy="25" r="5" fill="none" stroke={theme.primary} strokeWidth="0.5" opacity="0.3" />
      <circle cx="38" cy="35" r="3" fill="none" stroke={theme.primary} strokeWidth="0.5" opacity="0.3" />
      <circle cx="20" cy="40" r="4" fill="none" stroke={theme.primary} strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
};
