// BaseEntity.ts
// Core base class for all entities in the engine layer
// Provides id, tags, Matter.Body reference, and lifecycle hooks

import type { Body } from 'matter-js';

export interface EntityInitOptions {
  id?: string;
  tags?: string[];
  body?: Body;
}

export abstract class BaseEntity {
  id: string;
  tags: string[];
  body: Body | null;

  constructor(options: EntityInitOptions = {}) {
    this.id = options.id || this.generateId();
    this.tags = options.tags || [];
    this.body = options.body || null;
    this.init();
  }

  // Called after construction for additional setup
  protected init(): void {}

  // Called every frame/tick
  update(dt?: number): void {}

  // Called when entity is destroyed/removed
  destroy(): void {}

  // Utility: Generate a unique id
  protected generateId(): string {
    return (
      'entity_' +
      Math.random().toString(36).substr(2, 9) +
      '_' +
      Date.now().toString(36)
    );
  }
}
