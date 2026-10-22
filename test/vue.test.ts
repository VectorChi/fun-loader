import { describe, expect, it } from 'vitest';
import { createApp, createSSRApp, h, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import type { FunLoader as FunLoaderElement } from '../src';
import { FunLoader } from '../src/vue';

describe('Vue wrapper', () => {
  it('renders <fun-loader> and passes props through as properties', async () => {
    const paused = ref(true);
    const host = document.createElement('div');
    document.body.append(host);
    createApp({
      render: () =>
        h(FunLoader, {
          theme: 'design',
          paused: paused.value,
          ordered: true,
          messages: ['x', 'y'],
        }),
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

describe('Vue wrapper ordering', () => {
  it('shuffles by default, with ordered and the old :shuffle="false" keeping order', () => {
    const mountWith = (props: Record<string, unknown>) => {
      const host = document.createElement('div');
      document.body.append(host);
      createApp({ render: () => h(FunLoader, props) }).mount(host);
      return host.querySelector('fun-loader') as FunLoaderElement;
    };
    expect(mountWith({}).ordered).toBe(false);
    expect(mountWith({ ordered: true }).ordered).toBe(true);
    expect(mountWith({ shuffle: false }).ordered).toBe(true);
    expect(mountWith({ shuffle: true }).ordered).toBe(false);
  });
});

describe('Vue wrapper iconOnly', () => {
  it('passes iconOnly through as a property', () => {
    const host = document.createElement('div');
    document.body.append(host);
    createApp({ render: () => h(FunLoader, { iconOnly: true }) }).mount(host);
    expect((host.querySelector('fun-loader') as FunLoaderElement).iconOnly).toBe(true);
  });
});

describe('Vue wrapper server rendering', () => {
  const render = (props: Record<string, unknown>) =>
    renderToString(createSSRApp({ render: () => h(FunLoader, props) }));

  it('leaves booleans that are off out of the HTML', async () => {
    // paused="false" would read as paused until hydration.
    expect(await render({ theme: 'dev' })).toBe('<fun-loader theme="dev"></fun-loader>');
  });

  it('writes booleans that are on as attributes', async () => {
    const html = await render({ paused: true, iconOnly: true, ordered: true });
    expect(html).toMatch(/ paused="true"/);
    expect(html).toMatch(/ icon-only="true"/);
    expect(html).toMatch(/ ordered="true"/);
    expect(await render({ shuffle: false })).toMatch(/ ordered="true"/);
  });

  it('switches booleans off again in the browser', async () => {
    const on = ref(true);
    const host = document.createElement('div');
    document.body.append(host);
    createApp({
      render: () => h(FunLoader, { paused: on.value, iconOnly: on.value, ordered: on.value }),
    }).mount(host);
    const el = host.querySelector('fun-loader') as FunLoaderElement;
    expect([el.paused, el.iconOnly, el.ordered]).toEqual([true, true, true]);
    on.value = false;
    await nextTick();
    expect([el.paused, el.iconOnly, el.ordered]).toEqual([false, false, false]);
    expect(el.hasAttribute('icon-only')).toBe(false);
  });
});
