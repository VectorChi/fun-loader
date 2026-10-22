---
title: "Themes: 8 built-in sets of loading messages"
description: "All 8 built-in fun-loader themes, from thinking and dev to finance and transfer, with every message and what each suits."
---

# Built-in themes

Pick a theme with `theme="…"`. Each has 12 to 13 messages, shuffled so every one shows before any repeats (add `ordered` to keep the written order). On long waits, the messages change: see [Long waits](#long-waits).

| Theme | Good for |
| --- | --- |
| `thinking` (default) | Chat and general AI answers |
| `dev` | Code generation, developer tools |
| `design` | Design and layout tools |
| `art` | Image generation |
| `kitchen` | Recipes, or anything playful |
| `finance` | Reports, dashboards, analysis |
| `transfer` | Payments and money transfers. See [Payment flows](/guides/payment-flows) |
| `calm` | Long waits, wellbeing apps |

## See them live

<div class="demo demo-grid">
  <div class="demo-item"><span class="demo-label">thinking</span><fun-loader theme="thinking"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">dev</span><fun-loader theme="dev"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">design</span><fun-loader theme="design"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">art</span><fun-loader theme="art"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">kitchen</span><fun-loader theme="kitchen"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">finance</span><fun-loader theme="finance"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">transfer</span><fun-loader theme="transfer"></fun-loader></div>
  <div class="demo-item"><span class="demo-label">calm</span><fun-loader theme="calm"></fun-loader></div>
</div>

## All messages

::: details thinking
Opening a few mental tabs… · Rereading your question… · Sketching the answer in pencil… · Drafting, deleting, redrafting… · Looking at it upside down… · Pacing around the problem… · Weeding out the fast answers… · Checking the fine print… · Chewing on the details… · Cross-referencing a hunch… · Lining up the arguments… · Picking the best words… · Untangling your question…
:::

::: details dev
Asking the rubber duck… · Reading the stack trace twice… · Renaming variables, again… · Untangling the imports… · Arguing with the linter… · Checking it works on my machine… · Writing the tests first, honest… · Deleting a stray console.log… · Squashing a few commits… · Reading the docs, for once… · Indenting with intent… · Pinning a flaky dependency… · Counting the brackets…
:::

::: details design
Nudging it two pixels left… · Kerning by eye… · Squinting at the contrast… · Swapping the blues around… · Trying it in dark mode… · Adding a bit more padding… · Aligning the invisible grid… · Bargaining with the font size… · Hiding the hamburger menu… · Removing one more border… · Picking the less purple purple… · Zooming in way too close… · Moving the logo back…
:::

::: details art
Swirling the stars… · Perfecting a smile… · Dotting every dot… · Dripping paint… · Melting clocks… · Cresting the wave… · Adding a pearl earring… · Gilding in gold… · Squaring the colors… · Floating water lilies… · Ceci n’est pas une image… · Signing the corner…
:::

::: details kitchen
Preheating the oven… · Crying over the onions… · Softening the butter… · Hunting for the good whisk… · Reading the recipe backwards… · Letting the dough rise… · Reducing the sauce… · Seasoning to taste… · Licking the spoon, for science… · Tasting it one more time… · Adding a pinch more salt… · Plating with tweezers… · Wiping the rim of the plate…
:::

::: details finance
Reconciling the ledger… · Hunting a stray decimal… · Carrying the one… · Freezing the top row… · Widening column B… · Rounding, but responsibly… · Checking it adds up twice… · Tidying the pivot table… · Reading the footnotes… · Lining up the quarters… · Color-coding the cells… · Summing the summaries… · Sorting receipts by date…
:::

::: details transfer
Waiting on your transfer… · Waiting for confirmation… · Waiting to hear back… · Sent, waiting for a reply… · This can take a few seconds… · Transfers can take a moment… · One moment, please… · Stay with us a moment… · Hold on just a moment… · Thanks for waiting… · No need to press again… · Waiting for the reply…
:::

::: details calm
Take a slow breath… · Letting the tea steep… · Watching the clouds drift… · Listening to the rain… · Unclenching the shoulders… · Settling into the moment… · Letting it unfold… · Finding the quiet… · Following the tide out… · Counting slow breaths… · One moment at a time… · All in good time… · Resting in the in-between…
:::

## Long waits

Every theme has three [stages](/reference/options#stages). After 8 seconds of waiting, its messages give way to lines that acknowledge the longer wait, and again after 20 seconds. They never fake progress: no percentages, no "almost done", no countdowns.

Most themes share one set of long-wait lines:

::: details After 8 seconds (shared)
This one is taking a while… · Taking longer than most… · Bigger job than it looked… · Taking the scenic route… · Worth a little extra time… · Good things, slowly… · Good answers can take a while…
:::

::: details After 20 seconds (shared)
Thanks for sticking around… · Longer than usual, sorry… · Still waiting on this one… · This one is a deep dive…
:::

`finance`, `transfer` and `calm` have their own, to keep their tone. `transfer` and `calm` stay reassuring and never joke about money or failure.

::: details finance: after 8 and 20 seconds
Lots of rows to get through… · Big spreadsheets take longer… · Thorough beats fast here… · More data than usual… · Big reports take a moment… · Working down the long tail… · Every cell gets a look…

A big report takes a while… · Still waiting on the report… · Accuracy over speed… · Numbers this big take time…
:::

::: details transfer: after 8 and 20 seconds
This can take a little longer… · Some transfers take longer… · Still waiting to hear back… · Still waiting for confirmation… · Some confirmations take time… · Thanks for your patience…

Thank you for bearing with us… · Still waiting on your transfer… · Longer waits can be normal… · Thanks for staying with us…
:::

::: details calm: after 8 and 20 seconds
No rush at all… · Still with you… · Some things take a while… · Rest your eyes a moment… · Patience is part of it… · Breathe in, breathe out… · Taking its time, and that’s ok…

Still here with you… · Thank you for waiting… · Still unfolding, gently… · One breath at a time…
:::

## Your own

Write your own messages, or register a theme of your own. See [Custom messages](/guides/custom-messages).
