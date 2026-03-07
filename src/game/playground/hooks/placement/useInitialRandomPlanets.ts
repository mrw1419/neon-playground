import { useRef } from 'react';
import { PlanetEntity } from '../../../../content/entity/planet/PlanetEntity';
import { getWeightedRandomPlanet } from '../../../../content/entity/planet/weightedRandomPlanet';
import { generateRandomPlanetVisuals } from '../../../../content/entity/planet/generateRandomPlanetVisuals';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLANET_MIN_RADIUS = 30;
const PLANET_MAX_RADIUS = 60;

function getRandomPosition(existing: PlanetEntity[], radius: number) {
  let tries = 0;
  while (tries < 50) {
    const x = Math.floor(Math.random() * (CANVAS_WIDTH - 2 * radius) + radius);
    const y = Math.floor(Math.random() * (CANVAS_HEIGHT - 2 * radius) + radius);
    const tooClose = existing.some((p: PlanetEntity) => {
      const dx = p.position.x - x;
      const dy = p.position.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist < p.radius + radius + 10;
    });
    if (!tooClose) return { x, y };
    tries++;
  }
  return {
    x: Math.floor(Math.random() * (CANVAS_WIDTH - 2 * radius) + radius),
    y: Math.floor(Math.random() * (CANVAS_HEIGHT - 2 * radius) + radius)
  };
}

export function useInitialRandomPlanets(numPlanets = 3) {
  const planetsRef = useRef<PlanetEntity[] | null>(null);
  if (!planetsRef.current) {
    const planets = [];
    for (let i = 0; i < numPlanets; i++) {
      const radius = Math.floor(Math.random() * (PLANET_MAX_RADIUS - PLANET_MIN_RADIUS) + PLANET_MIN_RADIUS);
      const position = getRandomPosition(planets, radius);
      const planetConfig = getWeightedRandomPlanet();
      // Use BaseEntity.generateId for guaranteed unique IDs
      const visualProps = generateRandomPlanetVisuals(radius);
      const tempEntity = new PlanetEntity({
        ...planetConfig,
        type: 'planet',
        position,
        radius,
        infoOverlayEnabled: true,
        ...visualProps,
        stats: planetConfig.stats || {},
      });
      planets.push(tempEntity);
    }
    planetsRef.current = planets;
  }
  return planetsRef.current;
}
