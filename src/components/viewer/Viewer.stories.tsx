import type { Meta, StoryObj } from "@storybook/react";
import { Viewer } from "./Viewer";
import { Hotspot, Position } from "../../types";
import { MarkerType } from "@photo-sphere-viewer/markers-plugin";

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
    position: {
      control: "object",
      description: "Initial position of the viewer",
    },
    hotspots: {
      control: "object",
      description: "Array of hotspots to display",
    },
    onHotspotClick: {
      action: "hotspot clicked",
      description: "Callback when a hotspot is clicked",
    },
    onClick: {
      action: "viewer clicked",
      description: "Callback when the viewer is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Viewer>;

const defaultPosition: Position = {
  pitch: 0,
  yaw: 0,
};

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
    position: defaultPosition,
    hotspots: defaultHotspots,
  },
};

export const NoHotspots: Story = {
  args: {
    imageUrl,
    position: defaultPosition,
    hotspots: [],
  },
};
