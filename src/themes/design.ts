import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

const messages = [
  'Nudging it two pixels left…',
  'Kerning by eye…',
  'Squinting at the contrast…',
  'Swapping the blues around…',
  'Trying it in dark mode…',
  'Adding a bit more padding…',
  'Aligning the invisible grid…',
  'Bargaining with the font size…',
  'Hiding the hamburger menu…',
  'Removing one more border…',
  'Picking the less purple purple…',
  'Zooming in way too close…',
  'Moving the logo back…',
];

export const design: FunLoaderTheme = { name: 'design', messages, stages: staged(messages) };
