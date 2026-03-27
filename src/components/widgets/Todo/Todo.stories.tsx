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
    <div className="h-96 w-120 rounded-lg border border-gray-200 bg-white shadow-sm">
      <Todo />
    </div>
  ),
};
