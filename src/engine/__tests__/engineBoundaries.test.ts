/// <reference types="node" />

/// <reference types="vitest" />
// Unit test to verify no forbidden (UI/content/tool) imports in engine modules
// This is a basic smoke test to ensure engine modules are pure and decoupled

describe('Engine module boundaries', () => {
  const forbiddenPatterns = [
    /from ['"]react['"]/,
    /from ['"]..\/..\/content/,
    /from ['"]..\/..\/ui/,
    /from ['"]..\/..\/game/,
    /from ['"]..\/..\/registry/,
    /from ['"]..\/..\/tools?/, // tool or tools
  ];

  const engineFiles = [
    'engine.ts',
    'entity.ts',
    'entities/BaseEntity.ts',
    'physicsEngine.ts',
    'renderer.ts',
    'effectorSystem.ts',
    'effectorSystem.ts',
  ];

  engineFiles.forEach((file) => {
    it(`${file} should not import forbidden modules`, () => {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(__dirname, '../../src/engine/', file);
      const content = fs.readFileSync(filePath, 'utf8');
      forbiddenPatterns.forEach((pattern) => {
        expect(content).not.toMatch(pattern);
      });
    });
  });
});
