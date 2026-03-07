/// <reference types="vitest" />
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { PlanetEntity } from '../../content/entity/planet/PlanetEntity';
import { PlanetVisual } from '../../content/entity/planet/PlanetVisual';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Entity Rendering', () => {
  it('should render a PlanetVisual with correct props', () => {
    const planet = new PlanetEntity({ position: { x: 100, y: 200 }, radius: 50, colorTheme: 'blue' });
    render(
      <PlanetVisual
        x={planet.position.x}
        y={planet.position.y}
        radius={planet.radius}
        colorTheme={planet.colorTheme}
      />
    );
    // Check for SVG element
    const svg = screen.container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
