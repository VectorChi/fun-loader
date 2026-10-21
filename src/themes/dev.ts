import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

const messages = [
  'Asking the rubber duck…',
  'Reading the stack trace twice…',
  'Renaming variables, again…',
  'Untangling the imports…',
  'Arguing with the linter…',
  'Checking it works on my machine…',
  'Writing the tests first, honest…',
  'Deleting a stray console.log…',
  'Squashing a few commits…',
  'Reading the docs, for once…',
  'Indenting with intent…',
  'Pinning a flaky dependency…',
  'Counting the brackets…',
];

export const dev: FunLoaderTheme = { name: 'dev', messages, stages: staged(messages) };
