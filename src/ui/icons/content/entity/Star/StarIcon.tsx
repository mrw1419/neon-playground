import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const StarIcon: React.FC = () => {
  const theme = NEON_THEMES.magenta;
  // 24x24 center, scale to 32x32 viewBox
  // Star polygon points (normalized to 24x24, centered at 16,16 in 32x32)
  const starPolygon = [
    [16, 4], [18.72, 10.32], [25.5, 7.68], [23.52, 14.56], [29.76, 14],
    [24.96, 18.08], [32, 16], [24.96, 19.92], [29.76, 25.92], [23.52, 24.32],
    [25.5, 31.04], [18.72, 27.68], [16, 32], [13.28, 27.68], [6.5, 31.04],
    [8.48, 24.32], [2.24, 25.92], [7.04, 19.92], [0, 16], [7.04, 18.08],
    [2.24, 14], [8.48, 14.56], [6.5, 7.68], [13.28, 10.32],
  ].map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <defs>
        {/* Outer blurred magenta star */}
        <radialGradient id="star-outer" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.314" />
          <stop offset="30%" stopColor={theme.primary} stopOpacity="0.157" />
          <stop offset="50%" stopColor={theme.primary} stopOpacity="0.063" />
          <stop offset="70%" stopColor="transparent" />
        </radialGradient>
        <filter id="blur-outer" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.96" />
        </filter>
        {/* Middle blurred magenta star */}
        <radialGradient id="star-mid" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.565" />
          <stop offset="25%" stopColor={theme.primary} stopOpacity="0.333" />
          <stop offset="50%" stopColor={theme.primary} stopOpacity="0.125" />
          <stop offset="70%" stopColor="transparent" />
        </radialGradient>
        <filter id="blur-mid" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8.72" />
        </filter>
        {/* Inner blurred magenta star */}
        <radialGradient id="star-inner" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.8" />
          <stop offset="25%" stopColor={theme.primary} stopOpacity="0.44" />
          <stop offset="50%" stopColor={theme.primary} stopOpacity="0.19" />
          <stop offset="65%" stopColor="transparent" />
        </radialGradient>
        <filter id="blur-inner" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8.48" />
        </filter>
        {/* Small magenta glow */}
        <radialGradient id="star-dot" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.44" />
          <stop offset="50%" stopColor={theme.primary} stopOpacity="0.208" />
          <stop offset="85%" stopColor="transparent" />
        </radialGradient>
        <filter id="blur-dot" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        {/* White core dot */}
        <radialGradient id="star-core" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor={theme.primary} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="blur-core" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.24" />
        </filter>
        {/* Brightest center */}
        <radialGradient id="star-center" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor={theme.primary} />
        </radialGradient>
      </defs>
      {/* Outer blurred star */}
      <polygon points={starPolygon} fill="url(#star-outer)" filter="url(#blur-outer)" style={{ transform: 'scale(1.01519)', transformOrigin: '50% 50%' }} />
      {/* Middle blurred star */}
      <polygon points={starPolygon} fill="url(#star-mid)" filter="url(#blur-mid)" style={{ transform: 'scale(0.979596)', transformOrigin: '50% 50%' }} />
      {/* Inner blurred star */}
      <polygon points={starPolygon} fill="url(#star-inner)" filter="url(#blur-inner)" style={{ transform: 'scale(1.01034)', transformOrigin: '50% 50%' }} />
      {/* Small magenta glow dot */}
      <ellipse cx="16" cy="16" rx="4.8" ry="4.8" fill="url(#star-dot)" filter="url(#blur-dot)" style={{ transform: 'scale(0.975027)', transformOrigin: '50% 50%' }} />
      {/* White core dot */}
      <ellipse cx="16" cy="16" rx="2.4" ry="2.4" fill="url(#star-core)" filter="url(#blur-core)" />
      {/* Brightest center */}
      <ellipse cx="16" cy="16" rx="3.6" ry="3.6" fill="url(#star-center)" style={{ zIndex: 1, filter: 'drop-shadow(0 0 1.44px #fff) drop-shadow(8px 0 3.36px ' + theme.primary + ') drop-shadow(0 0 6px ' + theme.primary + '66)' }} />
    </svg>
  );
};
