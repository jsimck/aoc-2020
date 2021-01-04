import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

function loadData(dirname: string, filePath: string): string[] {
  const absolutePath = path.resolve(dirname, filePath);

  try {
    return fs.readFileSync(absolutePath, { encoding: 'utf-8' }).split('\n');
  } catch (error) {
    console.error(
      chalk.red(`Error occurred while loading input file: ${absolutePath}`)
    );
    console.error(chalk.red(error.message));
  }

  return [];
}

export { loadData };
