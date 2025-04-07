import { SphericalPosition } from "@photo-sphere-viewer/core";

/**
 * Represents a position in 3D space, used for both views and storage areas
 */
export interface Position extends SphericalPosition {
  /** Zoom level */
  zoom?: number;
} 