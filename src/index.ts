import { defineAll } from './register';

// Kept in this file (not a shared chunk) so bundlers honour `sideEffects` and never drop it.
defineAll();

export * from './element';
export { defineAll } from './register';
export * from './themes';
export { LONG_WAIT, staged, VERY_LONG_WAIT } from './themes/stages';
