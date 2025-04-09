import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StorageArea } from "../types/StorageArea";
import { IndexedDBStorage } from "../services/storage/indexedDB";

const storage = new IndexedDBStorage();

export const ViewStorageArea: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [storageArea, setStorageArea] = useState<StorageArea | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStorageArea = async () => {
      try {
        if (!id) {
          throw new Error("No storage area ID provided");
        }
        await storage.init();
        const area = await storage.getStorageArea(id);
        if (!area) {
          throw new Error("Storage area not found");
        }

        // If the image URL is a blob URL, try to load it from IndexedDB
        if (area.imageUrl.startsWith('blob:')) {
          const imageId = area.imageUrl.split('/').pop();
          if (imageId) {
            const imageUrl = await storage.getImage(imageId);
            if (imageUrl) {
              area.imageUrl = imageUrl;
            }
          }
        }

        setStorageArea(area);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load storage area");
      }
    };

    loadStorageArea();
  }, [id]);

  if (error) {
    return (
      <Container>
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!storageArea) {
    return null;
  }

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
          <Typography variant="h6">{storageArea.name}</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <img
              src={storageArea.imageUrl}
              alt={storageArea.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </Box>
          <Typography variant="h6" gutterBottom>
            {storageArea.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Type: {storageArea.type}
          </Typography>
          {storageArea.description && (
            <Typography variant="body1" paragraph>
              {storageArea.description}
            </Typography>
          )}
        </Paper>
      </Container>
    </>
  );
}; 