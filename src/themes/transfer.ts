import type { FunLoaderTheme } from '../element';

// Calm and generic on purpose: people are anxious while money moves, and the
// loader can't know which step the backend is really on.
export const transfer: FunLoaderTheme = {
  name: 'transfer',
  messages: [
    'Preparing your transfer…',
    'Checking the details…',
    'Talking to the bank…',
    'Moving your money…',
    'Counting every cent…',
    'Getting the paperwork in order…',
    'Double-checking everything…',
    'This can take a few seconds…',
    'Still working on it…',
    'Wrapping things up…',
    'Almost there…',
    'Hang tight…',
  ],
};
