import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Window, WindowHeader, TimerHeader, WindowFooter, SegmentedControl, DayCard, EntryRow, ProjectRow, MoreMenu, Icon, FeedbackComposer, RequestList, Toggle, Kbd } from '../components';

export default { title: 'Screens', parameters: { layout: 'centered' } } satisfies Meta;

function Shell({ children, menu }: { children: React.ReactNode; menu?: boolean }) {
  const [open, setOpen] = useState(!!menu);
  return (
    <Window>
      <WindowHeader menuOpen={open} onMenu={() => setOpen(!open)} />
      {children}
      <WindowFooter />
      {open && <div style={{ position: 'absolute', top: 52, right: 12, zIndex: 2 }}><MoreMenu /></div>}
    </Window>
  );
}

function ListTab() {
  return (<>
    <TimerHeader project="Winbank" task="WB-88" time="01:24:38" />
    <SegmentedControl options={['List', 'Projects']} />
    <div className="tg-text-caption tg-muted" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Today: <b style={{ color: 'var(--tg-text-primary)' }}>6:11:19</b>&nbsp;&nbsp; Week: <b style={{ color: 'var(--tg-text-primary)' }}>28:40:59</b></span><Icon name="search" />
    </div>
    <DayCard title="Today" total="6:11:19">
      <EntryRow project="Winbank" task="WB-88 · Filters redesign" duration="1:24:36" color="green" running />
      <EntryRow project="Valere CRM" duration="1:25:00" color="amber" />
      <EntryRow project="Winbank" task="WB-91 · Export to PDF" duration="2:00:00" color="green" />
      <EntryRow project="DIL-Key" task="DIL-358 · Calendar filters" duration="1:21:43" color="violet" />
    </DayCard>
  </>);
}

export const TimerRunning: StoryObj = { name: 'Timer running · List', render: () => <Shell><ListTab /></Shell> };

export const ProjectsTab: StoryObj = {
  name: 'Projects tab',
  render: () => (
    <Shell>
      <TimerHeader project="Winbank" task="WB-88" time="01:24:38" />
      <SegmentedControl options={['List', 'Projects']} value="Projects" />
      <section className="tg-card">
        <ProjectRow project="Winbank" meta="24 tasks · Jira" today="3:24" color="green" running />
        <ProjectRow project="Valere CRM" meta="4 tasks" today="1:21" color="amber" />
        <ProjectRow project="DIL-Key" meta="31 tasks · Jira" today="1:21" color="violet" />
        <ProjectRow project="STS Exchange" meta="6 tasks" today="0:00" color="sky" />
        <ProjectRow project="Apiko Learning" meta="No tasks" today="0:00" color="gray" />
        <ProjectRow project="TRUKKIT" meta="3 tasks" today="0:00" color="red" />
      </section>
    </Shell>
  ),
};

export const MoreMenuOpen: StoryObj = { name: 'More menu opened', render: () => <Shell menu><ListTab /></Shell> };

function Title({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><button className="tg-reset tg-btn-icon" style={{ background: 'var(--tg-fill-tertiary)', width: 28, height: 28 }}><Icon name="back" /></button><span className="tg-text-title">{children}</span></div>;
}
function Row({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return <div className="tg-row" style={{ paddingLeft: 12 }}><div className="tg-row__text"><span className="tg-row__title">{label}</span>{sub && <span className="tg-row__meta">{sub}</span>}</div>{children}</div>;
}
const Select = ({ children }: { children: React.ReactNode }) => <span className="tg-kbd" style={{ color: 'var(--tg-text-primary-soft)', gap: 4, alignItems: 'center' }}>{children}<Icon name="chevronDown" size={12} /></span>;

export const Settings: StoryObj = {
  render: () => (
    <Window>
      <WindowHeader />
      <Title>Settings</Title>
      <span className="tg-text-overline">General</span>
      <section className="tg-card" style={{ marginTop: -10 }}>
        <Row label="Launch at login"><Toggle checked /></Row>
        <Row label="Show timer in menu bar"><Toggle checked /></Row>
        <Row label="Keep window on top"><Toggle /></Row>
      </section>
      <span className="tg-text-overline">Tracking</span>
      <section className="tg-card" style={{ marginTop: -10 }}>
        <Row label="Idle detection" sub="Ask what to do with idle time"><Select>After 10 min</Select></Row>
        <Row label="Remind to start timer" sub="Weekdays at 09:30"><Toggle checked /></Row>
        <Row label="Week starts on"><Select>Monday</Select></Row>
      </section>
      <span className="tg-text-overline">Shortcuts</span>
      <section className="tg-card" style={{ marginTop: -10 }}>
        <Row label="Start / stop timer"><Kbd>⌥ ⌘ T</Kbd></Row>
        <Row label="Open Timegrid"><Kbd>⌥ ⌘ Space</Kbd></Row>
      </section>
      <WindowFooter right="Timegrid 0.4.2" />
    </Window>
  ),
};

export const Feedback: StoryObj = {
  render: () => (
    <Window>
      <WindowHeader />
      <Title>Feedback</Title>
      <span className="tg-text-overline">Write to us</span>
      <div style={{ marginTop: -10 }}><FeedbackComposer /></div>
      <span className="tg-text-overline" style={{ display: 'flex', justifyContent: 'space-between' }}>Your requests <span className="tg-link" style={{ textTransform: 'none' }}>See all</span></span>
      <div style={{ marginTop: -10 }}>
        <RequestList items={[
          { title: 'Timer stopped after sleep', meta: 'Problem · 2 days ago · 1 new reply', status: 'answered', unread: true },
          { title: 'Export entries to CSV', meta: 'Idea · last week', status: 'open' },
          { title: 'How to edit yesterday?', meta: 'Question · Nov 3', status: 'resolved' },
        ]} />
      </div>
      <WindowFooter right="Timegrid 0.4.2" />
    </Window>
  ),
};
