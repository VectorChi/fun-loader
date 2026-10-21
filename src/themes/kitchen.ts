import type { FunLoaderTheme } from '../element';

const messages = [
  'Preheating the oven…',
  'Chopping the onions…',
  'Simmering gently…',
  'Seasoning to taste…',
  'Whisking vigorously…',
  'Letting the dough rise…',
  'Stirring the pot…',
  'Reducing the sauce…',
  'Tasting as we go…',
  'Plating it up…',
  'Adding a pinch of salt…',
  'Garnishing…',
];

export const kitchen: FunLoaderTheme = {
  name: 'kitchen',
  messages,
  stages: [
    { after: 0, messages },
    {
      after: 8000,
      messages: [
        'Slow-cooked takes longer…',
        'Still simmering away…',
        'Letting the flavors develop…',
        'This recipe takes time…',
        'Waiting for the water to boil…',
        'Low and slow…',
        'Keeping it on the heat…',
      ],
    },
    {
      after: 20_000,
      messages: [
        'A long braise, not a snack…',
        'Still in the oven…',
        'Good food is worth the wait…',
        'Peeking through the oven door…',
      ],
    },
  ],
};
