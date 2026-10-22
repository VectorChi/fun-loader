# Changelog

All notable changes to `@vectorchi/fun-loader`. Until 1.0, a minor version (0.x) can include breaking changes; each one is listed under **Migration**.

## 0.5.0

### Added

- **Three new icons:** `orbit` (three dots circling in 3D, larger in front and fading behind), `globe` (a turning globe) and `gear` (a gear whose turns speed up and slow down). Pure CSS, like the other icons, and they follow `paused` and reduced-motion settings.
- **`icon-only` option** (`iconOnly` as a property and React/Vue prop): shows just the icon. Screen readers still hear the label, and no text timers run while it is on.

### Changed

- **No line claims what the loader can't know.** The `transfer` theme is rewritten around waiting ("Waiting for confirmation…", "No need to press again…") instead of status claims like "Still processing your transfer…", which would mislead if a payment stalls. The same goes for long-wait lines elsewhere: "Still going, not stuck…" and "Still at it, promise…" are gone. The copy test now rejects such claims.
- `art`: "Adding happy little trees…" (a TV catchphrase) is now "Signing the corner…".
- Size: the main entry is 4.4 kB minified and compressed (was 3.9 kB), and the element alone is 2.3 kB (was 1.9 kB). The new icons account for the increase.

## 0.4.0

### Added

- **Wait-aware stages.** Messages now change as a wait grows. Every built-in theme has three stages: its own lines, then lines that acknowledge the wait after 8 seconds, and again after 20 seconds. They never fake progress: no percentages, no "almost done", no countdowns.
  - The clock counts active waiting only. It starts when the loader is added to the page, stands still while `paused`, and resets when the loader is removed and added again.
  - Stage switches land exactly on time, not on the next rotation.
  - Screen readers aren't told about stage changes; they still hear `label` once.
- **`stages` property** (and React and Vue prop): `{ after, messages }[]` to set your own stages. `stages = []` or `null` turns staging off; `undefined` returns to the theme's stages. It takes precedence over `messages`.
- **`stage` read-only property:** the index of the current stage.
- **`ordered` attribute and prop:** keeps the written order (see the shuffle change below).
- **`getThemeStages(name)`**, plus **`staged()`**, **`LONG_WAIT`** and **`VERY_LONG_WAIT`**, so custom themes can use the shared long-wait lines.
- `FunLoaderStage` type; `FunLoaderTheme` gains an optional `stages` field.
- Docs: a "Long waits" section in the AI guide, a "Simulate a long request" control in the playground (1x, 4x, 10x), and a recorded demo clip in the README.

### Changed

- **Shuffle is the default.** Each stage is a shuffle bag: every message shows once before any repeats, and the same message never shows twice in a row, including across reshuffles and stage changes.
- **All theme copy is rewritten** to be more specific and less cliché, with 12 or 13 lines per theme. Lines like "Connecting the dots…" and "Crunching the numbers…" are gone, and so are the fake-progress lines in `transfer` and `calm` ("Almost there…", "Nearly there…"). See `docs/copy-review.md` for old and new side by side.
- The `messages` getter returns the current stage's messages.
- Size: the main entry is 3.9 kB minified and compressed (was 2.9 kB), and the element alone is 1.9 kB (was 1.7 kB). Most of the increase is the new long-wait copy.

### Migration

- **If you relied on the written order**, add `ordered`: `<fun-loader ordered>`, or `ordered` / `:ordered="true"` in React and Vue.
- **The `shuffle` attribute is ignored now** (shuffling is the default), so you can remove it. `loader.shuffle = false` still works and sets `ordered`, and `shuffle={false}` in React or `:shuffle="false"` in Vue still mean ordered. Prefer `ordered`.
- **If your tests check exact theme text** (for example the first message of `thinking`), update them: the copy changed and the order is shuffled.
- **If you show a loader for a long time on purpose** and want the first set of messages throughout, set `stages = null`.
- **Exported theme objects** now include `stages`. Code that only reads `name` and `messages` is unaffected.
- **CDN users pinned to `@0.3`** keep 0.3 behavior until they move the pin to `@0.4`.

## 0.3.2

- `custom-elements.json` describes the element for editors and AI tools.
- Package metadata: homepage, bugs link and broader keywords.
- New short README with an animated demo.

## 0.3.1

- Releases are built and staged on npm by GitHub Actions, with provenance.

## 0.3.0

- React wrapper, `@vectorchi/fun-loader/react`, for React 18 and 19 and Next.js server components.

## 0.2.0

- New themes: `finance`, `transfer` (for payments) and `art` (for image generation).

## 0.1.0

- First release: the `<fun-loader>` element, 5 themes, 5 icons, custom messages and themes, a Vue wrapper, and an accessible default (`role="status"`, one screen-reader label, reduced-motion support).
