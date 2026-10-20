import { defineAll } from './register';

// Kept in this file (not a shared chunk) so bundlers honour `sideEffects` and never drop it.
defineAll();

export * from './element';
export { defineAll } from './register';
export * from './themes';
