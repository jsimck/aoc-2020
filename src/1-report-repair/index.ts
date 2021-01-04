import chalk from 'chalk';
import input from './data/input';

/**
 * Uses binary search to find complement to given {@code num} which upon adding these two
 * numbers together results in {@code expectedSum}. Otherwise returns null.
 *
 * @param {number[]} sortedArr Input array sans the searched number sorted descending.
 * @param {number} num Number to search complement to.
 * @param {number} expectedSum Expected sum when adding num and number from input array.
 * @param {number} start Start index of array (usually 0)
 * @param {number} end End array index (sortedArr length)
 * @return {*}  {(number | null)}
 */
function findComplement(
  sortedArr: number[],
  num: number,
  expectedSum: number,
  start: number,
  end: number
): number | null {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const sum = sortedArr[mid] + num;

  if (sum === expectedSum) {
    return sortedArr[mid];
  }

  if (sum > expectedSum) {
    return findComplement(sortedArr, num, expectedSum, start, mid - 1);
  } else {
    return findComplement(sortedArr, num, expectedSum, mid + 1, end);
  }
}

/**
 * Find pair of numbers in given array which upon summing results in expectedSum.
 * Returns null if there are no pairs that exist.
 *
 * @param {number[]} arr Input numbers array.
 * @param {number} expectedSum Expected sum.
 * @return {*}  {([number, number] | null)}
 */
function findDoubles(
  arr: number[],
  expectedSum: number
): [number, number] | null {
  const sortedInput = arr.sort((a, b) => a - b);
  const inputLen = sortedInput.length;

  for (let i = 0; i < inputLen; i++) {
    const searchArray = [...sortedInput];
    searchArray.splice(i, 1);

    const complement = findComplement(
      searchArray,
      sortedInput[i],
      expectedSum,
      0,
      inputLen - 1
    );

    if (complement !== null) {
      return [complement, sortedInput[i]];
    }
  }

  return null;
}

export default function reportRepair() {
  const doubles = findDoubles(input, 2020);

  if (Array.isArray(doubles)) {
    const sum = doubles.reduce((sum, cur) => sum * cur, 1);

    console.log(
      chalk.cyan(
        `Following entries were found faulty in given report (${doubles[0]}, ${doubles[1]}),`
      )
    );
    console.log(
      chalk.cyan(
        `which upon multiplying results in: ${doubles[0]} * ${
          doubles[1]
        } = ${chalk.bold.underline(sum)}`
      )
    );
  } else {
    console.log(
      chalk.red(
        'Awesome! (or not?), there are no faulty entries in given elves financial report.'
      )
    );
  }
}
