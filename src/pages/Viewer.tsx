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
      markersPlugin.addEventListener("select-marker", ({ marker }: { marker: { id: string } }) => {
        const storageArea = storageAreas.find((a) => a.id === marker.id);
        if (storageArea) {
          navigate(`/storage/${storageArea.id}`);
        }
      });
    }

    viewer.addEventListener("click", (e: { data: { yaw: number; pitch: number } }) => {
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
    const markersPlugin = viewerRef.current.getPlugin<MarkersPlugin>(MarkersPlugin);
    if (markersPlugin) {      
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
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}; 