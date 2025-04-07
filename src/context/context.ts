import { createContext } from 'react';
import { Room, View } from '../types';
import { Marker } from '@photo-sphere-viewer/markers-plugin';

export interface AppContextType {
  currentRoom: Room | null;
  currentView: View | null;
  setCurrentRoom: (room: Room | null) => void;
  setCurrentView: (view: View | null) => void;
  marker: Marker[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined); 