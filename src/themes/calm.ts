import type { FunLoaderTheme } from '../element';

const messages = [
  'Take a breath…',
  'Settling in…',
  'Letting it unfold…',
  'Steeping slowly…',
  'Finding the quiet…',
  'Gathering thoughts…',
  'One moment at a time…',
  'Drifting toward an answer…',
  'Watching the clouds…',
  'Easing into it…',
  'Nearly there…',
  'All in good time…',
];

export const calm: FunLoaderTheme = {
  name: 'calm',
  messages,
  stages: [
    { after: 0, messages },
    {
      after: 8000,
      messages: [
        'No rush at all…',
        'Still with you…',
        'Some things take a while…',
        'Rest your eyes a moment…',
        'Patience is part of it…',
        'Breathe in, breathe out…',
        'Taking its time, and that’s ok…',
      ],
    },
    {
      after: 20_000,
      messages: [
        'Still here with you…',
        'Thank you for waiting…',
        'Still unfolding, gently…',
        'One breath at a time…',
      ],
    },
  ],
};
