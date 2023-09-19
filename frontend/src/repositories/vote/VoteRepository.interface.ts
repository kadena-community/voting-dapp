export interface IVoteRepository {
    hasAccountVoted(account: string): Promise<boolean>;
    vote(account: string, candidateKey: string): Promise<void>;
}