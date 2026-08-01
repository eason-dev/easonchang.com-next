import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CommandPalette from './CommandPalette';

const meta = {
  title: 'organisms/CommandPalette',
  component: CommandPalette,
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: [
      {
        slug: 'hello-world',
        title: 'Hello World',
        path: '/posts/hello-world',
      },
    ],
    children: (
      <p className="p-8">
        Press <kbd>⌘</kbd>+<kbd>K</kbd> (or <kbd>Ctrl</kbd>+<kbd>K</kbd>) to
        open the palette.
      </p>
    ),
  },
};
