import { IndexedDBStorage } from '../indexedDB';
import { createMockIndexedDB } from '../../../components/__tests__/__mocks__/indexedDB';

describe('IndexedDBStorage', () => {
  let storage: IndexedDBStorage;
  let mockObjectStore: any;
  let mockDB: any;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    const { mockDB: db, mockObjectStore: store } = createMockIndexedDB();
    mockDB = db;
    mockObjectStore = store;

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
    const roomData = {
      id: 'test-room',
      name: 'Test Room',
      views: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await expect(storage.setMetadata('key', roomData)).resolves.toBeUndefined();
    expect(mockObjectStore.put).toHaveBeenCalledWith(roomData, 'key');
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
      const request = {
        result: null,
        error: new DOMException('Error'),
        source: null,
        readyState: 'done',
        onsuccess: null,
        onerror: jest.fn(),
        onupgradeneeded: null,
      };
      setTimeout(() => {
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