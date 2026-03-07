// NudgeType.ts
// Type/variation definition for Nudge effector

export interface NudgeType {
  id: string;
  force: number;
  direction: { x: number; y: number };
  color: string;
  duration?: number; // ms
  description?: string;
}

export const MVPNudge: NudgeType = {
  id: 'nudge-mvp',
  force: 0.6,
  direction: { x: 1, y: 0 },
  color: '#ffd54f',
  duration: 400, // ms (quick nudge)
  description: 'Default MVP nudge effector',
};
