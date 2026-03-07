
UI Component Starter 2.12.2026
──────────────────────────────────────────────
<ComponentName>]

🔹 Identity
  - id: "[unique ID]"
  - name: "[Human-readable name]"
  - category: "[Button / Slider / Tab / Panel / Icon / Composite / ...]"
  - primitive: "[Radix primitive if used, e.g., Button, Slider, Tabs]"
  - universal: [true / false]        # AI can suggest based on usage context
  - tags: ["optional metadata", "usage hints"]
  - parentPanel: "[PlaygroundControlPanel / ColinControlPanel / PersistentUI / null]"

🔹 Structure & Layout
  - children: [array of nested components]
  - text: "[main label / title]"
  - subtext: "[optional description or subtitle]"
  - icon: "[reference to icon component or null]"
  - layoutHints: ["horizontal", "vertical", "stacked", ...]
  - styleTokens: "[tokens references for color, glow, fonts]"
  - spacingTokens: 
      - padding: [spacingTokens.small | spacingTokens.medium | spacingTokens.large | fillable]
      - margin: [spacingTokens.small | spacingTokens.medium | spacingTokens.large | fillable]
      - gap: [spacingTokens.small | spacingTokens.medium | spacingTokens.large | fillable]
  - width/height: [tokens or fillable slots]

🔹 Behavior & Interaction
  - onClick: "[placeholder / hook]"
  - onHover: "[placeholder / hook]"
  - onDrag: "[placeholder / hook]"
  - onFocus: "[placeholder / hook]"
  - customBehaviors: [empty array for future modules]
  - upgradeSlots: { slot1: null, slot2: null }   # optional for future extensibility

🔹 State Management
  - statefulModules: [true / false / combo]
  - internalState: { ...default or empty object }
  - hooks: ["onUpdate", "onDestroy", "onUpgradeSlotFilled"]

🔹 Visual / Render Defaults
  - defaultIconSize: [px/rem]
  - defaultFontSize: [px/rem]
  - defaultColors: { primary: token, secondary: token, glow: token }
  - hoverStyles: { color: token, glow: token }
  - activeStyles: { color: token, glow: token }
  - disabledStyles: { color: token, glow: token }

🔹 Panel / Container Context
  - parentPanel: "[PlaygroundControlPanel / ColinControlPanel / PersistentUI / null]"
  - tabbedStructure: [true / false]
  - childComponents: [list of nested components, repeat recursively]
  - communication: [event bubbling, prop drilling, context usage]

🔹 AI Notes / Decision Guidance
  1. If component is generic → mark universal: true
  2. If component references a single game panel → mark universal: false
  4. Maintain all hooks, upgrade slots, state placeholders
  5. Optional fields may remain empty, but placeholders must exist
  6. Recursive: repeat blueprint for children components
  7. Use spacingTokens for padding, margin, gap; leave fillable slots for future variants
  8. Do not remove upgrade slots; AI may append new ones for future extensibility

──────────────────────────────────────────────
[AI Instructions / Usage]
- Generate fully typed React/TSX component using this blueprint
- Wrap Radix primitives, apply Neon tokens
- Compose nested children recursively as listed
- Fill in default or empty slots for icon, text, subtext, hooks, upgrade slots
- Apply spacingTokens to padding, margin, and gap
- Decide universal vs game-specific according to usage hints
- Preserve panel context, layoutHints, styleTokens
- Leave blank/placeholder slots for future behaviors and variants
──────────────────────────────────────────────

# Component Construction & Modularity Guidelines

## Purpose
Define a modular approach for building consistent, accessible, and visually unified components in Neon Playground. This enables rapid development and easy adoption of Radix primitives.

---

## 1. Shared Visual Language
- All interactive components (Button, Card, Tab, etc.) should:
  - Use TOKENS for spacing, font, color, radius, shadow
  - Adopt a11y patterns (:focus-visible, ARIA roles, keyboard nav)
  - Share base visual primitives (background, border, radius, transitions)

---

## 2. ClickableSurface Primitive
- Create a base style/component (ClickableSurface) for all clickable elements:
  - Handles background, border, radius, shadow
  - Applies modular spacing tokens for padding/margin/gap
  - Manages focus/hover/active states using tokens and a11y best practices
  - Accepts theme/color/size props for easy variant extension

---

## 4. Example Usage & Shared Primitive
```tsx
// Shared ClickableSurface style (JS/TS)
import { TOKENS } from '../styles/tokens';

export const clickableSurfaceStyle = (theme = 'cyan') => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: TOKENS.FONT_FAMILY,
  fontWeight: TOKENS.FONT_WEIGHT_BOLD,
  fontSize: TOKENS.FONT_SIZE_BASE,
  borderRadius: TOKENS.SPACING_MD,
  padding: `${TOKENS.SPACING_MD}px ${TOKENS.SPACING_LG}px`,
  background: 'rgba(24,24,28,0.7)',
  color: theme === 'default' ? '#e0e0e0' : theme,
  border: `1.5px solid ${theme === 'default' ? '#e0e0e0' : theme}`,
  boxShadow: TOKENS.SHADOW_GLOW || 'none',
  cursor: 'pointer',
  transition: 'box-shadow 0.18s, border 0.18s, background 0.18s',
  outline: 'none',
});

// Example: Button using ClickableSurface
<Button style={clickableSurfaceStyle('cyan')}>Action</Button>
// Example: Card using ClickableSurface
<Card style={clickableSurfaceStyle('magenta')} icon={<Icon />} title="Planet" />
```

---

## 5. Guidelines for New Components
- Start with ClickableSurface or tokenized style object
- Use TOKENS for all spacing, font, color, radius, shadow
- Apply a11y patterns from guidelines
- Wrap Radix primitives for accessibility and keyboard nav
- Document variants and states in the guidelines

---

# Cross-References
Guidelines/  
|- Blueprint/                  # Game and system blueprints
|   └─ Playground Game Blueprint.md   # Main game architecture and build plan
|- Registry/                   # Canonical lists of objects, planets, etc.
|   |- Colin Registry.md       # All Colin variants and metadata
|   └─ Planet Registry.md      # All planet types, variants, and metadata
|- Starters/                   # Starter prompts/templates for new entities
|   |- Object Starter.md       # For new objects (planets, ships, etc.)
|   |- Tool Starter.md         # For new tools (undo, move, etc.)
|   |- Physics Starter.md      # For new physics modules/entities
|   |- Effects Starter.md      # For new effects (burst, gravity, etc.)
|   |- UI Component Starter.md # For new UI components
|   └─ Universal Starter.md    # Universal starter Q&A prompt
|- VisualLanguageEmotionalTone.md   # Visual style, mood, and design principles
|- Game Architecture.md             # Project structure and folder map
|- Grand Vision & Instructions.md   # Project vision, goals, and instructions
└─ Guidelines directory.md          # This visual map and quick reference

---

_This guideline ensures all new components are visually and functionally consistent, and ready for Radix integration._


# AI Note: Treat this as a living reference; preserve placeholders, merge updates, and append new elements without removing existing slots or context.