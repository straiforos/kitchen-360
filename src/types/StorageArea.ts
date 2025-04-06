import { Position } from './Position';
import { ImageUrlMixin, ImageFileMixin } from './ImageUrlMixin';

/**
 * Available storage area types
 */
export type StorageAreaType = 'Cabinet' | 'Drawer' | 'Shelf' | 'Custom';

/**
 * Represents a storage area within a view (cabinet, drawer, shelf)
 */
export interface StorageArea extends ImageUrlMixin {
  /** Unique identifier for the storage area */
  id: string;
  /** ID of the view this storage area belongs to */
  viewId: string;
  /** Display name of the storage area */
  name: string;
  /** Type of storage area */
  type: StorageAreaType;
  /** Description of the storage area */
  description: string;
  /** Position coordinates of the storage area in the view */
  position: Position;
  /** Timestamp when the storage area was created */
  createdAt: Date;
  /** Timestamp when the storage area was last updated */
  updatedAt: Date;
}

/**
 * Data required to create a new storage area
 */
export interface StorageAreaCreationData extends ImageFileMixin {
  /** Display name for the new storage area */
  name: string;
  /** Type of storage area */
  type: StorageAreaType;
  /** Description of the storage area */
  description: string;
  /** Position coordinates for the new storage area */
  position: Position;
} 