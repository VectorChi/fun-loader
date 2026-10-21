---
title: "All options: theme, icon, interval, stages"
description: "Every fun-loader option (theme, icon, interval, ordered, paused, label, messages, stages) with types, defaults and attribute behavior."
---

# Options reference

Every option works as an HTML attribute, as a JavaScript property, and as a prop on the React and Vue components. `messages` and `stages` are the exceptions: they're properties and props only, because attributes can't hold a list.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `string` | `"thinking"` | A [built-in theme](/customize/themes) or one you registered. |
| `icon` | `string` | `"spinner"` | `spinner`, `dots`, `bars`, `pulse`, `sparkle` or `none`. See [Icons](/customize/icons). |
| `interval` | `number` | `2400` | Milliseconds between messages. Values below 250 become 250. |
| `ordered` | `boolean` | `false` | Show messages in the order written. By default each stage is shuffled: every message shows once before any repeats, and the same message never shows twice in a row. |
| `paused` | `boolean` | `false` | Stops the text and the icon, and freezes the [wait clock](#stages). |
| `label` | `string` | `"Loading"` | What screen readers announce. See [Accessibility](/customize/accessibility). |
| `messages` | `string[]` | none | Your own messages, as a single stage that overrides `theme`. Set to `null` to go back to the theme. |
| `stages` | `Stage[]` | the theme's | Message sets that take over as the wait grows. See [Stages](#stages). |

## Stages

Each built-in theme has three stages. After 8 seconds of waiting, its messages change to lines that acknowledge the longer wait, and again after 20 seconds. A stage is `{ after, messages }`, where `after` is milliseconds of waiting:

```js
loader.stages = [
  { after: 0, messages: ['Reading your files…', 'Skimming the long ones…'] },
  { after: 8000, messages: ['Lots of files, still reading…'] },
  { after: 20_000, messages: ['Thanks for waiting…'] },
];
```

- **The clock counts active waiting.** It starts when the loader appears on the page, stands still while `paused` is on, and starts over if the loader is removed and added again.
- **Stages switch exactly on time,** not on the next message change.
- **Stage 0 always starts at 0.** Stages are sorted by `after`, so the order you write them in doesn't matter.
- **`stages` wins over `messages`,** and both win over `theme`.
- **`stages = []` or `null` turns staging off:** only the first stage (your `messages`, or the theme's first stage) is used. **`stages = undefined`** goes back to the theme's stages.
- **Setting only `messages` gives one stage,** so your messages never change with time, as before 0.4.0.
- **Screen readers aren't told** about stage changes. They hear `label` once.

## Attributes vs. properties

On/off attributes are on when present, whatever their value:

```html
<fun-loader paused></fun-loader>        <!-- paused -->
<fun-loader paused="false"></fun-loader> <!-- still paused! -->
<fun-loader></fun-loader>               <!-- not paused -->
```

From JavaScript, use the property to turn it off: `loader.paused = false`. The React and Vue components handle this for you.

## Shuffle is now the default

Before 0.4.0, messages showed in order unless you added `shuffle`. Now they're shuffled unless you add `ordered`, because an attribute that defaults to on couldn't be turned off in HTML.

| You had (0.3) | Now (0.4) |
| --- | --- |
| `<fun-loader shuffle>` | `<fun-loader>` (the `shuffle` attribute is no longer needed, and is ignored) |
| `<fun-loader>` and relied on the written order | `<fun-loader ordered>` |
| `loader.shuffle = false` | Still works, and sets `ordered`. Prefer `loader.ordered = true`. |
| `<FunLoader shuffle={false} />` (React) or `:shuffle="false"` (Vue) | Still works and means `ordered`. Prefer `ordered`. |

## Read-only

| Property | Type | Description |
| --- | --- | --- |
| `current` | `string` | The message on screen right now. |
| `stage` | `number` | The index of the current stage, starting at 0. |
