import type { FunLoaderTheme } from '../element';

const messages = [
  'Swirling the stars…',
  'Perfecting a smile…',
  'Dotting every dot…',
  'Dripping paint…',
  'Melting clocks…',
  'Cresting the wave…',
  'Adding a pearl earring…',
  'Gilding in gold…',
  'Squaring the colors…',
  'Floating water lilies…',
  'Ceci n’est pas une image…',
  'Adding happy little trees…',
];

export const art: FunLoaderTheme = {
  name: 'art',
  messages,
  stages: [
    { after: 0, messages },
    {
      after: 8000,
      messages: [
        'Big canvas, small brush…',
        'Letting the paint dry…',
        'Adding another layer…',
        'Mixing a trickier color…',
        'Stepping back to look…',
        'Still blending the edges…',
        'Some pictures take longer…',
      ],
    },
    {
      after: 20_000,
      messages: [
        'Still at the easel…',
        'This one is a full mural…',
        'Painting slowly, on purpose…',
        'Thanks for waiting on the art…',
      ],
    },
  ],
};
