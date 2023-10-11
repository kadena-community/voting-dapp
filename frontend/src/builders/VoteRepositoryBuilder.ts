import { config } from '../configuration';
import { Env, IVoteRepository } from '../types';
import InMemoryVoteRepository from '../repositories/vote/InMemoryVoteRepository';
import DevnetVoteRepository from '../repositories/vote/DevnetVoteRepository';

const backendRepositoryMap: Record<Env, IVoteRepository> = {
  [Env.inMemory]: InMemoryVoteRepository,
  [Env.devnet]: DevnetVoteRepository,
};

export function createVoteRepository() {
  return backendRepositoryMap[config.env];
}
