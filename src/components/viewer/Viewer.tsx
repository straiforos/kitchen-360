import React, { useEffect, useRef, useState } from "react";
import {
  Viewer as PhotoSphereViewer
} from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { Hotspot, Position } from "../../types";
import { StorageAreaStepper } from "../creation/RoomCreation/StorageAreaStepper";
import { StorageAreaCreationData } from "../../types/StorageArea";
import { Dialog } from "@mui/material";
import "./Viewer.css";

interface ViewerProps {
  imageUrl: string;
  hotspots: Hotspot[];
  onHotspotClick: (hotspot: Hotspot) => void;
  onStorageAreaCreate: (position: Position) => void;
}

/**
 * Panorama Viewer with marker creation on click
 */
export const Viewer: React.FC<ViewerProps> = ({
  imageUrl,
  hotspots,
  onHotspotClick,
  onStorageAreaCreate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PhotoSphereViewer | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

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
          onHotspotClick(hotspot);
        }
      });
    }

    viewer.addEventListener("click", (e) => {
      const position: Position = {
        yaw: e.data.yaw,
        pitch: e.data.pitch,
        zoom: viewer.getZoomLevel()
      };
      setSelectedPosition(position);
    });

    return () => {
      viewer.destroy();
    };
  }, [
    imageUrl,
    hotspots,
    onHotspotClick,
  ]);

  useEffect(() => {
    if (!viewerRef.current) return;
    const markersPlugin =
      viewerRef.current.getPlugin<MarkersPlugin>(MarkersPlugin);
    if (markersPlugin) {
      const markers = hotspots?.map((hotspot) => ({
        id: hotspot.id,
        position: hotspot.position,
        type: hotspot.type,
        html: hotspot.html
      }));
      markersPlugin.clearMarkers();
      markers?.forEach((marker) => markersPlugin.addMarker(marker));
    }
  }, [hotspots]);

  const handleStorageAreaComplete = (area: Partial<StorageAreaCreationData>, _image?: File) => {
    if (selectedPosition && viewerRef.current) {      
      // Add marker to the viewer
      const markersPlugin = viewerRef.current.getPlugin<MarkersPlugin>(MarkersPlugin);
      if (markersPlugin) {
        markersPlugin.addMarker({
          id: `storage-${Date.now()}`,
          position: selectedPosition,
          html: `<div class="storage-marker">${area.name || 'Storage Area'}</div>`
        });
      }
    }
    setSelectedPosition(null);
  };

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
      <Dialog
        open={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
        maxWidth="md"
        fullWidth
        sx={{ '& .MuiDialog-paper': { p: 3 } }}
      >
        <StorageAreaStepper
          onComplete={handleStorageAreaComplete}
          onCancel={() => setSelectedPosition(null)}
          initialArea={selectedPosition ? { position: selectedPosition } : undefined}
        />
      </Dialog>
    </div>
  );
};
