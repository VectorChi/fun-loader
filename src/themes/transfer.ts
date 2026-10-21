import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

const messages = [
  'Preparing your transfer…',
  'Working on your transfer…',
  'Your transfer is in progress…',
  'Handling this with care…',
  'Taking care of the details…',
  'Getting the paperwork in order…',
  'Processing, step by step…',
  'This can take a few seconds…',
  'Still working on it…',
  'One moment, please…',
  'Stay with us a moment…',
  'Moving at a careful pace…',
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
