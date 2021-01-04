import reportRepair from './1-report-repair';

const ChallengesList: {
  [challengeNum: string]: () => any;
} = {
  '1': reportRepair,
};

export default ChallengesList;
