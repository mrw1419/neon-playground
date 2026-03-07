import React from "react";
import { TOKENS } from "../../styles/tokens";
import { NEON_THEMES } from "../../styles/neonThemes";

interface PowerSliderProps {
  label: string;
  labelAllCaps?: boolean;
  theme?: keyof typeof NEON_THEMES;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  layout?: "horizontal" | "vertical";
  disabled?: boolean;
}

export const PowerSlider: React.FC<PowerSliderProps> = ({
  label,
  labelAllCaps = false,
  theme = "cyan",
  min = 1,
  max = 10,
  step = 1,
  value = min,
  onChange,
  layout = "horizontal",
  disabled = false,
}) => {
  const t = NEON_THEMES[theme];

  // Accessibility: generate unique id for label association
  const sliderId = React.useId();

  return (
    <div
      style={{
        display: layout === "horizontal" ? "flex" : "block",
        alignItems: layout === "horizontal" ? "center" : undefined,
        gap: layout === "horizontal" ? 6 : 4, // reduced gap
        width: "100%",
        marginTop: 8, // reduced margin
      }}
    >
      <label
        htmlFor={sliderId}
        style={{
          fontSize: TOKENS.FONT_SIZE_BASE,
          color: "#F5F5F7",
          fontFamily: TOKENS.FONT_FAMILY,
          textTransform: labelAllCaps ? "uppercase" : "none",
          letterSpacing: ".2px",
          fontWeight: TOKENS.FONT_WEIGHT_BOLD,
          marginRight: layout === "horizontal" ? 4 : 0, // reduced margin
          marginBottom: layout === "vertical" ? 2 : 0, // reduced margin
        }}
      >
        {label}:
      </label>
      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={label}
        onChange={e => onChange?.(Number(e.target.value))}
        style={{
          flex: 1,
          accentColor: t.primary,
          width: layout === "horizontal" ? "100%" : "100%",
          height: 4,
          background: `linear-gradient(90deg, ${t.primary} 0%, ${t.dark} 100%)`,
          borderRadius: 8,
          outline: "none",
          margin: layout === "horizontal" ? "0 4px" : "0", // reduced margin
          boxShadow: `0 0 8px ${t.primary}33`,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
      />
      <span
        style={{
          fontSize: TOKENS.FONT_SIZE_BASE,
          color: t.primary,
          fontFamily: TOKENS.FONT_FAMILY,
          fontWeight: TOKENS.FONT_WEIGHT_BOLD,
          marginLeft: layout === "horizontal" ? 4 : 0, // reduced margin
          marginTop: layout === "vertical" ? 2 : 0, // reduced margin
          minWidth: 32,
          textAlign: "right",
        }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
};
