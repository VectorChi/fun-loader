import { describe, expect, it } from 'vitest';
import manifest from '../custom-elements.json';
import { DEFAULT_ICON, DEFAULT_INTERVAL, DEFAULT_THEME, FunLoader, ICONS } from '../src';

// custom-elements.json is hand-written; these checks keep it in step with the element.
const [declaration] = manifest.modules[0]?.declarations ?? [];
const attributes = declaration?.attributes ?? [];
const attribute = (name: string) => attributes.find((a) => a.name === name);

describe('custom-elements.json', () => {
  it('lists exactly the observed attributes', () => {
    expect(attributes.map((a) => a.name).sort()).toEqual([...FunLoader.observedAttributes].sort());
  });

  it('matches the defaults', () => {
    expect(attribute('theme')?.default).toBe(JSON.stringify(DEFAULT_THEME));
    expect(attribute('icon')?.default).toBe(JSON.stringify(DEFAULT_ICON));
    expect(attribute('interval')?.default).toBe(String(DEFAULT_INTERVAL));
  });

  it('lists every icon', () => {
    expect(attribute('icon')?.type.text).toBe(ICONS.map((icon) => `'${icon}'`).join(' | '));
  });

  it('documents every public member', () => {
    const names = declaration?.members.map((m) => m.name) ?? [];
    for (const name of ['messages', 'current', 'next']) expect(names).toContain(name);
    for (const name of names) expect(name in FunLoader.prototype).toBe(true);
  });

  it('lists the CSS parts and custom properties the element uses', () => {
    const el = document.createElement('fun-loader');
    document.body.append(el);
    for (const { name } of declaration?.cssParts ?? []) {
      expect(el.shadowRoot?.querySelector(`[part="${name}"]`)).not.toBeNull();
    }
    const css = el.shadowRoot?.querySelector('style')?.textContent ?? '';
    for (const { name } of declaration?.cssProperties ?? []) expect(css).toContain(name);
    el.remove();
  });
});
