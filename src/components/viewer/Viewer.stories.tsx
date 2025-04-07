import type { Meta, StoryObj } from "@storybook/react";
import { userEvent } from '@storybook/test';
import { Viewer } from "./Viewer";
import { Hotspot } from "../../types";
import { MarkerType } from "@photo-sphere-viewer/markers-plugin";
import { within } from "@testing-library/react";

const meta: Meta<typeof Viewer> = {
  title: "Components/Viewer",
  component: Viewer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    imageUrl: {
      control: "text",
      description: "URL of the 360° panorama image",
    },
    hotspots: {
      control: "object",
      description: "Array of hotspots to display",
    },
    onHotspotClick: {
      action: "hotspot clicked",
      description: "Callback when a hotspot is clicked",
    },
    onHotspotCreate: {
      action: "Create hotspot when viewer clicked",
      description: "Callback when the viewer is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Viewer>;

const defaultHotspots: Hotspot[] = [
  {
    id: "salt_sugar",
    name: "Cabinet",
    position: { pitch: 0.03444834728612767, yaw: 0.15488413140442567 },
    type: "html" as MarkerType,
    html: '<div style="width: 20px; height: 20px; background: red; border-radius: 50%; border: 2px solid white;"></div>',
  },
];

const imageUrl = "./public/top_cabinets.jpg";

export const Default: Story = {
  args: {
    imageUrl,
    hotspots: defaultHotspots,
  },
};

export const NoHotspots: Story = {
  args: {
    imageUrl,
    hotspots: [],
  },
};

export const WithHotspotCreation: Story = {
  args: {
    imageUrl,
    hotspots: [],
    onHotspotCreate: (position) => {
      console.log('Hotspot created at position:', position);
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const viewer = await canvas.findByTestId('viewer-container');

    userEvent.click(viewer);

    // Verify the form is present
    const form = canvasElement.querySelector('.hotspot-form');
    if (!form) {
      throw new Error('Hotspot form did not appear after clicking');
    }

    // Verify the form title
    const formTitle = form.querySelector('h2');
    if (!formTitle || formTitle.textContent !== 'Create Hotspot') {
      throw new Error('Hotspot form title is incorrect');
    }
  },
};
