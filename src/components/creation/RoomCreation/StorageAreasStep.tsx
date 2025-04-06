import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { RoomCreationData } from "../../../types/Room";
import { StorageArea, StorageAreaType, StorageAreaCreationData } from "../../../types/StorageArea";

/**
 * Available storage area types for selection
 */
const storageTypes: StorageAreaType[] = ["Cabinet", "Drawer", "Shelf", "Custom"];

/**
 * Props for the StorageAreasStep component
 */
interface StorageAreasStepProps {
  /** The current room creation data */
  roomData: RoomCreationData;
  /** Callback function to update the room creation data */
  onUpdate: (updates: Partial<RoomCreationData>) => void;
}

/**
 * A step component for managing storage areas during room creation.
 * 
 * This component allows users to:
 * - Add new storage areas (cabinets, drawers, shelves, etc.)
 * - Edit existing storage areas
 * - Delete storage areas
 * - Specify storage area properties (name, type, description)
 * 
 * The component maintains its own state for the list of storage areas
 * and communicates changes back to the parent through the onUpdate callback.
 * 
 * @component
 * @example
 * ```tsx
 * <StorageAreasStep
 *   roomData={roomData}
 *   onUpdate={(updates) => handleRoomUpdate(updates)}
 * />
 * ```
 */
export const StorageAreasStep: React.FC<StorageAreasStepProps> = ({
  roomData,
  onUpdate,
}) => {
  /** State for managing the list of storage areas */
  const [storageAreas, setStorageAreas] = useState<StorageArea[]>([]);
  
  /** State for tracking which storage area is being edited */
  const [editingArea, setEditingArea] = useState<StorageArea | null>(null);
  
  /** State for tracking whether we're in "add new" mode */
  const [isAdding, setIsAdding] = useState(false);
  
  /** State for managing the new storage area being created */
  const [newArea, setNewArea] = useState<Partial<StorageAreaCreationData>>({
    type: "Cabinet",
    name: "",
    description: "",
    position: { longitude: 0, latitude: 0, zoom: 1 },
  });

  /**
   * Handles the initiation of adding a new storage area
   * Resets the newArea state to default values
   */
  const handleAddArea = () => {
    setIsAdding(true);
    setNewArea({
      type: "Cabinet",
      name: "",
      description: "",
      position: { longitude: 0, latitude: 0, zoom: 1 },
    });
  };

  /**
   * Handles saving a new storage area
   * Creates a new StorageArea object with a unique ID and current timestamp
   * Updates the storage areas list and notifies the parent component
   */
  const handleSaveNewArea = () => {
    if (newArea.name && newArea.type && newArea.position) {
      const area: StorageArea = {
        id: `storage-${Date.now()}`,
        viewId: "", // This will be set when the view is created
        name: newArea.name,
        type: newArea.type,
        description: newArea.description ?? "",
        position: newArea.position,
        imageUrl: "", // This will be set when the image is uploaded
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedAreas = [...storageAreas, area];
      setStorageAreas(updatedAreas);
      onUpdate({ storageAreas: updatedAreas });
      setIsAdding(false);
      setNewArea({
        type: "Cabinet",
        name: "",
        description: "",
        position: { longitude: 0, latitude: 0, zoom: 1 },
      });
    }
  };

  /**
   * Handles initiating the edit of an existing storage area
   * @param area - The storage area to edit
   */
  const handleEditArea = (area: StorageArea) => {
    setEditingArea(area);
  };

  /**
   * Handles updating an existing storage area
   * @param updates - Partial object containing the properties to update
   */
  const handleUpdateArea = (updates: Partial<StorageArea>) => {
    if (editingArea) {
      const updatedArea = { ...editingArea, ...updates };
      const updatedAreas = storageAreas.map((area) =>
        area.id === editingArea.id ? updatedArea : area
      );
      setStorageAreas(updatedAreas);
      onUpdate({ storageAreas: updatedAreas });
    }
  };

  /**
   * Handles deleting a storage area
   * @param areaId - The ID of the storage area to delete
   */
  const handleDeleteArea = (areaId: string) => {
    const updatedAreas = storageAreas.filter((area) => area.id !== areaId);
    setStorageAreas(updatedAreas);
    onUpdate({ storageAreas: updatedAreas });
    if (editingArea?.id === areaId) {
      setEditingArea(null);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Storage Areas
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddArea}
                disabled={isAdding}
              >
                Add Storage Area
              </Button>
            </Box>
            {isAdding && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  New Storage Area
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={newArea.name}
                      onChange={(e) =>
                        setNewArea({ ...newArea, name: e.target.value })
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={newArea.type}
                        label="Type"
                        onChange={(e) =>
                          setNewArea({
                            ...newArea,
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
                      value={newArea.description}
                      onChange={(e) =>
                        setNewArea({ ...newArea, description: e.target.value })
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
                      <Button onClick={() => setIsAdding(false)}>Cancel</Button>
                      <Button
                        variant="contained"
                        onClick={handleSaveNewArea}
                        disabled={!newArea.name || !newArea.type}
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            <List>
              {storageAreas.map((area) => (
                <ListItem
                  key={area.id}
                  sx={{
                    bgcolor:
                      editingArea?.id === area.id
                        ? "action.selected"
                        : "transparent",
                  }}
                >
                  <ListItemText
                    primary={area.name}
                    secondary={`${area.type} - ${
                      area.description || "No description"
                    }`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditArea(area)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteArea(area.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {editingArea && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Edit Storage Area
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={editingArea.name}
                    onChange={(e) => handleUpdateArea({ name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={editingArea.type}
                      label="Type"
                      onChange={(e) =>
                        handleUpdateArea({
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
                    value={editingArea.description}
                    onChange={(e) =>
                      handleUpdateArea({ description: e.target.value })
                    }
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={() => setEditingArea(null)}>Done</Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}
          {!editingArea && !isAdding && (
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                Select a storage area to edit or add a new one
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
