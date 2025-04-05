import React, { useReducer, useEffect, useMemo } from 'react';
import { appReducer, initialState } from './appReducer';
import { storage } from './storage';
import { AppContext, AppContextType } from './context';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const init = async () => {
      await storage.init();
    };
    init();
  }, []);

  const setCurrentRoom = (room: AppContextType['currentRoom']) => {
    dispatch({ type: 'SET_CURRENT_ROOM', payload: room });
  };

  const setCurrentView = (view: AppContextType['currentView']) => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: view });
  };

  const value = useMemo(() => ({
    currentRoom: state.currentRoom,
    currentView: state.currentView,
    setCurrentRoom,
    setCurrentView,
  }), [state.currentRoom, state.currentView]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
