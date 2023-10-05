import { Pact, createClient, isSignedTransaction, signWithChainweaver } from '@kadena/client';
import { ICandidate } from '../../types';

const NETWORK_ID = 'fast-development';
const CHAIN_ID = '1';
const API_HOST = `http://localhost:8080/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const NAMESPACE = 'n_fd020525c953aa002f20fb81a920982b175cdf1a';

const client = createClient(API_HOST);
const accountKey = (account: string) => account.split(':')[1];

const listCandidates = async (): Promise<ICandidate[]> => {
  const transaction = Pact.builder
    .execution(Pact.modules[`${NAMESPACE}.election`]['list-candidates']())
    .setMeta({
      chainId: CHAIN_ID,
      gasLimit: 100000,
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const { result } = await client.dirtyRead(transaction);

  return result.status === 'success'
    ? result.data.valueOf() as ICandidate[]
    : [];
};

const addCandidate = async (candidate: ICandidate, sender: string = ''): Promise<void> => {
  const transaction = Pact.builder
    .execution(
      // @ts-ignore
      Pact.modules[`${NAMESPACE}.election`]['insert-candidate'](candidate),
    )
    .addData('admin-keyset', {
      keys: [accountKey(sender)],
      pred: 'keys-all',
    })
    .addSigner(accountKey(sender))
    .setMeta({
      chainId: CHAIN_ID,
      senderAccount: sender,
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signedTx = await signWithChainweaver(transaction);

  // const preflightResponse = await client.preflight(signedTx);

  // if (preflightResponse.result.status === 'failure') {
  //   throw preflightResponse.result.error;
  // }

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor);
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
};

const addCandidates = async (candidatesToAdd: ICandidate[], sender: string = ''): Promise<void> => {
  const transaction = Pact.builder
    .execution(
      // @ts-ignore
      Pact.modules[`${NAMESPACE}.election`]['insert-candidates'](candidatesToAdd),
    )
    .addData('election-admin-keyset', {
      keys: [accountKey(sender)],
      pred: 'keys-all',
    })
    .addSigner(accountKey(sender))
    .setMeta({
      chainId: CHAIN_ID,
      senderAccount: sender
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signedTx = await signWithChainweaver(transaction);

  const preflightResponse = await client.preflight(signedTx);

  if (preflightResponse.result.status === 'failure') {
    throw preflightResponse.result.error;
  }

  if (isSignedTransaction(signedTx)) {
    const transactionDescriptor = await client.submit(signedTx);
    const response = await client.listen(transactionDescriptor);
    if (response.result.status === 'failure') {
      throw response.result.error;
    } else {
      console.log(response.result);
    }
  }
};

const getNumberOfVotesByCandidateKey = async (key: string): Promise<number> => {
  const transaction = Pact.builder
    // @ts-ignore get-votes
    .execution(Pact.modules[`${NAMESPACE}.election`]['get-votes'](key))
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
};
