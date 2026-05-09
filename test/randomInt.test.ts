import { test, expect } from 'bun:test'
import { randomInt } from "../src/lib/randomInt"

test('randomInt', () => {
    const count = new Array(301)
    count.fill(0)
    for (let i = 0; i < 100000; i++) {
        count[randomInt(50, 300)] += 1
    }
    console.table(count)
    expect(count[49]).toEqual(0);
});

