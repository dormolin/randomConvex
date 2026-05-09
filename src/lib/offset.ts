/**
 * offset values of array
 * @param array 
 * @param value 
 * @returns e.g. offset([0, 1, 2, 3], 1) => [1, 2, 3, 4]
 */
export const offset = (array: number[], value: number) => array.map(x => x + value)
