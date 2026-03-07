// MoveVisual.tsx
// Starter visual effect for Move tool (optional, theme-aware)
import React from 'react';

export const MoveVisual: React.FC = () => (
  <svg width="40" height="40">
    <rect x="10" y="10" width="20" height="20" rx="4" fill="#fff" opacity="0.2" />
    <path d="M20 5 L20 35 M5 20 L35 20" stroke="#00e676" strokeWidth="2" opacity="0.7" />
  </svg>
);
