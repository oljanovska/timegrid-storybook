import React, { useState } from 'react';
import { Icon, IconName, LogoMark } from './Icon';

export { Icon, LogoMark };
export type { IconName };

/* ------------------------------------------------------------------ */
/* Buttons                                                            */
/* ------------------------------------------------------------------ */

export type RoundButtonProps = {
  /** `stop` — primary green timer button, `add` — glass secondary button */
  type: 'stop' | 'add';
  /** Add button pressed (popover open) */
  pressed?: boolean;
  onClick?: () => void;
};
/** 44×44 round button used next to the big timer. */
export function RoundButton({ type, pressed, onClick }: RoundButtonProps) {
  return (
    <button className={`tg-reset tg-focusable tg-btn-round tg-btn-round--${type}`} aria-pressed={type === 'add' ? !!pressed : undefined}
      aria-label={type === 'stop' ? 'Stop timer' : 'Add time'} onClick={onClick}>
      <Icon name={type === 'stop' ? 'stop' : 'plus'} size={type === 'stop' ? 22 : 20} />
    </button>
  );
}

export type SmallButtonProps = { type: 'play' | 'stop'; onClick?: () => void };
/** 28×28 play / stop button at the end of list rows. */
export function SmallButton({ type, onClick }: SmallButtonProps) {
  return (
    <button className={`tg-reset tg-focusable tg-btn-small tg-btn-small--${type}`} aria-label={type === 'play' ? 'Start timer' : 'Stop timer'} onClick={onClick}>
      <Icon name={type} size={type === 'play' ? 14 : 16} />
    </button>
  );
}

export function Button({ children, disabled, onClick }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void }) {
  return <button className="tg-reset tg-focusable tg-btn tg-btn--primary" disabled={disabled} onClick={onClick}>{children}</button>;
}

/* ------------------------------------------------------------------ */
/* Controls                                                           */
/* ------------------------------------------------------------------ */

export type SegmentedControlProps = { options: string[]; value?: string; onChange?: (v: string) => void };
export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const [v, setV] = useState(value ?? options[0]);
  const cur = value ?? v;
  return (
    <div className="tg-segmented" role="tablist">
      {options.map(o => (
        <button key={o} role="tab" aria-selected={o === cur} className="tg-reset tg-focusable tg-segmented__item"
          onClick={() => { setV(o); onChange?.(o); }}>{o}</button>
      ))}
    </div>
  );
}

export function SearchField({ placeholder = 'Search projects or tasks, e.g. WB-88', defaultValue }: { placeholder?: string; defaultValue?: string }) {
  return (
    <label className="tg-search">
      <Icon name="search" />
      <input placeholder={placeholder} defaultValue={defaultValue} />
    </label>
  );
}

export function Chip({ children, selected, onClick }: { children: React.ReactNode; selected?: boolean; onClick?: () => void }) {
  return <button className="tg-reset tg-focusable tg-chip" aria-pressed={!!selected} onClick={onClick}>{children}</button>;
}

export type BadgeStatus = 'answered' | 'open' | 'resolved';
export function Badge({ status }: { status: BadgeStatus }) {
  return <span className={`tg-badge tg-badge--${status}`}>{status[0].toUpperCase() + status.slice(1)}</span>;
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="tg-kbd">{children}</kbd>;
}

export function Toggle({ checked, onChange, label }: { checked?: boolean; onChange?: (v: boolean) => void; label?: string }) {
  const [c, setC] = useState(!!checked);
  return (
    <button role="switch" aria-checked={c} aria-label={label} className="tg-reset tg-focusable tg-toggle"
      onClick={() => { setC(!c); onChange?.(!c); }} />
  );
}

/* ------------------------------------------------------------------ */
/* Rows & cards                                                       */
/* ------------------------------------------------------------------ */

export type ProjectColor = 'green' | 'amber' | 'violet' | 'sky' | 'gray' | 'red';

export type EntryRowProps = {
  /** Project name — primary line */
  project: string;
  /** Task key + title, e.g. "WB-88 · Filters redesign". Use "No tasks" when time was logged to the project only. */
  task?: string;
  duration: string;
  color: ProjectColor;
  running?: boolean;
};
/** Time entry row in the List tab. Project is primary, task is secondary. */
export function EntryRow({ project, task = 'No tasks', duration, color, running }: EntryRowProps) {
  return (
    <div className={`tg-row ${running ? 'tg-row--running' : ''}`}>
      <span className="tg-row__bar" style={{ background: `var(--tg-project-${color})` }} />
      <div className="tg-row__text">
        <span className="tg-row__title">{project}</span>
        <span className="tg-row__meta">{task}</span>
      </div>
      <span className="tg-row__time">{duration}</span>
      <SmallButton type={running ? 'stop' : 'play'} />
    </div>
  );
}

export type ProjectRowProps = { project: string; meta: string; today: string; color: ProjectColor; running?: boolean };
/** Row in the Projects tab. */
export function ProjectRow({ project, meta, today, color, running }: ProjectRowProps) {
  return (
    <div className="tg-row">
      <span className="tg-row__bar" style={{ background: `var(--tg-project-${color})` }} />
      <div className="tg-row__text">
        <span className={running ? 'tg-row__title tg-text-body-strong' : 'tg-row__title'}>{project}</span>
        <span className="tg-row__meta">{meta}</span>
      </div>
      <span className="tg-row__time" style={running ? { color: 'var(--tg-text-accent)' } : undefined}>{today}</span>
      <SmallButton type={running ? 'stop' : 'play'} />
    </div>
  );
}

export function DayCard({ title, total, children, addLabel = 'Add time to today' }: { title: string; total: string; children: React.ReactNode; addLabel?: string | null }) {
  return (
    <section className="tg-card">
      <header className="tg-card__header"><span>{title}</span><span>{total}</span></header>
      {children}
      {addLabel && <button className="tg-reset tg-add-row" style={{ width: '100%' }}><Icon name="plus" />{addLabel}</button>}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Window                                                             */
/* ------------------------------------------------------------------ */

export function WindowHeader({ menuOpen, onMenu }: { menuOpen?: boolean; onMenu?: () => void }) {
  return (
    <div className="tg-window__header">
      <span className="tg-logo"><LogoMark />Timegrid</span>
      <button className="tg-reset tg-focusable tg-btn-icon" aria-label="More" aria-expanded={!!menuOpen} onClick={onMenu}><Icon name="more" /></button>
    </div>
  );
}

export function TimerHeader({ project, task, time }: { project: string; task: string; time: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="tg-text-body-medium tg-status"><span className="tg-dot" style={{ background: 'var(--tg-accent-primary)' }} />{project}<span className="tg-faint">•</span>{task}</span>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="tg-text-display">{time}</span>
        <div style={{ display: 'flex', gap: 8 }}><RoundButton type="stop" /><RoundButton type="add" /></div>
      </div>
    </div>
  );
}

export function WindowFooter({ right = 'Web panel ↗' }: { right?: string }) {
  return <footer className="tg-footer"><span className="tg-status"><span className="tg-dot" />Synced</span><span>{right}</span></footer>;
}

/** The glass window shell (404px). Near-opaque material keeps it identical on any desktop background. */
export function Window({ children }: { children: React.ReactNode }) {
  return <div className="tg-window tg-root">{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Menu                                                               */
/* ------------------------------------------------------------------ */

export type MenuItemProps = { icon: IconName; label: string; sub?: string; hint?: string; value?: string; submenu?: boolean; active?: boolean; danger?: boolean };
export function MenuItem({ icon, label, sub, hint, value, submenu, active, danger }: MenuItemProps) {
  return (
    <button className={`tg-reset tg-menu__item ${danger ? 'tg-menu__item--danger' : ''}`} data-active={!!active} role="menuitem">
      <Icon name={icon} />
      <span className="tg-menu__label">{label}{sub && <span className="tg-menu__sub">{sub}</span>}</span>
      {value && <span className="tg-menu__hint">{value}</span>}
      {hint && <span className="tg-menu__hint">{hint}</span>}
      {submenu && <span className="tg-faint" style={{ display: 'inline-flex' }}><Icon name="chevronRight" size={14} /></span>}
    </button>
  );
}
export const MenuSeparator = () => <div className="tg-menu__sep" role="separator" />;
export function Menu({ children, width }: { children: React.ReactNode; width?: number }) {
  return <div className="tg-menu tg-root" role="menu" style={width ? { width } : undefined}>{children}</div>;
}

/** The "•••" menu in the window header. */
export function MoreMenu({ activeItem }: { activeItem?: string }) {
  return (
    <Menu>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8 }}>
        <span className="tg-avatar">LO</span>
        <span style={{ display: 'flex', flexDirection: 'column' }}><span className="tg-text-body-strong">Lili Olianovska</span><span className="tg-text-caption tg-muted">Apiko · Hubstaff sync</span></span>
      </div>
      <MenuSeparator />
      <MenuItem icon="open" label="Open web panel" hint="⌘O" />
      <MenuItem icon="sync" label="Sync now" sub="Last synced 2 min ago" />
      <MenuSeparator />
      <MenuItem icon="moon" label="Appearance" value="System" submenu active={activeItem === 'Appearance'} />
      <MenuItem icon="pin" label="Keep window on top" value="Off" />
      <MenuItem icon="gear" label="Settings…" hint="⌘," />
      <MenuItem icon="keyboard" label="Keyboard shortcuts" hint="⌘/" />
      <MenuSeparator />
      <MenuItem icon="feedback" label="Feedback" />
      <MenuItem icon="logout" label="Log out" />
      <MenuItem icon="power" label="Quit Timegrid" hint="⌘Q" />
    </Menu>
  );
}

/* ------------------------------------------------------------------ */
/* Menu bar                                                           */
/* ------------------------------------------------------------------ */

export type MenuBarState = 'idle' | 'running' | 'open' | 'paused';
/** macOS menu bar extra. Shows the task key + elapsed time while tracking. */
export function MenuBarItem({ state, task = 'WB-88', time = '01:24:38' }: { state: MenuBarState; task?: string; time?: string }) {
  return (
    <span className="tg-menubar-item tg-root" data-state={state}>
      <LogoMark size={16} />
      {state === 'idle' ? 'Start timer' : (
        <>
          <span className="tg-dot" style={{ background: state === 'paused' ? 'var(--tg-text-tertiary)' : 'var(--tg-accent-primary)' }} />
          <span style={{ color: state === 'paused' ? 'var(--tg-text-tertiary)' : 'var(--tg-text-secondary)' }}>{task}</span>
          <span>{time}</span>
        </>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Feedback                                                           */
/* ------------------------------------------------------------------ */

export function FeedbackComposer({ type = 'Idea', text = '' }: { type?: 'Idea' | 'Problem' | 'Question'; text?: string }) {
  const [t, setT] = useState(type);
  const [val, setVal] = useState(text);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {(['Idea', 'Problem', 'Question'] as const).map(x => <Chip key={x} selected={x === t} onClick={() => setT(x)}>{x}</Chip>)}
      </div>
      <div className="tg-textarea">
        <textarea value={val} onChange={e => setVal(e.target.value)}
          placeholder={t === 'Problem' ? 'What happened? What did you expect instead?' : 'Share an idea or ask anything…'} />
        <div className="tg-textarea__bar">
          <span className="tg-status"><Icon name="clip" size={14} />Attach</span>
          <Button disabled={!val.trim()}>Send</Button>
        </div>
      </div>
      {t === 'Problem' && <label className="tg-text-caption tg-muted tg-status"><input type="checkbox" defaultChecked style={{ accentColor: 'var(--tg-accent-primary)' }} />Include diagnostic logs (version, macOS, last 24h)</label>}
    </div>
  );
}

export type Request = { title: string; meta: string; status: BadgeStatus; unread?: boolean };
export function RequestList({ items }: { items: Request[] }) {
  return (
    <section className="tg-card">
      {items.map(r => (
        <div className="tg-row" key={r.title} style={{ paddingLeft: 12 }}>
          <div className="tg-row__text">
            <span className="tg-row__title" style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: r.unread ? 600 : undefined }}>
              {r.unread && <span className="tg-dot" style={{ background: 'var(--tg-accent-primary)' }} />}{r.title}
            </span>
            <span className="tg-row__meta">{r.meta}</span>
          </div>
          <Badge status={r.status} />
          <span className="tg-faint" style={{ display: 'inline-flex' }}><Icon name="chevronRight" size={14} /></span>
        </div>
      ))}
    </section>
  );
}
