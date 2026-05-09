/**
 * generate const array
 * @param n length of array
 * @param c const value
 * @returns [c, c, c, c, ...., c] length = n
 */
export const constlist = (n: number, c = 1) => new Array(n).fill(c);
