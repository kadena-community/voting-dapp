import { Backend, getBackend } from '../configuration';
import { IVoteRepository } from '../repositories/vote/VoteRepository.interface';
import InMemoryVoteRepository from '../repositories/vote/InMemoryVoteRepository';
import TestnetVoteRepository from '../repositories/vote/TestnetVoteRepository';
import DevnetVoteRepository from '../repositories/vote/DevnetVoteRepository';

const backendRepositoryMap: Record<Backend, IVoteRepository> = {
  'in-memory': InMemoryVoteRepository,
  devnet: DevnetVoteRepository,
  testnet: TestnetVoteRepository,
};

export function createVoteRepository() {
  return backendRepositoryMap[getBackend()];
}
