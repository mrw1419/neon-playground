// This file defines shared styles for clickable surfaces in the Neon Playground, such as buttons and interactive elements. It includes styles for the default clickable surface, as well as specific focus-visible styles for tab bars and tab cards to enhance accessibility. The styles utilize design tokens for consistency across the application and include transitions for interactive feedback on hover and focus states.

import { TOKENS } from '../tokens';

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
  boxShadow: 'none',
  cursor: 'pointer',
  transition: 'box-shadow 0.18s, border 0.18s, background 0.18s',
  outline: 'none',
});

// Accessibility focus-visible styles for tab bar buttons
export const tabBarFocusVisibleStyle = (focusColor = '#00fff7') => ({
  outline: `1px solid ${focusColor}`,
  outlineOffset: 0,
  zIndex: 2,
  borderBottom: `5px solid ${focusColor}`,
  color: focusColor,
  background: 'rgba(0,0,0,0.12)',
});

// Accessibility focus-visible styles for tab cards
export const tabCardFocusVisibleStyle = {
  outline: '2px solid #fff',
  outlineOffset: 1,
  zIndex: 2,
  boxShadow: '0 0 0 2px #fff99a44',
};
