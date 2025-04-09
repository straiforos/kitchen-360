import { useEffect, useState } from 'react';
import { IndexedDBStorage } from '../services/storage/indexedDB';
import { Room } from '../types';

const storage = new IndexedDBStorage();

export const useStorage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    storage.init()
      .then(() => setIsInitialized(true))
      .catch(setError);
  }, []);

  const saveRoom = async (roomId: string, room: Room) => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }
    return storage.setMetadata(roomId, room);
  };

  const getRoom = async (roomId: string) => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }
    return storage.getMetadata(roomId);
  };

  const getAllRooms = async () => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }
    const keys = await storage.getAllKeys();
    const rooms = await Promise.all(keys.map(key => storage.getMetadata(key)));
    return rooms;
  };

  return {
    isInitialized,
    error,
    saveRoom,
    getRoom,
    getAllRooms,
  };
}; 