import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useApp } from '../../context/useApp';

interface AppBarProps {
  mode: 'light' | 'dark';
  onModeChange: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({ mode, onModeChange }) => {
  const { currentRoom } = useApp();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {currentRoom ? currentRoom.name : 'Kitchen 360° Organizer'}
        </Typography>
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton onClick={onModeChange} color="inherit">
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </MuiAppBar>
  );
}; 