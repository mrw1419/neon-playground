// physicsEngine.ts
//
// Wrapper for Matter.js integration in Neon Playground
// Provides a unified API for creating worlds, adding/removing objects, applying effects, and updating physics.

import {
  Engine,
  World,
  Bodies,
  Body,
  Events,
  Composite,
  Runner
} from 'matter-js';

// Optionally import types
// import type { IEngineDefinition, IEventCollision } from 'matter-js';

class PhysicsEngine {
  engine: Engine;
  world: World;
  runner: Runner;

  constructor(options?: any) {
    this.engine = Engine.create(options);
    this.world = this.engine.world;
    this.runner = Runner.create();
    // Enable gravity for playground game
    this.engine.gravity.x = 0;
    this.engine.gravity.y = 1; // <-- Gravity pulls planets downward
    this.engine.gravity.scale = 0.001; // <-- Use Matter.js default scale
  }

  /**
   * Set the gravity for the physics engine.
   * @param x Gravity in the x direction
   * @param y Gravity in the y direction
   */
  setGravity(x: number, y: number) {
    this.engine.gravity.x = x;
    this.engine.gravity.y = y;
    // If both x and y are zero, also set scale to 0 to fully disable gravity
    if (x === 0 && y === 0) {
      this.engine.gravity.scale = 0;
    } else {
      this.engine.gravity.scale = 0.001; // Matter.js default
    }
  }

  addBody(body: Body) {
    World.add(this.world, body);
    const allBodies = (this.world ? (this.world.bodies || []) : []);
    console.log('➕ [physicsEngine] Body added to world', { id: body.id, position: body.position, totalBodies: allBodies.length + 1 });
  }

  removeBody(body: Body) {
    World.remove(this.world, body);
  }

  step(delta: number) {
    // console.log('⚡ [physicsEngine] Tick start', { delta });
    Engine.update(this.engine, delta);
    const bodies = Composite.allBodies(this.world);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const panelHeight = 160; // Adjust as needed for your control panel
    for (const body of bodies) {
      if (!body.circleRadius) continue;
      const r = body.circleRadius;
      // Left/right
      if (body.position.x - r < 0) {
        body.position.x = r;
        body.velocity.x *= -0.9;
      } else if (body.position.x + r > width) {
        body.position.x = width - r;
        body.velocity.x *= -0.9;
      }
      // Top/bottom
      if (body.position.y - r < 0) {
        body.position.y = r;
        body.velocity.y *= -0.9;
      } else if (body.position.y + r > height - panelHeight) {
        body.position.y = height - panelHeight - r;
        body.velocity.y *= -0.9;
      }
      // console.log('🪐 [physicsEngine] Entity after physics', { id: body.id, position: { ...body.position }, velocity: { ...body.velocity } });
    }
    // console.log('⚡ [physicsEngine] Tick end');
    // ...existing code...
  }

  onCollisionStart(callback: (event: any) => void) {
    Events.on(this.engine, 'collisionStart', callback);
  }

  /**
   * Applies a radial impulse (burst force) from a given point to all bodies within a radius.
   */
  applyRadialImpulse(origin: { x: number; y: number }, force: number, radius: number, excludeBodies: Body[] = []) {
    const allBodies = Composite.allBodies(this.world);
    // Log all body positions and radii before applying impulse
    console.log('🪐 [physicsEngine] All bodies before radial impulse:', allBodies.map(b => ({ id: b.id, position: b.position, radius: b.circleRadius })));
    console.log('🎯 [physicsEngine] Radial impulse origin and radius:', { origin, radius, force });
    const affectedBodies = [];
    for (const body of allBodies) {
      const dx = body.position.x - origin.x;
      const dy = body.position.y - origin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let skipped = false;
      let reason = '';
      if (excludeBodies.includes(body)) {
        skipped = true;
        reason = 'excluded';
      } else if (dist === 0 || dist > radius) {
        skipped = true;
        reason = dist === 0 ? 'origin overlap' : 'out of radius';
      }
      if (skipped) {
        console.log('🚫 [physicsEngine] Skipping body', { id: body.id, position: body.position, dist, reason });
        continue;
      }
      const falloff = 1 - dist / radius;
      const impulse = force * falloff;
      const nx = dx / dist;
      const ny = dy / dist;
      Body.applyForce(body, body.position, {
        x: nx * impulse,
        y: ny * impulse,
      });
      affectedBodies.push(body);
      console.log('✅ [physicsEngine] Affecting body', { id: body.id, position: body.position, dist, impulse: { x: nx * impulse, y: ny * impulse } });
    }
    if (affectedBodies.length > 0) {
      console.log('🏋️ [physicsEngine] Radial impulse applied', { origin, force, radius, affectedBodies: affectedBodies.map(b => b.id) });
    } else {
      console.log('🏋️ [physicsEngine] Radial impulse applied, but no bodies affected', { origin, force, radius });
    }
  }

  /**
   * Applies a gravity well force pulling bodies toward a point.
   * For Gravity effector: pulls all bodies within radius toward origin with given strength.
   */
  applyGravityWell(origin: { x: number; y: number }, strength: number, radius: number) {
    const allBodies = Composite.allBodies(this.world);
    const affectedBodies = [];
    for (const body of allBodies) {
      const dx = origin.x - body.position.x;
      const dy = origin.y - body.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0 || dist > radius) continue;
      const falloff = 1 - dist / radius;
      const force = strength * falloff;
      const nx = dx / dist;
      const ny = dy / dist;
      Body.applyForce(body, body.position, {
        x: nx * force,
        y: ny * force,
      });
      affectedBodies.push(body);
    }
    console.log('🏋️ [physicsEngine] Gravity well applied', { origin, strength, radius, affectedBodies: affectedBodies.map(b => b.id) });
  }

  /**
   * Applies a ripple wave force: oscillating push/pull from origin.
   * For Ripple effector: applies a sinusoidal force to all bodies within radius.
   */
  applyRippleWave(origin: { x: number; y: number }, amplitude: number, frequency: number, radius: number, phase: number = 0) {
    const allBodies = Composite.allBodies(this.world);
    const affectedBodies = [];
    for (const body of allBodies) {
      const dx = body.position.x - origin.x;
      const dy = body.position.y - origin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0 || dist > radius) continue;
      const falloff = 1 - dist / radius;
      // Oscillating force: amplitude * sin(frequency * dist + phase)
      const osc = Math.sin(frequency * dist + phase);
      const force = amplitude * osc * falloff;
      const nx = dx / dist;
      const ny = dy / dist;
      Body.applyForce(body, body.position, {
        x: nx * force,
        y: ny * force,
      });
      affectedBodies.push(body);
    }
    console.log('🏋️ [physicsEngine] Ripple wave applied', { origin, amplitude, frequency, radius, phase, affectedBodies: affectedBodies.map(b => b.id) });
  }

  /**
   * Applies a directional nudge force to bodies.
   * For Nudge effector: applies a force in a direction to all bodies within radius.
   */
  applyNudgeForce(origin: { x: number; y: number }, direction: { x: number; y: number }, strength: number, radius: number) {
    const allBodies = Composite.allBodies(this.world);
    const affectedBodies = [];
    for (const body of allBodies) {
      const dx = body.position.x - origin.x;
      const dy = body.position.y - origin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0 || dist > radius) continue;
      const falloff = 1 - dist / radius;
      Body.applyForce(body, body.position, {
        x: direction.x * strength * falloff,
        y: direction.y * strength * falloff,
      });
      affectedBodies.push(body);
    }
    console.log('🏋️ [physicsEngine] Nudge force applied', { origin, direction, strength, radius, affectedBodies: affectedBodies.map(b => b.id) });
  }
}

export { PhysicsEngine };
export { Engine, World, Bodies, Body, Events, Composite, Runner };