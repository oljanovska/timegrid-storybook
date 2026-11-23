import React from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/styles.css';

const wallpapers: Record<string, string> = {
  plain: 'transparent',
  'light gradient': 'linear-gradient(135deg,#E8EEF9,#F3F0FA 50%,#FBF0EC)',
  'dark canvas': '#383838',
  colorful: 'linear-gradient(135deg,#FA7333,#8C40F2 50%,#1AB39A)',
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Timegrid theme',
      toolbar: { title: 'Theme', icon: 'mirror', items: [
        { value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }, { value: 'side-by-side', title: 'Light + Dark' },
      ], dynamicTitle: true },
    },
    wallpaper: {
      description: 'Desktop background under the window',
      toolbar: { title: 'Wallpaper', icon: 'photo', items: Object.keys(wallpapers), dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light', wallpaper: 'light gradient' },
  decorators: [
    (Story, ctx) => {
      const { theme, wallpaper } = ctx.globals as { theme: string; wallpaper: string };
      const bg = ctx.parameters.wallpaper === false ? 'transparent' : wallpapers[wallpaper] ?? 'transparent';
      const pane = (t: string) => (
        <div data-theme={t} className="tg-root" style={{ background: bg, padding: 32, borderRadius: 16, flex: 1, minWidth: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Story />
        </div>
      );
      return theme === 'side-by-side'
        ? <div style={{ display: 'flex', gap: 16 }}>{pane('light')}{pane('dark')}</div>
        : pane(theme);
    },
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    options: { storySort: { order: ['Introduction', 'Foundations', 'Components', 'Screens'] } },
  },
};
export default preview;
