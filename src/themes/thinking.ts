import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

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

export const thinking: FunLoaderTheme = { name: 'thinking', messages, stages: staged(messages) };
