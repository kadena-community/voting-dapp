import { ICandidate } from '../../types';

let candidates: ICandidate[] = [
  { key: '1', name: 'Jamesgatia Wardanic', votes: 23 },
  { key: '2', name: 'Shazora Bradleflame', votes: 15 },
  { key: '3', name: "Isobel O'Quinn", votes: 9 },
  { key: '4', name: 'Washingtonganta', votes: 5 },
  { key: '5', name: 'Campbelliri Kumariverse', votes: 2 },
];

const listCandidates = (): Promise<ICandidate[]> => Promise.resolve(candidates);

const addCandidate = (candidate: ICandidate): Promise<void> => {
  candidates.push(candidate);

  return Promise.resolve();
};

const addCandidates = (candidatesToAdd: ICandidate[]): Promise<void> => {
  candidates = [...candidates, ...candidatesToAdd];

  return Promise.resolve();
};

const getNumberOfVotesByCandidateKey = (key: string): Promise<number> =>
  Promise.resolve(candidates.find((candidate) => candidate.key === key)?.votes || 0);

const incrementVotesByCandidateKey = (key: string): Promise<void> => {
  const candidate = candidates.find((candidate) => candidate.key === key);

  if (!candidate) {
    return Promise.resolve();
  }

  candidate.votes += 1;

  return Promise.resolve();
};

export default {
  listCandidates,
  addCandidate,
  addCandidates,
  getNumberOfVotesByCandidateKey,
  incrementVotesByCandidateKey,
};
