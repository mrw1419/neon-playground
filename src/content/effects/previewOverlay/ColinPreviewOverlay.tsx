import React from 'react';
import { NEON_THEMES } from '../../../styles/neonThemes';

interface ColinPreviewOverlayProps {
  previewPos: { x: number; y: number } | null;
  previewRadius: number;
  previewActive: boolean;
}

export function ColinPreviewOverlay({ previewPos, previewRadius, previewActive }: ColinPreviewOverlayProps) {
  if (!previewActive || !previewPos) return null;
  // Use EVIL neon red for Colin placement
  const color = NEON_THEMES.evil.primary;
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
        boxShadow: `0 0 24px ${color}, 0 0 48px ${color}66`, // evil red glow
        border: `2px solid ${color}`,
        outline: `2px solid ${color}88`,
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
    />
  );
}
