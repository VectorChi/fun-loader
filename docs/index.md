---
title: "fun-loader: playful loading text for AI apps"
titleTemplate: false
description: "A 4.4 kB web component that shows playful, rotating loading messages while AI requests run, and adapts them as the wait grows. HTML, React, Next.js, Vue."
---

# Introduction

fun-loader shows playful, rotating loading text while an AI request or another slow task is running. Instead of a bare spinner, people see "Opening a few mental tabs…". And when the wait drags on, the messages move on too, to lines that admit the wait instead of looping the same jokes.

<div class="demo demo-grid">
  <div class="demo-item"><span class="demo-label">thinking</span><fun-loader theme="thinking"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">art · sparkle</span><fun-loader theme="art" icon="sparkle"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">dev · dots</span><fun-loader theme="dev" icon="dots"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">finance · bars</span><fun-loader theme="finance" icon="bars"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">transfer · pulse</span><fun-loader theme="transfer" icon="pulse" interval="3000"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">kitchen</span><fun-loader theme="kitchen"></fun-loader></div>
</div>

```html
<fun-loader theme="thinking"></fun-loader>
```

## Why fun-loader

- **One tag, any stack.** `<fun-loader>` is a standard web component. It works in plain HTML, React, Next.js, Vue and anything else that renders HTML.
- **Wait-aware.** After 8 and 20 seconds, the messages change to ones that acknowledge the longer wait, without faking progress. See [long waits](/guides/ai-responses#long-waits).
- **Small.** 4.4 kB minified and compressed, with every theme included, and no dependencies.
- **Ready-made themes.** 8 themes for different products, from AI chat to payments, plus 8 animated icons.
- **Your words when you need them.** Pass your own messages, or register a theme your whole app can use.
- **Accessible by default.** Screen readers hear one short label instead of every rotating message, and it respects reduced-motion settings.

## When to use it

Use fun-loader when the wait is open-ended and usually takes a few seconds or more, such as an LLM response, image generation, a report or a payment.

- **Under a second:** a plain spinner is enough.
- **Known progress, such as a file upload:** use a progress bar. If your task has real steps, you can also set your own [`messages`](/guides/custom-messages) and change them as each step happens.

Pick a [theme](/customize/themes) that matches the task: `thinking` (default) for chat, `dev` for code, `design`, `art` for images, `finance` for reports, `transfer` for [payments](/guides/payment-flows), `kitchen` or `calm`.

## Next steps

- [Install it](/installation) from npm or a CDN.
- See the most common use: [waiting for AI responses](/guides/ai-responses).
- Browse the [themes](/customize/themes) and [icons](/customize/icons), or try everything in the [playground](/playground).
