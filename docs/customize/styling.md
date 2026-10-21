---
title: "Style the loader with CSS custom properties"
description: "Style fun-loader with CSS: font and color, custom properties for icon color, gap and fade, and the text and icon parts."
---

# Styling

By default, fun-loader follows the surrounding text: same font, size and color. Style it like any inline element:

```css
fun-loader {
  font-size: 0.9rem;
  color: gray;
}
```

## Custom properties

| Property | Default | What it controls |
| --- | --- | --- |
| `--fun-loader-icon-color` | `currentColor` | Icon color |
| `--fun-loader-gap` | `0.5em` | Space between icon and text |
| `--fun-loader-fade` | `300ms` | How long each new message takes to fade in. `0ms` turns it off |

<div class="demo">
  <fun-loader theme="art" icon="sparkle" style="font-size: 1.3rem; --fun-loader-icon-color: #e8a317; --fun-loader-gap: 0.75em; --fun-loader-fade: 800ms"></fun-loader>
</div>

```css
fun-loader {
  font-size: 1.3rem;
  --fun-loader-icon-color: #e8a317;
  --fun-loader-gap: 0.75em;
  --fun-loader-fade: 800ms;
}
```

## Parts

The text and the icon are exposed as CSS parts, for anything the custom properties don't cover:

```css
fun-loader::part(text) {
  font-style: italic;
  letter-spacing: 0.02em;
}

fun-loader::part(icon) {
  opacity: 0.7;
}
```

<div class="demo">
  <fun-loader id="parts-demo" theme="calm" icon="pulse"></fun-loader>
</div>

<style>
#parts-demo::part(text) { font-style: italic; letter-spacing: 0.02em; }
#parts-demo::part(icon) { opacity: 0.7; }
</style>

## Layout

The element is `inline-flex`, so it sits in a line of text and lines up with it. To center it in a box:

```css
.answer-placeholder {
  display: grid;
  place-items: center;
  min-height: 120px;
}
```

## Dark mode

The text and the icon use the surrounding text color, so in most sites dark mode works with no changes. If you set your own icon color, give it a dark-mode value too:

```css
fun-loader {
  --fun-loader-icon-color: #6a4cf5;
}

@media (prefers-color-scheme: dark) {
  fun-loader {
    --fun-loader-icon-color: #a594ff;
  }
}
```

## Using your design tokens

Point the custom properties at your own variables, so the loader follows your theme everywhere it appears:

```css
fun-loader {
  --fun-loader-icon-color: var(--color-accent);
  --fun-loader-gap: var(--space-2);
  color: var(--color-text-muted);
}
```

## Spinner only, for buttons

Inside a button there's rarely room for a sentence. Hide the text part to keep only the animated icon. The visually hidden `label` stays in place for screen readers, but a button combines everything inside it into one spoken name, so check the result with a screen reader:

```html
<button disabled>
  <fun-loader icon="spinner" label="Saving"></fun-loader>
  Save
</button>
```

```css
button fun-loader::part(text) {
  display: none;
}
```

The icon is `1em` square, so it matches the button's font size.

## Hiding

Use the `hidden` attribute, or remove the element. `display: none` from your own CSS also works.
