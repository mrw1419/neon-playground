
# Visual Language & Emotional Tone Guidelines


## Purpose
Establish a consistent, memorable, and emotionally resonant visual identity for the Neon Playground. This document guides all UI, animation, entity, and interaction design decisions.
Reference: All colors, glows, tokens, and primitives must be sourced from the files in `src/styles/` and `src/styles/sharedPrimitives/`.


Neon Galaxy Design System (Accessibility Compliant & Responsive)

Objective: Establish a comprehensive design system based on a high-contrast, dark, neon, futuristic aesthetic. The system must capture the glowing, interactive essence of the visual style while ensuring all text and key interactive elements adhere to a minimum of AA color contrast standards. All sizing (spacing, font, radius) must use relative units (REM) to guarantee responsiveness and future accessibility scaling. All new UI and entity visuals must use tokens, themes, and shared primitives for color, glow, and spacing.


---

## 0. Using Tokens, Themes, and Shared Primitives
- All colors, glows, and spacing must use tokens from `src/styles/colors.ts`, `src/styles/tokens.ts`, and `src/styles/glows.ts`.
- Themes are defined in `src/styles/neonThemes.ts`.
- Shared UI and entity primitives (e.g., clickableSurface, glows) are in `src/styles/sharedPrimitives/`.
- Never use hardcoded values; always import from the relevant file.
- To extend the system, add new tokens or primitives to these files and document them here.

1.  Background: Deep, non-reflective black (Void).
2.  Interactivity: Light is the primary indicator of state (selected, hover, focus).
3.  Responsiveness: Layout and typography scale based on the root font size.

---


## 1. Emotional Tone
- **Core Mood:** Cosmic, playful, energetic, and futuristic.
- **Keywords:** Neon, cyberpunk, wonder, discovery, kinetic, inviting, accessible.
- **User Feeling:** Empowered, curious, creative, and delighted.

---


## 2. Color Palette & Theming
- **Primary Colors:** Vibrant neons (cyan, magenta, purple, acid green, yellow, orange, red) defined in `colors.ts` and `tokens.ts` (e.g., `NEON_CYAN`, `NEON_MAGENTA`)
- **Backgrounds:** Deep space blacks and dark grays for contrast (see `VOID`, `DARK_BG` tokens)
- **A11y:** Use `BORDER_LIGHT` and other accessible tokens for text and borders in default states
- **Usage:** Use color tokens and themes for all UI and entity elements; never use hardcoded values (e.g., use `NEON_CYAN`, not `#00ffff`)

---


## 3. Typography
- **Font Family:** Rajdhani (all UI text, see `fonts.css`)
- **Hierarchy:**
  - Large, bold for titles
  - Medium for controls
  - Small for subtext
- **Letter Spacing:** Slightly expanded for a tech/futuristic feel
- **Tokens:** Use typography tokens from `tokens.ts` for sizes and weights

---


## 4. Iconography & Entity Visuals
- **Style:** Vector, geometric, outlined with subtle neon glows
- **Size:** Consistent across all TabCards and controls
- **Emotion:** Playful, cosmic, and readable at small sizes
- **Entity Visuals:**
  - All entity visuals (planets, effects, etc.) must use shared primitives and tokens for glows, outlines, and overlays
  - Visual modules (e.g., `PlanetVisual.tsx`, `BurstVisual.tsx`) should import from `sharedPrimitives/` and `glows.ts`
  - No image files; all visuals are code-generated

---


## 5. Spacing & Layout
- **Grid:** Modular, with consistent spacing tokens (see `tokens.ts`)
- **Padding:** Compact but breathable; avoid crowding
- **Alignment:** Centered, with clear visual groupings
- **REM Units:** All spacing, font sizes, and radii must use REM units for responsiveness

---


## 6. Motion & Animation
- **Tone:** Smooth, kinetic, and responsive
- **Usage:** Use for feedback (hover, focus, select), not for distraction
- **Easing:** Use cubic-bezier for natural, energetic transitions
- **Tokens:** Use animation tokens from `tokens.ts` or `glows.ts` where available

---


## 7. Visual Dos & Don’ts
- **Do:**
  - Use tokens for all colors, spacing, and typography (e.g., `NEON_CYAN` for primary actions)
  - Use primitives from `sharedPrimitives/` for glows, clickable surfaces, overlays
  - Maintain high contrast for readability
  - Use focus-visible for keyboard navigation
  - Test color contrast and keyboard navigation for all new UI
  - Keep UI playful but not overwhelming
  - Test on multiple screen sizes; use REM units everywhere
- **Don’t:**
  - Use hardcoded colors or fonts (e.g., don’t use `#00ffff` directly)
  - Overuse glows or animations (use sparingly for feedback)
  - Sacrifice accessibility for style
  - Add new colors or primitives without updating tokens/primitives files

---


## 8. References & Resources
- [UI Component Blueprint](./UI%20Component%20Blueprint.md)
- [PlaygroundControlPanel Guidelines](./PlaygroundControlPanel%20Guidelines.md)
- [styles/ folder](../styles/)
- [sharedPrimitives/ folder](../styles/sharedPrimitives/)
- [Grand Vision & Instructions](./Grand%20Vision%20&%20Instructions.md)
- [Game Architecture](./Game%20Architecture.md)

---


_This document should be updated as the visual language, tokens, and primitives evolve. All contributors should reference and extend the design system as new needs arise._
