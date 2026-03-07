import React from 'react';
import { PlanetVisual } from '../../../content/entity/planet/PlanetVisual';

interface PlanetPreviewOverlayProps {
  previewPos: { x: number; y: number };
  previewRadius: number;
  previewActive: boolean;
  selectedObject: string;
  previewPlanetProps: any;
}
export function PlanetPreviewOverlay({ previewPos, previewRadius, previewActive, selectedObject, previewPlanetProps }: PlanetPreviewOverlayProps) {
  if (!previewActive || !previewPos || selectedObject !== 'Planet') return null;
  // Always use magenta for glow/highlight
  const magenta = '#ff00ff';
  return (
    <div
      style={{
        position: 'absolute',
        left: previewPos.x - previewRadius,
        top: previewPos.y - previewRadius,
        width: previewRadius * 2,
        height: previewRadius * 2,
        borderRadius: '50%',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'rgba(0,0,0,0.38)', // semi-transparent black
        boxShadow: `0 0 24px ${magenta}, 0 0 48px ${magenta}66`, // magenta glow
        border: `2px solid ${magenta}`,
        outline: `2px solid ${magenta}88`,
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
    />
  );
}
