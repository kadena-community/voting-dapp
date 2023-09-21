import { ICandidate } from '../../model/Candidate.interface';
import { Pact, createClient } from '@kadena/client';

const NETWORK_ID = 'testnet04';
const CHAIN_ID = '1';
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

const client = createClient(API_HOST);

let candidates: ICandidate[] = [
    { key: '1', name: 'Candidate A', votes: 0 },
    { key: '2', name: 'Candidate B', votes: 0 },
    { key: '3', name: 'Candidate C', votes: 0 },
];

// @todo: update module and load from (list-candidates)
const listCandidates = (): Promise<ICandidate[]> => Promise.resolve(candidates);

// @todo: implement
const addCandidate = (candidate: ICandidate): Promise<void> => {
    candidates.push(candidate)

    return Promise.resolve();
};

// @todo: implement
const addCandidates = (candidatesToAdd: ICandidate[]): Promise<void> => {
    candidates = [...candidates, ...candidatesToAdd];

    return Promise.resolve();
}

const getNumberOfVotesByCandidateKey = async (key: string): Promise<number> => {
    const transaction = Pact.builder
        // @ts-ignore getVotes/get-votes
        .execution(Pact.modules['free.election'].getVotes(key))
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORK_ID)
        .createTransaction();

    const { result } = await client.dirtyRead(transaction);

    if (result.status === 'success') {
        return result.data.valueOf() as number;
    } else {
        console.log(result.error);
        return 0;
    }
};

const incrementVotesByCandidateKey = (): Promise<void> => {
    // happens internally in the Pact module
    return Promise.resolve();
};

export default {
    listCandidates,
    addCandidate,
    addCandidates,
    getNumberOfVotesByCandidateKey,
    incrementVotesByCandidateKey,
}
