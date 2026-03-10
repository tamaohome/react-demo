import type { Meta, StoryObj } from "@storybook/react-vite";
import { Todo } from "./Todo";

const meta = {
  title: "Widgets/Todo",
  component: Todo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Todo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-120 h-96 border border-gray-200 rounded-lg bg-white shadow-sm">
      <Todo />
    </div>
  ),
};
