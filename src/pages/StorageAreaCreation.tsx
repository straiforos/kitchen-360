import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StorageAreaStepper } from '../components/creation/RoomCreation/StorageAreaStepper';
import { Container, Paper, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Position } from '../types';
import { StorageAreaCreationData } from '../types/StorageArea';

export const StorageAreaCreation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const position = location.state?.position as Position;

  const handleComplete = (area: Partial<StorageAreaCreationData>, _image?: File) => {
    // Here you would typically save the storage area data
    console.log('Creating storage area:', { ...area, position });
    // For now, we'll just go back to the viewer
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!position) {
    // If no position was provided, go back to the viewer
    navigate(-1);
    return null;
  }

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCancel} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Create Storage Area
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          <StorageAreaStepper
            onComplete={handleComplete}
            onCancel={handleCancel}
            initialArea={{ position }}
          />
        </Paper>
      </Container>
    </>
  );
}; 