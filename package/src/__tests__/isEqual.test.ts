import { isEqual } from '../utils/generic';

/** A record as an app stores it, and the draft it's compared against. */
const RECORD = { name: { en: 'Maya', he: 'מאיה' }, hours: [{ day: 0, open: '09:00' }], social: { instagram: 'maya' }, active: true, rank: 2 };
const copy = () => JSON.parse(JSON.stringify(RECORD));

describe('isEqual', () => {
  test('a record equals its own copy, whatever the key order', () => {
    expect(isEqual(RECORD, copy())).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(isEqual({}, {})).toBe(true);
  });

  test('a nested change, an array item or a longer array is a change', () => {
    expect(isEqual(RECORD, { ...copy(), name: { en: 'Maya', he: 'מאיה!' } })).toBe(false);
    expect(isEqual(RECORD, { ...copy(), hours: [{ day: 0, open: '10:00' }] })).toBe(false);
    expect(isEqual([1, 2], [2, 1])).toBe(false);
    expect(isEqual([1], [1, 1])).toBe(false);
  });

  test('a removed key is a change, even one that held undefined', () => {
    expect(isEqual({ instagram: 'maya' }, {})).toBe(false);
    expect(isEqual({ a: undefined }, {})).toBe(false);
  });

  test('types never cross: arrays, objects, null, numbers and strings', () => {
    expect(isEqual([1], { 0: 1 })).toBe(false);
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual(1, '1')).toBe(false);
  });

  test('NaN equals NaN and 0 equals -0, as lodash has it', () => {
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(0, -0)).toBe(true);
  });

  test('anything but a plain object or array equals only itself', () => {
    const date = new Date(0);
    expect(isEqual(date, date)).toBe(true);
    expect(isEqual(new Date(0), new Date(0))).toBe(false);
  });
});
