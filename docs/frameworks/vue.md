---
title: "AI loading text component for Vue"
description: "Use fun-loader in Vue with the FunLoader component, or as a plain custom element."
---

# Using fun-loader with Vue

## Usage

```sh
npm install @vectorchi/fun-loader
```

```vue
<script setup>
import { FunLoader } from '@vectorchi/fun-loader/vue';
defineProps({ loading: Boolean });
</script>

<template>
  <FunLoader v-if="loading" theme="dev" icon="dots" />
</template>
```

The component takes every [option](/reference/options) as a prop:

```vue
<script setup>
import { FunLoader } from '@vectorchi/fun-loader/vue';

const messages = ['Fetching rates…', 'Comparing offers…'];
</script>

<template>
  <FunLoader
    theme="finance"
    icon="bars"
    :interval="3000"
    :paused="!visible"
    :messages="messages"
    label="Loading offers"
  />
</template>
```

Keep `messages` and `stages` in a constant or a `ref` rather than writing the array inline in the template: a new array on every render restarts the rotation.

Props you leave out fall back to the element's defaults.

## Showing it while a request runs

Toggle the loader with `v-if` around the request. When the loader leaves the page, its timer stops, and the next request starts a fresh wait:

```vue
<script setup>
import { ref } from 'vue';
import { FunLoader } from '@vectorchi/fun-loader/vue';

const loading = ref(false);
const answer = ref('');

async function ask(question) {
  loading.value = true;
  try {
    const res = await fetch('/api/ask', { method: 'POST', body: question });
    answer.value = await res.text();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <FunLoader v-if="loading" theme="thinking" label="Writing an answer" />
  <p v-else>{{ answer }}</p>
</template>
```

## Long waits

Every built-in theme changes its messages after 8 and 20 seconds of waiting, to lines that acknowledge the wait. To set your own timings or lines, pass `stages`. Keep it in a constant, like `messages`:

```vue
<script setup>
import { FunLoader } from '@vectorchi/fun-loader/vue';

const stages = [
  { after: 0, messages: ['Fetching rates…', 'Comparing offers…'] },
  { after: 10_000, messages: ['Lots of offers today, still comparing…'] },
];
</script>

<template>
  <FunLoader :stages="stages" />
</template>
```

Pass `:stages="null"` to keep the first set of messages for the whole wait. See [Options](/reference/options#stages) for the details.

## Message order

Messages are shuffled, and every one shows before any repeats. Add `ordered` to keep the order you wrote them in:

```vue
<FunLoader :messages="steps" ordered />
```

Code written before 0.4.0 with `:shuffle="false"` still keeps its order.

## Using the plain tag

You can also use `<fun-loader>` directly. Tell Vue it's a custom element, so it doesn't look for a Vue component with that name:

```js
// vite.config.js
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue({
      template: { compilerOptions: { isCustomElement: (tag) => tag === 'fun-loader' } },
    }),
  ],
};
```

```vue
<script setup>
import '@vectorchi/fun-loader';
</script>

<template>
  <fun-loader theme="calm"></fun-loader>
</template>
```
