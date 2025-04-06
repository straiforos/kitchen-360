import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppBar } from '../layout/AppBar';
import { createContext } from 'react';

// Create a mock AppContext
const AppContext = createContext({
  state: {
    currentView: null,
    rooms: [],
    selectedRoom: null,
  },
  dispatch: () => {},
});

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

const mockContextValue = {
  state: {
    currentView: null,
    rooms: [],
    selectedRoom: null,
  },
  dispatch: jest.fn(),
};

const MockAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppContext.Provider value={mockContextValue}>
    {children}
  </AppContext.Provider>
);

// Mock the useApp hook
jest.mock('../../context/AppContext', () => ({
  useApp: () => mockContextValue,
}));

describe('AppBar', () => {
  const mockOnModeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MockAppProvider>
        <AppBar mode="light" onModeChange={mockOnModeChange} />
      </MockAppProvider>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(
      <MockAppProvider>
        <AppBar mode="light" onModeChange={mockOnModeChange} />
      </MockAppProvider>
    );
    expect(screen.getByText('Kitchen 360° Organizer')).toBeInTheDocument();
  });

  it('shows light mode icon when in dark mode', () => {
    render(
      <MockAppProvider>
        <AppBar mode="dark" onModeChange={mockOnModeChange} />
      </MockAppProvider>
    );
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
  });

  it('shows dark mode icon when in light mode', () => {
    render(
      <MockAppProvider>
        <AppBar mode="light" onModeChange={mockOnModeChange} />
      </MockAppProvider>
    );
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
  });

  it('calls onModeChange when theme toggle button is clicked', () => {
    render(
      <MockAppProvider>
        <AppBar mode="light" onModeChange={mockOnModeChange} />
      </MockAppProvider>
    );
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(mockOnModeChange).toHaveBeenCalledTimes(1);
  });
}); 