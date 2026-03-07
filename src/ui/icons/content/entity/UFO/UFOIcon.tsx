import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const UFOIcon: React.FC = () => {
  const theme = NEON_THEMES.magenta;
  return (
    <svg width="32" height="32" viewBox="0 0 33.6 24" fill="none">
      <defs>
        {/* Beam gradient */}
        <linearGradient id="ufo-beam" x1="4.8" y1="12" x2="4.8" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        {/* Dome gradient */}
        <linearGradient id="ufo-dome" x1="0" y1="0" x2="0" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.376" />
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0.125" />
        </linearGradient>
        {/* Saucer gradient */}
        <linearGradient id="ufo-saucer" x1="0" y1="0" x2="0" y2="4.32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.314" />
          <stop offset="100%" stopColor="#880088" stopOpacity="0.5" />
        </linearGradient>
        {/* Dot glow */}
        <radialGradient id="ufo-dot" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.primary} />
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {/* Beam */}
      <polygon points="6.72,12 16.8,20 28.8,24 4.8,24" fill="url(#ufo-beam)" />
      {/* Dome */}
      <ellipse cx="16.8" cy="6" rx="4.8" ry="3" fill="url(#ufo-dome)" style={{ filter: 'drop-shadow(0 0 15px ' + theme.primary + ')' }} />
      {/* Saucer */}
      <ellipse cx="16.8" cy="12" rx="12" ry="2.16" fill="url(#ufo-saucer)" stroke={theme.primary} strokeWidth="0.5" style={{ filter: 'drop-shadow(0 0 20px ' + theme.primary + '66)' }} />
      {/* Dots */}
      <ellipse cx="11.5" cy="13.2" rx="0.6" ry="0.6" fill="url(#ufo-dot)" />
      <ellipse cx="14.2" cy="13.2" rx="0.6" ry="0.6" fill="url(#ufo-dot)" />
      <ellipse cx="16.8" cy="13.2" rx="0.6" ry="0.6" fill="url(#ufo-dot)" />
      <ellipse cx="19.4" cy="13.2" rx="0.6" ry="0.6" fill="url(#ufo-dot)" />
      <ellipse cx="22.1" cy="13.2" rx="0.6" ry="0.6" fill="url(#ufo-dot)" />
    </svg>
  );
};
