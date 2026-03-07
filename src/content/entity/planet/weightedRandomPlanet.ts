// weightedRandomPlanet.ts
// Returns a randomized planet config based on the Earth variant, with random colorTheme and overlays

import { RockyParentType } from './ParentTypes/Rocky';
import { EarthVariant } from './variants/Earth';
import { NEON_THEMES } from '../../../styles/neonThemes';

export function getWeightedRandomPlanet() {
  // Pick a random valid colorTheme from NEON_THEMES
  const validThemes = RockyParentType.colorThemes.filter(t => Object.keys(NEON_THEMES).includes(t));
  const colorTheme = validThemes[Math.floor(Math.random() * validThemes.length)];
  // Only use 'craters' overlay for now
  const overlays = ['craters'];
  return {
    ...EarthVariant,
    type: 'planet',
    colorTheme,
    overlays,
  };
}
