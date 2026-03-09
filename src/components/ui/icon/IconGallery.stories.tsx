import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconGallery } from "./IconGallery";

const meta: Meta<typeof IconGallery> = {
  title: "UI/Icon/IconGallery",
  component: IconGallery,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof IconGallery>;

export const Default: Story = {};
