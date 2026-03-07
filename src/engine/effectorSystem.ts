
// Central dispatcher for effects in the engine.
// Future Planning:
// - Implement applyBurst(config), applyWave(config), and other effect methods.
// - Collect effect modifiers from triggering entity.
// - Delegate physics to effect implementations and visuals to visual strategies.
// - Serve as the main interface for applying and managing effects in the game world.


import { PhysicsEngine } from "./physicsEngine";
import { EffectorConfig } from "../content/effectorConfig";

export class EffectorSystem {
  physicsEngine: PhysicsEngine;
  queue: any[] = [];
  constructor(physicsEngine: PhysicsEngine) {
    this.physicsEngine = physicsEngine;
  }

  /**
   * Generic trigger for any effector type (burst, ripple, etc.)
   * Used by useRadialEffector to enqueue effects for physics/engine processing.
   */
  triggerEffector(effectorKey: string, config: any, event?: any) {
    console.log('✨ [EffectorSystem] triggerEffector:', { effectorKey, config });
    // Use centralized config for radius/power, defaulting to 'm' scale if not provided
    const effConfig = EffectorConfig[effectorKey] || {};
    const scale = config.scale || effConfig.defaultScale || 'm';
    switch (effectorKey) {
      case 'burst':
        this.enqueueBurst({
          position: config.position,
          force: config.force || config.power || (effConfig.power ? effConfig.power[scale] : 1),
          radius: config.radius || (effConfig.radius ? effConfig.radius[scale] : 400),
          color: config.color,
        });
        break;
      case 'gravity':
        this.enqueueGravity({
          position: config.position,
          strength: config.strength || config.power || (effConfig.power ? effConfig.power[scale] : 1),
          radius: config.radius || (effConfig.radius ? effConfig.radius[scale] : 400),
          color: config.color,
        });
        break;
      case 'ripple':
        this.enqueueRipple({
          position: config.position,
          amplitude: config.amplitude || 0.5,
          frequency: config.frequency || 2.0,
          radius: config.radius || (effConfig.radius ? effConfig.radius[scale] : 400),
          phase: config.phase || 0,
          color: config.color,
        });
        break;
      case 'nudge':
        this.enqueueNudge({
          position: config.position,
          direction: config.direction || { x: 1, y: 0 },
          strength: config.strength || config.power || (effConfig.power ? effConfig.power[scale] : 1),
          radius: config.radius || (effConfig.radius ? effConfig.radius[scale] : 400),
          color: config.color,
        });
        break;
      case 'trail':
        this.enqueueTrail({
          position: config.position,
          amplitude: config.amplitude || 0.3,
          frequency: config.frequency || 1.5,
          radius: config.radius || (EffectorConfig.nudge?.radius?.[scale] || 400), // Use nudge as fallback for trail
          color: config.color,
        });
        break;
      default:
        console.warn(`[EffectorSystem] Unknown effector type: ${effectorKey}`);
    }
  }

  /** Enqueue a trail effect to be processed */
  enqueueTrail(config: { position: { x: number; y: number }; amplitude: number; frequency: number; radius: number; color?: string }) {
    this.queue.push({ type: 'trail', config, time: 0 });
  }

  /** Enqueue a gravity effect to be processed */
  enqueueGravity(config: { position: { x: number; y: number }; strength: number; radius: number; color?: string }) {
    this.queue.push({ type: 'gravity', config, time: 0 });
  }

  /** Enqueue a ripple effect to be processed */
  enqueueRipple(config: { position: { x: number; y: number }; amplitude: number; frequency: number; radius: number; phase?: number; color?: string }) {
    this.queue.push({ type: 'ripple', config, time: 0 });
  }

  /** Enqueue a nudge effect to be processed */
  enqueueNudge(config: { position: { x: number; y: number }; direction: { x: number; y: number }; strength: number; radius: number; color?: string }) {
    this.queue.push({ type: 'nudge', config, time: 0 });
  }

  /** Enqueue a burst effect to be processed */
  enqueueBurst(config: { position: { x: number; y: number }; force: number; radius: number; color?: string }) {
    this.queue.push({ type: 'burst', config, time: 0 });
  }

  /** Enqueue a wave effect to be processed */
  enqueueWave(config: any) {
    this.queue.push({ type: 'wave', config, time: 0 });
  }

  /** Process effect queue each tick */
  update(dt: number) {
    for (let i = 0; i < this.queue.length; i++) {
      const effect = this.queue[i];
      effect.time += dt;
      if (effect.type === 'burst') {
        this.physicsEngine.applyRadialImpulse(effect.config.position, effect.config.force, effect.config.radius);
        this.queue.splice(i, 1); i--;
      }
      if (effect.type === 'gravity') {
        this.physicsEngine.applyGravityWell(effect.config.position, effect.config.strength, effect.config.radius);
        this.queue.splice(i, 1); i--;
      }
      if (effect.type === 'ripple') {
        this.physicsEngine.applyRippleWave(effect.config.position, effect.config.amplitude, effect.config.frequency, effect.config.radius, effect.config.phase || 0);
        this.queue.splice(i, 1); i--;
      }
      if (effect.type === 'nudge') {
        this.physicsEngine.applyNudgeForce(effect.config.position, effect.config.direction, effect.config.strength, effect.config.radius);
        this.queue.splice(i, 1); i--;
      }
      if (effect.type === 'trail') {
        // Now treat like a weaker burst
        const force = effect.config.force || effect.config.power || 0.3; // Default weaker force
        this.physicsEngine.applyRadialImpulse(effect.config.position, force, effect.config.radius);
        this.queue.splice(i, 1); i--;
      }
      if (effect.type === 'wave') {
        // Process wave effect logic
        this.queue.splice(i, 1); i--;
      }
    }
  }
}
