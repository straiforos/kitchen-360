import { AppState, Room, View, StorageArea } from '../types';

export interface AppState {
  currentRoom: Room | null;
  currentView: string;
  mode: 'light' | 'dark';
  storageAreas: StorageArea[];
}

export const initialState: AppState = {
  currentRoom: null,
  currentView: 'view',
  mode: 'light',
  storageAreas: [],
};

export type AppAction =
  | { type: 'SET_CURRENT_ROOM'; payload: Room | null }
  | { type: 'SET_CURRENT_VIEW'; payload: string }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_STORAGE_AREAS'; payload: StorageArea[] };

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoom: action.payload };
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' };
    case 'SET_STORAGE_AREAS':
      return { ...state, storageAreas: action.payload };
    default:
      return state;
  }
}; 