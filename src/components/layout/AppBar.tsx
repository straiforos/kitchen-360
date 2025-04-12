import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useApp } from '../../context/useApp';
import { useNavigate, useLocation } from 'react-router-dom';
import { StorageArea } from '../../types/StorageArea';

interface AppBarProps {
  title?: string;
  children?: React.ReactNode;
}

export const AppBar: React.FC<AppBarProps> = ({ 
  title,
  children 
}) => {
  const { currentRoom, mode, toggleMode, storageAreas } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const getTitle = () => {
    if (title) return title;
    if (location.pathname.startsWith('/storage/')) {
      const pathParts = location.pathname.split('/');
      if (pathParts[2] === 'create') return 'Create Storage Area';
      const storageAreaId = pathParts[2];
      if (!storageAreas) return 'View Storage Area';
      const storageArea = storageAreas.find((area: StorageArea) => area.id === storageAreaId);
      return storageArea ? storageArea.name : 'View Storage Area';
    }
    return currentRoom ? currentRoom.name : 'Kitchen 360° Organizer';
  };

  const shouldShowBackButton = location.pathname !== '/';
  const shouldShowHomeButton = !shouldShowBackButton;

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {shouldShowBackButton && (
            <Tooltip title="Go back">
              <IconButton 
                onClick={handleBackClick} 
                color="inherit"
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          {shouldShowHomeButton && (
            <Tooltip title="Go to home">
              <IconButton 
                onClick={handleHomeClick} 
                color="inherit"
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          {getTitle()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {children}
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}; 