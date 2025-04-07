import type { Meta, StoryObj } from '@storybook/react';
import { RoomCreationStepper } from './RoomCreationStepper';
import { Box } from '@mui/material';
import { RoomCreationData } from '../../../types';

const meta: Meta<typeof RoomCreationStepper> = {
  title: 'Components/RoomCreationStepper',
  component: RoomCreationStepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A stepper component for creating new rooms, guiding users through the process of setting up room details, initial view, and storage areas.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialStep: {
      description: 'The initial step to start on (0-based index)',
      control: {
        type: 'number',
        min: 0,
        max: 2,
        step: 1,
      },
    },
    onSave: {
      description: 'Callback function when the room is saved',
      action: 'saved',
    },
    onCancel: {
      description: 'Callback function when the creation is cancelled',
      action: 'cancelled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoomCreationStepper>;

export const Default: Story = {
  args: {
    initialStep: 2,
    onSave: (roomData: RoomCreationData) => console.log('Room saved:', roomData),
    onCancel: () => console.log('Creation cancelled'),
  },
  render: (args) => (
    <Box sx={{ width: '800px' }}>
      <RoomCreationStepper {...args} />
    </Box>
  ),
};

export const RoomDetails: Story = {
  args: {
    initialStep: 0,
    onSave: (roomData: RoomCreationData) => console.log('Room saved:', roomData),
    onCancel: () => console.log('Creation cancelled'),
  },
  render: (args) => (
    <Box sx={{ width: '800px' }}>
      <RoomCreationStepper {...args} />
    </Box>
  ),
};

export const InitialView: Story = {
  args: {
    initialStep: 1,
    onSave: (roomData: RoomCreationData) => console.log('Room saved:', roomData),
    onCancel: () => console.log('Creation cancelled'),
  },
  render: (args) => (
    <Box sx={{ width: '800px' }}>
      <RoomCreationStepper {...args} />
    </Box>
  ),
};

export const StorageAreas: Story = {
  args: {
    initialStep: 2,
    onSave: (roomData: RoomCreationData) => console.log('Room saved:', roomData),
    onCancel: () => console.log('Creation cancelled'),
  },
  render: (args) => (
    <Box sx={{ width: '800px' }}>
      <RoomCreationStepper {...args} />
    </Box>
  ),
}; 