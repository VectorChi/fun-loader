import type { FunLoaderTheme } from '../element';

const messages = [
  'Nudging pixels…',
  'Kerning the letters…',
  'Picking a palette…',
  'Aligning to the grid…',
  'Adding whitespace…',
  'Rounding the corners…',
  'Choosing a font…',
  'Balancing the layout…',
  'Adjusting the contrast…',
  'Sketching ideas…',
  'Removing one more thing…',
  'Making it pop…',
];

export const design: FunLoaderTheme = {
  name: 'design',
  messages,
  stages: [
    { after: 0, messages },
    {
      after: 8000,
      messages: [
        'Trying one more variation…',
        'Second-guessing the margins…',
        'This layout needs more care…',
        'Zooming in on the details…',
        'Still moving things by 1px…',
        'Rethinking the hierarchy…',
        'Good design takes a beat…',
      ],
    },
    {
      after: 20_000,
      messages: [
        'Taking extra care with this…',
        'Polish takes patience…',
        'Still sketching, not stuck…',
        'Thanks for bearing with us…',
      ],
    },
  ],
};
