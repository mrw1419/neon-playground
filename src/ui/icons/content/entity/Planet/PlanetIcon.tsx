import { NEON_THEMES } from '../../../../../styles/neonThemes';

export const PlanetIcon: React.FC = () => {
	const theme = NEON_THEMES.cyan;
	return (
		<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
			{/* Main planet with radial gradient and glow */}
			<defs>
				<radialGradient id="planet-gradient" cx="35%" cy="30%" r="70%">
					<stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
					<stop offset="45%" stopColor={theme.primary} stopOpacity="1" />
					<stop offset="80%" stopColor="#0088aa" stopOpacity="1" />
					<stop offset="100%" stopColor="transparent" />
				</radialGradient>
				<filter id="planet-glow" x="-30%" y="-30%" width="160%" height="160%">
					<feDropShadow dx="0" dy="0" stdDeviation="3.6" floodColor={theme.primary} floodOpacity="0.4" />
					<feDropShadow dx="0" dy="0" stdDeviation="7.2" floodColor={theme.primary} floodOpacity="0.4" />
				</filter>
				<filter id="blur1" x="-20%" y="-20%" width="140%" height="140%">
					<feGaussianBlur stdDeviation="1" />
				</filter>
				<filter id="blur2" x="-20%" y="-20%" width="140%" height="140%">
					<feGaussianBlur stdDeviation="3" />
				</filter>
			</defs>
			<circle cx="16" cy="16" r="12" fill="url(#planet-gradient)" filter="url(#planet-glow)" />
			{/* Subtle rings */}
			<ellipse cx="16" cy="19" rx="11" ry="2.2" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.08" filter="url(#blur1)" />
			<ellipse cx="16" cy="22" rx="11" ry="2.2" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.11" filter="url(#blur1)" />
			<ellipse cx="16" cy="25" rx="11" ry="2.4" fill="none" stroke="#fff" strokeWidth="0.6" opacity="0.14" filter="url(#blur1)" />
			<ellipse cx="16" cy="27" rx="11" ry="2.4" fill="none" stroke="#fff" strokeWidth="0.6" opacity="0.17" filter="url(#blur1)" />
			{/* Highlight spot */}
			<ellipse cx="21" cy="11" rx="3.5" ry="3.5" fill="#fff" opacity="0.2" filter="url(#blur2)" />
		</svg>
	);
};
