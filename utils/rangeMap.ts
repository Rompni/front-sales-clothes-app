export const rangeMap = (n: number, fn: (i: number) => any): any[] => {
  const arr = [];
  while (n > arr.length) {
    arr.push(fn(arr.length));
  }
  return arr;
};
