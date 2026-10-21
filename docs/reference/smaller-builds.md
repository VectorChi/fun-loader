---
title: "Smaller builds: load only the themes you use"
description: "Load only the fun-loader element and the themes you need, and register it under a different tag name."
---

# Smaller builds

The main import includes all 8 themes, 3.9 kB in total. If you only need one or two themes, you can load less.

`@vectorchi/fun-loader/element` is the element alone, 1.9 kB, with no themes and nothing registered. Add only what you use:

```js
import { define, registerTheme } from '@vectorchi/fun-loader/element';
import { dev } from '@vectorchi/fun-loader/themes/dev';

registerTheme(dev);
define();
```

```html
<fun-loader theme="dev"></fun-loader>
```

Each theme is its own file: `@vectorchi/fun-loader/themes/thinking`, `…/themes/art`, and so on.

Each theme module includes that theme's long-wait lines, so themes added this way still change their messages after 8 and 20 seconds.

## Only your own messages

If you never use a built-in theme, skip them all. Define the element, then give each loader its own `messages` or `stages`:

```js
import { define } from '@vectorchi/fun-loader/element';

define();

const loader = document.querySelector('fun-loader');
loader.messages = ['Reading your files…', 'Writing a summary…'];
```

Without a theme or messages, a loader shows a plain "Thinking…", so nothing breaks if you forget one.

## A different tag name

`define()` takes a tag name, in case `<fun-loader>` clashes with something else on your page:

```js
define('ai-loader');
```

```html
<ai-loader theme="dev"></ai-loader>
```

## When it's worth it

Sometimes. The difference is about 2 kB, roughly the size of a small icon. Use the main import unless every kilobyte counts, for example on a landing page with a tight performance budget.

## How the sizes are measured

The sizes on these pages are what your users download: the code bundled and minified the way an app's build would, then compressed with brotli, as most servers and CDNs do. The React and Vue figures leave out React and Vue themselves, since your app already loads them.

Every change to fun-loader is checked against size limits before it can be released, so these numbers can't quietly grow.
