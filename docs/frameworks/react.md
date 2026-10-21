---
title: "AI loading text in React and Next.js"
description: "Use fun-loader in React 18 and 19 and Next.js: props, refs, server components, and TypeScript types for the plain tag."
---

# React & Next.js

## Usage

```sh
npm install @vectorchi/fun-loader
```

```tsx
import { FunLoader } from '@vectorchi/fun-loader/react';

export function Status({ loading }: { loading: boolean }) {
  return loading ? <FunLoader theme="art" icon="sparkle" /> : null;
}
```

The component takes every [option](/reference/options) as a prop, plus any normal HTML prop such as `className`, `id` or `style`.

```tsx
<FunLoader
  theme="dev"
  icon="dots"
  interval={3000}
  ordered
  paused={!visible}
  messages={['Reading your code…', 'Writing tests…']}
  label="Generating code"
  className="my-loader"
/>
```

Pass `messages` and `stages` as stable arrays: define them outside the component, or wrap them in `useMemo`. A new array on every render restarts the rotation.

```tsx
const stages = [
  { after: 0, messages: ['Reading your code…', 'Writing tests…'] },
  { after: 10_000, messages: ['Big codebase, still reading…'] },
];

function Status() {
  return <FunLoader stages={stages} />;
}
```

## React 18 and 19

Both are supported, and props behave the same in each. That matters because React 18 passes props to web components as text attributes, which breaks lists and `false` values. The wrapper sets those as properties instead, so `messages={[...]}` and `paused={false}` work everywhere.

## Refs

`ref` gives you the element itself, so you can call its methods:

```tsx
const ref = useRef<FunLoaderElement>(null);

<FunLoader ref={ref} />
<button onClick={() => ref.current?.next()}>Next message</button>
```

```ts
import type { FunLoader as FunLoaderElement } from '@vectorchi/fun-loader';
```

## Next.js

The wrapper is already a client component, so you can render it straight from a server component. No `'use client'` needed in your file:

```tsx
// app/page.tsx (a server component)
import { FunLoader } from '@vectorchi/fun-loader/react';

export default function Page() {
  return <FunLoader theme="thinking" />;
}
```

The theme and icon are included in the server-rendered HTML, and the text starts rotating as soon as the page's JavaScript loads. It hydrates without warnings in React 18 and 19.

## Using the plain tag

You can also use `<fun-loader>` directly in TSX. Importing `@vectorchi/fun-loader/react` anywhere in your project adds the TypeScript types for it:

```tsx
import '@vectorchi/fun-loader';

<fun-loader theme="dev" icon="dots" />
```

Prefer the `FunLoader` component, though: with the plain tag on React 18, `messages` and `paused={false}` don't work.
