---
description: "Use fun-loader in plain HTML and JavaScript: attributes, properties, showing and hiding, and creating loaders on the fly."
---

# Plain HTML & JavaScript

## In HTML

Load the script once, then use the tag anywhere:

```html
<script src="https://cdn.jsdelivr.net/npm/@vectorchi/fun-loader@0.3"></script>

<fun-loader theme="kitchen" icon="pulse"></fun-loader>
```

Every [option](/reference/options) except `messages` is an attribute. On/off options are on when present:

```html
<fun-loader theme="dev" ordered paused></fun-loader>
```

## From JavaScript

Every option is also a property:

```js
const loader = document.querySelector('fun-loader');

loader.theme = 'finance';
loader.icon = 'bars';
loader.interval = 3000;
loader.paused = true;
loader.messages = ['Custom one…', 'Custom two…'];

loader.next();          // show the next message now
console.log(loader.current); // the message on screen
```

## Showing and hiding

Either remove the loader from the page, or toggle the `hidden` attribute:

```js
loader.hidden = true;  // hide
loader.hidden = false; // show again
```

Removing it also stops its timer. A hidden loader keeps rotating in the background, which costs next to nothing, but you can set `paused` as well if you like.

## Creating loaders on the fly

```js
const loader = document.createElement('fun-loader');
loader.theme = 'art';
loader.icon = 'sparkle';
document.querySelector('#result').replaceChildren(loader);
```

## Without the CDN

With a bundler, import the package instead of adding the script tag:

```js
import '@vectorchi/fun-loader';
```
