---
description: "Use the calm transfer theme for money transfers, and show real progress steps without misleading users."
---

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

## Long waits

Transfers can stall for a while. After 8 seconds of waiting, `transfer` moves to lines like "This can take a little longer…", and after 20 seconds to "Thank you for bearing with us…". They acknowledge the wait without promising it's nearly over. See [Long waits](/customize/themes#long-waits) for the full lists.

## When your flow has real steps

If your backend reports what it's actually doing, show that instead of the theme. Give each step a single message: one message never rotates, the icon keeps moving, and your own `messages` never switch to the long-wait lines.

```js
const loader = document.querySelector('fun-loader');

loader.messages = ['Checking your balance…'];
await checkBalance();

loader.messages = ['Sending to the bank…'];
await submitTransfer();
```

Setting `messages` shows the new message right away.

::: tip
Don't confuse real steps with [stages](/reference/options#stages). Stages change the messages with *time*, which is right when you don't know what the backend is doing. When you do know, use `messages` as above.
:::
