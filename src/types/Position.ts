/**
 * Represents a position in 3D space, used for both views and storage areas
 */
export interface Position {
  /** Longitude coordinate (horizontal rotation) */
  longitude: number;
  /** Latitude coordinate (vertical rotation) */
  latitude: number;
  /** Zoom level */
  zoom: number;
} 