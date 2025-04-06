import { Room } from './Room';

/**
 * Interface for storage operations related to room data
 * @interface StorageService
 */
export interface StorageService {
  /** Initialize the storage service */
  init(): Promise<void>;
  /** Retrieve room metadata for a given key */
  getMetadata(key: string): Promise<Room>;
  /** Store room metadata with a given key */
  setMetadata(key: string, value: Room): Promise<void>;
  /** Remove room metadata for a given key */
  deleteMetadata(key: string): Promise<void>;
  /** Get all available metadata keys */
  getAllKeys(): Promise<string[]>;
} 