import { createContext } from 'react';
import { Room } from '../types/Room';
import { View } from '../types';
import { Marker } from '@photo-sphere-viewer/markers-plugin';
import { StorageArea } from '../types/StorageArea';

export interface AppContextType {
  currentRoom: Room | null;
  currentView: View | null;
  setCurrentRoom: (room: Room | null) => void;
  setCurrentView: (view: View | null) => void;
  marker: Marker[];
  mode: 'light' | 'dark';
  toggleMode: () => void;
  storageAreas: StorageArea[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined); 