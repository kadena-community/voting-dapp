import { createCandidateRepository } from '../builders/CandidateRepositoryBuilder';
import { ICandidate } from '../model/Candidate.interface';

export interface ICandidateService {
  listCandidates: () => Promise<ICandidate[]>;
  addCandidate: (candidate: ICandidate, sender?: string) => void;
  addCandidates: (candidates: ICandidate[], sender?: string) => void;
  getNumberOfVotesByCandidateKey: (key: string) => Promise<number>;
}

const candidateRepository = createCandidateRepository();

export const candidateService: ICandidateService = {
  listCandidates: (): Promise<ICandidate[]> => candidateRepository.listCandidates(),
  addCandidate: (candidate: ICandidate, sender?: string): void => {
    candidateRepository.addCandidate(candidate, sender);
  },
  addCandidates: (candidates: ICandidate[], sender?: string): void => {
    candidateRepository.addCandidates(candidates, sender);
  },
  getNumberOfVotesByCandidateKey: (key: string): Promise<number> =>
    candidateRepository.getNumberOfVotesByCandidateKey(key),
};
