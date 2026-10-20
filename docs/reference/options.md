# Options

Every option works as an HTML attribute, as a JavaScript property, and as a prop on the React and Vue components. `messages` is the exception: it's a property and a prop only, because attributes can't hold a list.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `string` | `"thinking"` | A [built-in theme](/customize/themes) or one you registered. |
| `icon` | `string` | `"spinner"` | `spinner`, `dots`, `bars`, `pulse`, `sparkle` or `none`. See [Icons](/customize/icons). |
| `interval` | `number` | `2400` | Milliseconds between messages. Values below 250 become 250. |
| `shuffle` | `boolean` | `false` | Random order. The same message never shows twice in a row. |
| `paused` | `boolean` | `false` | Stops the text and the icon. |
| `label` | `string` | `"Loading"` | What screen readers announce. See [Accessibility](/customize/accessibility). |
| `messages` | `string[]` | — | Your own messages, overriding `theme`. Set to `null` to go back to the theme. |

## Attributes vs. properties

On/off attributes are on when present, whatever their value:

```html
<fun-loader paused></fun-loader>        <!-- paused -->
<fun-loader paused="false"></fun-loader> <!-- still paused! -->
<fun-loader></fun-loader>               <!-- not paused -->
```

From JavaScript, use the property to turn it off: `loader.paused = false`. The React and Vue components handle this for you.

## Read-only

| Property | Type | Description |
| --- | --- | --- |
| `current` | `string` | The message on screen right now. |
