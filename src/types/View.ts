import { Position } from './Position';
import { StorageArea } from './StorageArea';
import { ImageUrlMixin, ImageFileMixin } from './ImageUrlMixin';

/**
 * Available view connection types
 */
export type ViewConnectionType = 'door' | 'archway' | 'opening' | 'custom';

/**
 * Represents a connection between two views
 */
export interface ViewConnection {
  /** ID of the view this connection leads to */
  targetViewId: string;
  /** Position coordinates of the connection point */
  position: Position;
  /** Type of connection between views */
  type: ViewConnectionType;
}

/**
 * Represents a view within a room, containing information about a specific perspective
 * or vantage point in a 3D space.
 */
export interface View extends ImageUrlMixin {
  /** Unique identifier for the view */
  id: string;
  /** ID of the room this view belongs to */
  roomId: string;
  /** Display name of the view */
  name: string;
  /** Detailed description of what this view represents */
  description: string;
  /** Position coordinates of the view in 3D space */
  position: Position;
  /** Array of storage areas visible in this view */
  storageAreas: StorageArea[];
  /** Array of connections to other views */
  connections: ViewConnection[];
  /** Initial position when loading this view */
  initialPosition: Position;
  /** Timestamp when the view was created */
  createdAt: Date;
  /** Timestamp when the view was last updated */
  updatedAt: Date;
}

/**
 * Data required to create a new view.
 */
export interface ViewCreationData extends ImageFileMixin {
  /** Display name for the new view */
  name: string;
  /** Description of the new view */
  description: string;
  /** Position coordinates for the new view */
  position: Position;
  /** Initial position when loading this view */
  initialPosition: Position;
} 