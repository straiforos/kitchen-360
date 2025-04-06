import { View, ViewCreationData } from './View';

/**
 * Represents a room containing multiple 360° views
 * @interface Room
 */
export interface Room {
  /** Unique identifier for the room */
  id: string;
  /** Display name of the room */
  name: string;
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
  /** Type of room (e.g., Kitchen, Living Room) */
  type: string;
  /** Description of the room */
  description: string;
  /** Layout type of the room */
  layoutType: string;
  /** Optional initial 360° view for the room */
  initialView?: ViewCreationData;
}

/**
 * Available room layout types
 * @typedef RoomLayoutType
 */
export type RoomLayoutType = 'L-shaped' | 'U-shaped' | 'Galley' | 'Island' | 'Open' | 'Custom';

/**
 * Available room types
 * @typedef RoomType
 */
export type RoomType = 'Kitchen' | 'Pantry' | 'Dining Room' | 'Living Room' | 'Custom'; 