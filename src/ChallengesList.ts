import reportRepair from './1-report-repair';
import passwordPhilosophy from './2-password-philosophy';

const ChallengesList: {
  [challengeNum: string]: () => void;
} = {
  '1': reportRepair,
  '2': passwordPhilosophy,
};

export default ChallengesList;
