import { Backend, getBackend } from '../configuration';
import { ICandidateRepository } from '../repositories/candidate/CandidateRepository.interface';
import InMemoryCandidateRepository from '../repositories/candidate/InMemoryCandidateRepository';
import TestnetCandidateRepository from '../repositories/candidate/TestnetCandidateRepository';
import DevnetCandidateRepository from '../repositories/candidate/DevnetCandidateRepository';

const backendRepositoryMap: Record<Backend, ICandidateRepository> = {
    'in-memory': InMemoryCandidateRepository,
    'devnet': DevnetCandidateRepository,
    'testnet': TestnetCandidateRepository,
}

export function createCandidateRepository () {
    return backendRepositoryMap[getBackend()];
}