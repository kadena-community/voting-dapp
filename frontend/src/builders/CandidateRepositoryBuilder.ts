import { config } from '../configuration';
import { Env, ICandidateRepository } from '../types';
import InMemoryCandidateRepository from '../repositories/candidate/InMemoryCandidateRepository';
import DevnetCandidateRepository from '../repositories/candidate/DevnetCandidateRepository';

const backendRepositoryMap: Record<Env, ICandidateRepository> = {
  [Env.inMemory]: InMemoryCandidateRepository,
  [Env.devnet]: DevnetCandidateRepository,
};

export function createCandidateRepository() {
  return backendRepositoryMap[config.env];
}
