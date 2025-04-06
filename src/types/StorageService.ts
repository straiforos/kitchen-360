import { Room } from './Room';

export interface StorageService {
  init(): Promise<void>;
  getMetadata(key: string): Promise<Room>;
  setMetadata(key: string, value: Room): Promise<void>;
  deleteMetadata(key: string): Promise<void>;
  getAllKeys(): Promise<string[]>;
} 