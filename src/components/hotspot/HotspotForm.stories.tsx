import type { Meta, StoryObj } from '@storybook/react';
import { HotspotForm } from './HotspotForm';
import { Position } from '../../types';
import { MarkerType } from '@photo-sphere-viewer/markers-plugin';

const meta: Meta<typeof HotspotForm> = {
  title: 'Components/HotspotForm',
  component: HotspotForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form component for creating or editing hotspots in a 360° viewer. The form appears as a modal overlay when creating a new hotspot.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      description: 'The position where the hotspot will be placed in the 360° view',
      control: 'object',
    },
    onSubmit: {
      description: 'Callback function when the form is submitted',
      action: 'submitted',
    },
    onCancel: {
      description: 'Callback function when the form is cancelled',
      action: 'cancelled',
    },
    initialValues: {
      description: 'Optional initial values for the form fields',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HotspotForm>;

const defaultPosition: Position = {
  yaw: 0,
  pitch: 0,
  zoom: 50
};

export const Default: Story = {
  args: {
    position: defaultPosition,
    onSubmit: (hotspot) => console.log('Hotspot submitted:', hotspot),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const WithInitialValues: Story = {
  args: {
    position: defaultPosition,
    onSubmit: (hotspot) => console.log('Hotspot submitted:', hotspot),
    onCancel: () => console.log('Form cancelled'),
    initialValues: {
      name: 'Kitchen Cabinet',
      description: 'Upper cabinet above the sink',
      type: 'marker' as MarkerType,
    },
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <HotspotForm {...args} />
    </div>
  ),
};

export const WithLongContent: Story = {
  args: {
    position: defaultPosition,
    onSubmit: (hotspot) => console.log('Hotspot submitted:', hotspot),
    onCancel: () => console.log('Form cancelled'),
    initialValues: {
      name: 'Very Long Hotspot Name That Might Overflow',
      description: 'This is a very long description that should demonstrate how the form handles content that might overflow or wrap to multiple lines. It includes various details about the location, features, and any special considerations for this particular hotspot in the 360° view.',
      type: 'html' as MarkerType,
    },
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <HotspotForm {...args} />
    </div>
  ),
}; 