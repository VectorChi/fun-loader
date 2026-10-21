import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

const messages = [
  'Opening a few mental tabs…',
  'Rereading your question…',
  'Sketching the answer in pencil…',
  'Drafting, deleting, redrafting…',
  'Looking at it upside down…',
  'Pacing around the problem…',
  'Weeding out the fast answers…',
  'Checking the fine print…',
  'Chewing on the details…',
  'Cross-referencing a hunch…',
  'Lining up the arguments…',
  'Picking the best words…',
  'Untangling your question…',
];

export const thinking: FunLoaderTheme = { name: 'thinking', messages, stages: staged(messages) };
