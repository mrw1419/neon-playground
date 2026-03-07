/// <reference types="vitest" />
import { describe, it, expect, vi } from 'vitest';
import { PlanetEntity } from '../../content/entity/planet/PlanetEntity';

describe('Entity Destruction', () => {
  it('should remove the entity from the physics engine on destroy', () => {
    const planet = new PlanetEntity();
    const removeBodyMock = vi.fn();
    planet.body = { id: 1 } as any;
    planet.physicsEngine = { removeBody: removeBodyMock } as any;
    planet.destroy();
    expect(removeBodyMock).toHaveBeenCalledWith(planet.body);
  });

  it('should call custom destroy logic if defined', () => {
    const planet = new PlanetEntity();
    const customDestroy = vi.fn();
    planet.destroy = customDestroy;
    planet.destroy();
    expect(customDestroy).toHaveBeenCalled();
  });
});