import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-themes'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: (viteConfig) => {
    viteConfig.plugins ??= [];
    // Match the app's Turbopack rule: plain .svg imports resolve to React components.
    viteConfig.plugins.push(
      svgr({
        include: '**/*.svg',
        svgrOptions: { exportType: 'default' },
      })
    );
    return viteConfig;
  },
};

export default config;
