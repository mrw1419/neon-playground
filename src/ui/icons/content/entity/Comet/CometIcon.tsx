import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const CometIcon: React.FC = () => {
  const theme = NEON_THEMES.red;
  return (
    <svg width="32" height="32" viewBox="0 0 48 14.4" fill="none">
      <defs>
        {/* Main comet tail */}
        <linearGradient id="comet-tail" x1="36" y1="7.2" x2="0" y2="7.2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.5" />
          <stop offset="60%" stopColor={theme.primary} stopOpacity="0.125" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="blur-tail" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="0.96" />
        </filter>
        {/* Secondary tail */}
        <linearGradient id="comet-tail2" x1="28.8" y1="7.2" x2="0" y2="7.2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="blur-tail2" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="0.72" />
        </filter>
        {/* Comet head glow */}
        <radialGradient id="comet-head" cx="60%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor={theme.primary} />
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0.7" />
        </radialGradient>
        <filter id="blur-head" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>
      {/* Main blurred tail */}
      <rect x="7.2" y="5.4" width="36" height="3.6" rx="1.8" fill="url(#comet-tail)" filter="url(#blur-tail)" style={{ transform: 'scaleX(0.885667)', transformOrigin: 'right center' }} />
      {/* Secondary blurred tail */}
      <rect x="7.2" y="2.52" width="28.8" height="1.92" rx="0.96" fill="url(#comet-tail2)" filter="url(#blur-tail2)" style={{ transform: 'scaleX(0.93108)', transformOrigin: 'right center' }} />
      {/* Comet head */}
      <ellipse cx="43.2" cy="7.2" rx="3.6" ry="3.6" fill="url(#comet-head)" filter="url(#blur-head)" />
      {/* Brightest core */}
      <ellipse cx="43.2" cy="7.2" rx="2.4" ry="2.4" fill="url(#comet-head)" />
    </svg>
  );
};
