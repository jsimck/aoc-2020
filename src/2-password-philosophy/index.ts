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

function validateCollection(
  passwords: Password[],
  cb: ValidationCallback
): ValidationResults {
  const valid = passwords.reduce((acc, cur) => {
    if (cb(cur)) {
      acc++;
    }

    if (cur.isReallyValid()) {
      console.log(cur.toString());
    }

    return acc;
  }, 0);

  return {
    valid,
    invalid: passwords.length - valid,
  };
}

export default function (): void {
  const input = loadData(__dirname, './data/input.txt');
  const passwordsCollection = input.map((line) => new Password(line));

  const validatedPasswordsCount = validateCollection(
    passwordsCollection,
    (password) => password.isValid()
  );
  const reallyValidatedPasswordsCount = validateCollection(
    passwordsCollection,
    (password) => password.isReallyValid()
  );

  console.log(chalk.cyan(`Out of ${passwordsCollection.length}, there are:`));
  console.log(
    chalk.greenBright(
      ` - ${chalk.underline.bold(validatedPasswordsCount.valid)} valid`
    )
  );
  console.log(
    chalk.greenBright(
      ` - ${chalk.underline.bold(
        reallyValidatedPasswordsCount.valid
      )} really valid`
    )
  );
  console.log(
    chalk.redBright(
      ` - ${chalk.underline.bold(validatedPasswordsCount.invalid)} invalid`
    )
  );
  console.log(
    chalk.redBright(
      ` - ${chalk.underline.bold(
        reallyValidatedPasswordsCount.invalid
      )} really invalid`
    )
  );
}
