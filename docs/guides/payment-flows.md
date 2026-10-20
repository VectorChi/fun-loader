# Payment flows

People are anxious while their money is moving. The `transfer` theme is written for that moment.

<div class="demo"><fun-loader theme="transfer" icon="pulse" interval="3000"></fun-loader></div>

```html
<fun-loader theme="transfer" icon="pulse" interval="3000"></fun-loader>
```

## What makes it different

- **Calm, with no jokes about money.** A line like "Rounding to the nearest cent…" is funny in a dashboard and worrying during a transfer.
- **Generic on purpose.** It never names a specific step, such as "Verifying recipient". The loader can't know which step your backend is really on, and in a payment flow, a message that claims a check that isn't happening is misleading.
- **Reassuring.** Messages like "This can take a few seconds…" and "Still working on it…" tell people a wait is normal.

The `pulse` icon and a slower `interval` make it feel steadier than the default spinner.

## When your flow has real stages

If your backend reports real progress, show messages that match it instead of the theme:

```js
const loader = document.querySelector('fun-loader');
loader.paused = true; // you decide when the message changes

loader.messages = ['Checking your balance…'];
await checkBalance();

loader.messages = ['Sending to the bank…'];
await submitTransfer();
```

Setting `messages` shows the first message right away. With `paused`, the text stays put until you change it, while the icon keeps showing that work is happening.

::: tip
`paused` also stops the icon. If you want the icon to keep moving, leave `paused` off and give each step a single message instead. A list with one message never rotates.
:::
