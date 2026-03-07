import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const ColinIcon: React.FC = () => {
  const theme = NEON_THEMES.red;
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <defs>
        {/* Neon body gradient */}
        <radialGradient id="colin-body" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="40%" stopColor={theme.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0.7" />
        </radialGradient>
        <filter id="colin-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor={theme.primary} floodOpacity="0.4" />
        </filter>
        <radialGradient id="colin-highlight" cx="60%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Head (largest) */}
      <ellipse cx="7" cy="16" rx="4" ry="4" fill="url(#colin-body)" filter="url(#colin-glow)" />
      {/* Body segments, curving for swimming motion */}
      <ellipse cx="13" cy="13" rx="3.2" ry="3" fill="url(#colin-body)" filter="url(#colin-glow)" />
      <ellipse cx="18.5" cy="15.5" rx="2.6" ry="2.4" fill="url(#colin-body)" filter="url(#colin-glow)" />
      <ellipse cx="23" cy="19" rx="2" ry="1.8" fill="url(#colin-body)" filter="url(#colin-glow)" />
      {/* Tail (smallest) */}
      <ellipse cx="27" cy="24" rx="1.2" ry="1" fill="url(#colin-body)" filter="url(#colin-glow)" />
      {/* Subtle highlights */}
      <ellipse cx="7.8" cy="14.2" rx="1.2" ry="0.7" fill="url(#colin-highlight)" />
      <ellipse cx="13.8" cy="11.7" rx="0.8" ry="0.5" fill="url(#colin-highlight)" />
      {/* Face on head */}
      <circle cx="8.5" cy="15" r="0.7" fill="#fff" />
      <ellipse cx="6.2" cy="15.5" rx="0.5" ry="0.7" fill="#fff" />
      {/* Mouth */}
      <path d="M7 18 Q7.8 18.7 8.6 18" stroke="#a00" strokeWidth="0.5" fill="none" />
    </svg>
  );
};
