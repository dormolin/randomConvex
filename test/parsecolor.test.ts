import { test, expect } from 'bun:test';
import { parseColor } from '../src/lib/parseColor';

test('parse color', () => {
    expect(parseColor("#01ffde")).toEqual({r:1, g:255, b:222});
    expect(parseColor("#000000")).toEqual({r:0, g:0, b:0});
    expect(parseColor("#ffffff")).toEqual({r:255, g:255, b:255});
    expect(parseColor("#af8")).toEqual({r:170, g:255, b:136});
    expect(parseColor("#07f")).toEqual({r:0, g:119, b:255});
    expect(parseColor("rgb(0, 1, 2)")).toEqual({r:0, g:1, b:2})
    expect(parseColor("rgb(0,1,2)")).toEqual({r:0, g:1, b:2})
    expect(parseColor("rgb( 0,1,2 )")).toEqual({r:0, g:1, b:2})
});
