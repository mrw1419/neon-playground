// RippleType.ts
// Type/variation definition for Ripple effector

export interface RippleType {
  id: string;
  amplitude: number;
  frequency: number;
  radius: number;
  color: string;
  duration?: number; // ms
  description?: string;
}

export const MVPRipple: RippleType = {
  id: 'ripple-mvp',
  amplitude: 0.5,
  frequency: 2.0,
  radius: 80,
  color: '#80d8ff',
  duration: 2000, // ms (gravity wave)
  description: 'Default MVP ripple effector',
};
