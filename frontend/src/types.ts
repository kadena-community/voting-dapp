export enum Env {
  inMemory = 'inMemory',
  devNet = 'devNet',
  testNet = 'testNet',
}

export type Config = {
  env: Env;
};

export interface ICandidate {
  key: string;
  name: string;
  votes: number;
}

export interface IVote {
  account: string;
  candidateKey: string;
}

export interface ICandidateRepository {
  listCandidates(): Promise<ICandidate[]>;
  addCandidate(candidate: ICandidate, sender?: string): Promise<void>;
  addCandidates(candidates: ICandidate[], sender?: string): Promise<void>;
  getNumberOfVotesByCandidateKey(key: string): Promise<number>;
  incrementVotesByCandidateKey(key: string): Promise<void>;
}

export interface IVoteRepository {
  hasAccountVoted(account: string): Promise<boolean>;
  vote(account: string, candidateKey: string): Promise<void>;
}
