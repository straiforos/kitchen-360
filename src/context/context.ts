import { createContext } from 'react';
import { Room, View } from '../types';

export interface AppContextType {
  currentRoom: Room | null;
  currentView: View | null;
  setCurrentRoom: (room: Room | null) => void;
  setCurrentView: (view: View | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined); 