// DeleteToolHandler.ts
// Handles preview and click logic for entity deletion in PlaygroundScene

import { WorldLayer } from '../../../engine/engine';

// Returns entity under cursor for preview overlay
export function getEntityUnderCursor(engine: WorldLayer, x: number, y: number) {
  if (!engine || typeof engine.getEntities !== 'function') {
    console.log('🛑 [DeleteToolHandler] Engine missing or getEntities not a function');
    return null;
  }
  const entities = engine.getEntities();
  // Simple hit test: check if cursor is within entity radius
  const found = entities.find((e: any) => {
    if (!e.position || !e.radius) return false;
    const dx = x - e.position.x;
    const dy = y - e.position.y;
    return Math.sqrt(dx * dx + dy * dy) <= (e.radius || 36);
  }) || null;
  if (found) {
    console.log('👾 [DeleteToolHandler] Entity under cursor:', found);
  } else {
    console.log('❓ [DeleteToolHandler] No entity under cursor at', x, y);
  }
  return found;
}

// Handles click to delete entity under cursor
export function handleDeleteToolClick(engine: WorldLayer, x: number, y: number) {
  const entity = getEntityUnderCursor(engine, x, y);
  if (entity && typeof engine.removeEntity === 'function') {
    console.log('🗑️ [DeleteToolHandler] Deleting entity:', entity);
    engine.removeEntity(entity);
    return true;
  }
  console.log('⚠️ [DeleteToolHandler] No entity deleted. Entity:', entity);
  return false;
}
