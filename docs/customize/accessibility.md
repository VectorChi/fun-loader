---
title: "Accessible loading text for screen readers"
description: "How fun-loader works with screen readers and reduced-motion settings, and how to set a helpful label."
---

# Accessibility

fun-loader is accessible without any setup. This page explains what it does, and the one thing you might change.

## Screen readers

Rotating text is a problem for screen readers: announcing a new message every couple of seconds would interrupt everything else. So:

- The element has `role="status"`, which screen readers treat as a polite, non-urgent update.
- They announce a short **label** once, "Loading" by default.
- The rotating messages and the icon are hidden from them, and so are [stage](/reference/options#stages) changes on long waits.

Set a label that says what's happening:

```html
<fun-loader label="Generating your summary"></fun-loader>
```

When the answer replaces the loader, make sure the answer itself is announced, for example by putting it inside a region with `aria-live="polite"`.

## Reduced motion

When someone has turned on "reduce motion" in their system settings:

- New messages appear without sliding in.
- The icon fades gently in and out instead of spinning or bouncing, so there's still a sign that work is happening.

You don't need to do anything for this.

## Pausing

`paused` stops both the text and the icon. Use it if your interface has its own way to show that the wait is over, or to keep the loader on screen without movement.
