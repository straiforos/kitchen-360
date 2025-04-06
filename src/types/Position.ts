/**
 * Represents a position in a 360° viewer, including orientation and zoom level
 * @interface Position
 */
export interface Position {
  /** Horizontal rotation in degrees (0-360) */
  longitude: number;
  /** Vertical rotation in degrees (-90 to 90) */
  latitude: number;
  /** Zoom level (0-100) */
  zoom: number;
} 