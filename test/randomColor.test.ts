import { randomColor } from "../src/lib/randomColor";
import { test, expect } from 'bun:test';

test('random color', () => {
    const size = 1000
    const colors = new Array(size).fill(0).map(() => randomColor())
    expect(colors.length).toBe(size);
    expect(colors.every(c => c)).toBe(true);
    expect(colors.every(c => c.substring(0, 4) === 'rgb(')).toBe(true);
    const matched = colors.map(c => c.match(/\((\d+),\s*(\d+),\s*(\d+)\)/));
    expect(matched.every(m => m !== null)).toBe(true);
    const rs = matched.map(m => Number(m[1]));
    expect(Math.max(...rs)).toBe(255);
    expect(Math.min(...rs)).toBe(0);
    const gs = matched.map(m => Number(m[1]));
    expect(Math.max(...gs)).toBe(255);
    expect(Math.min(...gs)).toBe(0);
    const bs = matched.map(m => Number(m[1]));
    expect(Math.max(...bs)).toBe(255);
    expect(Math.min(...bs)).toBe(0);
});
