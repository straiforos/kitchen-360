import { MarkerType } from '@photo-sphere-viewer/markers-plugin';
import { Position } from './Position';

/**
 * Represents an interactive point of interest in a 360° view
 * @interface Hotspot
 */
export interface Hotspot {
  /** Unique identifier for the hotspot */
  id: string;
  /** Display name of the hotspot */
  name: string;
  /** Position of the hotspot in the 360° view */
  position: Position;
  /** Optional description providing more information about the hotspot */
  description?: string;
  type: MarkerType,
  html: string
} 