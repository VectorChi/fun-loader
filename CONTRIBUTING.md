# Contributing to fun-loader

Thanks for helping. Bug reports, new loading lines, fixes and docs improvements are all welcome.

## Ways to help

- **Report a bug** in an [issue](https://github.com/VectorChi/fun-loader/issues). Say which build you use (npm, CDN, React, Vue or Nuxt), the browser, and what you expected to see. A short reproduction helps a lot.
- **Suggest loading lines** for a theme, or a new theme, in an issue. Read [Writing loading lines](#writing-loading-lines) first.
- **Fix something or improve the docs** with a pull request. For anything bigger than a small fix, open an issue first so we can agree on the approach.

## Setup

You need Node 22 (what CI uses) and pnpm 9.

```sh
git clone https://github.com/VectorChi/fun-loader.git
cd fun-loader
pnpm install
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Rebuilds `dist/` on every change |
| `pnpm docs:dev` | Runs the docs site and playground at http://localhost:5173/fun-loader/ |
| `pnpm test` | Runs the tests (Vitest) |
| `pnpm lint` | Checks formatting and lint rules (Biome). `pnpm format` fixes what it can |
| `pnpm typecheck` | Runs TypeScript |
| `pnpm build` | Builds `dist/` |
| `pnpm size` | Checks the bundle size limits |

CI runs `lint`, `typecheck`, `test`, `build` and `size` on every pull request, so run them before you push.

## Where things are

- `src/element.ts`: the `<fun-loader>` element, its styles and its icons
- `src/themes/`: one file per theme, plus `stages.ts` with the shared long-wait lines
- `src/react/` and `src/vue/`: the framework wrappers
- `docs/`: the docs site (VitePress)
- `test/`: the tests, including the copy rules in `test/copy.test.ts` and the docs checks in `test/docs.test.ts`
- `DECISIONS.md`: why things are the way they are. Read the relevant section before changing a behavior.

The Nuxt module lives in its own repo: [VectorChi/nuxt-fun-loader](https://github.com/VectorChi/nuxt-fun-loader).

## Writing loading lines

The copy is the product, so it has rules. `test/copy.test.ts` checks most of them.

- **Original.** No catchphrases, quotes or lines from other products.
- **Short.** 32 characters or fewer, ending with the ellipsis character `…`, not three dots. No em dashes.
- **Honest.** A line can describe the wait, but never claim something the loader can't know. No "still working", "in progress", "not stuck" or "almost done": the loader doesn't know whether the request is moving.
- **No fake progress** in the long-wait lines: no percentages, "almost", "nearly" or countdowns.
- **No repeats** across themes and stages.
- **Counts.** Each theme has 12 to 14 regular lines, 6 to 8 lines after 8 seconds, and 4 to 5 after 20 seconds.

## Pull requests

- Work on a branch, not `main`.
- Keep a pull request to one change, and say what it changes and why.
- Add or update tests for behavior changes.
- Update the docs and `CHANGELOG.md` (under "Unreleased") if users will notice the change.
- If you add an icon, an option or a default, update the docs pages that list them; `test/docs.test.ts` will tell you which.
- Keep an eye on size: the main entry has a hard limit of 4.4 kB (minified and compressed).

Releases are done by the maintainer.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
