import { test, expect } from 'bun:test';
import { stack } from '../src/lib/stack';

test('stack', () => {
    const input = [0, -1, 3, 4, 2, 6, 10];
    const expected = [0, 0, -1, 2, 6, 8, 14, 24];
    const result = stack(input);
    expect(result).toEqual(expected);
})
