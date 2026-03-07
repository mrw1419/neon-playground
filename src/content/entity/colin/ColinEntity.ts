// ColinEntity.tsx
// Entity class for Colin the space worm

import React from 'react';
import { Entity } from '../../../engine/entity';
import { ColinVisual } from './ColinVisual';
import { EVIL, EVIL_DARK, EVIL_LIGHT } from '../../../styles/colors';

export class ColinEntity extends Entity {
    // Angle (radians) the head is facing
    angle: number = 0;
  // Expose head position and radius for overlays
  get position() {
    return this.segments[0] ? { x: this.segments[0].x, y: this.segments[0].y } : { x: 0, y: 0 };
  }
  get radius() {
    return this.segments[0] ? this.segments[0].r : 18;
  }
  type: string = 'Colin';
  // Simple segmented worm body
  segments: { x: number; y: number; r: number }[];
  color: string = EVIL; // Evil hot red
  eyeColor: string = EVIL_LIGHT; // Evil light for eyes
  mouthColor: string = EVIL_DARK; // Evil dark for mouth
  teethColor: string = '#fff'; // Keep teeth white for contrast

  // Mouse target for following
  mouse: { x: number; y: number } | null = null;
  // Reference to the world/entities for munching
  getEntities: (() => any[]) | null = null;
  // Speed in px/sec
  speed: number = 320;

  constructor(position: { x: number; y: number }) {
    super();
    // Create 5 segments for the worm
    this.segments = Array.from({ length: 5 }, (_, i) => ({
      x: position.x - i * 24,
      y: position.y,
      r: 18 - i * 2,
    }));
  }

  setMouseTarget(mouse: { x: number; y: number }) {
    this.mouse = mouse;
  }

  setEntityGetter(getEntities: () => any[]) {
    this.getEntities = getEntities;
  }

  update(dt?: number) {
    // Only run logic if dt is provided (engine will call with no args for base update)
    if (typeof dt !== "number") return;
    if (this.mouse) {
      const head = this.segments[0];
      const dx = this.mouse.x - head.x;
      const dy = this.mouse.y - head.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Update angle to face mouse
      if (dist > 0.1) {
        this.angle = Math.atan2(dy, dx);
      }
      if (dist > 1) {
        const moveDist = Math.min(this.speed * dt, dist);
        const nx = dx / dist;
        const ny = dy / dist;
        // Move head
        head.x += nx * moveDist;
        head.y += ny * moveDist;
      }
      // Move each segment toward the previous
      for (let i = 1; i < this.segments.length; i++) {
        const prev = this.segments[i - 1];
        const seg = this.segments[i];
        const sdx = prev.x - seg.x;
        const sdy = prev.y - seg.y;
        const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
        const idealDist = 24;
        if (sdist > idealDist) {
          const moveSeg = Math.min(sdist - idealDist, this.speed * dt);
          seg.x += (sdx / sdist) * moveSeg;
          seg.y += (sdy / sdist) * moveSeg;
        }
      }
    }
    // Munch planets on contact
    if (this.getEntities) {
      const entities = this.getEntities();
      const head = this.segments[0];
      for (const ent of entities) {
        if (ent.constructor.name === "PlanetEntity" && ent.body && ent.body.position && ent.body.radius) {
          const dx = ent.body.position.x - head.x;
          const dy = ent.body.position.y - head.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ent.body.radius + head.r) {
            // Remove planet by marking it for removal
            ent._remove = true;
          }
        }
      }
    }
  }

  /**
   * Returns a React element for rendering Colin using ColinVisual.tsx
   * Passes current segment, color, and state props.
   */
  toReactVisual(props: Partial<Parameters<typeof ColinVisual>[0]> = {}) {
    return React.createElement(ColinVisual, {
      segments: this.segments,
      angle: this.angle,
      color: this.color,
      eyeColor: this.eyeColor,
      mouthColor: this.mouthColor,
      teethColor: this.teethColor,
      ...props,
    });
  }
}
