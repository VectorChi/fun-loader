import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import pkg from '../package.json';
import registry from '../registry.json';

// The shadcn registry is built into the docs site; these checks keep it in step with the package.
const root = join(import.meta.dirname, '..');
const item = (name: string) => registry.items.find((i) => i.name === name);

describe('shadcn registry', () => {
  it('installs the current version of the package', () => {
    expect(item('fun-loader')?.dependencies).toEqual([`${pkg.name}@^${pkg.version}`]);
  });

  it('points at files that exist', () => {
    for (const { files } of registry.items) {
      for (const file of files) expect(existsSync(join(root, file.path)), file.path).toBe(true);
    }
  });

  it('links items through the published registry URL', () => {
    const url = new URL('r/fun-loader.json', registry.homepage).href;
    expect(item('fun-loader-message')?.registryDependencies).toContain(url);
  });

  it('stays flat, as the shadcn directory requires', () => {
    for (const { files } of registry.items) {
      for (const file of files) expect(file).not.toHaveProperty('content');
    }
  });
});
