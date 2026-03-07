/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { PlanetEntity } from '../../content/entity/planet/PlanetEntity';
import { ColinEntity } from '../../content/entity/colin/ColinEntity';

describe('Entity Creation', () => {
  it('should create a PlanetEntity with correct properties', () => {
    const planet = new PlanetEntity({ radius: 50, colorTheme: 'blue' });
    expect(planet.radius).toBe(50);
    expect(planet.colorTheme).toBe('blue');
  });

  it('should create a ColinEntity with correct properties', () => {
    const colin = new ColinEntity({ x: 100, y: 200 });
    expect(colin.position).toEqual({ x: 100, y: 200 });
    expect(colin.segments.length).toBe(5);
  });
});