import React, { useState } from "react";
import { TOKENS } from "../../styles/tokens";
import { NEON_THEMES } from "../../styles/neonThemes";
import { BORDER_LIGHT } from "../../styles/colors";
import { tabCardFocusVisibleStyle } from "../../styles/sharedPrimitives/clickableSurface";

// Props interface (adjust as needed)
type NeonTheme = keyof typeof NEON_THEMES;
interface TabCardProps {
  icon?: React.ReactNode;
  title: string;
  subtext?: string;
  showButton?: boolean;
  theme?: NeonTheme;
  selected?: boolean;
  instruction?: string;
  disabled?: boolean;
  onClick?: () => void;
  tabIndex?: number;
  titleAllCaps?: boolean;
}

export const TabCard: React.FC<TabCardProps> = ({
  icon,
  title,
  subtext,
  showButton,
  theme = "cyan",
  selected = false,
  instruction,
  disabled = false,
  onClick,
  tabIndex = 0,
  titleAllCaps = false,
}) => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const t = NEON_THEMES[theme];

  let background = "rgba(24,24,28,0.85)"; // fallback dark translucent bg
  let border = `1.5px solid ${BORDER_LIGHT}`;
  let color = BORDER_LIGHT;
  let boxShadow = "none";
  let filter = undefined;
  let outline = "none";
  let backdropFilter = "blur(8px)";

  if (selected || focus || hover) {
    background = `linear-gradient(135deg, ${t.primary}1F 0%, ${t.dark}1F 100%)`;
    border = `1.5px solid ${t.primary}`;
    color = t.primary;
    boxShadow = "none";
    filter = `drop-shadow(0 0 6px ${t.primary}33)`;
    // No white outline for selected/hover/focus, only for :focus-visible
    backdropFilter = "blur(8px)";
  }

  return (
    <div
      tabIndex={tabIndex}
      role="button"
      aria-selected={selected}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background,
        border,
        borderRadius: TOKENS.SPACING_SM,
        boxShadow,
        filter,
        color,
        outline,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        padding: `${TOKENS.SPACING_SM}px ${TOKENS.SPACING_SM}px`,
        margin: `${TOKENS.SPACING_SM / 2}px`,
        gap: `${TOKENS.SPACING_SM}px`,
        minWidth: `140px`,
        maxWidth: `140px`,
        width: `140px`,
        minHeight: `${TOKENS.SPACING_LG * 1.06}px`,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.28s cubic-bezier(0.4, 0.2, 0.2, 1)",
        ...(focus ? tabCardFocusVisibleStyle : {}),
      }}
      onClick={disabled ? undefined : (e => { e.stopPropagation(); onClick && onClick(); })}
      onKeyDown={e => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) onClick?.();
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {icon && React.cloneElement(icon as React.ReactElement, { width: 16, height: 16 })}
      <div style={{ fontFamily: TOKENS.FONT_FAMILY, fontWeight: TOKENS.FONT_WEIGHT_BOLD, fontSize: "1rem", color, textAlign: "center", textTransform: titleAllCaps ? "uppercase" : "none", letterSpacing: ".5px" }}>{title}</div>
      {subtext && (
        <div style={{ fontFamily: TOKENS.FONT_FAMILY, fontSize: "0.95rem", color: "#aaa", textAlign: "center", marginTop: `${TOKENS.SPACING_SM / 4}px` }}>{subtext}</div>
      )}
      {showButton && (
        <button
          style={{
            marginTop: `${TOKENS.SPACING_SM * 0.7}px`,
            padding: `${TOKENS.SPACING_SM / 2}px ${TOKENS.SPACING_MD * 0.7}px`,
            borderRadius: `${TOKENS.SPACING_SM * 0.7}px`,
            border: "none",
            background: `linear-gradient(90deg, ${t.primary} 60%, ${t.dark} 100%)` ,
            color: "#18181c",
            fontWeight: TOKENS.FONT_WEIGHT_BOLD,
            fontFamily: TOKENS.FONT_FAMILY,
            fontSize: "1rem",
            boxShadow: t.glow,
            cursor: "pointer",
            outline: "none",
            transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
          }}
        >
          Action
        </button>
      )}
    </div>
  );
};
