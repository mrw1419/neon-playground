// This file defines a comprehensive set of color tokens for the Neon Playground application, including primary neon colors, earth/moon colors, ice/lava/evil colors, metallic/organic/water/crystal colors, and arrays for random selection. These tokens are used throughout the app to ensure a consistent and vibrant color palette for planets, effects, and UI elements.

// Accessibility/neutral tokens
export const BORDER_LIGHT = "#e0e0e0"; // a11y-friendly light border
// src/styles/colors.ts
// Neon Playground – shared color tokens for planets, effects, and UI

// Primary neon colors
export const CYAN = "#00FFF5"
export const CYAN_DARK = "#008c8a"
export const CYAN_LIGHT = "#bafffa"
export const MAGENTA = "#FF00FF"
export const MAGENTA_DARK = "#a1008c"
export const MAGENTA_LIGHT = "#ffb3fa"
export const PURPLE = "#BF00FF"
export const PURPLE_DARK = "#5a007a"
export const PURPLE_LIGHT = "#e6b3ff"
export const RED = "#FF0066"
export const RED_DARK = "#a1003a"
export const RED_LIGHT = "#ffb3c9"
export const ACID_GREEN = "#39FF14"
export const ACID_GREEN_DARK = "#1a7f0a"
export const ACID_GREEN_LIGHT = "#baffa3"
export const ORANGE = "#FF9F3D"
export const ORANGE_DARK = "#a65c00"
export const ORANGE_LIGHT = "#ffe0b3"
export const YELLOW = "#FFFF00"
export const YELLOW_DARK = "#b3b300"
export const YELLOW_LIGHT = "#ffffb3"

// Earth colors
export const TAN = "#D2B48C"
export const TAN_DARK = "#8B4513"
export const TAN_LIGHT = "#f5deb3"

// Moon colors
export const MOON_GRAY = "#A9A9A9"
export const MOON_GRAY_DARK = "#696969"
export const MOON_GRAY_LIGHT = "#e5e5e5"

// Ice colors
export const CRACKED_ICE = "#7FFFD4"   // aquamarine
export const CRACKED_ICE_DARK = "#3e7e6b" // dark aquamarine
export const CRACKED_ICE_LIGHT = "#e0fff7" // light aquamarine

// Evil colors
export const EVIL = "#FF073A"  // hot red
export const EVIL_DARK = "#3a0712" // dark evil red
export const EVIL_LIGHT = "#ffb3c9" // light evil red

// Lava colors
export const LAVA = "#FF4500" // lava orange-red
export const LAVA_DARK = "#7a1f00" // dark lava
export const LAVA_YELLOW = "#FFD700" // molten yellow
export const LAVA_BLACK = "#2c1a0b" // cooled lava/rock
export const LAVA_LIGHT = "#ffb380" // light lava

// Metallic planets
export const METALLIC_SILVER = "#C0C0C0" // silver
export const METALLIC_SILVER_LIGHT = "#f5f5f5" // light silver
export const METALLIC_GOLD = "#FFD700" // gold
export const METALLIC_GOLD_LIGHT = "#fff8dc" // light gold
export const METALLIC_BRONZE = "#CD7F32" // bronze
export const METALLIC_BRONZE_LIGHT = "#ffe4c4" // light bronze

// Organic/forest planets
export const ORGANIC_GREEN = "#228B22" // forest green
export const ORGANIC_GREEN_LIGHT = "#b3ffb3" // light green
export const ORGANIC_BROWN = "#8B5A2B" // earth brown
export const ORGANIC_BROWN_LIGHT = "#f5deb3" // light brown
export const ORGANIC_DARK_GREEN = "#013220" // deep forest
export const ORGANIC_DARK_GREEN_LIGHT = "#b3ffb3" // light deep green

// Water/ocean planets
export const WATER_DEEP_BLUE = "#001f3f" // deep ocean
export const WATER_DEEP_BLUE_LIGHT = "#b3d1ff" // light deep ocean
export const WATER_AQUA = "#00FFFF" // aqua
export const WATER_AQUA_LIGHT = "#e0ffff" // light aqua
export const WATER_LIGHT_BLUE = "#7FDBFF" // light blue
export const WATER_LIGHT_BLUE_LIGHT = "#e6f7ff" // lighter blue

// Crystal planets
export const CRYSTAL_LIGHT_BLUE = "#B0E0FF" // crystal blue
export const CRYSTAL_LIGHT_BLUE_LIGHT = "#e6f7ff" // lighter crystal blue
export const CRYSTAL_PINK = "#FFB6C1" // crystal pink
export const CRYSTAL_PINK_LIGHT = "#ffe6f7" // lighter crystal pink
export const CRYSTAL_WHITE = "#FFFFFF" // crystal white
export const CRYSTAL_WHITE_LIGHT = "#ffffff" // lighter crystal white

// Arrays for random selection
export const PLANET_METALLIC_COLORS = [METALLIC_SILVER, METALLIC_GOLD, METALLIC_BRONZE]
export const PLANET_ORGANIC_COLORS = [ORGANIC_GREEN, ORGANIC_BROWN, ORGANIC_DARK_GREEN]
export const PLANET_WATER_COLORS = [WATER_DEEP_BLUE, WATER_AQUA, WATER_LIGHT_BLUE]
export const PLANET_CRYSTAL_COLORS = [CRYSTAL_LIGHT_BLUE, CRYSTAL_PINK, CRYSTAL_WHITE]
export const PLANET_NEON_COLORS = [CYAN, MAGENTA, PURPLE, ACID_GREEN, RED, YELLOW]
export const PLANET_EARTH_COLORS = [TAN, TAN_DARK]
export const PLANET_MOON_COLORS = [MOON_GRAY, MOON_GRAY_DARK]
export const PLANET_ICE_COLORS = [CRACKED_ICE, CRACKED_ICE_DARK]
export const PLANET_LAVA_COLORS = [LAVA, LAVA_DARK, LAVA_YELLOW, LAVA_BLACK]
export const PLANET_EVIL_COLORS = [EVIL, EVIL_DARK]

export const PLANET_EARTH_MOON_COLORS = [...PLANET_EARTH_COLORS, ...PLANET_MOON_COLORS]

// Combined palette (excludes Ice/Evil/Lava)
export const PLANET_RANDOM_COLORS = [...PLANET_NEON_COLORS, ...PLANET_EARTH_MOON_COLORS]

// Combined palette for Ice, Lava, and Evil
export const PLANET_ICE_LAVA_EVIL_COLORS = [
	...PLANET_ICE_COLORS,
	...PLANET_LAVA_COLORS,
	...PLANET_EVIL_COLORS
]

// All except evil
export const PLANET_ALL_EXCEPT_EVIL_COLORS = [
	...PLANET_NEON_COLORS,
	...PLANET_EARTH_COLORS,
	...PLANET_MOON_COLORS,
	...PLANET_ICE_COLORS,
	...PLANET_LAVA_COLORS,
	...PLANET_METALLIC_COLORS,
	...PLANET_ORGANIC_COLORS,
	...PLANET_WATER_COLORS,
	...PLANET_CRYSTAL_COLORS
]

// All except ice/lava/evil
export const PLANET_ALL_EXCEPT_ICE_LAVA_EVIL_COLORS = [
	...PLANET_NEON_COLORS,
	...PLANET_EARTH_COLORS,
	...PLANET_MOON_COLORS,
	...PLANET_METALLIC_COLORS,
	...PLANET_ORGANIC_COLORS,
	...PLANET_WATER_COLORS,
	...PLANET_CRYSTAL_COLORS
]

// Only natural
export const PLANET_NATURAL_COLORS = [
	...PLANET_EARTH_COLORS,
	...PLANET_MOON_COLORS,
	...PLANET_ORGANIC_COLORS,
	...PLANET_WATER_COLORS
]

// Only artificial
export const PLANET_ARTIFICIAL_COLORS = [
	...PLANET_NEON_COLORS,
	...PLANET_METALLIC_COLORS,
	...PLANET_CRYSTAL_COLORS
]

// Only hazardous
export const PLANET_HAZARDOUS_COLORS = [
	...PLANET_ICE_COLORS,
	...PLANET_LAVA_COLORS,
	...PLANET_EVIL_COLORS
]
