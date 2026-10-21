import { describe, expect, it } from 'vitest';
import { createApp, h, nextTick, ref } from 'vue';
import type { FunLoader as FunLoaderElement } from '../src';
import { FunLoader } from '../src/vue';

describe('Vue wrapper', () => {
  it('renders <fun-loader> and passes props through as properties', async () => {
    const paused = ref(true);
    const host = document.createElement('div');
    document.body.append(host);
    createApp({
      render: () => h(FunLoader, { theme: 'design', paused: paused.value, messages: ['x', 'y'] }),
    }).mount(host);

    const el = host.querySelector('fun-loader') as FunLoaderElement;
    expect(el.theme).toBe('design');
    expect(el.paused).toBe(true);
    expect(el.current).toBe('x');

    paused.value = false;
    await nextTick();
    expect(el.paused).toBe(false);
    expect(el.hasAttribute('interval')).toBe(false);
  });
});

describe('Vue wrapper stages', () => {
  it('passes stages through as a property', () => {
    const host = document.createElement('div');
    document.body.append(host);
    const stages = [
      { after: 0, messages: ['first…'] },
      { after: 5000, messages: ['later…'] },
    ];
    createApp({ render: () => h(FunLoader, { stages }) }).mount(host);
    const el = host.querySelector('fun-loader') as FunLoaderElement;
    expect(el.stages).toEqual(stages);
    expect(el.current).toBe('first…');
  });
});
