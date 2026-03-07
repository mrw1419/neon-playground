import React from "react";

import { Tab, TabProps } from "./Tab";
import type { TabDefinition } from "./Tabs";
import { NEON_THEMES } from "../../../styles/neonThemes";

interface TabsListProps {
  tabs: TabDefinition[];
  activeKey: string;
  onTabClick: (key: string) => void;
  layout: "horizontal" | "vertical";
  showIcons?: boolean;
  theme?: keyof typeof NEON_THEMES;
}


export const TabsList: React.FC<TabsListProps> = ({
  tabs,
  activeKey,
  onTabClick,
  layout,
  showIcons = true,
  theme = "cyan",
}) => {
  // Keyboard navigation for tabs
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (idx: number) => {
    const ref = tabRefs.current[idx];
    if (ref) ref.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIdx = tabs.findIndex(tab => tab.key === activeKey);
    let nextIdx = currentIdx;
    if (layout === "vertical") {
      if (e.key === "ArrowUp") nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
      if (e.key === "ArrowDown") nextIdx = (currentIdx + 1) % tabs.length;
    } else {
      if (e.key === "ArrowLeft") nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
      if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % tabs.length;
    }
    if (e.key === "Home") nextIdx = 0;
    if (e.key === "End") nextIdx = tabs.length - 1;
    if (nextIdx !== currentIdx) {
      e.preventDefault();
      focusTab(nextIdx);
      onTabClick(tabs[nextIdx].key);
    }
  };

  return (
    <div
      role="tablist"
      aria-orientation={layout}
      tabIndex={0}
      style={{
        display: "flex",
        flexDirection: layout === "vertical" ? "column" : "row",
        gap: 0,
        alignItems: layout === "vertical" ? "flex-start" : "center",
        justifyContent: layout === "horizontal" ? "center" : "flex-start",
        marginBottom: 0,
        marginRight: layout === "vertical" ? 16 : 0,
        width: "100%",
      }}
      onKeyDown={handleKeyDown}
    >
      {tabs.map((tab, idx) => (
        <Tab
          key={tab.key}
          tabKey={tab.key}
          label={tab.label}
          icon={showIcons ? tab.icon : undefined}
          selected={activeKey === tab.key}
          disabled={tab.disabled}
          onClick={() => onTabClick(tab.key)}
          theme={tab.theme || theme}
          ref={(el: HTMLButtonElement | null) => (tabRefs.current[idx] = el)}
        />
      ))}
    </div>
  );
};
