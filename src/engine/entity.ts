// Base class for all world objects in the engine.
// Future Planning:
// - Integrate with Matter.Body for physics.
// - Implement update(), render(), attachUpgrade(), getEffectModifiers(effectName), and other core methods.
// - Serve as the foundation for all game objects (spaceships, asteroids, etc).

export class Entity {
  // Placeholder for Matter.Body reference
  body: any;
  
  constructor() {
    // Initialize body and other properties
  }

  update() {
    // Update entity logic
  }

  render() {
    // Render entity visuals
  }

  attachUpgrade(upgrade: any) {
    // Attach an upgrade to this entity
  }

  getEffectModifiers(effectName: string) {
    // Return effect modifiers for a given effect
    return {};
  }
}
