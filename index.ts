import chalk from 'chalk';
import ChallengesList from './src/ChallengesList';

(() => {
  const challengeNum = (process.argv.length > 2 && process.argv.pop()) || '1';

  if (
    ChallengesList[challengeNum] &&
    typeof ChallengesList[challengeNum] === 'function'
  ) {
    console.log(`Running challenge number: ${challengeNum}`);
    console.log('-------------------------------------\n');
    ChallengesList[challengeNum]();
  } else {
    console.error(
      chalk.red(
        `Invalid challenge number provided: ${challengeNum}, only following challenges are available ${Object.keys(
          ChallengesList
        )}`
      )
    );
  }
})();
