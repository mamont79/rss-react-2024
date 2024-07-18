const startPage = 1;
const lastMiddle = 62;
const paginationLength = 9;
const lowMiddle = 5;
const bigStart = 58;
const leftBorder = 4;

export const makeArray = (initNumber: number) => {
  let start = initNumber < lowMiddle ? startPage : initNumber - leftBorder;
  if (initNumber > lastMiddle) start = bigStart;
  const end = start + paginationLength;
  const array = [...Array(end - start).keys()].map((x) => x + start);
  return array;
};
