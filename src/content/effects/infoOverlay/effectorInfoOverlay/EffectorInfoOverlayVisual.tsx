
/**
 * EffectorInfoOverlayVisual.tsx
 *
 * CANONICAL overlay for displaying effector diagnostics/info (type, position, radius, power, cooldown, etc.).
 *
 * - Pure overlay: receives all data via props, no engine mutation.
 * - Used ONLY for overlays and diagnostics, not for animated effect visuals.
 * - Do NOT use for burst/radial effect visuals—see BurstEffectorVisual for that purpose.
 *
 * This separation ensures overlays and effect visuals remain decoupled and maintainable.
 */
// EffectorInfoOverlayVisual.tsx
// Global overlay visual for effectors (cosmic universe)
// Displays effector information such as type, position, radius, power, cooldown, etc.

import React from 'react';
import { registry } from '../../../registry';
import { MVPBurst } from '../../../effector/radial/BurstType';
import { MVPRipple } from '../../../effector/radial/RippleType';
import { MVPGravity } from '../../../effector/radial/GravityType';
import { MVPNudge } from '../../../effector/radial/NudgeType';

export interface EffectorInfoOverlayVisualProps {
  effectors: Array<{
    id: string;
    type: string;
    x: number;
    y: number;
    radius?: number;
    power?: number;
    cooldown?: number;
    [key: string]: any;
  }>;
  style?: React.CSSProperties;
}

export const EffectorInfoOverlayVisual: React.FC<EffectorInfoOverlayVisualProps> = ({ effectors, style }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '65vw',
        height: '65vh',
        zIndex: 9999,
        ...style,
      }}
    >
      {effectors.map((effector) => {
        // Lookup duration from type definition based on effector.type
        let duration: number | undefined;
        switch (effector.type) {
          case 'burst':
            duration = MVPBurst.duration;
            break;
          case 'ripple':
            duration = MVPRipple.duration;
            break;
          case 'gravity':
            duration = MVPGravity.duration;
            break;
          case 'nudge':
            duration = MVPNudge.duration;
            break;
          default:
            duration = undefined;
        }
        return (
          <div
            key={effector.id}
            style={{
              position: 'absolute',
              left: effector.x,
              top: effector.y,
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              fontSize: '12px',
              fontFamily: "'Rajdhani', 'Exo 2', 'Rubik', 'Inter', sans-serif",
              padding: '2px 6px',
              borderRadius: '4px',
              transform: 'translate(-50%, -120%)',
              zIndex: 9999,
            }}
          >
            <strong>Effector</strong> (Type: {effector.type})<br />
            x: {Math.round(effector.x)}, y: {Math.round(effector.y)}<br />
            {effector.radius !== undefined && <>r: {Number(effector.radius).toFixed(1)}<br /></>}
            {effector.power !== undefined && <>power: {effector.power}<br /></>}
            {duration !== undefined && <>duration: {duration}ms<br /></>}
            {effector.cooldown !== undefined && <>cooldown: {effector.cooldown}<br /></>}
          </div>
        );
      })}
    </div>
  );
};
