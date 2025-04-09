import React, { useEffect, useRef, useState } from "react";
import {
  Viewer as PhotoSphereViewer
} from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { Hotspot, Position } from "../../types";
import { StorageArea } from "../../types/StorageArea";
import { Dialog, DialogTitle, DialogContent, Typography, Box } from "@mui/material";
import { StorageArea as StorageAreaComponent } from "../storage/StorageArea";
import { useNavigate } from "react-router-dom";
import "./Viewer.css";

interface ViewerProps {
  imageUrl: string;
  // hotspots: Hotspot[];
  // onHotspotClick: (hotspot: Hotspot) => void;
  storageAreas: StorageArea[];
}

/**
 * Panorama Viewer with marker creation on click
 */
export const Viewer: React.FC<ViewerProps> = ({
  imageUrl,
  storageAreas,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PhotoSphereViewer | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [selectedStorageArea, setSelectedStorageArea] = useState<StorageArea | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new PhotoSphereViewer({
      container: containerRef.current,
      panorama: imageUrl,
      defaultZoomLvl: 50,
      navbar: [],
      plugins: [MarkersPlugin],
    });

    viewerRef.current = viewer;

    const markersPlugin = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);
    if (markersPlugin) {
      markersPlugin.addEventListener("select-marker", ({ marker }) => {
        const hotspot = hotspots.find((h) => h.id === marker.id);
        if (hotspot) {
          setSelectedHotspot(hotspot);
          onHotspotClick(hotspot);
        }
        
        const storageArea = storageAreas.find((a) => a.id === marker.id);
        if (storageArea) {
          setSelectedStorageArea(storageArea);
        }
      });
    }

    viewer.addEventListener("click", (e) => {
      const position: Position = {
        yaw: e.data.yaw,
        pitch: e.data.pitch,
        zoom: viewer.getZoomLevel()
      };
      // Navigate to storage area creation with the position
      navigate("/storage/create", { state: { position } });
    });

    return () => {
      viewer.destroy();
    };
  }, [
    imageUrl,
    storageAreas,
    navigate,
  ]);

  useEffect(() => {
    if (!viewerRef.current) return;
    const markersPlugin =
      viewerRef.current.getPlugin<MarkersPlugin>(MarkersPlugin);
    if (markersPlugin) {      
      // Add storage area markers
      const storageAreaMarkers = storageAreas?.map((area) => ({
        id: area.id,
        position: area.position,
        html: `<div class="storage-marker">${area.name}</div>`
      }));
      
      markersPlugin.clearMarkers();
      [...storageAreaMarkers].forEach((marker) => 
        markersPlugin.addMarker(marker)
      );
    }
  }, [storageAreas]);

  return (
    <div className="viewer-container">
      <div
        ref={containerRef}
        data-testid="viewer-container"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
      {selectedHotspot && (
        <Dialog
          open={!!selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
          maxWidth="md"
          fullWidth
          sx={{ '& .MuiDialog-paper': { p: 3 } }}
        >
          <DialogTitle>{selectedHotspot.name}</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <img 
                src={imageUrl} 
                alt={selectedHotspot.name} 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  borderRadius: '8px'
                }} 
              />
            </Box>
            {selectedHotspot.description && (
              <Typography variant="body1">
                {selectedHotspot.description}
              </Typography>
            )}
          </DialogContent>
        </Dialog>
      )}
      {selectedStorageArea && (
        <StorageAreaComponent
          area={selectedStorageArea}
          onClose={() => setSelectedStorageArea(null)}
        />
      )}
    </div>
  );
};
