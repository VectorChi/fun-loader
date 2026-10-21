import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

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

export const dev: FunLoaderTheme = { name: 'dev', messages, stages: staged(messages) };
