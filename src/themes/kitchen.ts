import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

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

export const kitchen: FunLoaderTheme = { name: 'kitchen', messages, stages: staged(messages) };
