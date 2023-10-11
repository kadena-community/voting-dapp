import { ICandidate } from '../../types';

let candidates: ICandidate[] = [
  { key: '1', name: 'Jamesgatia Wardanic', votes: { int: 23 } },
  { key: '2', name: 'Shazora Bradleflame', votes: { int: 15 } },
  { key: '3', name: "Isobel O'Quinn", votes: { int: 9 } },
  { key: '4', name: 'Washingtonganta', votes: { int: 5 } },
  { key: '5', name: 'Campbelliri Kumariverse', votes: { int: 2 } },
];

const listCandidates = (): Promise<ICandidate[]> => Promise.resolve(candidates);

const addCandidate = (candidate: ICandidate): Promise<void> => {
  candidate.votes = { int: 0 }
  candidates.push(candidate);

  return Promise.resolve();
};

const incrementVotesByCandidateKey = (key: string): Promise<void> => {
  const candidate = candidates.find((candidate) => candidate.key === key);

  if (!candidate) {
    return Promise.resolve();
  }

  candidate.votes.int += 1;

  return Promise.resolve();
};

export default {
  listCandidates,
  addCandidate,
  incrementVotesByCandidateKey,
};
