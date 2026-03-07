// PlacementPreviewTool.ts
// Modular preview logic for entity placement (planets, stars, etc.)
// Handles preview state, position, radius, and rendering API for use in scenes or overlays.

export interface PlacementPreviewState {
  active: boolean;
  pos: { x: number; y: number } | null;
  radius: number;
  type: string; // e.g., 'Planet', 'Star', etc.
}

export class PlacementPreviewTool {
  state: PlacementPreviewState;
  constructor(type: string) {
    this.state = {
      active: false,
      pos: null,
      radius: 24,
      type,
    };
  }

  start(pos: { x: number; y: number }) {
    this.state.active = true;
    this.state.pos = pos;
    this.state.radius = 24;
  }

  update(pos: { x: number; y: number }, radius: number) {
    this.state.pos = pos;
    this.state.radius = radius;
  }

  stop() {
    this.state.active = false;
    this.state.pos = null;
    this.state.radius = 24;
  }

  getState() {
    return this.state;
  }
}
