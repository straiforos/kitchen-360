import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppBar } from '../AppBar';
import { AppProvider } from '../../../context/AppContext';
import { useApp } from '../../../context/useApp';
import { setupIndexedDBMock } from '../../../services/storage/__tests__/__mocks__/indexedDB';

// Mock the AppContext
jest.mock('../../../context/useApp');

describe('AppBar', () => {
  const defaultProps = {
    mode: 'light' as const,
    onModeChange: jest.fn(),
  };

  beforeEach(() => {
    setupIndexedDBMock();
    (useApp as jest.Mock).mockReturnValue({
      currentRoom: null,
    });
  });

  it('renders with default title when no room is selected', () => {
    render(
      <AppProvider>
        <AppBar {...defaultProps} />
      </AppProvider>
    );

    expect(screen.getByText('Kitchen 360° Organizer')).toBeInTheDocument();
  });

  it('renders with room name when a room is selected', () => {
    (useApp as jest.Mock).mockReturnValue({
      currentRoom: {
        id: 'room-1',
        name: 'Test Room',
        type: 'Custom',
        description: '',
        layoutType: 'Custom',
        views: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    render(
      <AppProvider>
        <AppBar {...defaultProps} />
      </AppProvider>
    );

    expect(screen.getByText('Test Room')).toBeInTheDocument();
  });

  it('calls onModeChange when the theme toggle button is clicked', () => {
    render(
      <AppProvider>
        <AppBar {...defaultProps} />
      </AppProvider>
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(defaultProps.onModeChange).toHaveBeenCalledTimes(1);
  });

  it('displays the correct icon based on the current mode', () => {
    const { rerender } = render(
      <AppProvider>
        <AppBar {...defaultProps} />
      </AppProvider>
    );

    // Check for light mode icon
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();

    // Rerender with dark mode
    rerender(
      <AppProvider>
        <AppBar {...defaultProps} mode="dark" />
      </AppProvider>
    );

    // Check for dark mode icon
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
  });
}); 