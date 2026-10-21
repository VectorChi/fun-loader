import type { FunLoaderTheme } from '../element';

const messages = [
  'Compiling thoughts…',
  'Resolving dependencies…',
  'Refactoring ideas…',
  'Warming up the cache…',
  'Reticulating splines…',
  'Counting semicolons…',
  'Rebasing reality…',
  'Linting the universe…',
  'Spinning up workers…',
  'Reading the docs (finally)…',
  'Closing brackets…',
  'Shipping it…',
];

export const dev: FunLoaderTheme = {
  name: 'dev',
  messages,
  stages: [
    { after: 0, messages },
    {
      after: 8000,
      messages: [
        'This build is a big one…',
        'Still compiling, stay with me…',
        'More code than expected…',
        'The fans just kicked in…',
        'Slow, but not stuck…',
        'Long tests are good tests…',
        'Grab a coffee, still building…',
      ],
    },
    {
      after: 20_000,
      messages: [
        'Still running, not hung…',
        'Not a timeout, just thorough…',
        'A long-running job, still up…',
        'Still in the pipeline…',
      ],
    },
  ],
};
