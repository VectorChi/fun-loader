# Listing on awesome-vue (draft)

Not submitted. Based on [awesome-vue's contributing guide](https://github.com/vuejs/awesome-vue/blob/master/.github/contributing.md) and PR template, read on 2026-10-24.

## When

awesome-vue's guide has a rule for projects built with AI agents: "there should be at least 3 updates published with a minimum of a month between first and last release." fun-loader was built with an AI agent, so this rule applies.

- Releases so far: 0.1.0 on 2026-10-20, then 0.2.0 to 0.5.1 by 2026-10-22. That is more than three, but all within three days.
- The first release was 2026-10-20, so the earliest the rule is met is a release on or after **2026-11-20**.
- Submit after publishing that release.

## Where

**Components & Libraries > UI Components > Loader**, added at the end of the list (the guide asks for first-come-first-serve order). The section is described as "Loaders / spinners / progress bars: Let the user know that something is loading". It already lists another web component with Vue support (phantom-ui).

## The line

```md
- [fun-loader](https://github.com/VectorChi/fun-loader) - Playful, rotating loading messages for AI responses and other slow tasks, as a web component with a Vue component and a Nuxt module. The lines change when the wait runs long.
```

Rules this follows: the link is the GitHub repo, not the docs or a demo, and the description has no links to the author or other resources.

## Pull request

Title, in the style of merged PRs: `Add fun-loader to UI Components > Loader`

The template is a checklist. Keep its structure and tick:

- General: "Pull request template structure not broken"
- Type: "Feature"
- Checklist: "Title as described", "Make sure you put things in the right category!", "Always add your items to the end of a list"
- Open Source: all six (no author link in the description; README with a description, demo GIF and a Contributing section; English; active; accepts contributions; not commercial)
- Leave the Apps/Websites boxes empty: they are for sites built with Vue, not libraries.

## Checklist against the guide

| Requirement | Status |
| --- | --- |
| README describes the project | Yes |
| Demo or screenshots | Yes, the demo GIF at the top of the README, and the live docs playground |
| A CONTRIBUTING section | Yes, the README's "Contributing" section and CONTRIBUTING.md |
| English | Yes |
| Active and maintained | Yes, keep releasing until submission |
| Accepts contributions | Yes, issues are open and CONTRIBUTING.md explains pull requests |
| Not commercial | Yes, MIT |
| AI rule: 3+ releases, a month between first and last | Not yet: first release 2026-10-20, so a release on or after 2026-11-20 |

The guide also says "Just useful is not enough": the list wants awesome things. The demo GIF and the long-wait behavior are what make the case, so keep the GIF at the top of the README.
