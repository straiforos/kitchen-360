import { View, ViewCreationData } from './View';

/**
 * Available room layout types
 */
export type RoomLayoutType = 'L-shaped' | 'U-shaped' | 'Galley' | 'Island' | 'Open' | 'Custom';

/**
 * Available room types
 */
export type RoomType = 'Kitchen' | 'Pantry' | 'Dining Room' | 'Living Room' | 'Custom';

/**
 * Represents a room containing multiple 360° views
 * @interface Room
 */
export interface Room {
  /** Unique identifier for the room */
  id: string;
  /** Display name of the room */
  name: string;
  /** Type of room (e.g., Kitchen, Pantry) */
  type: RoomType;
  /** Description of the room */
  description: string;
  /** Layout type of the room */
  layoutType: RoomLayoutType;
  /** Array of 360° views associated with this room */
  views: View[];
  /** Timestamp when the room was created */
  createdAt: Date;
  /** Timestamp when the room was last updated */
  updatedAt: Date;
}

/**
 * Data required to create a new room
 * @interface RoomCreationData
 */
export interface RoomCreationData {
  /** Name of the room */
  name: string;
  /** Type of room (e.g., Kitchen, Pantry) */
  type: RoomType;
  /** Description of the room */
  description: string;
  /** Layout type of the room */
  layoutType: RoomLayoutType;
  /** Optional initial 360° view for the room */
  initialView?: ViewCreationData;
} 