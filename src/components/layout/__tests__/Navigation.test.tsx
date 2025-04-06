import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Navigation } from '../Navigation';
import { AppProvider } from '../../../context/AppContext';
import { useApp } from '../../../context/useApp';
import { IndexedDBStorage } from '../../../services/storage/indexedDB';
import { setupIndexedDBMock } from '../../../services/storage/__tests__/__mocks__/indexedDB';

// Mock the IndexedDB storage
jest.mock('../../../services/storage/indexedDB');
jest.mock('../../../context/useApp');
jest.mock('../../common/NavItem', () => ({
  NavItem: ({ onClick, name }: { onClick: () => void; name: string }) => (
    <div onClick={onClick} data-testid={`nav-item-${name}`}>
      {name}
    </div>
  ),
}));

describe('Navigation', () => {
  const mockStorage = {
    init: jest.fn().mockResolvedValue(undefined),
    setMetadata: jest.fn().mockResolvedValue(undefined),
    getMetadata: jest.fn().mockResolvedValue(null),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupIndexedDBMock();
    (IndexedDBStorage as jest.Mock).mockImplementation(() => mockStorage);
    (useApp as jest.Mock).mockReturnValue({
      currentRoom: null,
      currentView: null,
      setCurrentRoom: jest.fn(),
      setCurrentView: jest.fn(),
    });
  });

  it('renders the navigation drawer', () => {
    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );

    expect(screen.getByTestId('navigation-drawer')).toBeInTheDocument();
    expect(screen.getByText('Rooms')).toBeInTheDocument();
  });

  it('handles adding a new room', async () => {
    const setCurrentRoomMock = jest.fn();
    (useApp as jest.Mock).mockReturnValue({
      currentRoom: null,
      currentView: null,
      setCurrentRoom: setCurrentRoomMock,
      setCurrentView: jest.fn(),
    });

    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );

    const addButton = screen.getByLabelText('add new room');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockStorage.setMetadata).toHaveBeenCalledWith(
        expect.stringMatching(/^room-\d+$/),
        expect.objectContaining({
          name: 'New Room',
          type: 'Custom',
        })
      );
    });

    expect(setCurrentRoomMock).toHaveBeenCalled();
  });

  it('handles room selection', async () => {
    const mockRoom = {
      id: 'room-1',
      name: 'Test Room',
      type: 'Custom',
      description: '',
      layoutType: 'Custom',
      views: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const setCurrentRoomMock = jest.fn();
    (useApp as jest.Mock).mockReturnValue({
      currentRoom: mockRoom,
      currentView: null,
      setCurrentRoom: setCurrentRoomMock,
      setCurrentView: jest.fn(),
    });

    mockStorage.getMetadata.mockResolvedValueOnce(mockRoom);

    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );

    const roomItem = screen.getByTestId('nav-item-Test Room');
    fireEvent.click(roomItem);

    await waitFor(() => {
      expect(mockStorage.getMetadata).toHaveBeenCalledWith('room-1');
    });

    expect(setCurrentRoomMock).toHaveBeenCalledWith(mockRoom);
  });

  it('handles view selection', () => {
    const mockRoom = {
      id: 'room-1',
      name: 'Test Room',
      type: 'Custom',
      description: '',
      layoutType: 'Custom',
      views: [
        {
          id: 'view-1',
          name: 'Test View',
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockSetCurrentView = jest.fn();
    (useApp as jest.Mock).mockReturnValue({
      currentRoom: mockRoom,
      currentView: null,
      setCurrentRoom: jest.fn(),
      setCurrentView: mockSetCurrentView,
    });

    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );

    const viewItem = screen.getByTestId('nav-item-Test View');
    fireEvent.click(viewItem);

    expect(mockSetCurrentView).toHaveBeenCalledWith(mockRoom.views[0]);
  });

  it('displays error when room not found', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockStorage.getMetadata.mockResolvedValueOnce(null);

    const mockRoom = {
      id: 'room-1',
      name: 'Test Room',
      type: 'Custom',
      description: '',
      layoutType: 'Custom',
      views: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (useApp as jest.Mock).mockReturnValue({
      currentRoom: mockRoom,
      currentView: null,
      setCurrentRoom: jest.fn(),
      setCurrentView: jest.fn(),
    });

    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );

    const roomItem = screen.getByTestId('nav-item-Test Room');
    fireEvent.click(roomItem);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Room not found in storage');
    });

    consoleSpy.mockRestore();
  });
}); 