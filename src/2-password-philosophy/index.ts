import chalk from 'chalk';
import { loadData } from '../utils';
import Password from './Password';

export default function passwordPhilosophy(): void {
  const input = loadData(__dirname, './data/input.txt');
  const parsedPasswords = input.map((line) => new Password(line));
  const validPassword = parsedPasswords.reduce((acc, cur: Password) => {
    if (cur.isValid()) {
      acc++;
    }

    return acc;
  }, 0);

  console.log(chalk.cyan(`Out of ${parsedPasswords.length}, there are:`));
  console.log(
    chalk.greenBright(` - ${chalk.underline.bold(validPassword)} valid`)
  );
  console.log(
    chalk.redBright(
      ` - ${chalk.underline.bold(
        parsedPasswords.length - validPassword
      )} invalid`
    )
  );
}
