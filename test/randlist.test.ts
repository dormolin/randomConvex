import { randlist } from "../src/lib/randlist";
import { test, expect } from 'bun:test';

test('landlist', () => {
    const result = randlist(100);

    const average = result.reduce((p, c) => p + c, 0) / result.length;
    expect(average).toBeGreaterThan(0.45);
    expect(average).toBeLessThan(0.55);

    expect(Math.max(...result)).toBeGreaterThan(0.9);
    expect(Math.min(...result)).toBeLessThan(0.1);
});

