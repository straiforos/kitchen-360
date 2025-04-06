import { Hotspot, Position } from './';

/**
 * Interface for 360° viewer operations
 * @interface ViewerService
 */
export interface ViewerService {
  /** Initialize the viewer with a container element and image URL */
  init(container: HTMLElement, imageUrl: string): Promise<void>;
  /** Set the current position (orientation and zoom) of the viewer */
  setPosition(position: Position): void;
  /** Add a new hotspot to the viewer */
  addHotspot(hotspot: Hotspot): void;
  /** Remove a hotspot from the viewer by its ID */
  removeHotspot(hotspotId: string): void;
  /** Clean up and destroy the viewer instance */
  destroy(): void;
} 