import { test, expect } from 'bun:test';
import { constlist } from '../src/lib/constlist';

test('constlist', () => {
    expect(constlist(100, 0).every(v => v === 0)).toBe(true);
    expect(constlist(100, 1).every(v => v === 1)).toBe(true);
    expect(constlist(100, 100000).every(v => v === 100000)).toBe(true);
    expect(constlist(100, 1).some(v => v === 0)).toBe(false);
});
