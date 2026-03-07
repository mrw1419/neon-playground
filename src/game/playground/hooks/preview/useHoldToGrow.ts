// useHoldToGrow hook
// Unified pointer abstraction (mouse/touch) for hold-to-grow preview overlays
import { useRef, useState, useCallback } from 'react';
import { getPointerPosition } from '../utils/pointerUtils';

export interface HoldToGrowState {
  active: boolean;
  pos: { x: number; y: number } | null;
  radius: number;
  growthStep: number;
}

const GROWTH_INCREMENTS = [36, 48, 60, 72, 84];
const GROWTH_INTERVAL = 350; // ms per increment

export function useHoldToGrow() {
  const [state, setState] = useState<HoldToGrowState>({
    active: false,
    pos: null,
    radius: GROWTH_INCREMENTS[0],
    growthStep: 0,
  });
  const timerRef = useRef<number | null>(null);

  const start = useCallback((e: MouseEvent | TouchEvent) => {
    const pointer = getPointerPosition(e);
    setState({
      active: true,
      pos: pointer,
      radius: GROWTH_INCREMENTS[0],
      growthStep: 0,
    });
    timerRef.current = setInterval(() => {
      setState(prev => {
        const nextStep = Math.min(prev.growthStep + 1, GROWTH_INCREMENTS.length - 1);
        return {
          ...prev,
          radius: GROWTH_INCREMENTS[nextStep],
          growthStep: nextStep,
        };
      });
    }, GROWTH_INTERVAL);
  }, []);

  const update = useCallback((e: MouseEvent | TouchEvent) => {
    const pointer = getPointerPosition(e);
    setState(prev => ({ ...prev, pos: pointer }));
  }, []);

  const stop = useCallback(() => {
    setState(prev => ({ ...prev, active: false, growthStep: 0, radius: GROWTH_INCREMENTS[0] }));
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return { state, start, update, stop };
}
