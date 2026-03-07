
import React, { useContext } from 'react';
import { WorldLayer } from '../../engine/engine';

export const EngineContext = React.createContext<WorldLayer | null>(null);

export function useEngineContext() {
  const ctx = useContext(EngineContext);
  return ctx;
}
