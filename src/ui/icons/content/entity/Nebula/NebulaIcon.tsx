import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const NebulaIcon: React.FC = () => {
  const theme = NEON_THEMES.magenta;
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <defs>
        {/* Blurs for nebula clouds */}
        <radialGradient id="nebula1" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.07" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="nebula2" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="nebula3" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="blur-nebula" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.92" />
        </filter>
        {/* Glow for dots */}
        <radialGradient id="dot-glow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor={theme.primary} />
        </radialGradient>
      </defs>
      {/* Nebula clouds */}
      <ellipse cx="13.6" cy="15.2" rx="7.2" ry="7.2" fill="url(#nebula1)" filter="url(#blur-nebula)" transform="translate(-4.24 2.54) scale(1.17)" />
      <ellipse cx="19.2" cy="19.2" rx="6" ry="6" fill="url(#nebula2)" filter="url(#blur-nebula)" transform="translate(5  -3) scale(1.2)" />
      <ellipse cx="22.4" cy="22.4" rx="4.8" ry="4.8" fill="url(#nebula3)" filter="url(#blur-nebula)" transform="translate(-0.33 0.2) scale(1.01)" />
      {/* Glowing dots */}
      <ellipse cx="20.8" cy="8.8" rx="0.48" ry="0.48" fill="url(#dot-glow)" filter="url(#blur-nebula)" />
      <ellipse cx="6.4" cy="15.1" rx="0.48" ry="0.48" fill="url(#dot-glow)" filter="url(#blur-nebula)" />
      <ellipse cx="0.7" cy="-0.9" rx="0.48" ry="0.48" fill="url(#dot-glow)" filter="url(#blur-nebula)" />
      <ellipse cx="16.2" cy="4.7" rx="0.48" ry="0.48" fill="url(#dot-glow)" filter="url(#blur-nebula)" />
    </svg>
  );
};
