import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/react-vite', options: {} },
  // GitHub Pages serves the site from /<repo>/ — relative base keeps assets working there.
  viteFinal: async (cfg) => ({ ...cfg, base: './' }),
};
export default config;
