import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { StorageArea } from '../types/StorageArea';
import { IndexedDBStorage } from '../services/storage/indexedDB';

const storage = new IndexedDBStorage();

export const ViewStorageArea: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [storageArea, setStorageArea] = useState<StorageArea | null>(null);

  useEffect(() => {
    const loadStorageArea = async () => {
      if (!id) return;
      try {
        const area = await storage.getStorageArea(id);
        setStorageArea(area);
      } catch (error) {
        console.error('Failed to load storage area:', error);
        navigate('/');
      }
    };

    loadStorageArea();
  }, [id, navigate]);

  if (!storageArea) {
    return null;
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {storageArea.name}
        </Typography>
        <Typography variant="body1" paragraph>
          {storageArea.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/storage/${storageArea.id}/edit`)}
          >
            Edit Storage Area
          </Button>
        </Box>
      </Box>
    </>
  );
}; 