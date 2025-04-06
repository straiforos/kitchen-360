import React from 'react';
import { useApp } from '../../context/useApp';
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
import { IndexedDBStorage } from '../../services/storage/indexedDB';
import { Room } from '../../types';

// Initialize the storage
const storage = new IndexedDBStorage();
storage.init();

export const Navigation: React.FC = () => {
  const { currentRoom, currentView, setCurrentRoom, setCurrentView } = useApp();

  const handleAddRoom = async () => {
    try {
      const newRoom: Room = {
        id: `room-${Date.now()}`,
        name: 'New Room',
        views: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await storage.setMetadata(newRoom.id, newRoom);
      setCurrentRoom(newRoom);
    } catch (error) {
      console.error('Error creating new room:', error);
    }
  };

  const handleRoomSelect = async (roomId: string) => {
    try {
      const room = await storage.getMetadata(roomId);
      if (room) {
        setCurrentRoom(room);
      } else {
        console.error('Room not found in storage');
      }
    } catch (error) {
      console.error('Error loading room data:', error);
    }
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
      data-testid="navigation-drawer"
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
        <IconButton color="primary" aria-label="add new room" onClick={handleAddRoom}>
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