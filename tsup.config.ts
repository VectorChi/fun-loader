import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      element: 'src/element.ts',
      'themes/index': 'src/themes/index.ts',
      'themes/art': 'src/themes/art.ts',
      'themes/thinking': 'src/themes/thinking.ts',
      'themes/design': 'src/themes/design.ts',
      'themes/dev': 'src/themes/dev.ts',
      'themes/finance': 'src/themes/finance.ts',
      'themes/calm': 'src/themes/calm.ts',
      'themes/kitchen': 'src/themes/kitchen.ts',
      'themes/transfer': 'src/themes/transfer.ts',
      'vue/index': 'src/vue/index.ts',
    },
    format: ['esm'],
    target: 'es2020',
    dts: true,
    clean: true,
    treeshake: true,
    splitting: true,
    external: ['vue'],
  },
  {
    entry: { 'fun-loader': 'src/index.ts' },
    format: ['iife'],
    globalName: 'FunLoader',
    target: 'es2020',
    minify: true,
    outExtension: () => ({ js: '.iife.js' }),
  },
]);
