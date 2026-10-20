---
description: "Load only the fun-loader element and the themes you need, and register it under a different tag name."
---

# Smaller builds

The main import includes all 8 themes, about 2.9 kB in total. If you only need one or two themes, you can load less.

`@vectorchi/fun-loader/element` is the element alone, about 1.7 kB, with no themes and nothing registered. Add only what you use:

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

## A different tag name

`define()` takes a tag name, in case `<fun-loader>` clashes with something else on your page:

```js
define('ai-loader');
```

```html
<ai-loader theme="dev"></ai-loader>
```

## When it's worth it

Rarely. The difference is about 1.2 kB, roughly the size of a small icon. Use the main import unless every kilobyte counts.
