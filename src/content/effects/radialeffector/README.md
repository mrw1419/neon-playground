# Radial Effector Visual Effects

This folder contains reusable, parameterized visual effects for radial effectors and other entities/tools that need burst, ripple, glow, or overlay visuals.

## Usage
- All components accept props for size, color, opacity, and other parameters to allow customization per use case.
- Import these visuals in any registry (entity, effector, tool) or component by their shared path, e.g.:
  - `effects/radialeffector/BurstEffectorVisual`
  - `effects/radialeffector/GlowEffect`

## Intended for Broad Reuse
- **BurstEffectorVisual.tsx**: For bursts, explosions, muzzle flashes, etc.
- **RippleEffectorVisual.tsx**: For ripple effects, shockwaves, or water ripples.
- **GlowEffect.tsx**: For auras, highlights, or glows.
- **OverlayEffect.tsx**: For overlays, compositing, or visual feedback.

## Customization
- All visuals are parameterized for size, color, and opacity.
- Extend with animationType or other props as needed for future effects.

## Migration Plan
- Move any generic or reusable visuals here.
- Update registries and code to reference these shared visuals.
- Document new visuals in this README for discoverability.
