import type { Meta, StoryObj } from "@storybook/react-vite";
import { Weather } from "./Weather";

const meta = {
  title: "Widgets/Weather",
  component: Weather,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Weather>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: false,
          },
        ],
      },
    },
  },
};

export const WithPreciseLocation: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: false,
          },
        ],
      },
    },
  },
};
