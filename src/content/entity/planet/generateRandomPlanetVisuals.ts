// Utility to generate random visual properties for a planet entity
// Use this in both initial planet generation and later placement

import { NEON_THEMES } from '../../../styles/neonThemes';

function pickRandomTheme() {
  const keys = Object.keys(NEON_THEMES);
  return keys[Math.floor(Math.random() * keys.length)];
}

interface Crater {
  x: number;
  y: number;
  radius: number;
}

function generateRandomCraters(radius: number): Crater[] {
  const craterCount = Math.floor(Math.random() * 3) + 3; // 3 to 5
  const craterList: Crater[] = [];
  let tries = 0;
  while (craterList.length < craterCount && tries < 100) {
    const angle = Math.random() * 2 * Math.PI;
    const dist = Math.random() * (radius * 0.7);
    const craterX = Math.cos(angle) * dist;
    const craterY = Math.sin(angle) * dist;
    const craterRadius = Math.random() * (radius * 0.15) + (radius * 0.07);
    // Check for overlap
    const tooClose = craterList.some((c: Crater) => {
      const dx = c.x - craterX;
      const dy = c.y - craterY;
      const d = Math.sqrt(dx * dx + dy * dy);
      return d < c.radius + craterRadius + 2;
    });
    if (!tooClose) {
      craterList.push({ x: craterX, y: craterY, radius: craterRadius });
    }
    tries++;
  }
  return craterList;
}

export function generateRandomPlanetVisuals(radius: number) {
  return {
    colorTheme: pickRandomTheme(),
    overlays: ['rocky', 'craters'],
    craters: generateRandomCraters(radius),
  };
}
