import type { Meta, StoryObj } from '@storybook/react';
import { StorageAreaImageUpload } from './StorageAreaImageUpload';

const meta: Meta<typeof StorageAreaImageUpload> = {
  title: 'Organization/StorageAreaImageUpload',
  component: StorageAreaImageUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StorageAreaImageUpload>;

export const Default: Story = {
  args: {
    onImageUpload: (file) => {
      console.log('Image uploaded:', file.name);
    },
    onCancel: () => {
      console.log('Upload cancelled');
    },
  },
};

export const WithDragActive: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a mock of the drag active state. In reality, this state is controlled by the useDropzone hook.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
}; 