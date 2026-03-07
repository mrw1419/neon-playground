// BoundarySystem.ts
// Responsible for boundary-based entity deletion and future boundary logic

export interface Boundary {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export function runBoundaryCheck(engine: { entities: any[]; removeEntity: (id: string) => void }, boundary: Boundary) {
  for (const entity of engine.entities) {
    const { id, position } = entity;
    if (
      position.x < boundary.xMin ||
      position.x > boundary.xMax ||
      position.y < boundary.yMin ||
      position.y > boundary.yMax
    ) {
      engine.removeEntity(id);
    }
  }
}

// Future expansion: teleport, world wrapping, triggers, etc.
