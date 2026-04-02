import type { Meta } from "@storybook/react-vite";
import { Window } from "./Window";

const meta = {
  title: "UI/Window",
  component: Window,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Window>;

export default meta;

// 基本的な使用例
export const Default = {
  render: () => (
    <Window icon="React" title="Window Title">
      Window content
    </Window>
  ),
};

// コンテンツが長い場合の例
export const WithLongContent = {
  render: () => (
    <Window icon="React" title="Window Title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
    </Window>
  ),
};

// サイズ指定の例
export const CustomSize = {
  render: () => (
    <Window icon="React" title="Custom Size Window" width={480} height={320}>
      <p>This window has a custom width and height.</p>
      <p>(480x320 pixels)</p>
    </Window>
  ),
};

// アイコン無しの例
export const NoIcon = {
  render: () => <Window title="No Icon Window">This window does not have an icon.</Window>,
};
