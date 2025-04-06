import { View } from './View';
import { ViewCreationData } from "./View";

export interface Room {
  id: string;
  name: string;
  views: View[];
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