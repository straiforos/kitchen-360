import { Room, View } from './';

/**
 * Represents the current state of the application
 * @interface AppState
 */
export interface AppState {
  /** Currently selected room, or null if no room is selected */
  currentRoom: Room | null;
  /** Currently selected view, or null if no view is selected */
  currentView: View | null;
} 