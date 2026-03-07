// 🗑️ DeleteTool.ts
// 🌐 Global tool for entity deletion, extensible for all games

export interface DeleteToolOptions {
  // Optional: restrict deletion to certain entity types
  allowedTypes?: string[];
  // Optional: custom triggers (e.g., viewport exit, special interactions)
  triggers?: Array<'manual' | 'viewportExit' | 'special'>;
}

export class DeleteTool {
  private options: DeleteToolOptions;

  constructor(options: DeleteToolOptions = {}) {
    this.options = options;
  }

  // Determines if an entity can be deleted
  // ✅ Determines if an entity can be deleted
  canDelete(entity: any): boolean {
    if (this.options.allowedTypes && !this.options.allowedTypes.includes(entity.type)) {
      return false;
    }
    return true;
  }

  // Handles deletion logic
  // 🗑️ Handles deletion logic
  deleteEntity(entity: any, entities: any[]): any[] {
    if (!this.canDelete(entity)) return entities;
    // Remove entity from array
    return entities.filter(e => e.id !== entity.id);
  }

  // Handles automatic triggers (e.g., viewport exit)
  // ⚡ Handles automatic triggers (e.g., viewport exit)
  handleTrigger(trigger: 'manual' | 'viewportExit' | 'special', entity: any, entities: any[]): any[] {
    if (this.options.triggers && !this.options.triggers.includes(trigger)) return entities;
    return this.deleteEntity(entity, entities);
  }
}

// 🚀 Usage: Instantiate DeleteTool in scene/game, call deleteEntity or handleTrigger as needed.
