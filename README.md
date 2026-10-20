# fun-loader

A tiny web component (~2 kB) that shows rotating, playful loading text while an AI request is generating.

```html
<fun-loader theme="kitchen"></fun-loader>
```

## Install

```sh
npm install fun-loader
```

```js
import 'fun-loader'; // defines <fun-loader> and registers every bundled theme
```

Or straight from a CDN:

```html
<script src="https://unpkg.com/fun-loader"></script>
```

## Attributes and properties

| Attribute  | Property   | Default      | Description                                              |
| ---------- | ---------- | ------------ | -------------------------------------------------------- |
| `theme`    | `theme`    | `"thinking"` | One of `thinking`, `design`, `dev`, `calm`, `kitchen`, or your own. |
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

## Custom themes

```js
import { registerTheme } from 'fun-loader';

registerTheme({ name: 'pirate', messages: ['Hoisting the sails…', 'Consulting the map…'] });
```

## Smaller builds

`fun-loader/element` exports the element with no themes and no side effects (~1 kB):

```js
import { define, registerTheme } from 'fun-loader/element';
import { dev } from 'fun-loader/themes/dev';

registerTheme(dev);
define(); // or define('my-loader')
```

## Vue

```vue
<script setup>
import { FunLoader } from 'fun-loader/vue';
</script>

<template>
  <FunLoader v-if="loading" theme="dev" shuffle />
</template>
```

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
