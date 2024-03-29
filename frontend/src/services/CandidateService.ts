import { createCandidateRepository } from '../builders/CandidateRepositoryBuilder';
import { ICandidate } from '../types';

export interface ICandidateService {
  listCandidates: () => Promise<ICandidate[]>;
  addCandidate: (candidate: ICandidate, sender?: string) => Promise<void>;
}

const candidateRepository = createCandidateRepository();

export const candidateService: ICandidateService = {
  listCandidates: (): Promise<ICandidate[]> => candidateRepository.listCandidates(),
  addCandidate: (candidate: ICandidate, sender?: string): Promise<void> => {
    return candidateRepository.addCandidate(candidate, sender);
  },
};
