import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ProjectCard from './ProjectCard';

const meta = {
  title: 'organisms/ProjectCard',
  component: ProjectCard,
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      title: 'Timez - Time Zone Converter',
      description:
        'Convert times between time zones and compare overlapping hours.',
      links: {
        post: '/posts/timezone-converter',
        github: 'https://github.com/eason-dev/timezone-converter',
        site: 'https://timez.eason.ch',
      },
      image: {
        src: '/images/project-timezone-converter/timezone-converter-screenshot.png',
        alt: 'Timezone converter screenshot',
        placeholder: 'empty',
      },
    },
  },
};
