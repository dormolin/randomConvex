import { test, expect } from 'bun:test';
import { RandomConvexOptions } from '../src/RandomConvex';


test('randomConvexOptions', () => {
    const options = new RandomConvexOptions({
        number: 10,
        randomRotate: true,
    })

    expect(options.number).toEqual(10);
    expect(options.randomRotate).toEqual(true);
    expect(options.polygonCorners).toEqual(4);
});

