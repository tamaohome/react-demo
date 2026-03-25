import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuBar } from "./MenuBar";

const meta = {
  title: "UI/MenuBar",
  component: MenuBar,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
