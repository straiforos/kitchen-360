import { render } from '@testing-library/react';
import { Navigation } from '../layout/Navigation';
import { AppProvider } from '../../context/AppContext';

// Mock room data
const mockRoom = {
  id: 'kitchen',
  name: 'Kitchen',
  views: [
    { id: 'view1', name: 'View 1' },
    { id: 'view2', name: 'View 2' },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
} as const;

// Mock IDB interfaces
interface MockIDBDatabase extends Partial<IDBDatabase> {
  objectStoreNames: { contains: jest.Mock };
  createObjectStore: jest.Mock;
  transaction: jest.Mock;
}

interface MockIDBRequest {
  result: typeof mockRoom | MockIDBDatabase | null;
  error: DOMException | null;
  source: null;
  readyState: 'pending' | 'done';
  onsuccess: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
  onupgradeneeded: ((event: IDBVersionChangeEvent) => void) | null;
}

const createMockRequest = (): MockIDBRequest => {
  const request: MockIDBRequest = {
    result: null,
    error: null,
    source: null,
    readyState: 'pending',
    onsuccess: null,
    onerror: null,
    onupgradeneeded: null,
  };
  return request;
};

const mockObjectStore = {
  get: jest.fn().mockImplementation(() => {
    const request = createMockRequest();
    setTimeout(() => {
      request.result = mockRoom;
      request.readyState = 'done';
      if (request.onsuccess) {
        const event = new Event('success');
        Object.defineProperty(event, 'target', { value: request });
        request.onsuccess(event);
      }
    }, 0);
    return request;
  }),
  put: jest.fn().mockImplementation(() => createMockRequest()),
  delete: jest.fn().mockImplementation(() => createMockRequest()),
  getAllKeys: jest.fn().mockImplementation(() => createMockRequest()),
};

const mockDB = {
  objectStoreNames: {
    contains: jest.fn().mockReturnValue(true),
  },
  createObjectStore: jest.fn().mockReturnValue(mockObjectStore),
  transaction: jest.fn().mockReturnValue({
    objectStore: jest.fn().mockReturnValue(mockObjectStore),
  }),
};

// Mock the global indexedDB object
const mockIndexedDB = {
  open: jest.fn().mockImplementation(() => {
    const request = createMockRequest();
    request.result = mockDB;

    setTimeout(() => {
      if (request.onupgradeneeded) {
        const event = new Event('upgradeneeded') as IDBVersionChangeEvent;
        Object.defineProperty(event, 'target', { value: request });
        Object.defineProperty(event, 'oldVersion', { value: 0 });
        Object.defineProperty(event, 'newVersion', { value: 1 });
        request.onupgradeneeded(event);
      }
      if (request.onsuccess) {
        const event = new Event('success');
        Object.defineProperty(event, 'target', { value: request });
        request.onsuccess(event);
      }
    }, 0);

    return request;
  }),
  deleteDatabase: jest.fn(),
  cmp: jest.fn(),
  databases: jest.fn(),
} as unknown as IDBFactory;

Object.defineProperty(window, 'indexedDB', {
  value: mockIndexedDB,
  writable: true,
});

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    render(
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByTestId('navigation-drawer')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    expect(screen.getByText('Rooms')).toBeInTheDocument();
  });

  it('shows the add room button', () => {
    expect(screen.getByLabelText('add new room')).toBeInTheDocument();
  });

  it('displays the kitchen icon', () => {
    expect(screen.getByTestId('KitchenIcon')).toBeInTheDocument();
  });

  it('displays the room list', () => {
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('loads and displays room data when selecting a room', async () => {
    const roomButton = screen.getByText('Kitchen');
    fireEvent.click(roomButton);
    
    await waitFor(() => {
      expect(screen.getByText('View 1')).toBeInTheDocument();
      expect(screen.getByText('View 2')).toBeInTheDocument();
    });
  });
}); 