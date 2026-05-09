/**
 * stack numbers. 1, 2, 3 => 0, 0 + 1, 0 + 1 + 2, 0 + 1 + 2 + 3
 * @param array numbers
 * @param init initial value
 * @returns e.g. 1, 2, 3 => 0, 1, 3, 6
 */
export const stack = (array: number[], init = 0) => array.reduce((prev, current) => [...prev, (prev.at(-1)?? 0) + current], [init]);
