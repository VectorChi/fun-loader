import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

const messages = [
  'Take a slow breath…',
  'Letting the tea steep…',
  'Watching the clouds drift…',
  'Listening to the rain…',
  'Unclenching the shoulders…',
  'Settling into the moment…',
  'Letting it unfold…',
  'Finding the quiet…',
  'Following the tide out…',
  'Counting slow breaths…',
  'One moment at a time…',
  'All in good time…',
  'Resting in the in-between…',
];

export const calm: FunLoaderTheme = {
  name: 'calm',
  messages,
  stages: staged(
    messages,
    [
      'No rush at all…',
      'Still with you…',
      'Some things take a while…',
      'Rest your eyes a moment…',
      'Patience is part of it…',
      'Breathe in, breathe out…',
      'Taking its time, and that’s ok…',
    ],
    [
      'Still here with you…',
      'Thank you for waiting…',
      'Still unfolding, gently…',
      'One breath at a time…',
    ],
  ),
};
