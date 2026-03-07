/// <reference types="vitest" />
import { describe, it, expect, vi } from 'vitest';
import { Renderer } from '../renderer';
import { PlanetEntity } from '../../content/entity/planet/PlanetEntity';

describe('Renderer Integration', () => {
  it('should call render on all entities', () => {
    const renderer = new Renderer();
    const planet = new PlanetEntity({ position: { x: 100, y: 200 }, radius: 50 });
    const renderSpy = vi.spyOn(planet, 'render');
    renderer.drawEntity(planet);
    expect(renderSpy).toHaveBeenCalled();
  });
});