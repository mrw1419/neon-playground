import React from 'react';
import { NEON_THEMES } from '../../../styles/neonThemes';
interface InteractPreviewOverlayProps {
  previewPos: { x: number; y: number };
  previewActive: boolean;
}

export function InteractPreviewOverlay({ previewPos, previewActive }: InteractPreviewOverlayProps) {
  if (!previewActive || !previewPos) return null;
  const color = NEON_THEMES.red.primary;
  const radius = 24;
  return (
    <div
      style={{
        position: 'absolute',
        left: previewPos.x - radius,
        top: previewPos.y - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'rgba(0,0,0,0.38)', // semi-transparent black
        boxShadow: `0 0 24px ${color}, 0 0 48px ${color}66`, // red glow
        border: `2px solid ${color}`,
        outline: `2px solid ${color}88`,
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
    />
  );
}
