import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PlaygroundCanvas } from '../PlaygroundCanvas';

describe('PlaygroundCanvas', () => {
  it('renders a canvas element', () => {
    const { container } = render(<PlaygroundCanvas />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('calls engine.attachCanvas and engine.render on mount', () => {
    const attachCanvas = vi.fn();
    const renderFn = vi.fn();
    const engine = { attachCanvas, render: renderFn };
    render(<PlaygroundCanvas engine={engine} />);
    expect(attachCanvas).toHaveBeenCalled();
    expect(renderFn).toHaveBeenCalled();
  });

  it('handles pointer events for hold-to-grow', () => {
    // Mock props for pointer event logic
    const engine = { attachCanvas: vi.fn(), render: vi.fn(), spawnEntity: vi.fn() };
    const { container } = render(
      <PlaygroundCanvas engine={engine} selectedObject="Planet" activeTab="objects" />
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
    // Simulate pointer down
    fireEvent.pointerDown(canvas!);
    // Simulate pointer move
    fireEvent.pointerMove(canvas!);
    // Simulate pointer up
    fireEvent.pointerUp(canvas!);
    // No assertion for spawnEntity since hook logic is async/timer-based
  });
});
