// RippleVisual.tsx
// Placeholder MVP visual for Ripple effector
import React from 'react';

export const RippleVisual: React.FC = () => (
  <svg width="60" height="60">
    <circle cx="30" cy="30" r="28" stroke="#80d8ff" strokeWidth="4" fill="none" opacity="0.7" />
    <circle cx="30" cy="30" r="18" stroke="#80d8ff" strokeWidth="2" fill="none" opacity="0.4" />
  </svg>
);
