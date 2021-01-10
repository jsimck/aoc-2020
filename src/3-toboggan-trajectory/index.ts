import chalk from 'chalk';
import { loadData } from '../utils';

const TREE_SYMBOL = '#';

interface Direction {
  x: number;
  y: number;
}

function traverse(
  input: string[],
  x: number,
  dirX: number,
  y: number,
  dirY: number,
  trees: number = 0
): number {
  if (!input.length) {
    return trees;
  }

  const newY = y + dirY;
  const newX = (x + dirX) % input[y].length;

  if (!input[newY] || !input[newY][newX]) {
    return trees;
  }

  return traverse(
    input,
    newX,
    dirX,
    newY,
    dirY,
    input[newY][newX] === TREE_SYMBOL ? trees + 1 : trees
  );
}

export default async function (): Promise<void> {
  const input = await loadData('3-toboggan-trajectory.txt');
  const numTrees = traverse(input, 0, 3, 0, 1, 0);

  console.log(
    chalk.cyan(
      `On your journey down the forest you've encountered ${chalk.bold.underline(
        numTrees
      )} trees.`
    )
  );

  // BONUS
  const directions: Direction[] = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  const numTreeMultiplePasses = directions.reduce(
    (acc, cur) => acc * traverse(input, 0, cur.x, 0, cur.y, 0),
    1
  );

  console.log(
    chalk.cyan(
      `On your journey down the forest you've encountered ${chalk.bold.underline(
        numTreeMultiplePasses
      )} trees.`
    )
  );
}
