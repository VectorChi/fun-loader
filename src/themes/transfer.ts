import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

const messages = [
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
];

export const transfer: FunLoaderTheme = {
  name: 'transfer',
  messages,
  stages: staged(
    messages,
    [
      'This can take a little longer…',
      'Still processing your transfer…',
      'Some transfers take longer…',
      'Still working on this…',
      'Thanks for your patience…',
      'Still on it, thank you…',
    ],
    [
      'Thank you for bearing with us…',
      'Still working on your transfer…',
      'Longer waits can be normal…',
      'We’re still on it…',
    ],
  ),
};
