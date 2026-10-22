import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type FunLoader, type FunLoaderStage, getThemeStages, registerTheme } from '../src';

const STAGES: FunLoaderStage[] = [
  { after: 0, messages: ['a1…', 'a2…'] },
  { after: 1000, messages: ['b1…', 'b2…'] },
  { after: 3000, messages: ['c1…', 'c2…'] },
];
const stageOf = (text: string) => STAGES.findIndex((s) => s.messages.includes(text));

registerTheme({ name: 'staged', messages: STAGES[0]?.messages ?? [], stages: STAGES });

function mount(attrs: Record<string, string> = {}): FunLoader {
  const el = document.createElement('fun-loader');
  // A long interval keeps rotation out of the way, so only stage switches change the text.
  el.setAttribute('interval', '60000');
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

describe('stages', () => {
  it('starts in stage 0 and switches exactly at each boundary', () => {
    const el = mount({ theme: 'staged' });
    expect(el.stage).toBe(0);
    expect(stageOf(el.current)).toBe(0);

    vi.advanceTimersByTime(999);
    expect(el.stage).toBe(0);
    vi.advanceTimersByTime(1);
    expect(el.stage).toBe(1);
    expect(stageOf(el.current)).toBe(1);

    vi.advanceTimersByTime(1999);
    expect(el.stage).toBe(1);
    vi.advanceTimersByTime(1);
    expect(el.stage).toBe(2);
    expect(stageOf(el.current)).toBe(2);
  });

  it('switches at the boundary without waiting for the next rotation tick', () => {
    const el = mount({ theme: 'staged', interval: '2400' });
    vi.advanceTimersByTime(1000);
    expect(stageOf(el.current)).toBe(1);
  });

  it('rotates within a stage on the interval', () => {
    const el = mount({ theme: 'staged', interval: '400' });
    const first = el.current;
    vi.advanceTimersByTime(400);
    expect(el.current).not.toBe(first);
    expect(stageOf(el.current)).toBe(0);
  });

  it('freezes the clock while paused', () => {
    const el = mount({ theme: 'staged' });
    vi.advanceTimersByTime(500);
    el.paused = true;
    vi.advanceTimersByTime(60_000);
    expect(el.stage).toBe(0);

    el.paused = false;
    vi.advanceTimersByTime(499);
    expect(el.stage).toBe(0);
    vi.advanceTimersByTime(1);
    expect(el.stage).toBe(1);
  });

  it('starts with a frozen clock when connected paused', () => {
    const el = mount({ theme: 'staged', paused: '' });
    vi.advanceTimersByTime(10_000);
    expect(el.stage).toBe(0);
    el.paused = false;
    vi.advanceTimersByTime(1000);
    expect(el.stage).toBe(1);
  });

  it('resets the clock when removed and added again', () => {
    const el = mount({ theme: 'staged' });
    vi.advanceTimersByTime(1500);
    expect(el.stage).toBe(1);

    el.remove();
    vi.advanceTimersByTime(10_000);
    document.body.append(el);
    expect(el.stage).toBe(0);
    expect(stageOf(el.current)).toBe(0);
    vi.advanceTimersByTime(999);
    expect(el.stage).toBe(0);
    vi.advanceTimersByTime(1);
    expect(el.stage).toBe(1);
  });

  it('keeps the wait clock running in icon-only mode', () => {
    const el = mount({ theme: 'staged', 'icon-only': '' });
    vi.advanceTimersByTime(1500);
    el.iconOnly = false;
    expect(el.stage).toBe(1);
  });

  it('runs no timers while disconnected', () => {
    const el = mount({ theme: 'staged' });
    el.remove();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('lets the stages property override the theme', () => {
    const el = mount({ theme: 'staged' });
    el.stages = [
      { after: 0, messages: ['x…'] },
      { after: 200, messages: ['y…'] },
    ];
    expect(el.current).toBe('x…');
    vi.advanceTimersByTime(200);
    expect(el.stage).toBe(1);
    expect(el.current).toBe('y…');
  });

  it('keeps the elapsed time when the stages change mid-wait', () => {
    const el = mount({ theme: 'staged' });
    vi.advanceTimersByTime(1500);
    el.stages = [
      { after: 0, messages: ['x…'] },
      { after: 1000, messages: ['y…'] },
      { after: 2000, messages: ['z…'] },
    ];
    expect(el.current).toBe('y…');
    vi.advanceTimersByTime(500);
    expect(el.current).toBe('z…');
  });

  it('treats stages = [] or null as staging disabled', () => {
    for (const value of [[], null]) {
      const el = mount({ theme: 'staged' });
      el.stages = value;
      vi.advanceTimersByTime(10_000);
      expect(el.stage).toBe(0);
      expect(stageOf(el.current)).toBe(0);
      expect(el.stages).toHaveLength(1);
      el.remove();
    }
  });

  it('returns to the theme stages when stages is set to undefined', () => {
    const el = mount({ theme: 'staged' });
    el.stages = null;
    el.stages = undefined;
    vi.advanceTimersByTime(1000);
    expect(el.stage).toBe(1);
  });

  it("keeps today's single-stage behavior when only messages is set", () => {
    const el = mount({ theme: 'staged', interval: '300' });
    el.messages = ['m1…', 'm2…'];
    vi.advanceTimersByTime(30_000);
    expect(el.stage).toBe(0);
    expect(['m1…', 'm2…']).toContain(el.current);
    expect(el.stages).toEqual([{ after: 0, messages: ['m1…', 'm2…'] }]);
  });

  it('prefers an explicit stages list over messages', () => {
    const el = mount();
    el.messages = ['m…'];
    el.stages = [{ after: 0, messages: ['s…'] }];
    expect(el.current).toBe('s…');
  });

  it('sorts stages and always starts the first one at 0', () => {
    const el = mount();
    el.stages = [
      { after: 500, messages: ['late…'] },
      { after: 100, messages: ['early…'] },
    ];
    expect(el.current).toBe('early…');
    vi.advanceTimersByTime(500);
    expect(el.current).toBe('late…');
  });

  it('never shows the same message twice in a row across a stage change', () => {
    // Every stage contains the message on screen; the switch must still change the text.
    for (let seed = 0; seed < 20; seed++) {
      vi.spyOn(Math, 'random').mockReturnValue(seed / 20);
      const el = mount();
      el.stages = [
        { after: 0, messages: ['same…', 'one…'] },
        { after: 100, messages: ['same…', 'two…'] },
      ];
      const before = el.current;
      vi.advanceTimersByTime(100);
      expect(el.current).not.toBe(before);
      el.remove();
      vi.restoreAllMocks();
    }
  });

  it("exposes a theme's stages", () => {
    expect(getThemeStages('staged')).toEqual(STAGES);
    expect(getThemeStages('missing')).toBeUndefined();
  });

  it('never announces stage changes', () => {
    const el = mount({ theme: 'staged', label: 'Generating answer' });
    const sr = () => el.shadowRoot?.querySelector('.sr')?.textContent;
    vi.advanceTimersByTime(3000);
    expect(sr()).toBe('Generating answer');
    expect(el.shadowRoot?.querySelector('[part="text"]')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('gives every built-in theme three stages at 0, 8000 and 20000 ms', async () => {
    const themes = await import('../src/themes');
    for (const theme of Object.values(themes)) {
      expect(getThemeStages(theme.name)?.map((s) => s.after)).toEqual([0, 8000, 20_000]);
    }
  });
});
