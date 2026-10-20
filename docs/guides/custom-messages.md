---
description: "Write your own loading messages for one loader or register a reusable theme, with tips for messages that read well."
---

# Custom messages

The built-in themes cover common cases, but your own words often fit better.

## For one loader

Set the `messages` property. It overrides the theme:

```js
const loader = document.querySelector('fun-loader');
loader.messages = ['Reading your files…', 'Writing a summary…', 'Checking the facts…'];
```

`messages` is a property only, because HTML attributes can't hold a list. In React and Vue, pass it as a prop:

```tsx
<FunLoader messages={['Reading your files…', 'Writing a summary…']} />
```

Set `messages` to `null` to go back to the theme.

## As a reusable theme

To use the same messages in many places, register a theme once:

```js
import { registerTheme } from '@vectorchi/fun-loader';

registerTheme({
  name: 'pirate',
  messages: ['Hoisting the sails…', 'Consulting the map…', 'Swabbing the deck…'],
});
```

Then refer to it by name, anywhere:

```html
<fun-loader theme="pirate"></fun-loader>
```

Registering a theme with an existing name replaces it, so you can also reword a built-in theme. Register themes before your loaders appear: loaders already on the page keep the messages they started with.

## Writing good messages

- **Keep them short.** Two to four words reads at a glance. Long messages get cut off on small screens and are gone before anyone finishes reading them.
- **End with an ellipsis (…).** It signals that work is ongoing, and it matches the built-in themes.
- **Give it at least a handful.** With 2 or 3 messages, the loop is obvious after a few seconds. The built-in themes have 12.
- **Don't claim specific steps** unless they're really happening. See [Payment flows](/guides/payment-flows) for why.
