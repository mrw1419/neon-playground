/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import React from 'react';
import { EngineContext } from './EngineContext';
import { EffectContextProvider } from './EffectContext';

describe('EngineContext', () => {
  it('provides engine value to consumers', () => {
    const engineMock = { getEntities: () => [1, 2, 3] };
    const Consumer = () => {
      const engine = React.useContext(EngineContext);
      return <div>Entities: {engine.getEntities().length}</div>;
    };
    render(
      <EngineContext.Provider value={engineMock}>
        <Consumer />
      </EngineContext.Provider>
    );
    expect(screen.getByText('Entities: 3')).toBeInTheDocument();
  });
});

describe('EffectContextProvider', () => {
  it('provides effectorSystem value to consumers', () => {
    const effectorSystemMock = { activeEffects: ['burst', 'ripple'] };
    const Consumer = () => {
      const effectorSystem = React.useContext(EffectContextProvider.Context);
      return <div>Effects: {effectorSystem.activeEffects.join(',')}</div>;
    };
    render(
      <EffectContextProvider value={effectorSystemMock}>
        <Consumer />
      </EffectContextProvider>
    );
    expect(screen.getByText('Effects: burst,ripple')).toBeInTheDocument();
  });
});
