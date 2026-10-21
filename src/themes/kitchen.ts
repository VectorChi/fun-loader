import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

const messages = [
  'Preheating the oven…',
  'Crying over the onions…',
  'Softening the butter…',
  'Hunting for the good whisk…',
  'Reading the recipe backwards…',
  'Letting the dough rise…',
  'Reducing the sauce…',
  'Seasoning to taste…',
  'Licking the spoon, for science…',
  'Tasting it one more time…',
  'Adding a pinch more salt…',
  'Plating with tweezers…',
  'Wiping the rim of the plate…',
];

export const kitchen: FunLoaderTheme = { name: 'kitchen', messages, stages: staged(messages) };
