/**
 * generate array of random number
 * @param size 
 * @returns [0-1, 0-1, 0-1, ..., 0-1]: length = size
 */
export const randlist = (size: number) => new Array(size).fill(0).map(() => Math.random())
