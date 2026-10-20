import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_INTERVAL,
  define,
  type FunLoader,
  getTheme,
  registerTheme,
  thinking,
} from '../src';

function mount(attrs: Record<string, string> = {}): FunLoader {
  const el = document.createElement('fun-loader');
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.append(el);
  return el;
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('<fun-loader>', () => {
  it('registers all bundled themes', () => {
    for (const name of ['thinking', 'design', 'dev', 'calm', 'kitchen', 'finance']) {
      expect(getTheme(name)?.length).toBeGreaterThan(1);
    }
  });

  it('shows the first message of the default theme', () => {
    const el = mount();
    expect(el.current).toBe(thinking.messages[0]);
    expect(el.getAttribute('role')).toBe('status');
  });

  it('rotates messages on the interval', () => {
    const el = mount({ theme: 'dev' });
    const messages = getTheme('dev') ?? [];
    vi.advanceTimersByTime(DEFAULT_INTERVAL);
    expect(el.current).toBe(messages[1]);
    vi.advanceTimersByTime(DEFAULT_INTERVAL);
    expect(el.current).toBe(messages[2]);
  });

  it('wraps around after the last message', () => {
    const el = mount();
    el.messages = ['a', 'b'];
    el.next();
    el.next();
    expect(el.current).toBe('a');
  });

  it('honours a custom interval', () => {
    const el = mount({ interval: '500' });
    el.messages = ['a', 'b'];
    vi.advanceTimersByTime(499);
    expect(el.current).toBe('a');
    vi.advanceTimersByTime(1);
    expect(el.current).toBe('b');
  });

  it('clamps very short intervals', () => {
    expect(mount({ interval: '10' }).interval).toBe(250);
    expect(mount({ interval: 'nope' }).interval).toBe(DEFAULT_INTERVAL);
  });

  it('stops while paused and resumes when unpaused', () => {
    const el = mount({ paused: '' });
    el.messages = ['a', 'b'];
    vi.advanceTimersByTime(DEFAULT_INTERVAL * 3);
    expect(el.current).toBe('a');
    el.paused = false;
    vi.advanceTimersByTime(DEFAULT_INTERVAL);
    expect(el.current).toBe('b');
  });

  it('stops rotating when removed from the page', () => {
    const el = mount();
    el.remove();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('switches theme when the attribute changes', () => {
    const el = mount();
    el.theme = 'kitchen';
    expect(el.current).toBe(getTheme('kitchen')?.[0]);
  });

  it('prefers custom messages over the theme, and falls back when cleared', () => {
    const el = mount({ theme: 'calm' });
    el.messages = ['custom'];
    expect(el.current).toBe('custom');
    expect(vi.getTimerCount()).toBe(0);
    el.messages = null;
    expect(el.current).toBe(getTheme('calm')?.[0]);
  });

  it('falls back to a default message for an unknown theme', () => {
    expect(mount({ theme: 'missing' }).current).toBe('Thinking…');
  });

  it('never repeats a message back to back when shuffling', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const el = mount({ shuffle: '' });
    el.messages = ['a', 'b', 'c'];
    const seen = [el.current];
    for (let i = 0; i < 9; i++) {
      el.next();
      seen.push(el.current);
    }
    for (let i = 1; i < seen.length; i++) expect(seen[i]).not.toBe(seen[i - 1]);
  });

  it('exposes the label to assistive tech and hides the rotating text', () => {
    const el = mount({ label: 'Generating answer' });
    const root = el.shadowRoot;
    expect(root?.querySelector('.sr')?.textContent).toBe('Generating answer');
    expect(root?.querySelector('[part="text"]')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('shows the default icon before the text', () => {
    const el = mount();
    const icon = el.shadowRoot?.querySelector('[part="icon"]');
    expect(icon?.className).toBe('i spinner');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
    expect(icon?.nextElementSibling?.nextElementSibling?.getAttribute('part')).toBe('text');
  });

  it('switches icon via attribute or property, ignoring unknown names', () => {
    const el = mount({ icon: 'dots' });
    const icon = () => el.shadowRoot?.querySelector('[part="icon"]')?.className;
    expect(icon()).toBe('i dots');
    el.icon = 'none';
    expect(icon()).toBe('i none');
    el.setAttribute('icon', 'nope');
    expect(el.icon).toBe('spinner');
    expect(icon()).toBe('i spinner');
  });

  it('supports custom themes and tag names', () => {
    registerTheme({ name: 'pirate', messages: ['Arr…', 'Hoisting sails…'] });
    define('pirate-loader');
    define('pirate-loader');
    const el = document.createElement('pirate-loader') as FunLoader;
    el.setAttribute('theme', 'pirate');
    document.body.append(el);
    expect(el.current).toBe('Arr…');
  });
});
