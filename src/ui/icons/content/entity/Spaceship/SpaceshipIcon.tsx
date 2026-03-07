
import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const SpaceshipIcon: React.FC = () => {
  const theme = NEON_THEMES.cyan;
  return (
    <svg
      viewBox="0 0 60 80"
      width="24"
      height="32"
      style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
      fill="none"
    >
    {/* Spaceship outline with glow */}
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffff00" floodOpacity="0.4" />
    </filter>
      <path
        d="M30 2 L48 55 L42 65 L38 58 L22 58 L18 65 L12 55 Z"
        fill="none"
        stroke={theme.primary}
        strokeWidth="1.5"
        filter="url(#glow)"
      />
      {/* Spaceship body fill */}
      <path
        d="M30 2 L48 55 L42 65 L38 58 L22 58 L18 65 L12 55 Z"
        fill={theme.primary + '15'}
      />
      {/* Cockpit ellipse */}
      <ellipse
        cx="30"
        cy="22"
        rx="6"
        ry="8"
        fill={theme.primary + '40'}
        stroke={theme.primary}
        strokeWidth="1"
      />
      {/* Left engine line */}
      <path
        d="M12 55 L2 65 L8 55"
        fill="none"
        stroke={theme.primary}
        strokeWidth="1"
        opacity="0.7"
      />
      {/* Right engine line */}
      <path
        d="M48 55 L58 65 L52 55"
        fill="none"
        stroke={theme.primary}
        strokeWidth="1"
        opacity="0.7"
      />
      {/* Simulated engine glow using a blurred ellipse */}
      <ellipse
        cx="30"
        cy="68"
        rx="3.6"
        ry="4.8"
        fill="url(#engine-glow)"
        filter="url(#engine-blur)"
        style={{ pointerEvents: 'none' }}
      />
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={theme.primary} floodOpacity="0.4" />
        </filter>
        <radialGradient id="engine-glow" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="1" />
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
        </radialGradient>
        <filter id="engine-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.44" />
        </filter>
      </defs>
    </svg>
  );
};
