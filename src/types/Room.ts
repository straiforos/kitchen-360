import { View } from ".";

export interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  layoutType: string;
  views: View[];
  metadata: {
    [key: string]: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomCreationData {
  name: string;
  type: string;
  description: string;
  layoutType: string;
  initialView?: ViewCreationData;
}

export type RoomLayoutType = 'L-shaped' | 'U-shaped' | 'Galley' | 'Island' | 'Open' | 'Custom';
export type RoomType = 'Kitchen' | 'Pantry' | 'Dining Room' | 'Living Room' | 'Custom'; 