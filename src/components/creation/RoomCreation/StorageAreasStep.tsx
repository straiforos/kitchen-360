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

interface StorageArea {
  id: string;
  name: string;
  type: "Cabinet" | "Drawer" | "Shelf" | "Custom";
  description: string;
  position?: {
    x: number;
    y: number;
  };
}

const storageTypes = ["Cabinet", "Drawer", "Shelf", "Custom"] as const;

interface StorageAreasStepProps {
  roomData: RoomCreationData;
  onUpdate: (updates: Partial<RoomCreationData>) => void;
}

export const StorageAreasStep: React.FC<StorageAreasStepProps> = ({
  roomData,
  onUpdate,
}) => {
  const [storageAreas, setStorageAreas] = useState<StorageArea[]>(
    roomData.storageAreas || []
  );
  const [editingArea, setEditingArea] = useState<StorageArea | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newArea, setNewArea] = useState<Partial<StorageArea>>({
    type: "Cabinet",
    name: "",
    description: "",
  });

  const handleAddArea = () => {
    setIsAdding(true);
    setNewArea({
      type: "Cabinet",
      name: "",
      description: "",
    });
  };

  const handleSaveNewArea = () => {
    if (newArea.name && newArea.type) {
      const area: StorageArea = {
        id: `storage-${Date.now()}`,
        name: newArea.name,
        type: newArea.type as StorageArea["type"],
        description: newArea.description || "",
      };
      const updatedAreas = [...storageAreas, area];
      setStorageAreas(updatedAreas);
      onUpdate({ storageAreas: updatedAreas });
      setIsAdding(false);
      setNewArea({
        type: "Cabinet",
        name: "",
        description: "",
      });
    }
  };

  const handleEditArea = (area: StorageArea) => {
    setEditingArea(area);
  };

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
                  <Grid xs={12}>
                    <Item>
                      <TextField
                        fullWidth
                        label="Name"
                        value={newArea.name}
                        onChange={(e) =>
                          setNewArea({ ...newArea, name: e.target.value })
                        }
                        required
                      />
                    </Item>
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
                            type: e.target.value as StorageArea["type"],
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
                          type: e.target.value as StorageArea["type"],
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
