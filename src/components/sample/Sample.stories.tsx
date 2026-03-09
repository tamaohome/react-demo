import type { Meta, StoryObj } from "@storybook/react";
import { Sample } from "./Sample";

const meta = {
  title: "Components/Sample",
  component: Sample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Sample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
