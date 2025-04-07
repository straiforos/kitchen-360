import type { Meta, StoryObj } from '@storybook/react';
import { StorageAreaStepper } from './StorageAreaStepper';
import { StorageAreaType } from '@types';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';

const meta: Meta<typeof StorageAreaStepper> = {
  title: 'Organization/StorageAreaStepper',
  component: StorageAreaStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StorageAreaStepper>;

const mockInitialArea = {
  name: 'Baking & Seasonings Cabinet',
  type: 'Cabinet' as StorageAreaType,
  description: 'Upper cabinet containing baking supplies, salt, and sugars',
};

export const Default: Story = {
  args: {
    onComplete: (area, image) => {
      console.log('Storage area completed:', area);
      console.log('Image:', image?.name);
    },
    onCancel: () => {
      console.log('Creation cancelled');
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify initial state
    const uploadStep = canvas.getByText('Upload Image');
    expect(uploadStep).toBeInTheDocument();
  }
};

export const WithInitialData: Story = {
  args: {
    onComplete: (area, image) => {
      console.log('Storage area completed:', area);
      console.log('Image:', image?.name);
    },
    onCancel: () => {
      console.log('Creation cancelled');
    },
    initialArea: mockInitialArea,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the stepper with pre-filled data for the baking and seasonings cabinet.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify initial state with pre-filled data
    const nameInput = canvas.getByLabelText('Name');
    expect(nameInput).toHaveValue('Baking & Seasonings Cabinet');
    
    // Fetch the image from public assets
    const response = await fetch('/images/baking_salt_sugar.jpg');
    const blob = await response.blob();
    const file = new File([blob], 'baking_salt_sugar.jpg', { type: 'image/jpeg' });
    
    // Simulate image upload
    const imageUploadEvent = new CustomEvent('imageUpload', { detail: file });
    canvasElement.dispatchEvent(imageUploadEvent);
    
    // Wait for the form to be visible
    await expect(canvas.findByLabelText('Name')).resolves.toBeInTheDocument();
  },
}; 