import { Position } from './Position';

export interface View {
  id: string;
  roomId: string;
  name: string;
  description: string;
  blobKey: string;
  position: Position;
  connections: ViewConnection[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ViewCreationData {
  name: string;
  description: string;
  imageFile: File;
  position: Position;
}

export interface ViewConnection {
  targetViewId: string;
  position: Position;
  type: 'door' | 'archway' | 'opening' | 'custom';
} 