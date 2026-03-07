  // Used in PlaygroundControlPanel for consistent height and centering of utilities like Undo button, PowerSlider, etc.
import React from "react";

interface UtilitiesProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Utilities: React.FC<UtilitiesProps> = ({ children, style }) => {
  // Fixed height matches Undo button (48px)
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 48,
        height: 48,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
