import { ICandidate } from '../../types';

let candidates: ICandidate[] = [
  { key: '1', name: 'Candidate A', votes: { int: 0 } },
  { key: '2', name: 'Candidate B', votes: { int: 0 } },
  { key: '3', name: 'Candidate C', votes: { int: 0 } },
];

// @todo: update module and load from (list-candidates)
const listCandidates = (): Promise<ICandidate[]> => Promise.resolve(candidates);

// @todo: implement
const addCandidate = (candidate: ICandidate): Promise<void> => {
  candidates.push(candidate);

  return Promise.resolve();
};

const incrementVotesByCandidateKey = (): Promise<void> => {
  // happens internally in the Pact module
  return Promise.resolve();
};

export default {
  listCandidates,
  addCandidate,
  incrementVotesByCandidateKey,
};
