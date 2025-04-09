import { StorageArea } from '../../types/StorageArea';

const DB_NAME = 'kitchen360';
const DB_VERSION = 2;
const STORE_NAME = 'storage-areas';

export class IndexedDBStorage {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  async init(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onblocked = () => {
        console.error('IndexedDB blocked - another instance is open');
        reject(new Error('IndexedDB is blocked by another instance'));
      };
    });

    return this.initPromise;
  }

  private async getStore(mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      throw new Error('Failed to initialize IndexedDB');
    }
    return this.db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
  }

  async getStorageArea(id: string): Promise<StorageArea> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get storage area'));
    });
  }

  async getAllStorageAreas(): Promise<StorageArea[]> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get all storage areas'));
    });
  }

  async saveStorageArea(area: StorageArea): Promise<void> {
    const store = await this.getStore('readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(area);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to save storage area'));
    });
  }

  async deleteStorageArea(id: string): Promise<void> {
    const store = await this.getStore('readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete storage area'));
    });
  }
} 