// getPlanetTheme.ts
// Central utility for planet theme lookup and fallback
import { NEON_THEMES } from '../../styles/neonThemes';

export type NeonThemeKey = keyof typeof NEON_THEMES;

export function getPlanetTheme(themeKey?: string): typeof NEON_THEMES[NeonThemeKey] {
  const themeKeys = Object.keys(NEON_THEMES) as NeonThemeKey[];
  if (themeKey && NEON_THEMES[themeKey as NeonThemeKey]) {
    return NEON_THEMES[themeKey as NeonThemeKey];
  }
  // Pick a random theme if missing/invalid
  const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
  return NEON_THEMES[randomKey];
}
