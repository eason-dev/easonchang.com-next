import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import CommandPalette from '@/components/organisms/CommandPalette';

import CommandBarToggle from './CommandBarToggle';

const meta = {
  title: 'atoms/CommandBarToggle',
  component: CommandBarToggle,
  decorators: [
    // The toggle needs the kbar context from CommandPalette.
    (Story) => (
      <CommandPalette posts={[]}>
        <Story />
      </CommandPalette>
    ),
  ],
} satisfies Meta<typeof CommandBarToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
