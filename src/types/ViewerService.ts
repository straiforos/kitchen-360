import { Hotspot, Position } from './';

export interface ViewerService {
  init(container: HTMLElement, imageUrl: string): Promise<void>;
  setPosition(position: Position): void;
  addHotspot(hotspot: Hotspot): void;
  removeHotspot(hotspotId: string): void;
  destroy(): void;
} 