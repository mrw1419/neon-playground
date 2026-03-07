// effectorStore.ts
// Store for effector tool state (selected effector, preview, settings, etc.)
import { createStore, createEvent } from 'effector';

export const setSelectedEffector = createEvent<string | null>();
export const setEffectorPreview = createEvent<{ position: { x: number; y: number } | null; radius?: number }>();

export const $selectedEffector = createStore<string | null>(null)
  .on(setSelectedEffector, (_, effector) => effector);

export interface EffectorPreviewState {
  position: { x: number; y: number } | null;
  radius?: number;
}

export const $effectorPreview = createStore<EffectorPreviewState>({ position: null })
  .on(setEffectorPreview, (_, preview) => preview);

// --- Cooldown State ---
// Map of effectorKey -> cooldownEnd timestamp (ms)
export const setEffectorCooldown = createEvent<{ effectorKey: string; cooldownEnd: number }>();
export const clearEffectorCooldown = createEvent<string>(); // effectorKey

export interface EffectorCooldowns {
  [effectorKey: string]: number; // cooldownEnd timestamp (ms)
}

export const $effectorCooldowns = createStore<EffectorCooldowns>({})
  .on(setEffectorCooldown, (state, { effectorKey, cooldownEnd }) => ({ ...state, [effectorKey]: cooldownEnd }))
  .on(clearEffectorCooldown, (state, effectorKey) => {
    const next = { ...state };
    delete next[effectorKey];
    return next;
  });
