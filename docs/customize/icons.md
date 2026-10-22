---
title: "Animated loading icons: spinner, dots and more"
description: "The fun-loader icons (spinner, dots, bars, pulse, sparkle, orbit, globe, gear or none), with live examples and how to size and color them."
---

# Animated icons

An animated icon sits before the text. Pick one with `icon="…"`.

<div class="demo demo-grid">
  <div class="demo-item"><span class="demo-label">spinner (default)</span><fun-loader icon="spinner"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">dots</span><fun-loader icon="dots"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">bars</span><fun-loader icon="bars"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">pulse</span><fun-loader icon="pulse"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">sparkle</span><fun-loader icon="sparkle"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">orbit</span><fun-loader icon="orbit"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">globe</span><fun-loader icon="globe"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">gear</span><fun-loader icon="gear"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">none</span><fun-loader icon="none"></fun-loader></div>
</div>

```html
<fun-loader icon="sparkle"></fun-loader>
```

| `icon` | Looks like | Suits |
| --- | --- | --- |
| `spinner` (default) | A ring with a gap, rotating | Anything |
| `dots` | Three dots bouncing in turn | Chat, typing-style waits |
| `bars` | Three bars rising and falling in turn | Data, audio, finance |
| `pulse` | A dot that grows and fades out | Calm or sensitive moments, such as payments |
| `sparkle` | A ✦ that twinkles and turns | AI and creative tools |
| `orbit` | Three dots circling in 3D, larger in front and fading behind | AI answers, long waits |
| `globe` | A globe turning, its meridians sliding across | Searching the web, translation, sending things abroad |
| `gear` | A gear whose turns speed up and slow down, like a machine cycling | Processing, settings, builds and reports |
| `none` | No icon, text only | Inline text, or when you have your own spinner |

An unknown name falls back to `spinner`, so a typo never leaves an empty gap.

## Size and color

The icon is `1em` square (`orbit` is a little wider, `1.3em`), so it scales with the font size. It uses the text color unless you set `--fun-loader-icon-color`:

```css
fun-loader {
  font-size: 1.25rem;
  --fun-loader-icon-color: #7c5cff;
}
```

More in [Styling](/customize/styling).

## Motion

The icon stops while `paused` is set. When someone has asked their system for reduced motion, the icon fades gently in and out instead of spinning or bouncing. `orbit` keeps its three dots spread out while it fades.
