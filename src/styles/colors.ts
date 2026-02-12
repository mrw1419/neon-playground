// src/styles/colors.ts
// Neon Playground – shared color tokens for planets, effects, and UI

// Primary neon colors
export const CYAN = "#00FFF5"
export const MAGENTA = "#FF00FF"
export const PURPLE = "#BF00FF"
export const RED = "#FF0066"
export const ACID_GREEN = "#39FF14"
export const ORANGE = "#FF9F3D"
export const YELLOW = "#FFFF00"

// Earth / Moon colors
export const BROWN = "#8B4513"
export const TAN = "#D2B48C"
export const MOON_GRAY = "#A9A9A9"
export const DARK_GRAY = "#696969"

// Ice / Evil planets (fixed)
export const CRACKED_ICE = "#7FFFD4"   // aquamarine
export const CRACKED_EVIL = "#FF073A"  // hot red

// Arrays for random selection
export const PLANET_NEON_COLORS = [CYAN, MAGENTA, PURPLE, ACID_GREEN, RED, YELLOW]
export const PLANET_EARTH_MOON_COLORS = [BROWN, TAN, MOON_GRAY, DARK_GRAY]

// Combined palette (excludes Ice/Evil)
export const PLANET_RANDOM_COLORS = [...PLANET_NEON_COLORS, ...PLANET_EARTH_MOON_COLORS]
