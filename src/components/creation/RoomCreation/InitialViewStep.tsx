import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { ViewCreationData } from '@types';
import { useViewCreation } from '@hooks/useViewCreation';

export const InitialViewStep: React.FC<{
  data?: ViewCreationData;
  onUpdate: (viewData: ViewCreationData) => void;
}> = ({ data, onUpdate }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { viewData, updateViewData } = useViewCreation();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        const updatedData = {
          ...viewData,
          imageFile: file,
        };
        updateViewData(updatedData);
        onUpdate(updatedData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field: keyof ViewCreationData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedData = {
      ...viewData,
      [field]: event.target.value,
    };
    updateViewData(updatedData);
    onUpdate(updatedData);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Upload 360° Image
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ mb: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {previewUrl && (
            <Paper
              elevation={3}
              sx={{
                p: 2,
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            </Paper>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="View Name"
            value={viewData.name}
            onChange={handleChange('name')}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={viewData.description}
            onChange={handleChange('description')}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </Box>
  );
}; 