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
    onStorageAreaCreate: {
      action: "storage area created",
      description: "Callback when a storage area is created",
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

const imageUrl = "./top_cabinets.jpg";

export const Default: Story = {
  args: {
    imageUrl,
    hotspots: defaultHotspots,
    onHotspotClick: () => {},
    onStorageAreaCreate: () => {},
  },
};

export const NoHotspots: Story = {
  args: {
    imageUrl,
    hotspots: [],
    onHotspotClick: () => {},
    onStorageAreaCreate: () => {},
  },
};

export const WithStorageAreaCreation: Story = {
  args: {
    imageUrl,
    hotspots: [],
    onHotspotClick: () => {},
    onStorageAreaCreate: (position) => {
      console.log('Storage area created at position:', position);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const viewer = await canvas.findByTestId('viewer-container');

    userEvent.click(viewer);

    // Verify the stepper is present
    const stepper = canvasElement.querySelector('.MuiStepper-root');
    if (!stepper) {
      throw new Error('Storage area stepper did not appear after clicking');
    }
  },
};
