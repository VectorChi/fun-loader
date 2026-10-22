# Copy review (0.4.0 and later)

Every theme’s stage-0 lines, old (0.3) and new, side by side. Edit the **New** column in the theme files under `src/themes/`; `test/copy.test.ts` checks the rules (12 to 14 lines, 32 characters max, ending in "…", no duplicates, no banned phrases).

**Rule for every line:** never claim what the loader cannot know. Playful lines are fine ("Asking the rubber duck…"); claims about the request’s state are not ("still working", "still processing", "in progress", "not stuck"). What is always true is that the app is waiting.

**Hero line** for the landing page and README: **"Opening a few mental tabs…"** (thinking).

## thinking

Rewritten. Clichés removed ("Connecting the dots", "Pondering deeply", "Brewing ideas") and "Almost had it" (fake progress). Hero line: "Opening a few mental tabs…".

| Old (0.3) | New |
| --- | --- |
| Thinking… | Opening a few mental tabs… |
| Connecting the dots… | Rereading your question… |
| Consulting the neurons… | Sketching the answer in pencil… |
| Pondering deeply… | Drafting, deleting, redrafting… |
| Untangling thoughts… | Looking at it upside down… |
| Weighing the options… | Pacing around the problem… |
| Having a little think… | Weeding out the fast answers… |
| Chasing a hunch… | Checking the fine print… |
| Following a train of thought… | Chewing on the details… |
| Brewing ideas… | Cross-referencing a hunch… |
| Rummaging through memory… | Lining up the arguments… |
| Almost had it… | Picking the best words… |
|  | Untangling your question… |

## dev

Rewritten. Removed "Compiling thoughts" (cliché) and "Reticulating splines" (from SimCity, another product).

| Old (0.3) | New |
| --- | --- |
| Compiling thoughts… | Asking the rubber duck… |
| Resolving dependencies… | Reading the stack trace twice… |
| Refactoring ideas… | Renaming variables, again… |
| Warming up the cache… | Untangling the imports… |
| Reticulating splines… | Arguing with the linter… |
| Counting semicolons… | Checking it works on my machine… |
| Rebasing reality… | Writing the tests first, honest… |
| Linting the universe… | Deleting a stray console.log… |
| Spinning up workers… | Squashing a few commits… |
| Reading the docs (finally)… | Reading the docs, for once… |
| Closing brackets… | Indenting with intent… |
| Shipping it… | Pinning a flaky dependency… |
|  | Counting the brackets… |

## design

Rewritten. Removed "Making it pop" (cliché).

| Old (0.3) | New |
| --- | --- |
| Nudging pixels… | Nudging it two pixels left… |
| Kerning the letters… | Kerning by eye… |
| Picking a palette… | Squinting at the contrast… |
| Aligning to the grid… | Swapping the blues around… |
| Adding whitespace… | Trying it in dark mode… |
| Rounding the corners… | Adding a bit more padding… |
| Choosing a font… | Aligning the invisible grid… |
| Balancing the layout… | Bargaining with the font size… |
| Adjusting the contrast… | Hiding the hamburger menu… |
| Sketching ideas… | Removing one more border… |
| Removing one more thing… | Picking the less purple purple… |
| Making it pop… | Zooming in way too close… |
|  | Moving the logo back… |

## art

Kept the list you picked earlier, except "Adding happy little trees…" (a well-known TV catchphrase), now "Signing the corner…". Please still review "Ceci n’est pas une image…" for originality (a riff on a famous painting title).

| Old (0.3) | New |
| --- | --- |
| Swirling the stars… | Swirling the stars… |
| Perfecting a smile… | Perfecting a smile… |
| Dotting every dot… | Dotting every dot… |
| Dripping paint… | Dripping paint… |
| Melting clocks… | Melting clocks… |
| Cresting the wave… | Cresting the wave… |
| Adding a pearl earring… | Adding a pearl earring… |
| Gilding in gold… | Gilding in gold… |
| Squaring the colors… | Squaring the colors… |
| Floating water lilies… | Floating water lilies… |
| Ceci n’est pas une image… | Ceci n’est pas une image… |
| Adding happy little trees… | Signing the corner… |

## kitchen

Reworked with more specific, visual lines. Kept "Preheating the oven", "Letting the dough rise", "Reducing the sauce" and "Seasoning to taste".

| Old (0.3) | New |
| --- | --- |
| Preheating the oven… | Preheating the oven… |
| Chopping the onions… | Crying over the onions… |
| Simmering gently… | Softening the butter… |
| Seasoning to taste… | Hunting for the good whisk… |
| Whisking vigorously… | Reading the recipe backwards… |
| Letting the dough rise… | Letting the dough rise… |
| Stirring the pot… | Reducing the sauce… |
| Reducing the sauce… | Seasoning to taste… |
| Tasting as we go… | Licking the spoon, for science… |
| Plating it up… | Tasting it one more time… |
| Adding a pinch of salt… | Adding a pinch more salt… |
| Garnishing… | Plating with tweezers… |
|  | Wiping the rim of the plate… |

## finance

Rewritten. Removed "Crunching the numbers" (cliché). Its long-wait lines no longer claim work is still happening ("Still adding it all up", "Still working through it"): the loader cannot know that.

| Old (0.3) | New |
| --- | --- |
| Crunching the numbers… | Reconciling the ledger… |
| Balancing the books… | Hunting a stray decimal… |
| Reconciling accounts… | Carrying the one… |
| Checking the ledger… | Freezing the top row… |
| Compounding interest… | Widening column B… |
| Consulting the spreadsheets… | Rounding, but responsibly… |
| Auditing the decimals… | Checking it adds up twice… |
| Reading the market… | Tidying the pivot table… |
| Diversifying thoughts… | Reading the footnotes… |
| Rounding to the nearest cent… | Lining up the quarters… |
| Calculating returns… | Color-coding the cells… |
| Closing the quarter… | Summing the summaries… |
|  | Sorting receipts by date… |

## transfer

Rewritten around what is always true: the app is waiting. No line claims what the loader cannot know, such as the transfer being in progress or still processing, because in a payment flow that would be misleading if the request has stalled. Removed fake progress ("Almost there", "Wrapping things up"), step claims ("Talking to the bank", "Moving your money") and "Hang tight". Kept "This can take a few seconds". Added "No need to press again", which also discourages double submits.

| Old (0.3) | New |
| --- | --- |
| Preparing your transfer… | Waiting on your transfer… |
| Checking the details… | Waiting for confirmation… |
| Talking to the bank… | Waiting to hear back… |
| Moving your money… | Sent, waiting for a reply… |
| Counting every cent… | This can take a few seconds… |
| Getting the paperwork in order… | Transfers can take a moment… |
| Double-checking everything… | One moment, please… |
| This can take a few seconds… | Stay with us a moment… |
| Still working on it… | Hold on just a moment… |
| Wrapping things up… | Thanks for waiting… |
| Almost there… | No need to press again… |
| Hang tight… | Waiting for the reply… |

## calm

Reworked with more specific, visual lines. Removed "Nearly there" (fake progress).

| Old (0.3) | New |
| --- | --- |
| Take a breath… | Take a slow breath… |
| Settling in… | Letting the tea steep… |
| Letting it unfold… | Watching the clouds drift… |
| Steeping slowly… | Listening to the rain… |
| Finding the quiet… | Unclenching the shoulders… |
| Gathering thoughts… | Settling into the moment… |
| One moment at a time… | Letting it unfold… |
| Drifting toward an answer… | Finding the quiet… |
| Watching the clouds… | Following the tide out… |
| Easing into it… | Counting slow breaths… |
| Nearly there… | One moment at a time… |
| All in good time… | All in good time… |
|  | Resting in the in-between… |

## Long-wait stages

New in 0.4.0, so there is no old column. These replace the rotating messages after 8 s and 20 s of active waiting. They acknowledge the wait, never fake progress (no percentages, no "almost", no countdowns), and never claim the request is still progressing.

### Shared pool (thinking, dev, design, art, kitchen)

**After 8 s**

- This one is taking a while…
- Taking longer than most…
- Bigger job than it looked…
- Taking the scenic route…
- Worth a little extra time…
- Good things, slowly…
- Good answers can take a while…

**After 20 s**

- Thanks for sticking around…
- Longer than usual, sorry…
- Still waiting on this one…
- This one is a deep dive…

### finance (own lines, for tone)

**After 8 s**

- Lots of rows to get through…
- Big spreadsheets take longer…
- Thorough beats fast here…
- More data than usual…
- Big reports take a moment…
- Working down the long tail…
- Every cell gets a look…

**After 20 s**

- A big report takes a while…
- Still waiting on the report…
- Accuracy over speed…
- Numbers this big take time…

### transfer (own lines, for tone)

**After 8 s**

- This can take a little longer…
- Some transfers take longer…
- Still waiting to hear back…
- Still waiting for confirmation…
- Some confirmations take time…
- Thanks for your patience…

**After 20 s**

- Thank you for bearing with us…
- Still waiting on your transfer…
- Longer waits can be normal…
- Thanks for staying with us…

### calm (own lines, for tone)

**After 8 s**

- No rush at all…
- Still with you…
- Some things take a while…
- Rest your eyes a moment…
- Patience is part of it…
- Breathe in, breathe out…
- Taking its time, and that’s ok…

**After 20 s**

- Still here with you…
- Thank you for waiting…
- Still unfolding, gently…
- One breath at a time…
