import { useState } from 'react';
import { RoomCreationData, ViewCreationData } from '@types';

export const useRoomCreation = () => {
  const [roomData, setRoomData] = useState<RoomCreationData>({
    name: '',
    type: 'Kitchen',
    description: '',
    layoutType: 'L-shaped',
  });

  const updateRoomData = (updates: Partial<RoomCreationData>) => {
    setRoomData((prev) => ({ ...prev, ...updates }));
  };

  const updateInitialView = (viewData: ViewCreationData) => {
    setRoomData((prev) => ({ ...prev, initialView: viewData }));
  };

  const resetRoomData = () => {
    setRoomData({
      name: '',
      type: 'Kitchen',
      description: '',
      layoutType: 'L-shaped',
    });
  };

  return {
    roomData,
    updateRoomData,
    updateInitialView,
    resetRoomData,
  };
}; 