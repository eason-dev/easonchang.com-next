import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SocialIcon from './SocialIcon';

const meta = {
  title: 'atoms/SocialIcon',
  component: SocialIcon,
  argTypes: {
    kind: {
      control: 'select',
      options: [
        'mail',
        'github',
        'facebook',
        'youtube',
        'linkedin',
        'twitter',
        'threads',
        'instagram',
        'bluesky',
        'rss',
      ],
    },
  },
} satisfies Meta<typeof SocialIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GitHub: Story = {
  args: {
    kind: 'github',
    href: 'https://github.com/eason-dev',
  },
};

export const Mail: Story = {
  args: {
    kind: 'mail',
    href: 'mailto:eason@easonchang.com',
  },
};
