import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clock } from "./Clock";

const meta = {
  title: "Components/Clock",
  component: Clock,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Clock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
