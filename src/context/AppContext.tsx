import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { IndexedDBStorage } from '../services/storage/indexedDB';
import { AppState, Room, View } from '../types';

interface AppContextType {
  currentRoom: Room | null;
  currentView: View | null;
  setCurrentRoom: (room: Room | null) => void;
  setCurrentView: (view: View | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const storage = new IndexedDBStorage();

const initialState: AppState = {
  currentRoom: null,
  currentView: null,
};

type AppAction =
  | { type: 'SET_CURRENT_ROOM'; payload: Room | null }
  | { type: 'SET_CURRENT_VIEW'; payload: View | null };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoom: action.payload };
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const init = async () => {
      await storage.init();
    };
    init();
  }, []);

  const setCurrentRoom = (room: Room | null) => {
    dispatch({ type: 'SET_CURRENT_ROOM', payload: room });
  };

  const setCurrentView = (view: View | null) => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: view });
  };

  return (
    <AppContext.Provider
      value={{
        currentRoom: state.currentRoom,
        currentView: state.currentView,
        setCurrentRoom,
        setCurrentView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 