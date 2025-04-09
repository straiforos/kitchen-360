import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StorageAreaStepper } from "../components/creation/RoomCreation/StorageAreaStepper";
import {
  Container,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Position } from "../types";
import { StorageAreaCreationData, StorageArea } from "../types/StorageArea";
import { IndexedDBStorage } from "../services/storage/indexedDB";

const storage = new IndexedDBStorage();

export const StorageAreaCreation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const position = location.state?.position as Position;
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async (area: Partial<StorageAreaCreationData>, image?: File) => {
    try {
      if (!area.name || !area.type || !area.description) {
        throw new Error("Missing required storage area fields");
      }

      let imageUrl = "./default-storage.jpg";
      if (image) {
        // Save the image to IndexedDB and get the URL
        const imageId = `image-${Date.now()}`;
        imageUrl = await storage.saveImage(imageId, image);
      }

      // Create new storage area
      const newArea: StorageArea = {
        id: `area-${Date.now()}`,
        viewId: "default-view", // We can hardcode this for now
        name: area.name,
        type: area.type,
        description: area.description,
        position: position || { yaw: 0, pitch: 0, zoom: 50 },
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to IndexedDB
      await storage.init();
      await storage.saveStorageArea(newArea);

      // Navigate back to viewer
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create storage area");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/")}
            size="large"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Add Storage Area</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <StorageAreaStepper 
            onComplete={handleComplete} 
            onCancel={handleCancel}
          />
        </Paper>
      </Container>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
