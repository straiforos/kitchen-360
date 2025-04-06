import { useState } from 'react';
import { StorageAreaCreationData } from '@types';

export const useStorageAreaCreation = () => {
  const [storageAreaData, setStorageAreaData] = useState<StorageAreaCreationData>({
    name: '',
    type: 'Cabinet',
    description: '',
    position: {
      longitude: 0,
      latitude: 0,
      zoom: 0,
    },
    imageFile: undefined,
  });

  const updateStorageAreaData = (updates: Partial<StorageAreaCreationData>) => {
    setStorageAreaData((prev) => ({ ...prev, ...updates }));
  };

  const updatePosition = (position: { longitude: number; latitude: number; zoom: number }) => {
    setStorageAreaData((prev) => ({ ...prev, position }));
  };

  const resetStorageAreaData = () => {
    setStorageAreaData({
      name: '',
      type: 'Cabinet',
      description: '',
      position: {
        longitude: 0,
        latitude: 0,
        zoom: 0,
      },
      imageFile: undefined,
    });
  };

  return {
    storageAreaData,
    updateStorageAreaData,
    updatePosition,
    resetStorageAreaData,
  };
}; 