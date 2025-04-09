import React, { useEffect, useRef, useState } from "react";
import {
  Viewer as PhotoSphereViewer
} from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { Position } from "../../types";
import { StorageArea } from "../../types/StorageArea";
import { useNavigate } from "react-router-dom";
import "./Viewer.css";

interface ViewerProps {
  imageUrl: string;
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
        const storageArea = storageAreas.find((a) => a.id === marker.id);
        if (storageArea) {
          navigate(`/storage/${storageArea.id}`);
        }
      });
    }

    viewer.addEventListener("click", (e) => {
      const position: Position = {
        yaw: e.data.yaw,
        pitch: e.data.pitch,
        zoom: viewer.getZoomLevel()
      };
      navigate("/storage/create", { state: { position } });
    });

    return () => {
      viewer.destroy();
    };
  }, [imageUrl, storageAreas, navigate]);

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
    </div>
  );
};
