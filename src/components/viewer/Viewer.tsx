import React, { useEffect, useRef } from 'react';
import { Viewer as PhotoSphereViewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import { Hotspot, Position } from '../../types';

interface ViewerProps {
  imageUrl: string;
  position: Position;
  hotspots: Hotspot[];
  onPositionChange: (position: Position) => void;
  onHotspotClick: (hotspot: Hotspot) => void;
}

export const Viewer: React.FC<ViewerProps> = ({
  imageUrl,
  position,
  hotspots,
  onPositionChange,
  onHotspotClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PhotoSphereViewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new PhotoSphereViewer({
      container: containerRef.current,
      panorama: imageUrl,
      defaultZoomLvl: 50,
      defaultYaw: position.longitude,
      defaultPitch: position.latitude,
      navbar: [
        'zoom',
        'move',
        'download',
        'fullscreen',
      ],
      plugins: [
        [MarkersPlugin, {
          markers: hotspots.map(hotspot => ({
            id: hotspot.id,
            longitude: hotspot.position.longitude,
            latitude: hotspot.position.latitude,
            html: hotspot.name,
            anchor: 'bottom center',
            style: {
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '4px 8px',
              borderRadius: '4px',
            },
          })),
        }],
      ],
    });

    viewerRef.current = viewer;

    const handlePositionChange = () => {
      const viewerPosition = viewer.getPosition();
      onPositionChange({
        longitude: viewerPosition.yaw,
        latitude: viewerPosition.pitch,
        zoom: viewer.getZoomLevel(),
      });
    };

    viewer.addEventListener('position-updated', handlePositionChange);

    const markersPlugin = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);
    if (markersPlugin) {
      markersPlugin.addEventListener('select-marker', ({ marker }) => {
        const hotspot = hotspots.find(h => h.id === marker.id);
        if (hotspot) {
          onHotspotClick(hotspot);
        }
      });
    }

    return () => {
      viewer.destroy();
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!viewerRef.current) return;
    viewerRef.current.rotate({
      yaw: position.longitude,
      pitch: position.latitude,
    });
    viewerRef.current.zoom(position.zoom);
  }, [position]);

  useEffect(() => {
    if (!viewerRef.current) return;
    const markersPlugin = viewerRef.current.getPlugin<MarkersPlugin>(MarkersPlugin);
    if (markersPlugin) {
      const markers = hotspots.map(hotspot => ({
        id: hotspot.id,
        longitude: hotspot.position.longitude,
        latitude: hotspot.position.latitude,
        html: hotspot.name,
        anchor: 'bottom center',
        style: {
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '4px 8px',
          borderRadius: '4px',
        },
      }));
      markersPlugin.clearMarkers();
      markers.forEach(marker => markersPlugin.addMarker(marker));
    }
  }, [hotspots]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}; 