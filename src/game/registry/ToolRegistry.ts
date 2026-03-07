export type ToolEntry = {
  id: string;
  name: string;
  handler: Function;
  icon?: React.ReactNode;
  description?: string;
};

const toolRegistry: Record<string, ToolEntry> = {};

export function registerTool(tool: ToolEntry) {
  toolRegistry[tool.id] = tool;
}

export function getTool(id: string): ToolEntry | undefined {
  return toolRegistry[id];
}

export function listTools(): ToolEntry[] {
  return Object.values(toolRegistry);
}
