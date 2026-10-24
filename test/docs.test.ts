import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_ICON, DEFAULT_INTERVAL, DEFAULT_THEME, ICONS } from '../src';

// The docs list the icons and defaults by hand; these checks keep them in step with the element.
// A path, not a URL: the test DOM replaces the global URL, which readFileSync does not accept.
const doc = (path: string) => readFileSync(join(import.meta.dirname, '../docs', path), 'utf8');
const quoted = (names: readonly string[]) => names.map((n) => `'${n}'`).join(', ');

describe('docs', () => {
  it('API constants match the element', () => {
    const api = doc('reference/api.md');
    expect(api).toContain(`| \`ICONS\` | \`[${quoted(ICONS)}]\` |`);
    expect(api).toContain(`| \`DEFAULT_THEME\` | \`'${DEFAULT_THEME}'\` |`);
    expect(api).toContain(`| \`DEFAULT_ICON\` | \`'${DEFAULT_ICON}'\` |`);
    expect(api).toContain(`| \`DEFAULT_INTERVAL\` | \`${DEFAULT_INTERVAL}\` |`);
  });

  it('every icon is on the Icons page and in the Playground intro', () => {
    const icons = doc('customize/icons.md');
    const playground = doc('playground.md');
    for (const icon of ICONS) {
      expect(icons).toContain(`icon="${icon}"`);
      expect(icons).toMatch(new RegExp(`^\\| \`${icon}\``, 'm'));
      expect(playground).toContain(`\`${icon}\``);
    }
  });
});
