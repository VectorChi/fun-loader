import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

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
  'Signing the corner…',
];

export const art: FunLoaderTheme = { name: 'art', messages, stages: staged(messages) };
