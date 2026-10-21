import { act, createElement, createRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it } from 'vitest';
import type { FunLoader as FunLoaderElement } from '../src';
import { FunLoader } from '../src/react';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  document.body.innerHTML = '';
});

function render(element: ReturnType<typeof createElement>) {
  const host = document.createElement('div');
  document.body.append(host);
  const root = createRoot(host);
  act(() => root.render(element));
  return { host, root, el: host.querySelector('fun-loader') as FunLoaderElement };
}

describe('React wrapper', () => {
  it('passes string props as attributes and the rest as properties', () => {
    const { el } = render(
      createElement(FunLoader, {
        theme: 'art',
        icon: 'sparkle',
        interval: 3000,
        shuffle: true,
        messages: ['one', 'two'],
      }),
    );
    expect(el.getAttribute('theme')).toBe('art');
    expect(el.icon).toBe('sparkle');
    expect(el.interval).toBe(3000);
    expect(el.shuffle).toBe(true);
    expect(el.messages).toEqual(['one', 'two']);
    expect(el.getAttribute('role')).toBe('status');
  });

  it('treats paused={false} as not paused and reacts to changes', () => {
    let setPaused: (value: boolean) => void = () => {};
    function App() {
      const [paused, set] = useState(true);
      setPaused = set;
      return createElement(FunLoader, { paused });
    }
    const { el } = render(createElement(App));
    expect(el.paused).toBe(true);
    act(() => setPaused(false));
    expect(el.paused).toBe(false);
  });

  it('forwards the ref to the element', () => {
    const ref = createRef<FunLoaderElement>();
    render(createElement(FunLoader, { ref, ordered: true, messages: ['a', 'b'] }));
    expect(ref.current?.current).toBe('a');
    act(() => ref.current?.next());
    expect(ref.current?.current).toBe('b');
  });

  it('passes through other HTML props', () => {
    const { el } = render(createElement(FunLoader, { className: 'x', id: 'loader' }));
    expect(el.id).toBe('loader');
    expect(el.className).toBe('x');
  });

  it('shuffles by default, with ordered and the old shuffle={false} keeping order', () => {
    expect(render(createElement(FunLoader, {})).el.ordered).toBe(false);
    expect(render(createElement(FunLoader, { ordered: true })).el.ordered).toBe(true);
    expect(render(createElement(FunLoader, { shuffle: false })).el.ordered).toBe(true);
    expect(render(createElement(FunLoader, { shuffle: true })).el.ordered).toBe(false);
  });

  it('passes stages through as a property', () => {
    const stages = [
      { after: 0, messages: ['first…'] },
      { after: 5000, messages: ['later…'] },
    ];
    const { el } = render(createElement(FunLoader, { stages }));
    expect(el.stages).toEqual(stages);
    expect(el.current).toBe('first…');
  });

  it('renders on the server with its attributes', () => {
    const html = renderToString(createElement(FunLoader, { theme: 'finance', interval: 2000 }));
    expect(html).toContain('<fun-loader');
    expect(html).toContain('theme="finance"');
    expect(html).toContain('interval="2000"');
    expect(html).toContain('role="status"');
  });
});
