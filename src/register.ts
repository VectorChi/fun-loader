import { define, registerTheme } from './element';
import * as themes from './themes';

/** Registers every bundled theme and defines the element. Safe to call more than once. */
export function defineAll(tag?: string): void {
  for (const theme of Object.values(themes)) registerTheme(theme);
  define(tag);
}
