export const makeArray = (initNumber: number) => {
  let start = initNumber < 5 ? 1 : initNumber - 4;
  if (initNumber > 62) start = 58;
  const end = start + 9;
  const array = [...Array(end - start).keys()].map((x) => x + start);
  return array;
};
