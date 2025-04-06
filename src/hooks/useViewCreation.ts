import { useState } from 'react';
import { ViewCreationData } from '@types';

export const useViewCreation = () => {
  const [viewData, setViewData] = useState<ViewCreationData>({
    name: '',
    description: '',
    imageUrl: '',
    position: {
      longitude: 0,
      latitude: 0,
      zoom: 0,
    },
  });

  const updateViewData = (updates: Partial<ViewCreationData>) => {
    setViewData((prev) => ({ ...prev, ...updates }));
  };

  const updatePosition = (position: { longitude: number; latitude: number; zoom: number }) => {
    setViewData((prev) => ({ ...prev, position }));
  };

  const resetViewData = () => {
    setViewData({
      name: '',
      description: '',
      imageUrl: '',
      position: {
        longitude: 0,
        latitude: 0,
        zoom: 0,
      },
    });
  };

  return {
    viewData,
    updateViewData,
    updatePosition,
    resetViewData,
  };
}; 