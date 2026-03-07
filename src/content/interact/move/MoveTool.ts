// MoveTool.ts
// Core logic/handler for Move tool (MVP)

import { Body } from 'matter-js';

export interface MoveToolConfig {
  id: string;
  type: 'manipulation';
  compatibleEntities: string[];
  parameters?: Record<string, any>;
}

export default class MoveTool {
  config: MoveToolConfig;
  constructor(config?: Partial<MoveToolConfig>) {
    this.config = {
      id: 'move-tool',
      type: 'manipulation',
      compatibleEntities: ['planet'],
      ...config,
    };
  }

  // Called when user starts dragging an entity
  onStartDrag(entity: { body: Body }) {
    // Could highlight or lock entity for dragging
  }

  // Called on drag update
  onDrag(entity: { body: Body }, newPosition: { x: number; y: number }) {
    Body.setPosition(entity.body, newPosition);
  }

  // Called when drag ends
  onEndDrag(entity: { body: Body }) {
    // Could unlock or finalize entity position
  }
}
