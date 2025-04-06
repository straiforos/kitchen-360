import React from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
} from "@mui/material";
import { StorageArea, StorageAreaType, StorageAreaCreationData } from "../../../types/StorageArea";

/**
 * Props for the StorageAreaForm component
 */
interface StorageAreaFormProps {
  /** The storage area being edited, or null if creating a new one */
  area: Partial<StorageAreaCreationData> | StorageArea;
  /** Whether the form is in edit mode */
  isEditMode?: boolean;
  /** Callback when the form is submitted */
  onSubmit: (area: Partial<StorageAreaCreationData>) => void;
  /** Callback when the form is cancelled */
  onCancel: () => void;
}

/**
 * Available storage area types for selection
 */
const storageTypes: StorageAreaType[] = ["Cabinet", "Drawer", "Shelf", "Custom"];

/**
 * A form component for creating or editing storage areas.
 * 
 * @component
 * @example
 * ```tsx
 * <StorageAreaForm
 *   area={newArea}
 *   onSubmit={handleSaveNewArea}
 *   onCancel={() => setIsAdding(false)}
 * />
 * ```
 */
export const StorageAreaForm: React.FC<StorageAreaFormProps> = ({
  area,
  isEditMode = false,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState(area);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="subtitle1" gutterBottom>
        {isEditMode ? "Edit Storage Area" : "New Storage Area"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              label="Type"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as StorageAreaType,
                })
              }
            >
              {storageTypes.map((type) => (
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
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!formData.name || !formData.type}
            >
              {isEditMode ? "Save Changes" : "Save"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}; 