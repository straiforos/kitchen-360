import { Room, View } from './';

export interface AppState {
  currentRoom: Room | null;
  currentView: View | null;
} 