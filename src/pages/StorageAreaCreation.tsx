import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/useApp";
import { Position } from "../types";
import { IndexedDBStorage } from "../services/storage/indexedDB";
import { StorageArea, StorageAreaType } from "../types/StorageArea";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

const storage = new IndexedDBStorage();

export const StorageAreaCreation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentView } = useApp();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<StorageAreaType>("Custom");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const position = location.state?.position as Position;

  useEffect(() => {
    if (!position || !currentView) {
      navigate("/");
    }
  }, [position, currentView, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const storageArea: StorageArea = {
        id: crypto.randomUUID(),
        viewId: currentView!.id,
        name,
        type,
        description,
        position,
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (image) {
        const imageUrl = await storage.saveImage(storageArea.id, image);
        storageArea.imageUrl = imageUrl;
      }

      await storage.saveStorageArea(storageArea);
      navigate("/");
    } catch (err) {
      setError("Failed to create storage area");
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value as StorageAreaType)}
          required
          margin="normal"
        >
          <MenuItem value="Cabinet">Cabinet</MenuItem>
          <MenuItem value="Drawer">Drawer</MenuItem>
          <MenuItem value="Shelf">Shelf</MenuItem>
          <MenuItem value="Custom">Custom</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          style={{ margin: "16px 0" }}
        />
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!name || !position || !currentView}
        >
          Create Storage Area
        </Button>
      </form>
    </Box>
  );
};
