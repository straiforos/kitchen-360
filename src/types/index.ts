// Position type for viewer and hotspots
export interface Position {
  longitude: number;
  latitude: number;
  zoom: number;
}

// Hotspot data type
export interface Hotspot {
  id: string;
  name: string;
  position: Position;
  description?: string;
}

// View type for 360° images
export interface View {
  id: string;
  name: string;
  imageUrl: string;
  position: Position;
  hotspots: Hotspot[];
  createdAt: Date;
  updatedAt: Date;
}

// Room type to group views
export interface Room {
  id: string;
  name: string;
  views: View[];
  createdAt: Date;
  updatedAt: Date;
}

// App state type
export interface AppState {
  currentRoom: Room | null;
  currentView: View | null;
}

// Storage service types
export interface StorageService {
  init(): Promise<void>;
  getMetadata(key: string): Promise<any>;
  setMetadata(key: string, value: any): Promise<void>;
  deleteMetadata(key: string): Promise<void>;
  getAllKeys(): Promise<string[]>;
}

// Viewer service types
export interface ViewerService {
  init(container: HTMLElement, imageUrl: string): Promise<void>;
  setPosition(position: Position): void;
  addHotspot(hotspot: Hotspot): void;
  removeHotspot(hotspotId: string): void;
  destroy(): void;
} 