/**
 * Mixin interface for entities that have an image URL
 */
export interface ImageUrlMixin {
  /** URL to the image associated with this entity */
  imageUrl: string;
}

/**
 * Mixin interface for entities that have an image file during creation
 */
export interface ImageFileMixin {
  /** Image file to be associated with this entity */
  imageFile: File;
} 