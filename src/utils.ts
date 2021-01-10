import { promisify } from 'util';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const readFile = promisify(fs.readFile);

async function loadData(fileName: string): Promise<string[]> {
  const absolutePath = path.resolve('./data/', fileName);

  try {
    return (await readFile(absolutePath, { encoding: 'utf-8' })).split('\n');
  } catch (error) {
    console.error(
      chalk.red(`Error occurred while loading data file: ${absolutePath}`),
      '\n',
      chalk.red(error)
    );
  }

  return [];
}

export { loadData };
