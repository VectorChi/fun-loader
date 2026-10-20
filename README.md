# fun-loader

A tiny web component (~2 kB) that shows rotating, playful loading text while an AI request is generating.

```html
<fun-loader theme="kitchen"></fun-loader>
```

## Install

```sh
npm install @vectorchi/fun-loader
```

```js
import '@vectorchi/fun-loader'; // defines <fun-loader> and registers every bundled theme
```

Or straight from a CDN:

```html
<script src="https://unpkg.com/@vectorchi/fun-loader"></script>
```

## Attributes and properties

| Attribute  | Property   | Default      | Description                                              |
| ---------- | ---------- | ------------ | -------------------------------------------------------- |
| `theme`    | `theme`    | `"thinking"` | One of `thinking`, `design`, `dev`, `calm`, `kitchen`, `finance`, `transfer`, `art`, or your own. |
| `interval` | `interval` | `2400`       | Milliseconds between messages (minimum 250).             |
| `paused`   | `paused`   | `false`      | Stops rotating.                                          |
| `shuffle`  | `shuffle`  | `false`      | Random order, never the same message twice in a row.     |
| `label`    | `label`    | `"Loading"`  | Text announced to screen readers.                        |
| `icon`     | `icon`     | `"spinner"`  | Animated icon before the text: `spinner`, `dots`, `bars`, `pulse`, `sparkle` or `none`. |
| —          | `messages` | —            | A custom `string[]`, which overrides `theme`.            |

Read `el.current` for the message on screen and call `el.next()` to advance it.

## Icons

An animated icon sits before the text. Pick one with the `icon` attribute:

```html
<fun-loader icon="sparkle"></fun-loader>
<fun-loader icon="none"></fun-loader> <!-- text only -->
```

| `icon`              | Looks like                                |
| ------------------- | ----------------------------------------- |
| `spinner` (default) | A ring with a gap, rotating               |
| `dots`              | Three dots bouncing in turn               |
| `bars`              | Three bars rising and falling in turn     |
| `pulse`             | A dot that grows and fades out            |
| `sparkle`           | A ✦ that twinkles and turns               |
| `none`              | No icon                                   |

From JavaScript, set the property: `loader.icon = 'dots'`. The list is exported as `ICONS`. An unknown name falls back to `spinner`. You can see every icon in the [playground](https://vectorchi.github.io/fun-loader/).

## Payment flows

`transfer` is written for money transfers: calm, reassuring and generic. It never names a step such as "Verifying recipient", because the loader can't know which step your backend is really on. If your flow has real stages, pass your own `messages` that match them.

```html
<fun-loader theme="transfer" icon="pulse" interval="3000"></fun-loader>
```

## Custom themes

```js
import { registerTheme } from '@vectorchi/fun-loader';

registerTheme({ name: 'pirate', messages: ['Hoisting the sails…', 'Consulting the map…'] });
```

## Smaller builds

`@vectorchi/fun-loader/element` exports the element with no themes and no side effects (~1 kB):

```js
import { define, registerTheme } from '@vectorchi/fun-loader/element';
import { dev } from '@vectorchi/fun-loader/themes/dev';

registerTheme(dev);
define(); // or define('my-loader')
```

## Vue

```vue
<script setup>
import { FunLoader } from '@vectorchi/fun-loader/vue';
</script>

<template>
  <FunLoader v-if="loading" theme="dev" shuffle />
</template>
```

## React and Next.js

```tsx
import { FunLoader } from '@vectorchi/fun-loader/react';

{loading && <FunLoader theme="art" icon="sparkle" />}
```

Works with React 18 and 19. Props such as `messages={[...]}` and `paused={false}` behave the same in both. `ref` gives you the element, so `ref.current.next()` works.

In Next.js, the wrapper is already a client component, so you can render it from a server component.

Importing `@vectorchi/fun-loader/react` also adds TypeScript types for the plain `<fun-loader>` tag in TSX.

## Styling

The text is exposed as `::part(text)` and the icon as `::part(icon)`. The icon is `1em` square, so it scales with `font-size`.

| Custom property           | Default        | Description                    |
| ------------------------- | -------------- | ------------------------------ |
| `--fun-loader-fade`       | `300ms`        | Fade-in duration for each message. |
| `--fun-loader-gap`        | `0.5em`        | Space between icon and text.   |
| `--fun-loader-icon-color` | `currentColor` | Icon color.                    |

When the user prefers reduced motion, the text stops sliding and the icon gently fades in and out instead of moving. The icon also stops while `paused` is set.

```css
fun-loader {
  --fun-loader-icon-color: rebeccapurple;
}
fun-loader::part(text) {
  color: var(--muted);
  font-style: italic;
}
```

## Accessibility

The element has `role="status"`. Screen readers announce `label` once, and the rotating text is hidden from them so they don't hear a new message every couple of seconds.

## License

MIT
