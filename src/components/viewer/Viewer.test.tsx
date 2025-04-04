import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Viewer } from './Viewer';
import { Position, Hotspot } from '../../types';

// Mock the PhotoSphereViewer and its plugins
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();
const mockDestroy = jest.fn();
const mockRotate = jest.fn();
const mockZoom = jest.fn();
const mockGetPlugin = jest.fn();
const mockGetPosition = jest.fn().mockReturnValue({
  yaw: 0,
  pitch: 0,
});
const mockGetZoomLevel = jest.fn().mockReturnValue(50);

jest.mock('@photo-sphere-viewer/core', () => {
  return {
    Viewer: jest.fn().mockImplementation(() => ({
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      destroy: mockDestroy,
      rotate: mockRotate,
      zoom: mockZoom,
      getPlugin: mockGetPlugin,
      getPosition: mockGetPosition,
      getZoomLevel: mockGetZoomLevel,
    })),
  };
});

jest.mock('@photo-sphere-viewer/markers-plugin', () => {
  return {
    MarkersPlugin: jest.fn(),
  };
});

describe('Viewer', () => {
  const mockPosition: Position = {
    longitude: 0,
    latitude: 0,
    zoom: 50,
  };

  const mockHotspots: Hotspot[] = [
    {
      id: '1',
      name: 'Test Hotspot',
      position: {
        longitude: 0,
        latitude: 0,
        zoom: 50,
      },
    },
  ];

  const mockOnPositionChange = jest.fn();
  const mockOnHotspotClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetPosition.mockReturnValue({
      yaw: 0,
      pitch: 0,
    });
    mockGetZoomLevel.mockReturnValue(50);
  });

  it('renders without crashing', () => {
    render(
      <Viewer
        imageUrl="test.jpg"
        position={mockPosition}
        hotspots={mockHotspots}
        onPositionChange={mockOnPositionChange}
        onHotspotClick={mockOnHotspotClick}
      />
    );
    expect(screen.getByTestId('viewer-container')).toBeInTheDocument();
  });

  it('calls onPositionChange when position changes', () => {
    render(
      <Viewer
        imageUrl="test.jpg"
        position={mockPosition}
        hotspots={mockHotspots}
        onPositionChange={mockOnPositionChange}
        onHotspotClick={mockOnHotspotClick}
      />
    );

    // Get the position change callback
    const positionChangeCallback = mockAddEventListener.mock.calls.find(
      call => call[0] === 'position-updated'
    )[1];

    // Simulate position change
    const newPosition = {
      yaw: 45,
      pitch: 30,
      zoom: 60,
    };

    mockGetPosition.mockReturnValue({
      yaw: newPosition.yaw,
      pitch: newPosition.pitch,
    });
    mockGetZoomLevel.mockReturnValue(newPosition.zoom);

    positionChangeCallback();

    expect(mockOnPositionChange).toHaveBeenCalledWith({
      longitude: newPosition.yaw,
      latitude: newPosition.pitch,
      zoom: newPosition.zoom,
    });
  });

  it('updates position when props change', () => {
    const { rerender } = render(
      <Viewer
        imageUrl="test.jpg"
        position={mockPosition}
        hotspots={mockHotspots}
        onPositionChange={mockOnPositionChange}
        onHotspotClick={mockOnHotspotClick}
      />
    );

    const newPosition = {
      longitude: 45,
      latitude: 30,
      zoom: 60,
    };

    rerender(
      <Viewer
        imageUrl="test.jpg"
        position={newPosition}
        hotspots={mockHotspots}
        onPositionChange={mockOnPositionChange}
        onHotspotClick={mockOnHotspotClick}
      />
    );

    expect(mockRotate).toHaveBeenCalledWith({
      yaw: newPosition.longitude,
      pitch: newPosition.latitude,
    });
    expect(mockZoom).toHaveBeenCalledWith(newPosition.zoom);
  });
}); 