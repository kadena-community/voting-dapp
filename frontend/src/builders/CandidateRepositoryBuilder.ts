import { config } from '../configuration';
import { Env, ICandidateRepository } from '../types';
import InMemoryCandidateRepository from '../repositories/candidate/InMemoryCandidateRepository';
import TestnetCandidateRepository from '../repositories/candidate/TestnetCandidateRepository';
import DevnetCandidateRepository from '../repositories/candidate/DevnetCandidateRepository';

const backendRepositoryMap: Record<Env, ICandidateRepository> = {
  [Env.inMemory]: InMemoryCandidateRepository,
  [Env.devNet]: DevnetCandidateRepository,
  [Env.testNet]: TestnetCandidateRepository,
};

export function createCandidateRepository() {
  return backendRepositoryMap[config.env];
}
