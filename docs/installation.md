---
title: "Install fun-loader from npm or a CDN"
description: "Install fun-loader from npm or load it from a CDN with one script tag, and see what each import includes and how big it is."
---

# Installation

## From npm

```sh
npm install @vectorchi/fun-loader
```

Then import the package once, anywhere in your app:

```js
import '@vectorchi/fun-loader';
```

That defines the `<fun-loader>` tag and registers every built-in theme. Now use it like any HTML tag:

```html
<fun-loader theme="dev" icon="dots"></fun-loader>
```

Using React, Vue or Nuxt? Use the component instead: see [React & Next.js](/frameworks/react), [Vue](/frameworks/vue) or [Nuxt](/frameworks/nuxt).

## From a CDN

No build step needed. Add one script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/@vectorchi/fun-loader@0.5"></script>

<fun-loader theme="thinking"></fun-loader>
```

The `@0.5` pins you to 0.5.x releases. Until 1.0, a new minor version (0.6, 0.7) can include breaking changes, so move the pin up on purpose, after reading the [changelog](https://github.com/VectorChi/fun-loader/blob/main/CHANGELOG.md). Leave it out to always get the latest version.

unpkg works too: `https://unpkg.com/@vectorchi/fun-loader@0.5`.

## What you get

| Import | What it is | Size |
| --- | --- | --- |
| `@vectorchi/fun-loader` | The element and all themes, registered automatically | 4.4 kB |
| `@vectorchi/fun-loader/react` | React component | 4.5 kB |
| `@vectorchi/fun-loader/vue` | Vue component | 4.4 kB |
| `@vectorchi/fun-loader/element` | The element only, nothing registered | 2.3 kB |
| `@vectorchi/fun-loader/themes/<name>` | A single theme, with its long-wait lines | up to 0.6 kB |

Sizes are minified and compressed, excluding React and Vue themselves. You only ever load one of the first four. See [Smaller builds](/reference/smaller-builds) for the last two.
