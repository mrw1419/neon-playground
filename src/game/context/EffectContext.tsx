import React, { useContext } from 'react';

export interface EffectContextValue {
  effects: any[];
  triggerEffect: (effectData: any) => void;
  removeEffect: (id: string | number) => void;
  getEffectRegistry: () => Record<string, any>;
  getEffectors: () => any[];
}

export const EffectContext = React.createContext<EffectContextValue>({
  effects: [],
  triggerEffect: () => {},
  removeEffect: () => {},
  getEffectRegistry: () => ({}),
  getEffectors: () => [], // Added getEffectors method
});


export function useEffectContext() {
  const ctx = useContext(EffectContext);
  return ctx;
}

export function EffectContextProvider({ children, value }: { children: React.ReactNode; value: EffectContextValue }) {
  return <EffectContext.Provider value={value}>{children}</EffectContext.Provider>;
}
