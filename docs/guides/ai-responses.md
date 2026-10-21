---
description: "Show a loader while an AI request runs and replace it with the answer, in plain JavaScript, React and Vue, including streamed responses."
---

# Waiting for AI responses

The most common use: show the loader while a request runs, then replace it with the answer.

<div class="demo"><fun-loader theme="thinking"></fun-loader></div>

## Plain JavaScript

```js
import '@vectorchi/fun-loader';

const output = document.querySelector('#answer');

async function ask(question) {
  const loader = document.createElement('fun-loader');
  loader.theme = 'thinking';
  output.replaceChildren(loader);

  const res = await fetch('/api/ask', { method: 'POST', body: question });
  output.textContent = await res.text(); // the loader is gone once the answer arrives
}
```

Removing the loader from the page also stops its timer, so there's nothing to clean up.

## React

```tsx
import { useEffect, useState } from 'react';
import { FunLoader } from '@vectorchi/fun-loader/react';

function Answer({ question }: { question: string }) {
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/ask', { method: 'POST', body: question })
      .then((res) => res.text())
      .then(setAnswer);
  }, [question]);

  return answer ?? <FunLoader theme="thinking" />;
}
```

## Vue

```vue
<script setup>
import { ref } from 'vue';
import { FunLoader } from '@vectorchi/fun-loader/vue';

const answer = ref(null);
fetch('/api/ask', { method: 'POST', body: 'Hello' })
  .then((res) => res.text())
  .then((text) => (answer.value = text));
</script>

<template>
  <p v-if="answer">{{ answer }}</p>
  <FunLoader v-else theme="thinking" />
</template>
```

## Streaming responses

When the answer streams in token by token, show the loader only until the first chunk arrives. After that, the growing text is the progress indicator.

```js
const res = await fetch('/api/ask', { method: 'POST', body: question });
const reader = res.body.getReader();
const decoder = new TextDecoder();

output.replaceChildren(document.createElement('fun-loader'));
let first = true;

for (;;) {
  const { done, value } = await reader.read();
  if (done) break;
  if (first) {
    output.textContent = ''; // removes the loader
    first = false;
  }
  output.textContent += decoder.decode(value, { stream: true });
}
```

## Long waits

Some requests take a while: a reasoning model, a long document, a busy API. If the same dozen lines keep looping, people notice, and the loop starts to feel like a hang. So the messages change as the wait grows:

- **For the first 8 seconds,** the theme's own lines, shuffled.
- **After 8 seconds,** lines that acknowledge the wait, such as "This one is taking a while…" or "Bigger job than it looked…".
- **After 20 seconds,** lines like "Thanks for sticking around…" and "Still here, still working…".

None of them fake progress. There are no percentages, no "almost done" and no countdowns, because the loader can't know how much is left. This happens automatically with every built-in theme; you don't need to do anything.

The clock counts only active waiting: it stands still while the loader is `paused`, and starts over each time a loader is added to the page. So a new request with a new loader always begins at the first stage.

To use your own timings or lines, set `stages` (see [Options](/reference/options#stages)). To turn this off and keep the first set of messages for the whole wait, set `stages = null`:

```tsx
<FunLoader theme="thinking" stages={null} />
```

## Picking a theme

Match the theme to what the user asked for: `dev` for code, `art` for images, `finance` for reports. See all of them on the [Themes](/customize/themes) page.
