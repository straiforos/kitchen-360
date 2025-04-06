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

export const createMockIndexedDB = () => {
  const mockObjectStore: MockObjectStore = {
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

  const mockDB: MockIDBDatabase = {
    objectStoreNames: {
      contains: jest.fn().mockReturnValue(false),
      length: 1,
      item: jest.fn(),
      [Symbol.iterator]: jest.fn(),
    } as unknown as DOMStringList & { contains: jest.Mock },
    createObjectStore: jest.fn().mockReturnValue(mockObjectStore),
    transaction: jest.fn().mockReturnValue({
      objectStore: jest.fn().mockReturnValue(mockObjectStore),
    }),
  };

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

  return {
    mockIndexedDB,
    mockDB,
    mockObjectStore,
  };
};

export const setupIndexedDBMock = () => {
  const { mockIndexedDB } = createMockIndexedDB();
  Object.defineProperty(window, 'indexedDB', {
    value: mockIndexedDB,
    writable: true,
  });
  return mockIndexedDB;
}; 