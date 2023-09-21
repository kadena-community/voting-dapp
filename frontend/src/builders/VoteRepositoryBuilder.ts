import { config } from '../configuration';
import { Env, IVoteRepository } from '../types';
import InMemoryVoteRepository from '../repositories/vote/InMemoryVoteRepository';
import TestnetVoteRepository from '../repositories/vote/TestnetVoteRepository';
import DevnetVoteRepository from '../repositories/vote/DevnetVoteRepository';

const backendRepositoryMap: Record<Env, IVoteRepository> = {
  [Env.inMemory]: InMemoryVoteRepository,
  [Env.devNet]: DevnetVoteRepository,
  [Env.testNet]: TestnetVoteRepository,
};

export function createVoteRepository() {
  return backendRepositoryMap[config.env];
}
