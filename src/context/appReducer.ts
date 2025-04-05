import { AppState, Room, View } from '../types';

export type AppAction =
  | { type: 'SET_CURRENT_ROOM'; payload: Room | null }
  | { type: 'SET_CURRENT_VIEW'; payload: View | null };

export const initialState: AppState = {
  currentRoom: null,
  currentView: null,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoom: action.payload };
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    default:
      return state;
  }
} 