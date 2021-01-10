import reportRepair from './1-report-repair';
import passwordPhilosophy from './2-password-philosophy';
import tobogganTrajectory from './3-toboggan-trajectory';

const ChallengesList: {
  [challengeNum: string]: () => Promise<void>;
} = {
  '1': reportRepair,
  '2': passwordPhilosophy,
  '3': tobogganTrajectory,
};

export default ChallengesList;
