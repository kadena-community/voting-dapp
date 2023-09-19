import { createVoteRepository } from '../builders/VoteRepositoryBuilder';

export interface IVoteService {
  hasAccountVoted: (account: string) => Promise<boolean>;
  vote: (account: string, candidateKey: string) => Promise<void>;
}

const voteRepository = createVoteRepository();

export const voteService: IVoteService = {
  hasAccountVoted: (account: string): Promise<boolean> => voteRepository.hasAccountVoted(account),
  vote: (account: string, candidateKey: string): Promise<void> => voteRepository.vote(account, candidateKey),
}
