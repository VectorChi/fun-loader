import type { FunLoaderStage } from '../element';

/** Lines for waits past 8 s, shared by every theme that doesn't need its own tone. */
export const LONG_WAIT: readonly string[] = [
  'This one is taking a while…',
  'Still going, not stuck…',
  'Bigger job than it looked…',
  'Taking the scenic route…',
  'Worth a little extra time…',
  'Good things, slowly…',
  'Still at it, promise…',
];

/** Lines for waits past 20 s, shared the same way. */
export const VERY_LONG_WAIT: readonly string[] = [
  'Thanks for sticking around…',
  'Longer than usual, still going…',
  'Still here, still working…',
  'This one is a deep dive…',
];

/** A theme's three stages: its own messages, then the long-wait lines (shared unless given). */
export function staged(
  messages: readonly string[],
  long = LONG_WAIT,
  veryLong = VERY_LONG_WAIT,
): FunLoaderStage[] {
  return [
    { after: 0, messages },
    { after: 8000, messages: long },
    { after: 20_000, messages: veryLong },
  ];
}
