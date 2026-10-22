import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

// Payments: never claim what the loader can't know (that the transfer is progressing). What is
// always true is that the app is waiting, so the lines describe the wait, not the transfer.
const messages = [
  'Waiting on your transfer…',
  'Waiting for confirmation…',
  'Waiting to hear back…',
  'Sent, waiting for a reply…',
  'This can take a few seconds…',
  'Transfers can take a moment…',
  'One moment, please…',
  'Stay with us a moment…',
  'Hold on just a moment…',
  'Thanks for waiting…',
  'No need to press again…',
  'Waiting for the reply…',
];

export const transfer: FunLoaderTheme = {
  name: 'transfer',
  messages,
  stages: staged(
    messages,
    [
      'This can take a little longer…',
      'Some transfers take longer…',
      'Still waiting to hear back…',
      'Still waiting for confirmation…',
      'Some confirmations take time…',
      'Thanks for your patience…',
    ],
    [
      'Thank you for bearing with us…',
      'Still waiting on your transfer…',
      'Longer waits can be normal…',
      'Thanks for staying with us…',
    ],
  ),
};
