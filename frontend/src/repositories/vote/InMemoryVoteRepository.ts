import { IVote } from '../../types';
import inMemoryCandidateRepository from '../candidate/InMemoryCandidateRepository';

const votes: IVote[] = [];

const hasAccountVoted = (account: string): Promise<boolean> =>
  Promise.resolve(!!votes.find((vote) => vote.account === account));

const vote = (account: string, candidateKey: string): Promise<void> => {
  votes.push({ account, candidateKey });
  inMemoryCandidateRepository.incrementVotesByCandidateKey(candidateKey);

  return Promise.resolve();
};

export default {
  hasAccountVoted,
  vote,
};
