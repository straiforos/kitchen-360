import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from './Navigation';
import { AppProvider } from '../../context/AppContext';

// Mock IndexedDB
const mockIndexedDB = {
  open: jest.fn().mockReturnValue({
    onupgradeneeded: null,
    onsuccess: null,
    onerror: null,
    result: {
      createObjectStore: jest.fn(),
      transaction: jest.fn().mockReturnValue({
        objectStore: jest.fn().mockReturnValue({
          put: jest.fn(),
          get: jest.fn(),
          delete: jest.fn(),
          getAllKeys: jest.fn(),
        }),
      }),
    },
  }),
};

// Mock the global indexedDB object
Object.defineProperty(window, 'indexedDB', {
  value: mockIndexedDB,
  writable: true,
});

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
    expect(screen.getByTestId('navigation-drawer')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
    expect(screen.getByText('Rooms')).toBeInTheDocument();
  });

  it('shows the add room button', () => {
    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
  });

  it('displays the kitchen icon', () => {
    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
    expect(screen.getByTestId('KitchenIcon')).toBeInTheDocument();
  });

  it('displays the room list', () => {
    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
}); 