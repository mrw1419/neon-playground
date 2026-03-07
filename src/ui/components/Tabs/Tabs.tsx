import React, { useState, ReactNode } from "react";
import { TabsList } from "./TabsList";
import { TabPanel } from "./TabPanel";
import { TOKENS } from "../../../styles/tokens";
import { NEON_THEMES } from "../../../styles/neonThemes";


export interface TabDefinition {
  key: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  theme?: keyof typeof NEON_THEMES;
}

export interface TabsProps {
  tabs: TabDefinition[];
  defaultActiveKey?: string;
  layout?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  showIcons?: boolean;
  theme?: keyof typeof NEON_THEMES;
  activeTab?: string;
  onTabChange?: (tabKey: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveKey,
  layout = "horizontal",
  style = {},
  showIcons = true,
  theme = "cyan",
  activeTab,
  onTabChange,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    defaultActiveKey || (tabs.length > 0 ? tabs[0].key : "")
  );
  // Use controlled activeTab if provided, else internal state
  const currentActiveKey = activeTab !== undefined ? activeTab : internalActiveKey;
  const handleTabClick = (tabKey: string) => {
    if (onTabChange) {
      onTabChange(tabKey);
    } else {
      setInternalActiveKey(tabKey);
    }
  };

  const activeTabObj = tabs.find((tab: TabDefinition) => tab.key === currentActiveKey);
  const activeTabTheme = activeTabObj && activeTabObj.theme ? activeTabObj.theme : theme;

  // If the content is a TabCard, inject theme prop
  let content = activeTabObj?.content;
  if (
    content &&
    typeof content === 'object' &&
    'type' in content &&
    (content as any).type &&
    (content as any).type.displayName === 'TabCard'
  ) {
    content = React.cloneElement(content as React.ReactElement, { theme: activeTabTheme });
  }

  return (
    <div style={{ display: "flex", flexDirection: layout === "vertical" ? "row" : "column", width: "100%", ...style }}>
      <TabsList
        tabs={tabs}
        activeKey={currentActiveKey}
        onTabClick={handleTabClick}
        layout={layout}
        showIcons={showIcons}
        theme={activeTabTheme}
      />
      {activeTabObj && (
        <TabPanel key={activeTabObj.key} tabKey={activeTabObj.key} theme={activeTabTheme}>
          {content}
        </TabPanel>
      )}
    </div>
  );
};
