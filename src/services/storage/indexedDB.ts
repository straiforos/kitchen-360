import { StorageArea } from '../../types/StorageArea';

const DB_NAME = 'kitchen360';
const DB_VERSION = 3;
const STORE_NAMES = {
  STORAGE_AREAS: 'storage-areas',
  IMAGES: 'images'
} as const;

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
        
        // Create storage areas store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAMES.STORAGE_AREAS)) {
          db.createObjectStore(STORE_NAMES.STORAGE_AREAS, { keyPath: 'id' });
        }
        
        // Create images store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAMES.IMAGES)) {
          db.createObjectStore(STORE_NAMES.IMAGES, { keyPath: 'id' });
        }
      };

      request.onblocked = () => {
        console.error('IndexedDB blocked - another instance is open');
        reject(new Error('IndexedDB is blocked by another instance'));
      };
    });

    return this.initPromise;
  }

  private async getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      throw new Error('Failed to initialize IndexedDB');
    }
    return this.db.transaction(storeName, mode).objectStore(storeName);
  }

  async saveStorageArea(area: StorageArea): Promise<void> {
    const store = await this.getStore(STORE_NAMES.STORAGE_AREAS, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(area);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to save storage area'));
    });
  }

  async getStorageArea(id: string): Promise<StorageArea | null> {
    const store = await this.getStore(STORE_NAMES.STORAGE_AREAS);
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(new Error('Failed to get storage area'));
    });
  }

  async getAllStorageAreas(): Promise<StorageArea[]> {
    const store = await this.getStore(STORE_NAMES.STORAGE_AREAS);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(new Error('Failed to get storage areas'));
    });
  }

  async saveImage(id: string, imageFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          // Ensure database is initialized
          if (!this.db) {
            await this.init();
          }
          if (!this.db) {
            reject(new Error('Failed to initialize database'));
            return;
          }

          const imageData = reader.result as ArrayBuffer;
          const blob = new Blob([imageData], { type: imageFile.type });
          const url = URL.createObjectURL(blob);
          
          const transaction = this.db.transaction(STORE_NAMES.IMAGES, 'readwrite');
          const store = transaction.objectStore(STORE_NAMES.IMAGES);
          
          const request = store.put({ id, data: imageData });
          
          request.onsuccess = () => {
            resolve(url);
          };
          
          request.onerror = () => {
            reject(new Error('Failed to save image'));
          };
        } catch (err) {
          reject(err);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      
      reader.readAsArrayBuffer(imageFile);
    });
  }

  async getImage(id: string): Promise<string | null> {
    const store = await this.getStore(STORE_NAMES.IMAGES);
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => {
        if (!request.result) {
          resolve(null);
          return;
        }
        const blob = new Blob([request.result.data], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        resolve(url);
      };
      request.onerror = () => reject(new Error('Failed to get image'));
    });
  }

  async deleteStorageArea(id: string): Promise<void> {
    const store = await this.getStore(STORE_NAMES.STORAGE_AREAS, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete storage area'));
    });
  }
} 