---
description: "Use fun-loader in plain HTML and JavaScript: attributes, properties, showing and hiding, and creating loaders on the fly."
---

# Plain HTML & JavaScript

## In HTML

Load the script once, then use the tag anywhere:

```html
<script src="https://cdn.jsdelivr.net/npm/@vectorchi/fun-loader@0.5"></script>

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

## Long waits

Every built-in theme changes its messages after 8 and 20 seconds of waiting, to lines that admit the wait instead of looping the same jokes. To set your own timings or lines, use the `stages` property:

```js
loader.stages = [
  { after: 0, messages: ['Uploading your photos…', 'Checking the sizes…'] },
  { after: 15_000, messages: ['Big album, still going…'] },
];
```

Set `loader.stages = null` to keep the first set of messages for the whole wait. `stages`, like `messages`, is a property only, because attributes can't hold a list.

## Message order

Messages are shuffled by default, and every one shows before any repeats. Add the `ordered` attribute to keep the order you wrote them in:

```html
<fun-loader ordered></fun-loader>
```

## Pausing when the tab is hidden

There's no point animating a loader nobody can see. Pausing it also stops the wait clock, so a long-wait stage doesn't arrive while the person is in another tab:

```js
document.addEventListener('visibilitychange', () => {
  loader.paused = document.hidden;
});
```

## Reading its state

`loader.current` is the message on screen, and `loader.stage` is how far into the wait it is: `0` at the start, then `1` and `2` as the long-wait stages begin. Both are read-only. They're handy in tests, or for logging how often users hit a long wait.

## Without the CDN

With a bundler, import the package instead of adding the script tag:

```js
import '@vectorchi/fun-loader';
```
