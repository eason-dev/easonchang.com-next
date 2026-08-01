import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PostList from './PostList';

const meta = {
  title: 'organisms/PostList',
  component: PostList,
} satisfies Meta<typeof PostList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: [
      {
        slug: 'hello-world',
        date: '2024-01-15T00:00:00.000Z',
        title: 'Hello World',
        description: 'A first post about getting started with this blog.',
        path: '/posts/hello-world',
        socialImage: '',
      },
      {
        slug: 'nextjs-app-router',
        date: '2024-03-02T00:00:00.000Z',
        title: 'Migrating to the Next.js App Router',
        description:
          'Notes from moving a bilingual MDX blog onto React Server Components.',
        path: '/posts/nextjs-app-router',
        socialImage: '',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    posts: [],
  },
};
