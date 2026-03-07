import React from 'react';
import { NEON_THEMES } from '../../../styles/neonThemes';

interface EffectorPreviewOverlayProps {
  previewPos: { x: number; y: number };
  previewRadius: number;
  previewActive: boolean;
  selectedEffector: string;
  cooldownActive?: boolean;
  cooldownDuration?: number;
  cooldownEnd?: number;
}

export function EffectorPreviewOverlay({ previewPos, previewRadius, previewActive, selectedEffector, cooldownActive = false, cooldownDuration = 0, cooldownEnd = 0 }: EffectorPreviewOverlayProps) {
  if (!previewActive || !previewPos || !selectedEffector) return null;
  // Use neon cyan for burst, ripple, gravity, trail (future extensibility)
  const color = NEON_THEMES.cyan.primary;
  // Progress ring for cooldown
  const ringSize = previewRadius * 2 + 12;
  const strokeWidth = 6;
  const r = previewRadius + 4;
  const circumference = 2 * Math.PI * r;
  let progress = 0;
  if (cooldownActive && cooldownDuration > 0) {
    // Animate progress: 0 = just started, 1 = done
    const total = cooldownEnd - (cooldownEnd - cooldownDuration);
    progress = 1 - cooldownDuration / total;
  }
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
        boxShadow: `0 0 24px ${color}, 0 0 48px ${color}66`, // cyan glow
        border: `2px solid ${color}`,
        outline: `2px solid ${color}88`,
        transition: 'box-shadow 0.2s, border-color 0.2s',
        opacity: cooldownActive ? 0.5 : 1,
      }}
    >
      {/* Progress ring for cooldown */}
      {cooldownActive && (
        <svg
          width={ringSize}
          height={ringSize}
          style={{
            position: 'absolute',
            left: -(ringSize - previewRadius * 2) / 2,
            top: -(ringSize - previewRadius * 2) / 2,
            pointerEvents: 'none',
            zIndex: 10000,
          }}
        >
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={r}
            fill="none"
            stroke="#222"
            strokeWidth={strokeWidth}
            opacity={0.3}
          />
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.2s linear' }}
            opacity={0.8}
          />
        </svg>
      )}
    </div>
  );
}
