import React, { useState } from "react";
import { NEON_THEMES } from "../../styles/neonThemes";
import { TOKENS } from "../../styles/tokens";
import { BORDER_LIGHT } from "../../styles/colors";
import { tabCardFocusVisibleStyle } from "../../styles/sharedPrimitives/clickableSurface";

export type UniversalButtonSize = "small" | "medium" | "large";
export type UniversalButtonWidth = "auto" | "fill";
export type UniversalButtonTheme = keyof typeof NEON_THEMES;
export type UniversalButtonIconPosition = "leading" | "trailing" | "none";

interface UniversalButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: UniversalButtonIconPosition;
  theme?: UniversalButtonTheme;
  size?: UniversalButtonSize;
  width?: UniversalButtonWidth;
  wrapText?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

const sizeStyles = {
  small: {
    fontSize: TOKENS.FONT_SIZE_BASE,
    padding: `${TOKENS.SPACING_SM}px ${TOKENS.SPACING_MD}px`,
    minHeight: 32,
  },
  medium: {
    fontSize: TOKENS.FONT_SIZE_BASE,
    padding: `${TOKENS.SPACING_MD}px ${TOKENS.SPACING_LG}px`,
    minHeight: 40,
  },
  large: {
    fontSize: TOKENS.FONT_SIZE_LARGE,
    padding: `${TOKENS.SPACING_LG}px ${TOKENS.SPACING_XL}px`,
    minHeight: 48,
  },
};

export const UniversalButton: React.FC<UniversalButtonProps> = ({
  children,
  icon,
  iconPosition = "leading",
  theme = "cyan",
  size = "medium",
  width = "auto",
  wrapText = true,
  onClick,
  disabled = false,
  ariaLabel,
  style,
}) => {
  const t = NEON_THEMES[theme];
  const s = sizeStyles[size];
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  let background = "rgba(24,24,28,0.85)";
  let border = `1.5px solid ${BORDER_LIGHT}`;
  let color = BORDER_LIGHT;
  let boxShadow = "none";
  let filter = undefined;
  let outline = "none";
  let backdropFilter = "blur(8px)";

  if (hover || focus) {
    background = `linear-gradient(135deg, ${t.primary}1F 0%, ${t.dark}1F 100%)`;
    border = `1.5px solid ${t.primary}`;
    color = t.primary;
    boxShadow = "none";
    filter = `drop-shadow(0 0 6px ${t.primary}33)`;
    backdropFilter = "blur(8px)";
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: TOKENS.SPACING_SM,
        border,
        outline,
        borderRadius: 9999,
        background,
        color,
        boxShadow,
        filter,
        fontFamily: TOKENS.FONT_FAMILY,
        fontWeight: TOKENS.FONT_WEIGHT_BOLD,
        fontSize: s.fontSize,
        padding: s.padding,
        minHeight: s.minHeight,
        minWidth: 0,
        width: width === "fill" ? "100%" : "auto",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.28s cubic-bezier(0.4, 0.2, 0.2, 1)",
        whiteSpace: wrapText ? "normal" : "nowrap",
        wordBreak: wrapText ? "break-word" : "normal",
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        ...(focus ? tabCardFocusVisibleStyle : {}),
        ...style,
      }}
    >
      {icon && iconPosition === "leading" && (
        <span style={{ display: "flex", alignItems: "center", marginRight: 6 }}>{icon}</span>
      )}
      <span style={{ flex: 1, textAlign: "center" }}>{children}</span>
      {icon && iconPosition === "trailing" && (
        <span style={{ display: "flex", alignItems: "center", marginLeft: 6 }}>{icon}</span>
      )}
    </button>
  );
};

// Blueprint reference for future AI/automation
// [UIComponentBlueprint: UniversalButton]
// ...existing blueprint fields and placeholders preserved...
