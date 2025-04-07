import React, { useEffect, useRef } from "react";
import {
  Viewer as PhotoSphereViewer,
  ClickData
} from "@photo-sphere-viewer/core";
import { Marker, MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { Hotspot, Position } from "../../types";

interface ViewerProps {
  imageUrl: string;
  position: Position;
  hotspots: Hotspot[];
  markers: Marker[];
  onHotspotClick: (hotspot: Hotspot) => void;
  onClick: (data: ClickData) => void;
}

export const Viewer: React.FC<ViewerProps> = ({
  imageUrl,
  hotspots,
  onHotspotClick,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PhotoSphereViewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new PhotoSphereViewer({
      container: containerRef.current,
      panorama: imageUrl,
      defaultZoomLvl: 50,
      navbar: ["zoom", "move", "download", "fullscreen"],
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

    viewer.addEventListener("click", (e) => onClick(e.data));

    return () => {
      viewer.destroy();
    };
  }, [
    imageUrl,
    hotspots,
    onHotspotClick,
    onClick
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

  return (
    <div
      ref={containerRef}
      data-testid="viewer-container"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};
