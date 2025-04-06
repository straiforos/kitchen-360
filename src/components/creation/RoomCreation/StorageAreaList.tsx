import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { StorageArea } from "@types";
import { useStorageAreaCreation } from "@hooks/useStorageAreaCreation";

/**
 * Props for the StorageAreaList component
 */
interface StorageAreaListProps {
  /** Array of storage areas to display */
  storageAreas: StorageArea[];
  /** The currently selected storage area for editing */
  selectedAreaId: string | null;
  /** Callback when a storage area is selected for editing */
  onEditArea: (area: StorageArea) => void;
  /** Callback when a storage area is deleted */
  onDeleteArea: (areaId: string) => void;
}

/**
 * A component that displays a list of storage areas with edit and delete actions.
 * 
 * @component
 * @example
 * ```tsx
 * <StorageAreaList
 *   storageAreas={areas}
 *   selectedAreaId={editingArea?.id}
 *   onEditArea={handleEditArea}
 *   onDeleteArea={handleDeleteArea}
 * />
 * ```
 */
export const StorageAreaList: React.FC<StorageAreaListProps> = ({
  storageAreas,
  selectedAreaId,
  onEditArea,
  onDeleteArea,
}) => {
  const { updateStorageAreaData } = useStorageAreaCreation();

  const handleEdit = (area: StorageArea) => {
    updateStorageAreaData(area);
    onEditArea(area);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <List>
        {storageAreas.map((area) => (
          <ListItem
            key={area.id}
            sx={{
              bgcolor:
                selectedAreaId === area.id
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
                onClick={() => handleEdit(area)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteArea(area.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 