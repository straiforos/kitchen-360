import { IndexedDBStorage } from '../indexedDB';
import { StorageArea, StorageAreaType } from '../../../types/StorageArea';

// Mock the global indexedDB
const mockIndexedDB = {
  open: jest.fn(),
};

Object.defineProperty(window, 'indexedDB', {
  value: mockIndexedDB,
  writable: true,
});

// Mock URL.createObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  value: jest.fn().mockReturnValue('mock-url'),
  writable: true,
});

describe('IndexedDBStorage', () => {
  let storage: IndexedDBStorage;
  let mockDB: IDBDatabase;
  let mockTransaction: IDBTransaction;
  let mockObjectStore: IDBObjectStore;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create mock objects
    mockObjectStore = {
      put: jest.fn().mockImplementation(() => {
        const request = {
          onerror: null,
          onsuccess: null,
          result: undefined,
        } as unknown as IDBRequest;
        setTimeout(() => {
          if (request.onsuccess) {
            request.onsuccess(new Event('success') as Event);
          }
        }, 0);
        return request;
      }),
      get: jest.fn().mockImplementation(() => {
        const request = {
          onerror: null,
          onsuccess: null,
          result: { data: new ArrayBuffer(8) },
        } as unknown as IDBRequest;
        setTimeout(() => {
          if (request.onsuccess) {
            request.onsuccess(new Event('success') as Event);
          }
        }, 0);
        return request;
      }),
      getAll: jest.fn().mockImplementation(() => {
        const request = {
          onerror: null,
          onsuccess: null,
          result: [],
        } as unknown as IDBRequest;
        setTimeout(() => {
          if (request.onsuccess) {
            request.onsuccess(new Event('success') as Event);
          }
        }, 0);
        return request;
      }),
      delete: jest.fn().mockImplementation(() => {
        const request = {
          onerror: null,
          onsuccess: null,
          result: undefined,
        } as unknown as IDBRequest;
        setTimeout(() => {
          if (request.onsuccess) {
            request.onsuccess(new Event('success') as Event);
          }
        }, 0);
        return request;
      }),
    } as unknown as IDBObjectStore;

    mockTransaction = {
      objectStore: jest.fn().mockReturnValue(mockObjectStore),
    } as unknown as IDBTransaction;

    mockDB = {
      transaction: jest.fn().mockReturnValue(mockTransaction),
      createObjectStore: jest.fn(),
      objectStoreNames: {
        contains: jest.fn().mockReturnValue(false),
      },
    } as unknown as IDBDatabase;

    // Setup mock indexedDB.open
    mockIndexedDB.open.mockImplementation(() => {
      const request = {
        onerror: null,
        onsuccess: null,
        onupgradeneeded: null,
        result: mockDB,
      } as unknown as IDBOpenDBRequest;

      // First trigger onupgradeneeded
      setTimeout(() => {
        if (request.onupgradeneeded) {
          const event = new Event('upgradeneeded') as IDBVersionChangeEvent;
          Object.defineProperty(event, 'target', { value: { result: mockDB } });
          request.onupgradeneeded(event);
        }
      }, 0);

      // Then trigger onsuccess
      setTimeout(() => {
        if (request.onsuccess) {
          const event = new Event('success') as Event;
          request.onsuccess(event);
        }
      }, 0);

      return request;
    });

    storage = new IndexedDBStorage();
  });

  it('should initialize the database', async () => {
    await expect(storage.init()).resolves.toBeUndefined();
    expect(mockDB.createObjectStore).toHaveBeenCalledWith('storage-areas', { keyPath: 'id' });
    expect(mockDB.createObjectStore).toHaveBeenCalledWith('images', { keyPath: 'id' });
  });

  it('should save and get storage area', async () => {
    const mockArea: StorageArea = {
      id: 'test-area',
      viewId: 'test-view',
      name: 'Test Area',
      type: 'Cabinet' as StorageAreaType,
      description: 'Test Description',
      position: { yaw: 0, pitch: 0, zoom: 1 },
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'test-url',
    };

    await storage.init();
    await storage.saveStorageArea(mockArea);
    expect(mockObjectStore.put).toHaveBeenCalledWith(mockArea);

    await storage.getStorageArea('test-area');
    expect(mockObjectStore.get).toHaveBeenCalledWith('test-area');
  });

  it('should get all storage areas', async () => {
    await storage.init();
    await storage.getAllStorageAreas();
    expect(mockObjectStore.getAll).toHaveBeenCalled();
  });

  it('should save and get image', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockImageData = new ArrayBuffer(8);
    
    // Mock FileReader
    const mockFileReader = {
      readAsArrayBuffer: jest.fn().mockImplementation(function(this: FileReader) {
        setTimeout(() => {
          if (this.onload) {
            const event = new Event('load') as ProgressEvent<FileReader>;
            Object.defineProperty(event, 'target', { value: { result: mockImageData } });
            this.onload(event);
          }
        }, 0);
      }),
      result: mockImageData,
      onload: null,
      EMPTY: 0,
      LOADING: 1,
      DONE: 2,
    } as unknown as FileReader;

    global.FileReader = jest.fn(() => mockFileReader) as unknown as typeof FileReader;

    await storage.init();
    await storage.saveImage('test-image', mockFile);
    expect(mockObjectStore.put).toHaveBeenCalled();

    const result = await storage.getImage('test-image');
    expect(mockObjectStore.get).toHaveBeenCalledWith('test-image');
    expect(result).toBe('mock-url');
  });

  it('should delete storage area', async () => {
    await storage.init();
    await storage.deleteStorageArea('test-area');
    expect(mockObjectStore.delete).toHaveBeenCalledWith('test-area');
  });

  it('should handle errors', async () => {
    const mockRequest = {
      onerror: jest.fn(),
      onsuccess: null,
      result: undefined,
    } as unknown as IDBRequest;

    (mockObjectStore.get as jest.Mock).mockReturnValue(mockRequest);

    await storage.init();
    
    // Create a promise that will reject when the error event is triggered
    const errorPromise = new Promise(() => {
      setTimeout(() => {
        if (mockRequest.onerror) {
          const event = new Event('error') as Event;
          Object.defineProperty(event, 'target', { value: mockRequest });
          mockRequest.onerror(event);
        }
      }, 0);
    });

    await expect(Promise.race([
      storage.getStorageArea('test-area'),
      errorPromise,
    ])).rejects.toThrow('Failed to get storage area');
  });
}); 