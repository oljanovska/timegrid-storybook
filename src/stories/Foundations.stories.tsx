import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '../tokens/tokens.json';

const meta: Meta = { title: 'Foundations', parameters: { wallpaper: false, layout: 'fullscreen' } };
export default meta;

const cssVar = (n: string) => `--tg-${n.replace(/\//g, '-')}`;
const groups = tokens.color.reduce<Record<string, [string, string[]][]>>((a, t) => {
  const g = (t[0] as string).split('/')[0]; (a[g] ||= []).push(t as [string, string[]]); return a;
}, {});

function Swatch({ name, theme }: { name: string; theme: 'light' | 'dark' }) {
  const isText = name.startsWith('text/'); const isShadow = name.startsWith('shadow/');
  return (
    <div data-theme={theme} style={{ width: 96, height: 40, borderRadius: 10, padding: 6, background: theme === 'light' ? '#F4F4F6' : '#1C1C1E', border: '1px solid rgba(0,0,0,.08)' }}>
      <div style={{ height: '100%', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isText ? 'transparent' : isShadow ? (theme === 'light' ? '#fff' : '#2c2c2e') : `var(${cssVar(name)})`,
        boxShadow: isShadow ? `0 4px 10px var(${cssVar(name)})` : undefined,
        color: `var(${cssVar(name)})`, font: '600 14px Geist' }}>{isText ? 'Aa' : ''}</div>
    </div>
  );
}

export const Colors: StoryObj = {
  render: () => (
    <div className="tg-root" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <p className="tg-muted">Semantic tokens. In code use CSS variables (<code>var(--tg-text-primary)</code>), never raw hex. Theme switches via <code>data-theme="light|dark|system"</code> on any ancestor.</p>
      {Object.entries(groups).map(([g, list]) => (
        <section key={g}>
          <h3 className="tg-text-title" style={{ margin: '0 0 8px' }}>{g}</h3>
          <table style={{ borderCollapse: 'collapse' }}>
            <thead><tr className="tg-text-caption-strong tg-muted" style={{ textAlign: 'left' }}>
              <th style={{ padding: 4 }}>Light</th><th style={{ padding: 4 }}>Dark</th><th style={{ padding: '4px 16px' }}>Token / CSS variable</th><th style={{ padding: 4 }}>Light</th><th style={{ padding: 4 }}>Dark</th></tr></thead>
            <tbody>{list.map(([n, [l, d]]) => (
              <tr key={n}>
                <td style={{ padding: 4 }}><Swatch name={n} theme="light" /></td>
                <td style={{ padding: 4 }}><Swatch name={n} theme="dark" /></td>
                <td style={{ padding: '4px 16px' }}><div className="tg-text-body-medium">{n}</div><code className="tg-text-caption tg-muted">{cssVar(n)}</code></td>
                <td style={{ padding: 4 }} className="tg-text-caption tg-muted">{l}</td>
                <td style={{ padding: 4 }} className="tg-text-caption tg-muted">{d}</td>
              </tr>))}</tbody>
          </table>
        </section>
      ))}
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div className="tg-root" style={{ padding: 32, display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px 32px', alignItems: 'center' }}>
      {tokens.type.map(([n, fam, w, s, lh, ls]) => (
        <React.Fragment key={n as string}>
          <span style={{ font: `var(--tg-font-${n})`, letterSpacing: `var(--tg-tracking-${n})` }}>{n === 'display-timer' ? '01:24:38' : n === 'brand-logo' ? 'Timegrid' : 'Filters redesign'}</span>
          <span className="tg-text-caption tg-muted"><b className="tg-text-caption-strong" style={{ color: 'var(--tg-text-primary)' }}>{n}</b><br />{fam} {w} · {s}/{lh ?? 'auto'} · tracking {ls}px · <code>font: var(--tg-font-{n})</code></span>
        </React.Fragment>
      ))}
    </div>
  ),
};

export const SpacingAndRadius: StoryObj = {
  name: 'Spacing & radius',
  render: () => (
    <div className="tg-root" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
        {tokens.layout.filter(([n]) => (n as string).startsWith('space/') && n !== 'space/0').map(([n, v]) => (
          <div key={n as string} style={{ textAlign: 'center' }}><div style={{ width: v as number, height: 24, background: 'var(--tg-accent-primary)', borderRadius: 2, margin: '0 auto 6px' }} /><span className="tg-text-caption tg-muted">{n}<br />{v}px</span></div>))}
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {tokens.layout.filter(([n]) => (n as string).startsWith('radius/')).map(([n, v]) => (
          <div key={n as string} style={{ textAlign: 'center' }}><div style={{ width: 64, height: 64, background: 'var(--tg-fill-tertiary)', border: '1px solid var(--tg-separator-default)', borderRadius: v as number, marginBottom: 6 }} /><span className="tg-text-caption tg-muted">{(n as string).slice(7)} · {v}</span></div>))}
      </div>
      <div className="tg-text-caption tg-muted">Also: blur/window 40 · size/button-sm 28 · size/button-lg 44 · size/row 56</div>
    </div>
  ),
};
