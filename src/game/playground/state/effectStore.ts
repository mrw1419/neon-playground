// effectStore.ts
// Effector store for managing all active/animated effects (bursts, ripples, overlays, etc.)
import { createStore, createEvent } from 'effector';

export interface EffectInstance {
  id: string;
  type: string; // e.g. 'burst', 'ripple', etc.
  position: { x: number; y: number };
  radius?: number;
  color?: string;
  createdAt: number;
  opacity?: number;
  power?: number;
  [key: string]: any; // Allow extra properties for flexibility
}

export const addEffect = createEvent<EffectInstance>();
export const removeEffect = createEvent<string>(); // by id
export const clearEffects = createEvent();

export const $effects = createStore<EffectInstance[]>([])
  .on(addEffect, (state, effect) => [...state, effect])
  .on(removeEffect, (state, id) => state.filter(e => e.id !== id))
  .on(clearEffects, () => []);
