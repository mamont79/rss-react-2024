export const makeArray = (initNumber: number) => {
  const start = initNumber < 5 ? 1 : initNumber - 4;
  const end = start + 9;
  const array = [...Array(end - start).keys()].map((x) => x + start);
  return array;
};
