import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

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

export const design: FunLoaderTheme = { name: 'design', messages, stages: staged(messages) };
