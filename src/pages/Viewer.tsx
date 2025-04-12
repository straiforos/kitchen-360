import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Viewer as PhotoSphereViewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import { StorageArea } from '../types/StorageArea';
import { Position } from '../types';

interface ViewerProps {
  imageUrl: string;
  storageAreas: StorageArea[];
}

export const Viewer: React.FC<ViewerProps> = ({
  imageUrl,
  storageAreas,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PhotoSphereViewer | null>(null);
  const markersPluginRef = useRef<MarkersPlugin | null>(null);

  // Initialize viewer
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
    markersPluginRef.current = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);

    return () => {
      viewer.destroy();
      viewerRef.current = null;
      markersPluginRef.current = null;
    };
  }, [imageUrl]);

  // Setup event listeners
  useEffect(() => {
    const viewer = viewerRef.current;
    const markersPlugin = markersPluginRef.current;

    if (!viewer || !markersPlugin) return;

    const handleMarkerSelect = (e: any) => {
      const storageArea = storageAreas.find((a) => a.id === e.marker.id);
      if (storageArea) {
        navigate(`/storage/${storageArea.id}`);
      }
    };

    const handleClick = (e: any) => {
      const position: Position = {
        yaw: e.data.yaw,
        pitch: e.data.pitch,
        zoom: viewer.getZoomLevel()
      };
      navigate("/storage/create", { state: { position } });
    };

    markersPlugin.addEventListener("select-marker", handleMarkerSelect);
    viewer.addEventListener("click", handleClick);

    return () => {
      markersPlugin.removeEventListener("select-marker", handleMarkerSelect);
      viewer.removeEventListener("click", handleClick);
    };
  }, [navigate, storageAreas]);

  // Update markers
  useEffect(() => {
    const markersPlugin = markersPluginRef.current;
    if (!markersPlugin) return;

    const storageAreaMarkers = storageAreas.map((area) => ({
      id: area.id,
      position: area.position,
      html: `<div class="storage-marker">${area.name}</div>`
    }));

    markersPlugin.clearMarkers();
    storageAreaMarkers.forEach((marker) => 
      markersPlugin.addMarker(marker)
    );
  }, [storageAreas]);

  return (
    <div className="viewer-container">
      <div
        ref={containerRef}
        data-testid="viewer-container"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}; 