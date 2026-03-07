
import React, { useState, useRef, forwardRef } from "react";
import { TOKENS } from "../../../styles/tokens";
import { NEON_THEMES } from "../../../styles/neonThemes";
import { tabCardFocusVisibleStyle } from "../../../styles/sharedPrimitives/clickableSurface";

export interface TabProps {
  tabKey: string;
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  theme?: keyof typeof NEON_THEMES;
}
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
  {
    tabKey,
    label,
    icon,
    selected = false,
    disabled = false,
    onClick,
    theme = "cyan",
  }: TabProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const mouseDownRef = useRef(false);
  const t = NEON_THEMES[theme];

  let background = "rgba(24,24,28,0.85)";
  let border = "none";
  let color = "#fff";
  let filter = undefined;
  let boxShadow = "none";
  let outline = "none";

  if (selected || hover || (focus && showFocus)) {
    background = `linear-gradient(135deg, ${t.primary}1F 0%, ${t.dark}1F 100%)`;
    // Only show bottom border, remove top/left/right borders
    border = "none";
    color = t.primary;
    boxShadow = "none";
    filter = `drop-shadow(0 0 6px ${t.primary}33)`;
  }

  return (
    <button
      ref={ref}
      id={`tab-${tabKey}`}
      role="tab"
      aria-selected={selected}
      aria-controls={`tabpanel-${tabKey}`}
      aria-disabled={disabled}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={disabled ? undefined : (e => {
        if (onClick) onClick();
        // Immediately blur so no focus ring after click
        if (e && e.currentTarget) e.currentTarget.blur();
      })}
      onMouseDown={() => { mouseDownRef.current = true; }}
      onMouseUp={() => { mouseDownRef.current = false; }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={e => {
        setFocus(true);
        // Only show focus style if not focused by mouse
        setShowFocus(!mouseDownRef.current);
      }}
      onBlur={() => {
        setFocus(false);
        setShowFocus(false);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: `${TOKENS.SPACING_SM}px ${TOKENS.SPACING_LG}px`,
        border: border,
        borderBottom: (selected || hover || (focus && showFocus)) ? `3px solid ${t.primary}` : "3px solid transparent",
        background,
        color,
        fontWeight: TOKENS.FONT_WEIGHT_BOLD,
        fontFamily: TOKENS.FONT_FAMILY,
        fontSize: "1rem",
        cursor: disabled ? "not-allowed" : "pointer",
        outline,
        boxShadow,
        filter,
        transition: "all 0.28s cubic-bezier(0.4, 0.2, 0.2, 1)",
        opacity: disabled ? 0.5 : 1,
        ...((focus && showFocus) ? tabCardFocusVisibleStyle : {}),
      }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {label}
    </button>
  );
});
