import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const SatelliteIcon: React.FC = () => {
  const theme = NEON_THEMES.cyan;
  return (
    <svg
      viewBox="0 0 84 60"
      width="32"
      height="32"
      fill="none"
      style={{ display: 'block' }}
    >
      {/* Main body with glow */}
      <filter id="sat-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="2" floodColor={theme.primary} floodOpacity="0.4" />
      </filter>
      <rect x="30" y="22" width="24" height="16" rx="3" fill={theme.primary + '15'} stroke={theme.primary} strokeWidth="1" filter="url(#sat-glow)" />
      {/* Left solar panel */}
      <rect x="2" y="18" width="22" height="24" rx="1" fill="none" stroke={theme.primary} strokeWidth="1" opacity="0.6" />
      <line x1="13" y1="18" x2="13" y2="42" stroke={theme.primary} strokeWidth="0.5" opacity="0.4" />
      <line x1="2" y1="30" x2="24" y2="30" stroke={theme.primary} strokeWidth="0.5" opacity="0.4" />
      {/* Right solar panel */}
      <rect x="60" y="18" width="22" height="24" rx="1" fill="none" stroke={theme.primary} strokeWidth="1" opacity="0.6" />
      <line x1="71" y1="18" x2="71" y2="42" stroke={theme.primary} strokeWidth="0.5" opacity="0.4" />
      <line x1="60" y1="30" x2="82" y2="30" stroke={theme.primary} strokeWidth="0.5" opacity="0.4" />
      {/* Connectors */}
      <line x1="24" y1="30" x2="30" y2="30" stroke={theme.primary} strokeWidth="1.5" opacity="0.8" />
      <line x1="54" y1="30" x2="60" y2="30" stroke={theme.primary} strokeWidth="1.5" opacity="0.8" />
      {/* Antenna */}
      <line x1="42" y1="22" x2="42" y2="8" stroke={theme.primary} strokeWidth="0.8" opacity="0.5" />
      <circle cx="42" cy="7" r="2" fill={theme.primary} opacity="0.8" />
      {/* Small detail rectangle */}
      <rect x="38" y="38" width="8" height="6" rx="1" fill="none" stroke={theme.primary} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
};
