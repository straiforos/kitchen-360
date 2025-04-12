import React, { useReducer, useEffect, useMemo } from 'react';
import { appReducer, initialState } from './appReducer';
import { storage } from './storage';
import { AppContext, AppContextType } from './context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Room } from '../types/Room';
import { StorageArea } from '../types/StorageArea';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const init = async () => {
      await storage.init();
    };
    init();
  }, []);

  useEffect(() => {
    const loadStorageAreas = async () => {
      try {
        const areas = await storage.getAllStorageAreas();
        dispatch({ type: 'SET_STORAGE_AREAS', payload: areas });
      } catch (error) {
        console.error('Failed to load storage areas:', error);
      }
    };

    loadStorageAreas();
  }, []);

  const setCurrentRoom = (room: Room | null) => {
    dispatch({ type: 'SET_CURRENT_ROOM', payload: room });
  };

  const setCurrentView = (view: string) => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: view });
  };

  const toggleMode = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.mode,
        },
      }),
    [state.mode],
  );

  const value = useMemo(() => ({
    currentRoom: state.currentRoom,
    currentView: state.currentView,
    setCurrentRoom,
    setCurrentView,
    mode: state.mode,
    toggleMode,
    storageAreas: state.storageAreas,
  }), [state]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    </ThemeProvider>
  );
};
