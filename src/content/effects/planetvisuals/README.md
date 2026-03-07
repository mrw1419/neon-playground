# Planet Visuals

This folder contains reusable, parameterized visual primitives for planets, moons, asteroids, and other round cosmic objects.

## Usage
- Import these components in any entity, registry, or effect that needs planet-like visuals.
- All visuals accept props for color, size, opacity, and position for maximum flexibility.

## Components
- **PlanetBase.tsx**: Core circle shape for planets and similar objects.
- **PlanetAura.tsx**: Aura/glow effect for highlighting or energy.
- **RockyOverlayVisual.tsx**: Rocky surface overlay for rocky planets or asteroids.
- **CratersOverlayVisual.tsx**: Crater overlay for moons, planets, or impacts.

## Customization
- All visuals are parameterized for color, size, and opacity.
- Extend with more overlays or props as needed for new cosmic objects.

## Migration Plan
- Move any generic planet visuals here for reuse.
- Update imports in overlays, registries, and code to use these shared components.
