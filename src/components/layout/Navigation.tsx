import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

export const Navigation: React.FC = () => {
  const { currentRoom, currentView, setCurrentRoom, setCurrentView } = useApp();

  const handleRoomSelect = (roomId: string) => {
    // TODO: Load room data from storage
    const room = {
      id: roomId,
      name: 'Kitchen',
      views: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCurrentRoom(room);
  };

  const handleViewSelect = (viewId: string) => {
    if (!currentRoom) return;
    const view = currentRoom.views.find(v => v.id === viewId);
    if (view) {
      setCurrentView(view);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Rooms</Typography>
        <IconButton color="primary" aria-label="add new room">
          <AddIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={currentRoom?.id === 'kitchen'}
            onClick={() => handleRoomSelect('kitchen')}
          >
            <ListItemIcon>
              <KitchenIcon />
            </ListItemIcon>
            <ListItemText primary="Kitchen" />
          </ListItemButton>
        </ListItem>
        {currentRoom?.id === 'kitchen' && (
          <List component="div" disablePadding>
            {currentRoom.views.map(view => (
              <ListItem key={view.id} disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  selected={currentView?.id === view.id}
                  onClick={() => handleViewSelect(view.id)}
                >
                  <ListItemIcon>
                    <ViewInArIcon />
                  </ListItemIcon>
                  <ListItemText primary={view.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </List>
    </Drawer>
  );
}; 