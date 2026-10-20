---
description: "The fun-loader API: element members, registerTheme, getTheme, define, defineAll, the exported themes, constants and types."
---

# API

## The element

`<fun-loader>` takes the [options](/reference/options), plus:

| Member | Description |
| --- | --- |
| `current` | The message on screen (read-only). |
| `next()` | Shows the next message now. The regular timer keeps going. |

## `@vectorchi/fun-loader`

Importing this registers `<fun-loader>` and every built-in theme.

### `registerTheme(theme)`

Adds a theme, or replaces one with the same name.

```ts
registerTheme({ name: 'pirate', messages: ['Hoisting the sails…', 'Consulting the map…'] });
```

### `getTheme(name)`

Returns a registered theme's messages, or `undefined`.

```ts
getTheme('dev'); // ['Compiling thoughts…', 'Resolving dependencies…', …]
```

### `define(tag?)`

Registers the element, as `<fun-loader>` or under a tag of your choosing. Calling it again with a tag that's already registered does nothing.

```ts
define('ai-loader'); // now <ai-loader> works too
```

### `defineAll(tag?)`

`define()` plus registering every built-in theme. It runs automatically when you import `@vectorchi/fun-loader`. Use it to add the built-in themes under a custom tag.

### Themes

`thinking`, `dev`, `design`, `art`, `kitchen`, `finance`, `transfer` and `calm` are each exported as `{ name, messages }`:

```ts
import { finance } from '@vectorchi/fun-loader';
finance.messages.length; // 12
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
| `FunLoaderTheme` | `{ name: string; messages: readonly string[] }` |
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

The element without themes, and nothing registered. Exports everything from the main entry except the themes and `defineAll`. See [Smaller builds](/reference/smaller-builds).
