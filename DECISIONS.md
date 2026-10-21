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
