import React, { useState } from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { RoomCreationData } from "@types";
import { StorageArea, StorageAreaCreationData } from "@types";
import { StorageAreaList } from "./StorageAreaList";
import { StorageAreaForm } from "./StorageAreaForm";
import { useStorageAreaCreation } from "@hooks/useStorageAreaCreation";

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
  onUpdate,
}) => {
  /** State for managing the list of storage areas */
  const [storageAreas, setStorageAreas] = useState<StorageArea[]>([]);
  
  /** State for tracking which storage area is being edited */
  const [editingArea, setEditingArea] = useState<StorageArea | null>(null);
  
  /** State for tracking whether we're in "add new" mode */
  const [isAdding, setIsAdding] = useState(false);
  
  /** State for managing the new storage area being created */
  const { storageAreaData, updateStorageAreaData } = useStorageAreaCreation();

  /**
   * Handles the initiation of adding a new storage area
   * Resets the newArea state to default values
   */
  const handleAddArea = () => {
    setIsAdding(true);
    updateStorageAreaData({
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
  const handleSaveNewArea = (areaData: Partial<StorageAreaCreationData>) => {
    if (areaData.name && areaData.type && areaData.position) {
      const area: StorageArea = {
        id: `storage-${Date.now()}`,
        viewId: "", // This will be set when the view is created
        name: areaData.name,
        type: areaData.type,
        description: areaData.description ?? "",
        position: areaData.position,
        imageUrl: "", // This will be set when the image is uploaded
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedAreas = [...storageAreas, area];
      setStorageAreas(updatedAreas);
      onUpdate({ storageAreas: updatedAreas });
      setIsAdding(false);
    }
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
      setEditingArea(null);
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
                <StorageAreaForm
                  area={storageAreaData}
                  onSubmit={handleSaveNewArea}
                  onCancel={() => setIsAdding(false)}
                />
              </Box>
            )}
            <StorageAreaList
              storageAreas={storageAreas}
              selectedAreaId={editingArea?.id ?? null}
              onEditArea={setEditingArea}
              onDeleteArea={handleDeleteArea}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {editingArea && (
            <Paper sx={{ p: 2 }}>
              <StorageAreaForm
                area={editingArea}
                isEditMode
                onSubmit={handleUpdateArea}
                onCancel={() => setEditingArea(null)}
              />
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
