import React from 'react';
import { useApp } from '../../context/useApp';
import {
  Drawer,
  List,
  Divider,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { IndexedDBStorage } from '../../services/storage/indexedDB';
import { Room } from '../../types';
import { Icon } from '../common/Icon';
import { NavItem } from '../common/NavItem';

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
        type: 'Custom',
        description: '',
        layoutType: 'Custom',
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
          <Icon type="add" />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {currentRoom && (
          <>
            <NavItem
              id={currentRoom.id}
              name={currentRoom.name}
              type="room"
              roomType={currentRoom.type}
              selected={true}
              onClick={() => handleRoomSelect(currentRoom.id)}
            />
            {currentRoom.views?.map(view => (
              <NavItem
                key={view.id}
                id={view.id}
                name={view.name}
                type="view"
                selected={currentView?.id === view.id}
                onClick={() => handleViewSelect(view.id)}
                indent
              />
            ))}
          </>
        )}
      </List>
    </Drawer>
  );
}; 