import { makeArray } from '../../../src/components/pagination/arrayMaker';

describe('makeArray', () => {
  it('should return an array starting from 1 if initNumber is less than 5', () => {
    expect(makeArray(1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(makeArray(3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should return an array starting from initNumber is between 5 and 62', () => {
    expect(makeArray(10)).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14]);
    expect(makeArray(20)).toEqual([16, 17, 18, 19, 20, 21, 22, 23, 24]);
  });

  it('should return an array starting from 58 if initNumber is greater than 62', () => {
    expect(makeArray(63)).toEqual([58, 59, 60, 61, 62, 63, 64, 65, 66]);
    expect(makeArray(100)).toEqual([58, 59, 60, 61, 62, 63, 64, 65, 66]);
  });

  it('should return an array of length 10', () => {
    expect(makeArray(1).length).toBe(9);
    expect(makeArray(10).length).toBe(9);
    expect(makeArray(63).length).toBe(9);
  });
});
