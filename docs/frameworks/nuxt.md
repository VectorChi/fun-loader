---
title: "AI loading text component for Nuxt"
description: "Use fun-loader in Nuxt with the @vectorchi/nuxt-fun-loader module: auto-imported FunLoader, only the themes you choose, and app-wide defaults."
---

# Using fun-loader with Nuxt

## Usage

```sh
npx nuxi module add @vectorchi/nuxt-fun-loader
```

This installs [`@vectorchi/nuxt-fun-loader`](https://github.com/VectorChi/nuxt-fun-loader) and adds it to `nuxt.config.ts`. It needs Nuxt 4 or later. `<FunLoader>` is then available in every component, with no import:

```vue
<script setup>
const loading = ref(false);
</script>

<template>
  <FunLoader v-if="loading" theme="dev" icon="dots" />
</template>
```

It takes the same props as the [Vue component](/frameworks/vue): every [option](/reference/options). Keep `messages` and `stages` in a constant or a `ref` rather than writing the array inline in the template: a new array on every render restarts the rotation.

## Choosing themes

By default all eight themes are bundled. List the ones you use, and only those reach the browser:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vectorchi/nuxt-fun-loader'],
  funLoader: {
    themes: ['thinking', 'dev'],
  },
});
```

An unknown name stops the build with the list of valid ones. If you leave out `thinking`, the first theme in your list becomes the default.

## App-wide defaults

Set props once for every `<FunLoader>`. Props on a single loader still win:

```ts
export default defineNuxtConfig({
  modules: ['@vectorchi/nuxt-fun-loader'],
  funLoader: {
    defaults: { theme: 'calm', icon: 'orbit', interval: 3000, label: 'Loading' },
  },
});
```

```vue
<!-- calm, orbit, 3000 ms -->
<FunLoader />
<!-- dev, orbit, 3000 ms -->
<FunLoader theme="dev" />
```

## Options

| Option | Default | What it does |
| --- | --- | --- |
| `themes` | `'all'` | `'all'`, or a list of theme names to bundle. |
| `defaults` | `{}` | `theme`, `icon`, `interval` and `label` for every `<FunLoader>`. |
| `prefix` | `'Fun'` | The component is named `<prefix>Loader`. |

## Using the plain tag

`<fun-loader>` works in templates with no setup. The module tells Vue it's a custom element and registers the element and your themes:

```vue
<template>
  <fun-loader theme="calm"></fun-loader>
</template>
```

`defaults` don't apply to the plain tag. Use `<FunLoader>` for those.

## Server rendering

The loader renders on the server like any component. The HTML carries the tag and its attributes, and the messages appear when the page's JavaScript runs. You don't need `<ClientOnly>`.

Toggle the loader with `v-if` around the request. Its wait clock starts when it enters the page, so the long-wait lines show after 8 and 20 seconds of that request.

## Size

The module adds about 2.5 kB (minified and compressed) to your app with one theme, and 3.9 kB with all eight.
