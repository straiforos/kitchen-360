import { Position } from './Position';

/**
 * Represents a view within a room, containing information about a specific perspective
 * or vantage point in a 3D space.
 */
export interface View {
  /** Unique identifier for the view */
  id: string;
  /** ID of the room this view belongs to */
  roomId: string;
  /** Display name of the view */
  name: string;
  /** Detailed description of what this view represents */
  description: string;
  /** URL to the image associated with this view */
  imageUrl: string;
  /** Position coordinates of the view in 3D space */
  position: Position;
  /** Array of connections to other views */
  connections: ViewConnection[];
  /** Timestamp when the view was created */
  createdAt: Date;
  /** Timestamp when the view was last updated */
  updatedAt: Date;
}

/**
 * Data required to create a new view.
 */
export interface ViewCreationData {
  /** Display name for the new view */
  name: string;
  /** Description of the new view */
  description: string;
  /** Image file to be associated with the view */
  imageFile: File;
  /** Position coordinates for the new view */
  position: Position;
}

/**
 * Represents a connection between two views, defining how they are linked
 * in the 3D space.
 */
export interface ViewConnection {
  /** ID of the view this connection leads to */
  targetViewId: string;
  /** Position coordinates of the connection point */
  position: Position;
  /** Type of connection between views */
  type: 'door' | 'archway' | 'opening' | 'custom';
} 