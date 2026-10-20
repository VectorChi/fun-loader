# fun-loader

[![npm](https://img.shields.io/npm/v/@vectorchi/fun-loader)](https://www.npmjs.com/package/@vectorchi/fun-loader)
[![license](https://img.shields.io/npm/l/@vectorchi/fun-loader)](LICENSE)

Playful, rotating loading text for AI requests and other slow tasks. Instead of a bare spinner, show "Connecting the dots…", "Compiling thoughts…" or "Crunching the numbers…".

![Six loaders, each pairing a theme with an icon](https://raw.githubusercontent.com/VectorChi/fun-loader/main/.github/assets/demo.png)

**[Documentation and live examples →](https://vectorchi.github.io/fun-loader/)**

- **One tag, any stack:** a standard web component that works in plain HTML, React, Next.js and Vue.
- **About 3 kB** minified and compressed, with every theme included. No dependencies.
- **8 themes and 5 animated icons**, or your own messages.
- **Accessible:** screen readers hear one short label, not every rotating message, and it respects reduced-motion settings.

## Quick start

```sh
npm install @vectorchi/fun-loader
```

```js
import '@vectorchi/fun-loader';
```

```html
<fun-loader theme="thinking"></fun-loader>
```

Or with no build step:

```html
<script src="https://cdn.jsdelivr.net/npm/@vectorchi/fun-loader@0.3"></script>
```

**React and Next.js**

```tsx
import { FunLoader } from '@vectorchi/fun-loader/react';

{loading && <FunLoader theme="art" icon="sparkle" />}
```

**Vue**

```vue
<script setup>
import { FunLoader } from '@vectorchi/fun-loader/vue';
</script>

<template>
  <FunLoader v-if="loading" theme="dev" shuffle />
</template>
```

## Learn more

- [Waiting for AI responses](https://vectorchi.github.io/fun-loader/guides/ai-responses), including streaming
- [Themes](https://vectorchi.github.io/fun-loader/customize/themes): `thinking`, `dev`, `design`, `art`, `kitchen`, `finance`, `transfer`, `calm`
- [Icons](https://vectorchi.github.io/fun-loader/customize/icons) and [styling](https://vectorchi.github.io/fun-loader/customize/styling)
- [Custom messages](https://vectorchi.github.io/fun-loader/guides/custom-messages) and [payment flows](https://vectorchi.github.io/fun-loader/guides/payment-flows)
- [All options](https://vectorchi.github.io/fun-loader/reference/options) and [API](https://vectorchi.github.io/fun-loader/reference/api)
- [Playground](https://vectorchi.github.io/fun-loader/playground)

## Development

```sh
pnpm install
pnpm test          # unit tests
pnpm docs:dev      # docs site with live examples
pnpm build         # build the package
```

## License

[MIT](LICENSE) © Adimchi Oka
