import React from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Box,
} from '@mui/material';
import { RoomCreationData, RoomType, RoomLayoutType } from '../../../types/Room';

const roomTypes: RoomType[] = ['Kitchen', 'Pantry', 'Dining Room', 'Living Room', 'Custom'];
const layoutTypes: RoomLayoutType[] = ['L-shaped', 'U-shaped', 'Galley', 'Island', 'Open', 'Custom'];

export const RoomDetailsStep: React.FC<{
  data: RoomCreationData;
  onUpdate: (updates: Partial<RoomCreationData>) => void;
}> = ({ data, onUpdate }) => {
  const handleChange = (field: keyof RoomCreationData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    onUpdate({ [field]: event.target.value });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="room-name"
            label="Room Name"
            value={data.name}
            onChange={handleChange('name')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="room-type-label">Room Type</InputLabel>
            <Select
              id="room-type"
              labelId="room-type-label"
              value={data.type}
              label="Room Type"
              onChange={handleChange('type')}
            >
              {roomTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="layout-type-label">Layout Type</InputLabel>
            <Select
              id="layout-type"
              labelId="layout-type-label"
              value={data.layoutType}
              label="Layout Type"
              onChange={handleChange('layoutType')}
            >
              {layoutTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="room-description"
            label="Description"
            value={data.description}
            onChange={handleChange('description')}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </Box>
  );
}; 