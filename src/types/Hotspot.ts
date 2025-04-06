import { Position } from './Position';

export interface Hotspot {
  id: string;
  name: string;
  position: Position;
  description?: string;
} 