---
description: "Use fun-loader in Vue with the FunLoader component, or as a plain custom element."
---

# Vue

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
  <FunLoader v-if="loading" theme="dev" icon="dots" shuffle />
</template>
```

The component takes every [option](/reference/options) as a prop:

```vue
<FunLoader
  theme="finance"
  icon="bars"
  :interval="3000"
  :paused="!visible"
  :messages="['Fetching rates…', 'Comparing offers…']"
  label="Loading offers"
/>
```

Props you leave out fall back to the element's defaults.

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
