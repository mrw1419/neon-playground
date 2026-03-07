// BurstType.ts
import { NEON_THEMES } from '../../../styles/neonThemes';
// Type/variation definition for Burst effector

export interface BurstType {
  id: string;
  force: number;
  radius: number;
  color: string;
  duration?: number; // ms
  description?: string;
}

export const MVPBurst: BurstType = {
  id: 'burst-mvp',
  force: 1.0,
  radius: 60,
  color: NEON_THEMES.cyan.primary,
  duration: 1200, // ms (star explosion)
  description: 'Default MVP burst effector',
};
