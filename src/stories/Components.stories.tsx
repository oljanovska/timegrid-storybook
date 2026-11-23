import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RoundButton, SmallButton, Button, SegmentedControl, SearchField, Chip, Badge, Kbd, Toggle, EntryRow, ProjectRow, DayCard, MoreMenu, Menu, MenuItem, MenuBarItem, FeedbackComposer, RequestList } from '../components';

const box = (w = 372) => (S: React.ComponentType) => <div style={{ width: w }}><S /></div>;

export default { title: 'Components' } satisfies Meta;

export const Buttons: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <RoundButton type="stop" /><RoundButton type="add" /><RoundButton type="add" pressed />
      <SmallButton type="play" /><SmallButton type="stop" />
      <Button>Send</Button><Button disabled>Send</Button>
    </div>
  ),
};

export const RoundButtonStory: StoryObj<typeof RoundButton> = {
  name: 'Round button', render: (a) => <RoundButton {...a} />, args: { type: 'stop', pressed: false },
  argTypes: { type: { control: 'inline-radio', options: ['stop', 'add'] } },
};

export const Segmented: StoryObj<typeof SegmentedControl> = {
  name: 'Segmented control', decorators: [box()], render: (a) => <SegmentedControl {...a} />, args: { options: ['List', 'Projects'] },
};

export const Search: StoryObj = { name: 'Search field', decorators: [box()], render: () => <SearchField /> };

export const ChipsBadgesKbd: StoryObj = {
  name: 'Chip, badge, kbd, toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip selected>Mine · 8</Chip><Chip>In progress · 3</Chip>
      <Badge status="answered" /><Badge status="open" /><Badge status="resolved" />
      <Kbd>⌥ ⌘ T</Kbd><Toggle checked label="On" /><Toggle label="Off" />
    </div>
  ),
};

export const Entry: StoryObj<typeof EntryRow> = {
  name: 'Entry row', decorators: [box()],
  render: (a) => <div className="tg-card"><EntryRow {...a} /></div>,
  args: { project: 'Winbank', task: 'WB-88 · Filters redesign', duration: '1:24:36', color: 'green', running: true },
  argTypes: { color: { control: 'select', options: ['green', 'amber', 'violet', 'sky', 'gray', 'red'] } },
};

export const Project: StoryObj<typeof ProjectRow> = {
  name: 'Project row', decorators: [box()],
  render: (a) => <div className="tg-card"><ProjectRow {...a} /></div>,
  args: { project: 'Valere CRM', meta: '4 tasks', today: '1:21', color: 'amber', running: false },
  argTypes: { color: { control: 'select', options: ['green', 'amber', 'violet', 'sky', 'gray', 'red'] } },
};

export const Day: StoryObj = {
  name: 'Day card', decorators: [box()],
  render: () => (
    <DayCard title="Today" total="6:11:19">
      <EntryRow project="Winbank" task="WB-88 · Filters redesign" duration="1:24:36" color="green" running />
      <EntryRow project="Valere CRM" duration="1:25:00" color="amber" />
      <EntryRow project="DIL-Key" task="DIL-358 · Calendar filters" duration="1:21:43" color="violet" />
    </DayCard>
  ),
};

export const More: StoryObj = { name: 'More menu', render: () => <MoreMenu /> };

export const AppearanceSubmenu: StoryObj = {
  name: 'Menu · Appearance submenu',
  render: () => (
    <Menu width={168}>
      <MenuItem icon="monitor" label="System" hint="✓" />
      <MenuItem icon="sun" label="Light" />
      <MenuItem icon="moon" label="Dark" active />
    </Menu>
  ),
};

export const MenuBar: StoryObj<typeof MenuBarItem> = {
  name: 'Menu bar item',
  render: (a) => <div style={{ display: 'flex', alignItems: 'center', height: 28, padding: '0 12px', borderRadius: 8, background: 'var(--tg-bg-window)' }}><MenuBarItem {...a} /></div>,
  args: { state: 'running', task: 'WB-88', time: '01:24:38' },
  argTypes: { state: { control: 'inline-radio', options: ['idle', 'running', 'open', 'paused'] } },
};

export const Feedback: StoryObj = {
  name: 'Feedback composer & requests', decorators: [box()],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FeedbackComposer />
      <RequestList items={[
        { title: 'Timer stopped after sleep', meta: 'Problem · 2 days ago · 1 new reply', status: 'answered', unread: true },
        { title: 'Export entries to CSV', meta: 'Idea · last week', status: 'open' },
        { title: 'How to edit yesterday?', meta: 'Question · Nov 3', status: 'resolved' },
      ]} />
    </div>
  ),
};
