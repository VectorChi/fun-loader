# Installation

## From npm

```sh
npm install @vectorchi/fun-loader
```

Then import the package once, anywhere in your app:

```js
import '@vectorchi/fun-loader';
```

That defines the `<fun-loader>` tag and registers every built-in theme. Now use it like any HTML tag:

```html
<fun-loader theme="dev" icon="dots"></fun-loader>
```

Using React or Vue? Import the component instead: see [React & Next.js](/frameworks/react) or [Vue](/frameworks/vue).

## From a CDN

No build step needed. Add one script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/@vectorchi/fun-loader@0.3"></script>

<fun-loader theme="thinking"></fun-loader>
```

The `@0.3` pins you to 0.3.x releases, so a future major change can't break your page. Leave it out to always get the latest version.

unpkg works too: `https://unpkg.com/@vectorchi/fun-loader@0.3`.

## What you get

| Import | What it is | Size |
| --- | --- | --- |
| `@vectorchi/fun-loader` | The element and all themes, registered automatically | ~2.9 kB |
| `@vectorchi/fun-loader/react` | React component | ~3.0 kB |
| `@vectorchi/fun-loader/vue` | Vue component | ~2.9 kB |
| `@vectorchi/fun-loader/element` | The element only, nothing registered | ~1.7 kB |
| `@vectorchi/fun-loader/themes/<name>` | A single theme | tiny |

Sizes are minified and compressed, excluding React and Vue themselves. You only ever load one of the first four. See [Smaller builds](/reference/smaller-builds) for the last two.
