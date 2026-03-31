import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "通常のボタン",
  },
};

export const OkCancel = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="info">決定</Button>
      <Button variant="cancel">キャンセル</Button>
    </div>
  ),
};

export const ButtonGallery = {
  render: () => (
    <>
      <p className="mb-4 text-sm text-slate-600">
        <code>variant=""</code>の指定文字列一覧
      </p>
      <div className="flex flex-wrap gap-4">
        <Button>(指定無し)</Button>
        <Button variant="normal">normal</Button>
        <Button variant="info">info</Button>
        <Button variant="success">success</Button>
        <Button variant="warning">warning</Button>
        <Button variant="danger">danger</Button>
        <Button variant="cancel">cancel</Button>
      </div>
    </>
  ),
};

export const Disabled: Story = {
  args: {
    children: "無効化されたボタン",
    disabled: true,
  },
};
