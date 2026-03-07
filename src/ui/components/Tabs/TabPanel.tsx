import React from "react";
import { TOKENS } from "../../../styles/tokens";
import { NEON_THEMES } from "../../../styles/neonThemes";
interface TabPanelProps {
  tabKey: string;
  children: React.ReactNode;
  theme?: keyof typeof NEON_THEMES;
}

export const TabPanel: React.FC<TabPanelProps> = ({ tabKey, children, theme = "cyan" }) => {
  const t = NEON_THEMES[theme];
  return (
    <div
      id={`tabpanel-${tabKey}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabKey}`}
      tabIndex={0}
      style={{
        flex: 1,
        width: "100%",
        padding: '8px',
        background: TOKENS.CONTROL_PANEL_BG,
        minHeight: 120,
        color: t.primary,
      }}
    >
      {children}
    </div>
  );
};
