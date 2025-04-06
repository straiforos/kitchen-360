import { IndexedDBStorage } from '../indexedDB';

// Mock IDB interfaces
interface MockIDBDatabase extends Partial<IDBDatabase> {
  objectStoreNames: DOMStringList & { contains: jest.Mock };
  createObjectStore: jest.Mock;
  transaction: jest.Mock;
}

interface MockIDBRequest<T = unknown> {
  result: T | null;
  error: DOMException | null;
  source: null;
  readyState: 'pending' | 'done';
  onsuccess: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
  onupgradeneeded: ((event: IDBVersionChangeEvent) => void) | null;
}

interface MockObjectStore {
  get: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
  getAllKeys: jest.Mock;
}

const createMockRequest = <T = unknown>(result: T | null = null): MockIDBRequest<T> => {
  const request: MockIDBRequest<T> = {
    result,
    error: null,
    source: null,
    readyState: 'pending',
    onsuccess: null,
    onerror: null,
    onupgradeneeded: null,
  };
  return request;
};

describe('IndexedDBStorage', () => {
  let storage: IndexedDBStorage;
  let mockObjectStore: MockObjectStore;
  let mockDB: MockIDBDatabase;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create mock object store
    mockObjectStore = {
      get: jest.fn().mockImplementation(() => {
        const request = createMockRequest<{ key: string }>({ key: 'value' });
        setTimeout(() => {
          request.readyState = 'done';
          if (request.onsuccess) {
            const event = new Event('success');
            Object.defineProperty(event, 'target', { value: request });
            request.onsuccess(event);
          }
        }, 0);
        return request;
      }),
      put: jest.fn().mockImplementation(() => {
        const request = createMockRequest();
        setTimeout(() => {
          request.readyState = 'done';
          if (request.onsuccess) {
            const event = new Event('success');
            Object.defineProperty(event, 'target', { value: request });
            request.onsuccess(event);
          }
        }, 0);
        return request;
      }),
      delete: jest.fn().mockImplementation(() => {
        const request = createMockRequest();
        setTimeout(() => {
          request.readyState = 'done';
          if (request.onsuccess) {
            const event = new Event('success');
            Object.defineProperty(event, 'target', { value: request });
            request.onsuccess(event);
          }
        }, 0);
        return request;
      }),
      getAllKeys: jest.fn().mockImplementation(() => {
        const request = createMockRequest<string[]>(['key1', 'key2']);
        setTimeout(() => {
          request.readyState = 'done';
          if (request.onsuccess) {
            const event = new Event('success');
            Object.defineProperty(event, 'target', { value: request });
            request.onsuccess(event);
          }
        }, 0);
        return request;
      }),
    };

    // Create mock database
    mockDB = {
      objectStoreNames: {
        contains: jest.fn().mockReturnValue(false), // Return false to trigger store creation
        length: 1,
        item: jest.fn(),
        [Symbol.iterator]: jest.fn(),
      } as unknown as DOMStringList & { contains: jest.Mock },
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

    storage = new IndexedDBStorage();
  });

  it('should initialize the database', async () => {
    await expect(storage.init()).resolves.toBeUndefined();
    expect(mockDB.createObjectStore).toHaveBeenCalledWith('metadata');
  });

  it('should get metadata', async () => {
    await storage.init();
    const result = await storage.getMetadata('key');
    expect(result).toEqual({ key: 'value' });
    expect(mockObjectStore.get).toHaveBeenCalledWith('key');
  });

  it('should set metadata', async () => {
    await storage.init();
    await expect(storage.setMetadata('key', { key: 'value' })).resolves.toBeUndefined();
    expect(mockObjectStore.put).toHaveBeenCalledWith({ key: 'value' }, 'key');
  });

  it('should delete metadata', async () => {
    await storage.init();
    await expect(storage.deleteMetadata('key')).resolves.toBeUndefined();
    expect(mockObjectStore.delete).toHaveBeenCalledWith('key');
  });

  it('should get all keys', async () => {
    await storage.init();
    const keys = await storage.getAllKeys();
    expect(keys).toEqual(['key1', 'key2']);
    expect(mockObjectStore.getAllKeys).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    mockObjectStore.get.mockImplementation(() => {
      const request = createMockRequest();
      setTimeout(() => {
        request.error = new DOMException('Error');
        request.readyState = 'done';
        if (request.onerror) {
          const event = new Event('error');
          Object.defineProperty(event, 'target', { value: request });
          request.onerror(event);
        }
      }, 0);
      return request;
    });

    await storage.init();
    await expect(storage.getMetadata('key')).rejects.toThrow('Failed to get metadata');
  });
}); 