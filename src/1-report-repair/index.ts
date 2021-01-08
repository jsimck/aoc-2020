import chalk from 'chalk';
import { loadData } from '../utils';

type Double = [number, number];
type Triple = [number, number, number];

function findComplement(
  sortedInput: number[],
  num: number,
  expectedSum: number,
  start: number,
  end: number
): number | null {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const sum = sortedInput[mid] + num;

  if (sum === expectedSum) {
    return sortedInput[mid];
  }

  if (sum > expectedSum) {
    return findComplement(sortedInput, num, expectedSum, start, mid - 1);
  } else {
    return findComplement(sortedInput, num, expectedSum, mid + 1, end);
  }
}

function findDoubles(input: number[], expectedSum: number): Double | null {
  const sortedInput = input.sort((a, b) => a - b);
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

function findTriples(input: number[], expectedSum: number): Triple | null {
  const inputLen = input.length;

  for (let i = 0; i < inputLen; i++) {
    const e1 = input[i];
    for (let j = 0; j < inputLen; j++) {
      const e2 = input[j];
      for (let k = 0; k < inputLen; k++) {
        const e3 = input[k];
        if (i === k || i === j || j === k) {
          continue;
        }

        if (e1 + e2 + e3 === expectedSum) {
          return [e1, e2, e3];
        }
      }
    }
  }

  return null;
}

export default function (): void {
  const input = loadData(__dirname, './data/input.txt').map((v) => parseInt(v));
  const doubles = findDoubles(input, 2020);
  const triples = findTriples(input, 2020);

  if (Array.isArray(doubles) && Array.isArray(triples)) {
    const doublesSum = doubles.reduce((acc, cur) => acc * cur, 1);
    const triplesSum = triples.reduce((acc, cur) => acc * cur, 1);

    console.log(
      chalk.cyan(
        `Following entries were found faulty in given report (${doubles[0]}, ${doubles[1]}),`
      )
    );
    console.log(
      chalk.cyan(
        `which upon multiplying results in: ${doubles[0]} * ${
          doubles[1]
        } = ${chalk.bold.underline(doublesSum)}`
      )
    );

    // Bonus
    console.log(
      chalk.cyan(
        `Since the elves were really good at their job, they found additional error for numbers: (${triples[0]}, ${triples[1]}, ${triples[2]})`
      )
    );
    console.log(
      chalk.cyan(
        `Which upon multiplying result in thi sum: ${chalk.bold.underline(
          triplesSum
        )}`
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
