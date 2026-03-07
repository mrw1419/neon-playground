import { clamp, lerp } from '../math';
import { distance } from '../physicsHelpers';
import { rgbToHex } from '../color';
import { randomInt } from '../random';

describe('math utilities', () => {
  test('clamp clamps values', () => {
    expect(clamp(5, 1, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
  test('lerp interpolates', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });
});

describe('physicsHelpers', () => {
  test('distance computes correctly', () => {
    expect(distance(0, 0, 3, 4)).toBe(5);
  });
});

describe('color utilities', () => {
  test('rgbToHex converts correctly', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
  });
});

describe('random utilities', () => {
  test('randomInt returns in range', () => {
    for (let i = 0; i < 10; i++) {
      const val = randomInt(1, 3);
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(3);
    }
  });
});
