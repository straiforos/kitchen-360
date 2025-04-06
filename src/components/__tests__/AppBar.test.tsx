import { render, screen, fireEvent } from '@testing-library/react';
import { AppBar } from '../layout/AppBar';
import { AppProvider } from '../../context/AppContext';
import { setupIndexedDBMock } from '../../services/storage/__tests__/__mocks__/indexedDB';

// Mock the useApp hook
jest.mock('../../context/useApp', () => ({
  useApp: () => ({
    currentRoom: null,
    currentView: null,
    setCurrentRoom: jest.fn(),
    setCurrentView: jest.fn(),
  }),
}));

describe('AppBar', () => {
  const mockOnModeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    setupIndexedDBMock();
  });

  it('renders without crashing', () => {
    render(
      <AppProvider>
        <AppBar mode="light" onModeChange={mockOnModeChange} />
      </AppProvider>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(
      <AppProvider>
        <AppBar mode="light" onModeChange={mockOnModeChange} />
      </AppProvider>
    );
    expect(screen.getByText('Kitchen 360° Organizer')).toBeInTheDocument();
  });

  it('shows light mode icon when in dark mode', () => {
    render(
      <AppProvider>
        <AppBar mode="dark" onModeChange={mockOnModeChange} />
      </AppProvider>
    );
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
  });

  it('shows dark mode icon when in light mode', () => {
    render(
      <AppProvider>
        <AppBar mode="light" onModeChange={mockOnModeChange} />
      </AppProvider>
    );
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
  });

  it('calls onModeChange when theme toggle button is clicked', () => {
    render(
      <AppProvider>
        <AppBar mode="light" onModeChange={mockOnModeChange} />
      </AppProvider>
    );
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(mockOnModeChange).toHaveBeenCalledTimes(1);
  });
}); 