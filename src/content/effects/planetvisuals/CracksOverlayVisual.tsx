// CracksOverlayVisual.tsx
// Reusable cracked surface overlay for planets, moons, and comets
import { getPlanetTheme } from '../../utils/getPlanetTheme';

export interface CracksOverlayVisualProps {
  colorTheme?: string;
  color?: string;
  radius?: number;
  opacity?: number;
}

export const CracksOverlayVisual: React.FC<CracksOverlayVisualProps> = (props) => {
  const {
    colorTheme,
    color,
    radius = 40,
    opacity = 0.7,
  } = props;
  const crackColor = color || getPlanetTheme(colorTheme).primary;

  const cracks = [
    <path key="main" d={`M ${-radius * 0.5},0 Q 0,${radius * 0.2} ${radius * 0.5},0`} stroke={crackColor} strokeWidth={2} fill="none" />,
    <path key="branch1" d={`M 0,0 Q ${radius * 0.1},${-radius * 0.3} ${radius * 0.3},${-radius * 0.4}`} stroke={crackColor} strokeWidth={1.2} fill="none" />,
    <path key="branch2" d={`M 0,0 Q ${-radius * 0.1},${-radius * 0.3} ${-radius * 0.3},${-radius * 0.4}`} stroke={crackColor} strokeWidth={1.2} fill="none" />,
    <path key="branch3" d={`M ${radius * 0.2},0 Q ${radius * 0.3},${radius * 0.2} ${radius * 0.4},${radius * 0.3}`} stroke={crackColor} strokeWidth={1} fill="none" />,
    <path key="branch4" d={`M ${-radius * 0.2},0 Q ${-radius * 0.3},${radius * 0.2} ${-radius * 0.4},${radius * 0.3}`} stroke={crackColor} strokeWidth={1} fill="none" />,
  ];

  for (let i = 0; i < 3; i++) {
    const angle = Math.random() * Math.PI * 2;
    const len = radius * (0.2 + Math.random() * 0.2);
    const x1 = Math.cos(angle) * (radius * 0.1);
    const y1 = Math.sin(angle) * (radius * 0.1);
    const x2 = Math.cos(angle) * len;
    const y2 = Math.sin(angle) * len;
    cracks.push(
      <path
        key={`micro${i}`}
        d={`M ${x1},${y1} L ${x2},${y2}`}
        stroke={crackColor}
        strokeWidth={0.8}
        fill="none"
        opacity={0.6}
      />
    );
  }

  return <g opacity={opacity}>{cracks}</g>;
};
