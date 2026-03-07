──────────────────────────────
PLANET PARENT TYPES DATA SHEET
──────────────────────────────

# Base Size Reference
- baseSize: 10 (arbitrary units; XS = 1x, S = 2x, M = 3x, L = 4x, XL = 6x, XXL = 10x)
- Use this baseSize to calculate actual planet radii for each scale:

| Scale | Multiplier | Example Radius |
|-------|------------|---------------|
| XS    | 1x         | 10            |
| S     | 2x         | 20            |
| M     | 3x         | 30            |
| L     | 4x         | 40            |
| XL    | 6x         | 60            |
| XXL   | 10x        | 100           |

This scale is used for all planet types and variants for consistency.

This registry defines all core planet parent types, their default stats, constraints, unique behaviors, and upgrade compatibility. Each type is a foundation for variants and overlays.

---
Rocky
Description: Solid, high-density, classic planet
Tags: stable, moonable, common, moonlike
Default Stats:
  size: M
  gravity: 1.5
  health: 200
  density: 1.8
  orbitalAttraction: 1.0
  baseTemperature: 280K
  baseColorTheme: earthlike (use 'moon' palette if tag: moonlike)
  effectorAffinity: normal
  effectImmunity: none
  interactable: true
  canOrbit: true
  canBeOrbited: true
Engine: Standard physics, can be split/merged
Effectors: Can emit/absorb burst, ripple
Effects: Craters, mountains, can have rings
Interact: Move, clone, delete, paintable
Add-ons & Upgrades: [Shield, Laser, Satellite, Extractor, Aura] (no major restrictions)
# Visuals: NeonBase, GlowAura, CracksOverlay, AtmosphereGlow, RockyOverlay, CratersOverlay
# Overlays: Cracked, Atmosphere, Water, Rocky, Craters
# Variants: Earth, Moon

# Note: If 'moonlike' tag is present, use the moon color theme and visuals for Earth-like moons.

---
Gas
Description: Large, low-density gas giant
Tags: volatile, giant, rare
Default Stats:
  size: XL
  gravity: 3.0
  health: 800
  density: 0.4
  orbitalAttraction: 2.5
  baseTemperature: 120K
  baseColorTheme: gasgiant
  effectorAffinity: gravity++
  effectImmunity: ripple
  interactable: true
  canOrbit: false
  canBeOrbited: true
Engine: Low density, cannot be split, can merge
Effectors: Amplifies gravity, absorbs ripple
Effects: Bands, storms, can have rings
Interact: Move, delete, not paintable
Add-ons & Upgrades: [Satellite, Aura] (cannot equip Shield or Laser)
# Visuals: NeonBase, GlowAura, RingsOverlay, StripesOverlay, StormOverlay
# Overlays: Rings, Stripes, Storm, Atmosphere
# Variants: NeonJupiter

---
Ice
Description: Cold, medium density, icy crust
Tags: cracked, aurora, moonable
Default Stats:
  size: M
  gravity: 1.2
  health: 180
  density: 1.1
  orbitalAttraction: 0.9
  baseTemperature: 90K
  baseColorTheme: ice
  effectorAffinity: ripple++
  effectImmunity: freeze
  interactable: true
  canOrbit: true
  canBeOrbited: true
Engine: Can split, can merge, can decay
Effectors: Emits ripple on impact
Effects: Cracked, can have auroras
Interact: Move, clone, paintable
Add-ons & Upgrades: [Shield, Extractor, Aura] (no Laser)
# Visuals: NeonBase, GlowAura, CracksOverlay, TrailEffect
# Overlays: Cracked, Trail, Atmosphere
# Variants: NeonComet

Crystal
---
Description: High-density, crystalline surface
Tags: rare, glowing, refractive
Default Stats:
  size: S
  gravity: 2.0
  health: 250
  density: 2.2
  orbitalAttraction: 1.2
  baseTemperature: 200K
  baseColorTheme: crystal
  effectorAffinity: ripple+
  effectImmunity: none
  interactable: true
  canOrbit: true
  canBeOrbited: true
Engine: Can split, can merge
Effectors: Emits ripple on impact
Effects: Facets, refracts light, glows
# Visuals: NeonBase, GlowAura, FacetsOverlay, CrystalOverlay
# Overlays: Facets, Crystal, Atmosphere
# Variants: NeonCrystal
Interact: Move, clone, paintable
Add-ons & Upgrades: [Shield, Aura] (no Laser, no Extractor)

---
Lava
Description: Volcanic, unstable, molten surface
Tags: unstable, eruptive, rare
Default Stats:
  size: M
  gravity: 1.8
  health: 220
  density: 1.7
  orbitalAttraction: 1.1
  baseTemperature: 900K
  baseColorTheme: lava
  effectorAffinity: burst++
  effectImmunity: freeze
  interactable: true
  canOrbit: true
  canBeOrbited: true
Engine: Can split, can decay, erupts on destruction
Effectors: Emits burst on destruction
Effects: Pulses, erupts, emits sparks
Interact: Move, clone, not paintable
Add-ons & Upgrades: [Shield, Aura] (no Laser, no Extractor)
# Visuals: NeonBase, GlowAura, CracksOverlay
# Overlays: Cracked, Atmosphere
# Variants: (add custom variants as needed)

---
Metal
Description: Dense, metallic, magnetic
Tags: magnetic, shiny, rare
Default Stats:
  size: M
  gravity: 2.5
  health: 300
  density: 2.8
  orbitalAttraction: 1.3
  baseTemperature: 350K
  baseColorTheme: metal
  effectorAffinity: repulse++
  effectImmunity: magnetic
  interactable: true
  canOrbit: true
  canBeOrbited: true
Engine: High density, can split
Effectors: Resists repulse, amplifies magnetic
Effects: Magnetic field, shiny
Interact: Move, clone, magnet tool only
Add-ons & Upgrades: [Shield, Laser, Satellite] (no Extractor, no Aura)
# Visuals: NeonBase, GlowAura, FacetsOverlay
# Overlays: Facets, Atmosphere
# Variants: (add custom variants as needed)

Organic
---
Description: Living, bio-active, rare
Tags: bio, healing, mutable
Default Stats:
  size: M
  gravity: 1.0
  health: 160
  density: 1.0
  orbitalAttraction: 0.8
  baseTemperature: 300K
  baseColorTheme: organic
  effectorAffinity: aura++
  effectImmunity: none
  interactable: true
  canOrbit: true
  canBeOrbited: true
Engine: Can grow, can heal, can mutate
Effectors: Emits healing aura
Effects: Grows, heals, changes color
# Visuals: NeonBase, GlowAura, OrganicOverlay
# Overlays: Organic, Atmosphere
# Variants: (add custom variants as needed)
Interact: Move, clone, paintable
Add-ons & Upgrades: [Aura, Extractor] (no Shield, no Laser, no Satellite)

Hybrid
---
Description: Mixed traits, unique combos
Tags: hybrid, special, unique
Default Stats:
  size: varies
  gravity: varies
  health: varies
  density: varies
  orbitalAttraction: varies
  baseTemperature: varies
  baseColorTheme: varies
  effectorAffinity: varies
  effectImmunity: varies
  interactable: true
  canOrbit: varies
  canBeOrbited: varies
Engine: Combine any above, special rules
Effectors: Combine any above
Effects: Combine any above
# Visuals: (compose from any above)
# Overlays: (compose from any above)
# Variants: (add custom variants as needed)
Interact: Combine any above
Add-ons & Upgrades: Any allowed by combined types

---
TheMoon
---
Description: Low-mass, rocky, cratered satellite (Earth's Moon)
Tags: theMoon, cratered, rocky, stable
Default Stats:
  size: S
  gravity: 0.2
  health: 80
  density: 1.2
  orbitalAttraction: 0.3
  baseTemperature: 220K
  baseColorTheme: moon
  effectorAffinity: normal
  effectImmunity: none
  interactable: true
  canOrbit: true
  canBeOrbited: false
Engine: Standard physics, can be split/merged
Effectors: Can emit/absorb burst, ripple
Effects: Craters, rocky surface
Interact: Move, clone, delete, paintable
Add-ons & Upgrades: [Shield, Aura] (no Laser, no Satellite, no Extractor)
# Visuals: effects/planetvisuals/PlanetBase, effects/planetvisuals/PlanetAura, CracksOverlay, RockyOverlay, CratersOverlay
# Overlays: Cracked, Rocky, Craters
# Variants: TheMoon

──────────────────────────────
ADD-ONS & UPGRADES SUMMARY
──────────────────────────────

──────────────────────────────
DATA SHEET CROSS-LINKS
──────────────────────────────
For full visuals registry: see [PlanetVisuals.md](PlanetVisuals.md)
For overlays registry: see [PlanetOverlays.md](PlanetOverlays.md)
For variants registry: see [PlanetVariants.md](PlanetVariants.md)
All fields reference modular, extensible registries for easy expansion.
