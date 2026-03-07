// Centralized effector config for radius and power scaling (XS–XXL)
// These values are based on datasheet recommendations and can be tuned as needed.

export interface EffectorConfigScale {
  [key: string]: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xxl: number;
}

export interface EffectorConfigEntry {
  radius: EffectorConfigScale;
  power: EffectorConfigScale;
  defaultScale: string;
  [key: string]: any;
}

export interface EffectorConfigType {
  [key: string]: EffectorConfigEntry;
  burst: EffectorConfigEntry;
  ripple: EffectorConfigEntry;
  gravity: EffectorConfigEntry;
  nudge: EffectorConfigEntry;
}

export const EffectorConfig: EffectorConfigType = {
  burst: {
    radius: { xs: 100, s: 200, m: 400, l: 800, xxl: 2000 },
    power:  { xs: 0.2, s: 0.5, m: 1, l: 2, xxl: 3 },
    defaultScale: 'm',
  },
  ripple: {
    radius: { xs: 200, s: 300, m: 400, l: 800, xxl: 2000 },
    power:  { xs: 0.2, s: 0.5, m: 1, l: 2, xxl: 3 },
    defaultScale: 'm',
  },
  gravity: {
    radius: { xs: 200, s: 300, m: 400, l: 800, xxl: 2000 },
    power:  { xs: 0.2, s: 0.5, m: 1, l: 2, xxl: 3 },
    defaultScale: 'm',
  },
  nudge: {
    radius: { xs: 100, s: 200, m: 400, l: 800, xxl: 2000 },
    power:  { xs: 0.2, s: 0.5, m: 1, l: 2, xxl: 3 },
    defaultScale: 'm',
  },
};

// Usage example:
// EffectorConfig.burst.radius.m // 400
// EffectorConfig.burst.power.m // 1
