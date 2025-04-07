import type { Meta, StoryObj } from '@storybook/react';
import { StorageAreaForm } from './StorageAreaForm';
import { StorageArea, StorageAreaType } from '../../../types';
import { Box } from '@mui/material';

const meta: Meta<typeof StorageAreaForm> = {
  title: 'Components/StorageAreaForm',
  component: StorageAreaForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form component for creating or editing storage areas in a room. The form allows users to specify the name, type, and description of storage areas like cabinets, drawers, and shelves.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    area: {
      description: 'The storage area being edited, or null if creating a new one',
      control: 'object',
    },
    isEditMode: {
      description: 'Whether the form is in edit mode',
      control: 'boolean',
    },
    onSubmit: {
      description: 'Callback function when the form is submitted',
      action: 'submitted',
    },
    onCancel: {
      description: 'Callback function when the form is cancelled',
      action: 'cancelled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StorageAreaForm>;

const defaultArea: Partial<StorageArea> = {
  name: '',
  type: 'Cabinet' as StorageAreaType,
  description: '',
  position: { longitude: 0, latitude: 0, zoom: 1 },
};

export const Default: Story = {
  args: {
    area: defaultArea,
    onSubmit: (area) => console.log('Area submitted:', area),
    onCancel: () => console.log('Form cancelled'),
  },
  render: (args) => (
    <Box sx={{ width: '400px' }}>
      <StorageAreaForm {...args} />
    </Box>
  ),
};

export const EditMode: Story = {
  args: {
    area: {
      id: 'test-id',
      name: 'Upper Cabinet',
      type: 'Cabinet' as StorageAreaType,
      description: 'Above the sink',
      position: { longitude: 0, latitude: 0, zoom: 1 },
      viewId: 'view-1',
      imageUrl: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    isEditMode: true,
    onSubmit: (area) => console.log('Area submitted:', area),
    onCancel: () => console.log('Form cancelled'),
  },
  render: (args) => (
    <Box sx={{ width: '400px' }}>
      <StorageAreaForm {...args} />
    </Box>
  ),
};

export const WithLongContent: Story = {
  args: {
    area: {
      id: 'test-id',
      name: 'Very Long Storage Area Name That Might Overflow',
      type: 'Custom' as StorageAreaType,
      description: 'This is a very long description that should demonstrate how the form handles content that might overflow or wrap to multiple lines. It includes various details about the storage area, its location, features, and any special considerations for this particular storage space.',
      position: { longitude: 0, latitude: 0, zoom: 1 },
      viewId: 'view-1',
      imageUrl: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    isEditMode: true,
    onSubmit: (area) => console.log('Area submitted:', area),
    onCancel: () => console.log('Form cancelled'),
  },
  render: (args) => (
    <Box sx={{ width: '400px' }}>
      <StorageAreaForm {...args} />
    </Box>
  ),
}; 