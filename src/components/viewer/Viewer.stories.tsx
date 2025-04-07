import type { Meta, StoryObj } from '@storybook/react';
import { Viewer } from './Viewer';
import { Position } from '../../types';

const meta: Meta<typeof Viewer> = {
  title: 'Components/Viewer',
  component: Viewer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'URL of the 360° panorama image',
    },
    position: {
      control: 'object',
      description: 'Initial position of the viewer',
    },
    hotspots: {
      control: 'object',
      description: 'Array of hotspots to display',
    },
    onHotspotClick: {
      action: 'hotspot clicked',
      description: 'Callback when a hotspot is clicked',
    },
    onClick: {
      action: 'viewer clicked',
      description: 'Callback when the viewer is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Viewer>;

const defaultPosition: Position = {
  longitude: 0,
  latitude: 0,
  zoom: 50,
};

const defaultHotspots = [
  {
    id: '1',
    name: 'Cabinet 1',
    position: {
      longitude: 45,
      latitude: 30,
      zoom: 50,
    },
  },
  {
    id: '2',
    name: 'Cabinet 2',
    position: {
      longitude: -45,
      latitude: -30,
      zoom: 50,
    },
  },
];

export const Default: Story = {
  args: {
    imageUrl: 'https://photo-sphere-viewer.js.org/assets/test.jpg',
    position: defaultPosition,
    hotspots: defaultHotspots,
  },
};

export const NoHotspots: Story = {
  args: {
    imageUrl: 'https://photo-sphere-viewer.js.org/assets/test.jpg',
    position: defaultPosition,
    hotspots: [],
  },
};

export const CustomPosition: Story = {
  args: {
    imageUrl: 'https://photo-sphere-viewer.js.org/assets/test.jpg',
    position: {
      longitude: 90,
      latitude: 45,
      zoom: 75,
    },
    hotspots: defaultHotspots,
  },
}; 