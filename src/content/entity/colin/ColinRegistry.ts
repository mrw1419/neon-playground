// ColinRegistry.ts
// Registry for Colin entity variants (modular, extensible)

import { ColinEntity } from './ColinEntity';

export interface ColinRegistryEntry {
  id: string;
  name: string;
  variant: 'classic';
  entity: typeof ColinEntity;
  description?: string;
}

export const ColinRegistry: ColinRegistryEntry[] = [
  {
    id: 'colin-classic',
    name: 'Colin (Classic)',
    variant: 'classic',
    entity: ColinEntity,
    description: 'Classic segmented spaceworm with animated head, mouth, and chomp.'
  },
  // Future variants can be added here
];

export function getColinById(id: string): ColinRegistryEntry | undefined {
  return ColinRegistry.find(c => c.id === id);
}
