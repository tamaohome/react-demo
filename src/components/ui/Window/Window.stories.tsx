import type { Meta, StoryObj } from "@storybook/react-vite";
import { Window } from "./Window";

const meta = {
  title: "UI/Window",
  component: Window,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Window>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Window content",
  },
};
