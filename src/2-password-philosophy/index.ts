import chalk from 'chalk';
import { loadData } from '../utils';
import Password from './Password';

interface ValidationResults {
  valid: number;
  invalid: number;
}

interface ValidationCallback {
  (password: Password): boolean;
}

async function validateCollection(
  passwords: Password[],
  cb: ValidationCallback
): Promise<ValidationResults> {
  const valid = passwords.reduce((acc, cur) => {
    if (cb(cur)) {
      acc++;
    }

    return acc;
  }, 0);

  return {
    valid,
    invalid: passwords.length - valid,
  };
}

export default async function (): Promise<void> {
  const input = await loadData('2-password-philosophy.txt');
  const passwordsCollection = input.map((line) => new Password(line));
  let results: [ValidationResults, ValidationResults] | [] = [];

  try {
    results = await Promise.all([
      validateCollection(passwordsCollection, (p) => p.isValid()),
      validateCollection(passwordsCollection, (p) => p.isReallyValid()),
    ]);
  } catch (error) {
    console.error(chalk.red(error));
  }

  const [r1, r2] = results;

  if (r1 && r2) {
    console.log(chalk.cyan(`Out of ${passwordsCollection.length}, there are:`));
    console.log(
      chalk.greenBright(` - ${chalk.underline.bold(r1.valid)} valid`)
    );
    console.log(
      chalk.greenBright(` - ${chalk.underline.bold(r2.valid)} really valid`)
    );
    console.log(
      chalk.redBright(` - ${chalk.underline.bold(r1.invalid)} invalid`)
    );
    console.log(
      chalk.redBright(` - ${chalk.underline.bold(r2.invalid)} really invalid`)
    );
  } else {
    console.error(chalk.red('Unknown error.'));
  }
}
