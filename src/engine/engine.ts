
// Factory function to initialize the engine
export function initializeEngine(config?: WorldLayerConfig): WorldLayer {
  return new WorldLayer(config);
}
// Neon Playground Engine Core
//
// This file orchestrates the main game world logic, acting as the central hub for physics, entity management, and rendering.
//
import { Bodies, Body, PhysicsEngine } from './physicsEngine';
import { EffectorSystem } from './effectorSystem';
import { getPlanetTheme } from '../content/utils/getPlanetTheme';
// - Manages entities via the base class in entity.ts, supporting upgrades, effects, and lifecycle hooks.
// - Coordinates with effectSystem.ts to apply and visualize effects (e.g., burst, wave) on entities.
// - Delegates rendering to renderer.ts, which draws entities, upgrades, and effects using neon visual tokens.
// The WorldLayer class defined here is the foundation for all game modes (playground, spaceshipGame, etc.), enabling modular extension and consistent integration across multiple games and sandboxes.

export interface WorldLayerConfig {
  gravity?: { x: number; y: number };
  // Add other config options as needed
}

export class WorldLayer {
      /** Remove all entities and their physics bodies from the world */
      clearEntities() {
        for (const entity of this.entities) {
          if (entity.body) {
            this.physicsEngine.removeBody(entity.body);
          }
          if (typeof entity.destroy === 'function') {
            entity.destroy();
          }
        }
        this.entities = [];
      }
    /** Remove a specific entity instance from the world */
    removeEntity(entity: any) {
      if (typeof entity.destroy === 'function') {
        entity.destroy();
      }
      this.entities = this.entities.filter((e) => e !== entity);
    }

    /** Remove all entities matching a predicate */
    filterEntities(predicate: (e: any) => boolean) {
      for (const entity of this.entities) {
        if (!predicate(entity) && typeof entity.destroy === 'function') {
          entity.destroy();
        }
      }
      this.entities = this.entities.filter(predicate);
    }

    /** Get all entities (read-only) */
    getEntities() {
      // [PHYSICS DEBUG MODE] Non-physics logs commented out for focused debugging.
      // console.log('🧩🪐 [Engine] getEntities called. Entities:', this.entities.map(e => ({ id: e.id, type: e.type, infoOverlayEnabled: e.infoOverlayEnabled })));
      // Return a new array with shallow-copied entity objects for reactivity
      return this.entities.map(e => ({ ...e }));
    }
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private entities: any[] = [];
  private physicsEngine: PhysicsEngine;

  /** Public getter for the physics engine (for use by effector system, etc.) */
  public getPhysicsEngine(): PhysicsEngine {
    return this.physicsEngine;
  }
  private effectorSystem: EffectorSystem | null = null;
  constructor(private config?: WorldLayerConfig) {
    this.physicsEngine = new PhysicsEngine();
    if (config?.gravity) {
      this.physicsEngine.setGravity(config.gravity.x, config.gravity.y);
    }
  }

  attachCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  initialize() {
    // Initialize physics, entities, etc.
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
        this.render();
    }
    this.entities = [];
  }

  renderDebug() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Debug banner now rendered in React UI
    }

    render() {
      if (!this.ctx || !this.canvas) return;
      // Clear the canvas before drawing entities to prevent trails
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  spawnEntity(entity: any) {
    // Attach a physics body to any entity with physics properties
    const hasPhysics = entity.position && entity.radius;
    console.log('🪐 [engine] Spawning entity', { id: entity.id, type: entity.type, position: entity.position, radius: entity.radius });
    if (hasPhysics) {
      const canvasWidth = this.canvas?.width ?? 0;
      const canvasHeight = this.canvas?.height ?? 0;
      const pos = entity.position || { x: canvasWidth / 2, y: canvasHeight / 2 };
      const radius = entity.radius || 40;
      const mass = entity.stats && entity.stats.mass ? entity.stats.mass : 1.0;
      // Create circular body
      const body = Bodies.circle(pos.x, pos.y, radius, { mass });
      // If velocity is provided, set it on the Matter.js body
      if (entity.velocity) {
        Body.setVelocity(body, entity.velocity);
      }
      entity.body = body;
      this.physicsEngine.addBody(body);
    }
    console.log('🧩 [Engine] entities before push:', this.entities.map(e => ({ id: e.id, type: e.type })));
    this.entities.push(entity);
    console.log('🧩 [Engine] entities after push:', this.entities.map(e => ({ id: e.id, type: e.type })));
    console.log('✨🪐 [Engine] Entity spawned:', { id: entity.id, type: entity.type, infoOverlayEnabled: entity.infoOverlayEnabled });
    this.render();
    }

  update(dt: number) {
    // Sync entity.position/velocity from physics body after physics step
    for (const entity of this.entities) {
      if (entity.body) {
        // Sync position and velocity from Matter.js body
        entity.position = { x: entity.body.position.x, y: entity.body.position.y };
        entity.velocity = { x: entity.body.velocity.x, y: entity.body.velocity.y };
      }
      if (typeof entity.update === 'function') {
        entity.update(dt);
      }
      if (this.ctx && typeof entity.render === 'function') {
        entity.render(this.ctx);
      }
    }
    // Update effectors via effectSystem if present
    if (this.effectorSystem && typeof this.effectorSystem.update === 'function') {
      this.effectorSystem.update(dt);
    }
    if (this.ctx) {
      this.render();
    }
  }

  reset() {
    // Reset world state
    this.entities = [];
    this.renderDebug();
  }

  getEntityCount() {
    return this.entities.length;
  }

  // ...other shared engine methods

  /** Step the physics engine forward by dt milliseconds */
  stepPhysics(dt: number) {
    if (this.physicsEngine && typeof this.physicsEngine.step === 'function') {
      this.physicsEngine.step(dt);
    }
  }

  /** Apply a radial impulse to all bodies within a radius of origin */
  applyRadialImpulse(origin: { x: number; y: number }, force: number, radius: number) {
    if (this.physicsEngine && typeof this.physicsEngine.applyRadialImpulse === 'function') {
      this.physicsEngine.applyRadialImpulse(origin, force, radius);
    }
  }

  private loopActive: boolean = false;
  private lastTick: number = 0;
  private tickHandle: number | null = null;
  private tickRate: number = 1000 / 60; // ms per frame, default 60fps
  private tick: number = 0;
  /** Start the engine loop using requestAnimationFrame */
  startLoop() {
    if (this.loopActive) return;
    this.loopActive = true;
    this.lastTick = performance.now();
    console.log('🟢 [Engine] startLoop called');
    const tick = (now: number) => {
      if (!this.loopActive) return;
      let dt = now - this.lastTick;
      this.lastTick = now;
      // Clamp dt to tickRate (max 16.667ms for 60fps)
      dt = Math.min(dt, this.tickRate);
      try {
        // console.log(`🔄 [Engine] Tick #${this.tick} (dt=${dt})`); // Removed for production cleanliness
        this.stepPhysics(dt);
        this.update(dt);
        this.tick++;
      } catch (err) {
        console.error('[Engine] Loop error:', err);
      }
      this.tickHandle = requestAnimationFrame(tick);
    };
    this.tickHandle = requestAnimationFrame(tick);
  }

  /** Stop the engine loop */
  stopLoop() {
    this.loopActive = false;
    if (this.tickHandle !== null) {
      cancelAnimationFrame(this.tickHandle);
      this.tickHandle = null;
    }
  }

  /** Set tick rate (fps) for clamping dt */
  setTickRate(fps: number) {
    this.tickRate = 1000 / fps;
  }

  setEffectorSystem(effectorSystem: EffectorSystem) {
    this.effectorSystem = effectorSystem;
  }
}
