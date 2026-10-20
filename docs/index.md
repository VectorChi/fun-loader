---
title: "fun-loader: playful loading text for AI apps"
titleTemplate: false
description: "A ~3 kB web component that shows playful, rotating loading messages with animated icons while AI requests run. Works with HTML, React, Next.js and Vue."
---

# Introduction

fun-loader shows playful, rotating loading text while an AI request or another slow task is running. Instead of a bare spinner, people see "Connecting the dots…", "Compiling thoughts…" or "Crunching the numbers…".

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
- **Tiny.** About 3 kB minified and compressed, with every theme included, and no dependencies.
- **Ready-made themes.** 8 themes for different products, from AI chat to payments, plus 5 animated icons.
- **Your words when you need them.** Pass your own messages, or register a theme your whole app can use.
- **Accessible by default.** Screen readers hear one short label instead of every rotating message, and it respects reduced-motion settings.

## Next steps

- [Install it](/installation) from npm or a CDN.
- See the most common use: [waiting for AI responses](/guides/ai-responses).
- Browse the [themes](/customize/themes) and [icons](/customize/icons), or try everything in the [playground](/playground).
