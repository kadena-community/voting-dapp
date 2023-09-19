import { ICandidate } from '../../model/Candidate.interface';

export interface ICandidateRepository {
    listCandidates(): Promise<ICandidate[]>;
    addCandidate(candidate: ICandidate, sender?: string): Promise<void>;
    addCandidates(candidates: ICandidate[], sender?: string): Promise<void>;
    getNumberOfVotesByCandidateKey(key: string): Promise<number>;
    incrementVotesByCandidateKey(key: string): Promise<void>;
}