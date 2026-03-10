import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sample } from "./Sample";

const meta = {
  title: "Widgets/Sample",
  component: Sample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Sample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
