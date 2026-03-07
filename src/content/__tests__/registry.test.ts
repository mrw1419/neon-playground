// Integration tests for src/content/registry.ts
// Ensures correct registration and resolution of entity and effector types/visuals

import { describe, it, expect } from 'vitest';
import { registry } from '../registry';

describe('Content Registry', () => {
  describe('entityTypes', () => {
    it('should register planet entity with correct class and visual', () => {
      expect(registry.entityTypes.planet).toBeDefined();
      expect(typeof registry.entityTypes.planet.class).toBe('function');
      expect(typeof registry.entityTypes.planet.visual).toBe('function');
    });
    it('should register colin entity with correct class and visual', () => {
      expect(registry.entityTypes.colin).toBeDefined();
      expect(typeof registry.entityTypes.colin.class).toBe('function');
      expect(typeof registry.entityTypes.colin.visual).toBe('function');
    });
  });

  describe('effectorTypes', () => {
    it('should register burst effector with correct visual', () => {
      expect(registry.effectorTypes.burst).toBeDefined();
      expect(typeof registry.effectorTypes.burst.visual).toBe('function');
    });
    it('should register ripple effector with correct visual', () => {
      expect(registry.effectorTypes.ripple).toBeDefined();
      expect(typeof registry.effectorTypes.ripple.visual).toBe('function');
    });
    it('should have gravity effector type (may be undefined)', () => {
      expect(registry.effectorTypes.gravity).toBeDefined();
      expect('visual' in registry.effectorTypes.gravity).toBe(true);
    });
  });
});
