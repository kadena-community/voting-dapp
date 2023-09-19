import { IVote } from '../../model/Vote.interface';
import inMemoryCandidateRepository from '../candidate/InMemoryCandidateRepository';

let votes: IVote[] = [];

const hasAccountVoted = (account: string): Promise<boolean> => Promise.resolve(!! votes.find(vote => vote.account === account));

const vote = (account: string, candidateKey: string): Promise<void> => {
    votes.push({ account, candidateKey });
    inMemoryCandidateRepository.incrementVotesByCandidateKey(candidateKey);

    return Promise.resolve();
};

export default {
    hasAccountVoted,
    vote,
}