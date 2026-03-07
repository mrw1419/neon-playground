// Rocky.ts
// Rocky parent type definition for planet registry

export const RockyParentType = {
  id: 'Rocky',
  description: 'Solid, high-density, classic planet',
  tags: ['stable', 'moonable', 'common', 'moonlike'],
  colorThemes: [
    'cyan', 'magenta', 'purple', 'red', 'acidGreen', 'orange', 'yellow',
    'earth', 'moon', 'ice', 'evil', 'lava',
    'metallicSilver', 'metallicGold', 'metallicBronze',
    'organicGreen', 'organicBrown', 'organicDarkGreen',
    'waterDeepBlue', 'waterAqua', 'waterLightBlue', 'crystalLightBlue',
    'crystalPink', 'crystalWhite'
  ],
  defaults: {
    size: 'M',
    gravity: 1.5,
    health: 200,
    density: 1.8,
    orbitalAttraction: 1.0,
    baseTemperature: 280,
    baseColorTheme: 'earthlike',
    effectorAffinity: 'normal',
    effectImmunity: 'none',
    interactable: true,
    canOrbit: true,
    canBeOrbited: true,
  },
  engine: 'Standard physics, can be split/merged',
  effectors: ['burst', 'ripple'],
};
