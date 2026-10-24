# Decisions

Non-obvious choices, with the reason for each. Newest at the bottom of each section.

## Stages (0.4.0)

**Themes keep `messages` and add an optional `stages`.**
`FunLoaderTheme.messages` is still stage 0, and `stages` (when present) lists every stage including stage 0. Built-in themes reuse the same array for both, so there is no duplicated copy in the bundle. Custom themes registered with only `messages` keep working as a single stage. `getTheme(name)` still returns stage 0's messages for backward compatibility; `getThemeStages(name)` is new.

**Precedence: `stages` property, then `messages` property, then the theme.**
An explicit `stages` list wins over `messages`, because it is the more specific instruction. Setting only `messages` gives a single stage, exactly as before 0.4.0.

**`stages = []` or `null` means "staging off", not "no messages".**
It keeps stage 0 of whatever would otherwise apply (your `messages`, or the theme's stage 0) and never moves on. `stages = undefined` clears the override and returns to the theme's stages. Two different "empty" values let React and Vue users distinguish "I didn't pass the prop" from "turn this off".

**The `messages` getter returns the current stage's messages.**
It used to return the single list in rotation, and it still does: that list is now the current stage. This keeps `el.messages` meaningful for code that reads it.

**Stage lists are sorted by `after`, and the first stage always starts at 0.**
So a list written out of order, or one whose first entry has `after: 500`, still behaves predictably.

**The clock measures active time with `Date.now()`, not `performance.now()`.**
Active means connected and not paused. `Date.now()` is faked by every test runner's fake timers, and millisecond precision is plenty for boundaries of several seconds.

**Changing the stages or theme mid-wait keeps the elapsed time.**
The element re-picks the stage for the time already waited instead of restarting the clock, because the user has still been waiting. Only removing the element from the page resets the clock.

**Stage switches use their own `setTimeout`, separate from the rotation `setInterval`.**
This is what makes a switch land exactly on the boundary. Entering a stage restarts the rotation interval, so the first message of a stage stays up for a full interval.

**No repeat across a stage change, enforced by text, not index.**
Two stages can share a line, so the check compares the message text with what is on screen.

**Stage 1 and 2 copy is a shared pool, with overrides only where tone requires it.**
Per-theme stage copy cost about 1 kB compressed and pushed the main entry to 4.09 kB. `src/themes/stages.ts` holds one pool (`LONG_WAIT`, `VERY_LONG_WAIT`) that every theme gets through `staged(messages)`. `calm`, `transfer` and `finance` pass their own lines: calm and transfer must stay reassuring, and finance waits read better with their own wording. This brought the main entry to 3.72 kB.

**The shared pool lives with the themes, not in the element.**
The element-only build (`/element`) carries no copy at all, and custom themes registered with only `messages` stay single-stage, as before 0.4.0.

**`staged`, `LONG_WAIT` and `VERY_LONG_WAIT` are exported from the main entry.**
Custom themes can opt in to the shared long-wait lines with `stages: staged(messages)`. They are already in the bundle, so exporting them costs nothing. They are exported from `src/index.ts`, not `src/themes/index.ts`, because `defineAll` registers everything exported from the themes index as a theme.

## Shuffle by default (0.4.0)

**`ordered` replaces `shuffle` as the attribute.**
Boolean attributes are on whenever present, so a `shuffle` attribute that defaults to on could never be turned off in HTML. The new `ordered` attribute (default off) turns shuffling off instead. The `shuffle` HTML attribute is no longer observed: shuffling is the default, so it was redundant anyway.

**`shuffle` stays as a property and as a React/Vue prop, defined as `!ordered`.**
Setting `el.shuffle = false` sets `ordered`. In the wrappers, `ordered` wins when given; otherwise an explicit `shuffle={false}` still means ordered, so code written for 0.3 keeps its behavior. Vue's `shuffle` prop defaults to `undefined` (not Vue's usual `false` for booleans), so an absent prop doesn't force ordering.

**The shuffle bag never repeats the message on screen, but a reset starts clean.**
Every message in a stage shows once before any repeats, and the first message of a new bag is never the one on screen. That rule applies to natural advances (rotation, reshuffles, stage switches). When an option changes (`messages`, `stages`, `theme`, `ordered`), the element starts clean, so turning on `ordered` always begins at the first written message.

## Copy and size (0.4.0)

**The main entry lands at 3.96 kB: inside the 4.0 kB hard limit, over the 3.6 kB target.**
The audited lines are more varied than the old ones, so they compress worse (about +0.23 kB for a similar line count). The size config now enforces 4 kB for the main entry (it allowed 5 kB before).

**Copy is stored as plain string arrays, not delimited strings.**
Measured on all 145 lines: one delimited string per list saves -6 to 18 bytes compressed, because brotli already removes almost all of the array syntax. Not worth less readable source.

**`art` keeps the list chosen by hand before the audit.**
Two of its lines reference well-known phrases and are flagged in `docs/copy-review.md` for a decision before release.

**`docs/copy-review.md` is kept out of the published site, `llms.txt` and Context7.**
It is a review document, not documentation.

## Demo clip (0.4.0)

**The clip is recorded on a virtual clock, frame by frame.**
`docs/demo.html` shows three themes with stage 1 moved to 5 s through the `stages` property, so one stage change fits in a 10 s loop. A one-off script (not committed, since it needs Playwright and an ffmpeg binary that would bloat every install) drives the page with Playwright's fake clock, steps 1/15 s at a time, sets each CSS animation to the matching time, screenshots every frame at 2x, and encodes them with ffmpeg: a 451 KB GIF for the README and a 390 KB MP4 for social posts, both in `.github/assets/`. Timing is exact and the loop is repeatable, unlike a real-time screen recording.

**No video on the landing page.**
Screenshots of the landing page at 1280x800 and 390x844 both show all six live loaders fully above the fold (the first at 343 px and 459 px). The real component already does the job, so the clip is used in the README only. The WebM and the `docs/public/` copies were dropped as unused; the demo page can regenerate them.

**The demo page sets `ordered` and offsets the shared long-wait lines per card.**
`ordered` makes every recording identical. Without the offset, two themes that share the long-wait pool would show the same line at the same moment.

## Build (0.4.0)

**Underscore-prefixed members are mangled in the build (`mangleProps: /^_/`).**
Minifiers don't shorten property names, so the element's private members (`_elapsed`, `_stageTimer` and so on) shipped at full length. Mangling them saved 0.08 kB on the main entry. Rules this depends on:
- Only the element's private members may start with `_`. Public API and anything read from outside the bundle must not.
- The mangled names are set on a real DOM element, so they must never collide with built-in properties such as `id` or `title`. With fewer than 52 private members, esbuild uses single letters, and no standard `HTMLElement` property is a single letter. If the element ever grows past that, reserve DOM names or switch to `#private` fields.

**The main entry keeps every theme; a smaller default-theme-only entry was tried and dropped.**
Registering only `thinking` in the main entry, with a new `/all` entry for the rest, brought it to 2.42 kB. It was reverted because it is a silent breaking change: after upgrading, `theme="dev"` would quietly fall back to the default messages unless every app added an import. The main entry stays at 3.88 kB, inside the 4.0 kB hard limit and 0.28 kB over the 3.6 kB target. Apps that want less can already import `/element` plus single themes (see Smaller builds).

## New icons (0.5.0)

**orbit, globe and gear are built into the main entry, and its hard limit rises from 4.0 to 4.4 kB.**
The three icons cost about 400 B compressed together (orbit ~185 B, globe ~118 B, gear ~92 B) and take the main entry from 3.88 to 4.34 kB. Making them opt-in imports would have kept it under 4.0 kB, but every user would then need an extra import to use them. Building them in keeps `icon="orbit"` working with no setup, which was judged worth about 0.4 kB.

**All three are pure CSS, reusing the icon's existing three `<i>` elements.**
- orbit: the dots are placed on a tilted circle with 3D transforms, so the browser handles perspective and which dot covers which. Each dot also has a fixed resting position, so with reduced motion they stay spread out and fade instead of stacking in the middle.
- globe: seen from slightly above, like the preview. The outline stays a true circle; the equator is a circle tipped back in 3D, and the three dots become meridian hoops turning round a tilted axis. (A first version used flat hoops that only narrowed and widened, which lost the depth.)
- gear: one shape from CSS gradients (teeth from a repeating conic gradient, cut to a ring with a hub hole by a radial mask), turned by the existing spin animation with ease-in-out timing so each turn winds up and slows down.

## shadcn registry (docs site, no release)

The docs site serves a [shadcn registry](https://ui.shadcn.com/docs/registry) at `/fun-loader/r/`. `registry.json` and `registry/` hold the source; `pnpm registry:build` (run by `docs:dev` and `docs:build`) writes the JSON to `docs/public/r`, which is gitignored, so the Pages workflow publishes it with the docs. The npm package is unchanged.

- **Two items.** `fun-loader` is a `registry:ui` wrapper around `@vectorchi/fun-loader/react` that sets `text-sm text-muted-foreground` and `--fun-loader-icon-color: var(--primary)` through `cn`, so passed classes win. `fun-loader-message` is a chat bubble (`bg-muted`) around it. It depends on `fun-loader` by its published URL, because a flat registry has no other way to point at its own items.
- **Thin on purpose.** shadcn copies files into the user's project, and copied files don't update. The wrapper only sets classes, so fixes keep arriving through the npm dependency.
- **Current shadcn only.** The icon color uses `var(--primary)` directly, which is a full color in current shadcn (Tailwind v4). Older projects store HSL numbers there; the value is then invalid and the icon falls back to the text color, so nothing breaks.
- **Flat, for the directory.** The shadcn directory (needed for a short `@name` namespace) requires a flat `registry.json` with no file contents; `test/registry.test.ts` checks that, plus that the npm dependency matches `package.json`.
- **Typechecked here too.** The files import `@/components/ui/fun-loader` and `@/lib/utils`, which only exist in a shadcn app, so the editor flagged them in this repo. `registry/tsconfig.json` maps those paths the way a shadcn app does, `registry/lib/utils.ts` stands in for the app's `cn` (it is not in any registry item), and `pnpm typecheck` runs `tsc -p registry` as well. A wrong prop, such as `icon="dotz"`, now fails the typecheck.
- **Checked by installing.** On 2026-10-24 both items were installed with shadcn 4.22.1 into a fresh `shadcn init -t vite` app from a local copy of the registry. The app typechecked, built and linted cleanly, and in Chromium the text was `muted-foreground`, the icon `primary`, the bubble `bg-muted`, and `className="text-base text-foreground"` replaced the defaults.
