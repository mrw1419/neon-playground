// GravityType.ts
// Type/variation definition for Gravity effector

export interface GravityType {
  id: string;
  strength: number;
  radius: number;
  color: string;
  duration?: number; // ms
  description?: string;
}

export const MVPGravity: GravityType = {
  id: 'gravity-mvp',
  strength: 0.8,
  radius: 100,
  color: '#b388ff',
  duration: 2500, // ms (black hole)
  description: 'Default MVP gravity effector',
};
