import type { FunLoaderTheme } from '../element';

const messages = [
  'Thinking…',
  'Connecting the dots…',
  'Consulting the neurons…',
  'Pondering deeply…',
  'Untangling thoughts…',
  'Weighing the options…',
  'Having a little think…',
  'Chasing a hunch…',
  'Following a train of thought…',
  'Brewing ideas…',
  'Rummaging through memory…',
  'Almost had it…',
];

export const thinking: FunLoaderTheme = {
  name: 'thinking',
  messages,
  stages: [
    { after: 0, messages },
    {
      after: 8000,
      messages: [
        'Still turning this one over…',
        'This one needs a closer look…',
        'Taking the long way around…',
        'Good questions take a moment…',
        'Thinking it through properly…',
        'Not rushing this one…',
        'Still on the case…',
      ],
    },
    {
      after: 20_000,
      messages: [
        'Longer than usual, still going…',
        'This one is a deep dive…',
        'Still here, still working…',
        'Thanks for hanging in there…',
      ],
    },
  ],
};
