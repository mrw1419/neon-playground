/// <reference types="vitest" />
import { describe, it, expect, vi } from 'vitest';
import { PlanetEntity } from '../../content/entity/planet/PlanetEntity';

describe('Entity Update', () => {
  it('should update the position of a PlanetEntity', () => {
    const planet = new PlanetEntity({ position: { x: 0, y: 0 }, velocity: { x: 10, y: 5 } });
    planet.update(1); // Simulate 1 second
    expect(planet.position).toEqual({ x: 10, y: 5 });
  });

  it('should call custom update logic if defined', () => {
    const planet = new PlanetEntity();
    const customUpdate = vi.fn();
    planet.update = customUpdate;
    planet.update(1);
    expect(customUpdate).toHaveBeenCalledWith(1);
  });
});