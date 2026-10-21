import { describe, expect, it } from 'vitest';
import * as themes from '../src/themes';
import { LONG_WAIT, VERY_LONG_WAIT } from '../src/themes/stages';

// Clichés, other products' lines, and fake-progress phrases. Matched case-insensitively.
const BANNED = [
  'connecting the dots',
  'crunching the numbers',
  'compiling thoughts',
  'reticulating splines',
  'almost there',
  'almost done',
  'almost had it',
  'nearly there',
  'nearly done',
  'wrapping things up',
  'any second',
  'hang tight',
  'making it pop',
];
// Stage lines must never fake progress.
const FAKE_PROGRESS = [
  /%/,
  /\bpercent\b/i,
  /\balmost\b/i,
  /\bnearly\b/i,
  /\b\d+\s*(s|sec|seconds?|min|minutes?)\b/i,
];
const MAX_LENGTH = 32;

const all = Object.values(themes);
const stageLists = all.flatMap((t) =>
  (t.stages ?? [])
    .slice(1)
    .map((s, i) => ({ where: `${t.name} stage ${i + 1}`, lines: s.messages })),
);
const everyLine = [...new Set([...all.flatMap((t) => t.stages ?? []).flatMap((s) => s.messages)])];

describe('theme copy', () => {
  it('gives every theme 12 to 14 stage-0 lines', () => {
    for (const t of all) {
      expect(t.messages.length, t.name).toBeGreaterThanOrEqual(12);
      expect(t.messages.length, t.name).toBeLessThanOrEqual(14);
    }
  });

  it('keeps stage 1 at 6 to 8 lines and stage 2 at 4 to 5', () => {
    for (const t of all) {
      const [, long, veryLong] = t.stages ?? [];
      expect(long?.messages.length, t.name).toBeGreaterThanOrEqual(6);
      expect(long?.messages.length, t.name).toBeLessThanOrEqual(8);
      expect(veryLong?.messages.length, t.name).toBeGreaterThanOrEqual(4);
      expect(veryLong?.messages.length, t.name).toBeLessThanOrEqual(5);
    }
  });

  it(`keeps every line at ${MAX_LENGTH} characters or fewer`, () => {
    for (const line of everyLine) expect(line.length, line).toBeLessThanOrEqual(MAX_LENGTH);
  });

  it('ends every line with an ellipsis character and uses no em dashes', () => {
    for (const line of everyLine) {
      expect(line.endsWith('…'), line).toBe(true);
      expect(line, line).not.toMatch(/\.\.\.|\u2014/);
    }
  });

  it('never repeats a line across themes or stages', () => {
    const lines = [
      ...all.flatMap((t) => t.messages),
      ...LONG_WAIT,
      ...VERY_LONG_WAIT,
      ...stageLists
        .filter((s) => s.lines !== LONG_WAIT && s.lines !== VERY_LONG_WAIT)
        .flatMap((s) => s.lines),
    ];
    const seen = new Set<string>();
    for (const line of lines) {
      expect(seen.has(line), `duplicate: ${line}`).toBe(false);
      seen.add(line);
    }
  });

  it('uses none of the banned phrases', () => {
    for (const line of everyLine) {
      for (const phrase of BANNED) expect(line.toLowerCase(), line).not.toContain(phrase);
    }
  });

  it('never fakes progress in stage 1 and 2 lines', () => {
    for (const { where, lines } of stageLists) {
      for (const line of lines) for (const re of FAKE_PROGRESS) expect(line, where).not.toMatch(re);
    }
  });

  it('shares one long-wait pool except where tone needs its own', () => {
    const own = new Set(['calm', 'transfer', 'finance']);
    for (const t of all) {
      const [, long, veryLong] = t.stages ?? [];
      expect(long?.messages === LONG_WAIT, t.name).toBe(!own.has(t.name));
      expect(veryLong?.messages === VERY_LONG_WAIT, t.name).toBe(!own.has(t.name));
    }
  });
});
