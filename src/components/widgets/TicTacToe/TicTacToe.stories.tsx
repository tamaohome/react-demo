import type { Meta, StoryObj } from "@storybook/react-vite";
import { TicTacToe } from "./TicTacToe";

const meta = {
  title: "Widgets/TicTacToe",
  component: TicTacToe,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TicTacToe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
