import chalk from 'chalk';
import { loadData } from '../utils';

const DIR_X = 3;
const DIR_Y = 1;
const TREE_SYMBOL = '#';

function traverse(
  input: string[],
  x: number,
  y: number,
  trees: number = 0
): number {
  if (!input.length || !input[y] || !input[y][x]) {
    return trees;
  }

  const newY = y + DIR_Y;
  const newX = (x + DIR_X) % input[y].length;
  const hasTree = input[y][x] === TREE_SYMBOL;

  return traverse(input, newX, newY, hasTree ? trees + 1 : trees);
}

export default function (): void {
  const input = loadData(__dirname, './data/input.txt');
  const numTrees = traverse(input, 0, 0, 0);

  console.log(
    chalk.cyan(
      `On your journey down the forest you've encountered ${chalk.bold.underline(
        numTrees
      )} trees`
    )
  );
}
