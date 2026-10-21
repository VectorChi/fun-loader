---
description: "The fun-loader API: element members, stages, registerTheme, getTheme, define, defineAll, the exported themes, constants and types."
---

# API

## The element

`<fun-loader>` takes the [options](/reference/options), plus:

| Member | Description |
| --- | --- |
| `current` | The message on screen (read-only). |
| `stage` | The index of the current [stage](/reference/options#stages), starting at 0 (read-only). |
| `next()` | Shows the next message now. The regular timer keeps going. |

## `@vectorchi/fun-loader`

Importing this registers `<fun-loader>` and every built-in theme.

### `registerTheme(theme)`

Adds a theme, or replaces one with the same name. Give it `stages` to make it change with the wait, or only `messages` for a theme that never changes.

```ts
registerTheme({ name: 'pirate', messages: ['Hoisting the sails…', 'Consulting the map…'] });
```

### `staged(messages, long?, veryLong?)`

Builds the three stages every built-in theme uses: your `messages` first, then the shared long-wait lines after 8 seconds and after 20 seconds. Pass your own lists as `long` and `veryLong` to replace the shared ones.

```ts
registerTheme({ name: 'pirate', messages, stages: staged(messages) });
```

`LONG_WAIT` and `VERY_LONG_WAIT` are the shared lists themselves.

### `getTheme(name)`

Returns a registered theme's first-stage messages, or `undefined`.

```ts
getTheme('dev'); // ['Asking the rubber duck…', 'Reading the stack trace twice…', …]
```

### `getThemeStages(name)`

Returns all of a registered theme's stages, or `undefined`.

### `define(tag?)`

Registers the element, as `<fun-loader>` or under a tag of your choosing. Calling it again with a tag that's already registered does nothing.

```ts
define('ai-loader'); // now <ai-loader> works too
```

### `defineAll(tag?)`

`define()` plus registering every built-in theme. It runs automatically when you import `@vectorchi/fun-loader`. Use it to add the built-in themes under a custom tag.

### Themes

`thinking`, `dev`, `design`, `art`, `kitchen`, `finance`, `transfer` and `calm` are each exported as `{ name, messages, stages }`:

```ts
import { finance } from '@vectorchi/fun-loader';
finance.stages.length; // 3
```

### Constants

| Export | Value |
| --- | --- |
| `ICONS` | `['spinner', 'dots', 'bars', 'pulse', 'sparkle', 'none']` |
| `DEFAULT_THEME` | `'thinking'` |
| `DEFAULT_ICON` | `'spinner'` |
| `DEFAULT_INTERVAL` | `2400` |

### Types

| Export | Description |
| --- | --- |
| `FunLoader` | The element class. Also its type, for refs. |
| `FunLoaderTheme` | `{ name: string; messages: readonly string[]; stages?: readonly FunLoaderStage[] }` |
| `FunLoaderStage` | `{ after: number; messages: readonly string[] }`: `after` is milliseconds of waiting. |
| `FunLoaderIcon` | One of the `ICONS` names. |

## `@vectorchi/fun-loader/react`

| Export | Description |
| --- | --- |
| `FunLoader` | React component. Takes the options as props, plus any HTML props. `ref` gives you the element. |
| `FunLoaderProps` | Its props type. |

See [React & Next.js](/frameworks/react).

## `@vectorchi/fun-loader/vue`

| Export | Description |
| --- | --- |
| `FunLoader` | Vue component. Takes the options as props. Also the default export. |

See [Vue](/frameworks/vue).

## `@vectorchi/fun-loader/element`

The element without themes, and nothing registered. Exports everything from the main entry except the themes, `staged`, the shared long-wait lists and `defineAll`. See [Smaller builds](/reference/smaller-builds).
