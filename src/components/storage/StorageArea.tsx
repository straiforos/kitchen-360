import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from '@mui/material';
import { StorageArea as StorageAreaType } from '../../types/StorageArea';

interface StorageAreaProps {
  area: StorageAreaType;
  onClose: () => void;
}

export const StorageArea: React.FC<StorageAreaProps> = ({ area, onClose }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ '& .MuiDialog-paper': { p: 3 } }}
    >
      <DialogTitle>{area.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <img 
            src={area.imageUrl} 
            alt={area.name} 
            style={{ 
              width: '100%', 
              height: 'auto',
              borderRadius: '8px'
            }} 
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Type: {area.type}
          </Typography>
        </Box>
        {area.description && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {area.description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}; 