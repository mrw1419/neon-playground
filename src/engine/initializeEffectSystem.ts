import { EffectorSystem } from './effectorSystem';
import { PhysicsEngine } from './physicsEngine';

// Accept a PhysicsEngine instance so the effector system shares the same world as the engine
export function initializeEffectorSystem(physicsEngine: PhysicsEngine): EffectorSystem {
  return new EffectorSystem(physicsEngine);
}
